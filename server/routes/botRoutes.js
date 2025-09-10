import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { normalizeInput } from '../utils/inputNormalizer.js';
import {
    greetings,
    identityQuestions,
    fallbackResponses
} from '../utils/responseMap.js';

dotenv.config();
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const conversationCache = new Map();
const MAX_HISTORY_LENGTH = 3; 
const CACHE_EXPIRY = 30 * 60 * 1000;

const knowledgeBase = {
    "capital": { 
        "india": "Delhi is the capital of India.",
        "usa": "Washington D.C. is the capital of the United States.",
        "uk": "London is the capital of the United Kingdom."
     },
};

function isGreeting(text) {
    const normalizedText = text.toLowerCase().trim();
    return greetings.some(greeting => normalizedText.includes(greeting));
}

function isIdentityQuestion(text) {
    const normalizedText = text.toLowerCase().trim();
    return identityQuestions.some(question => normalizedText.includes(question));
}

function searchKnowledgeBase(query) {
    const normalizedQuery = query.toLowerCase();
    for (const category in knowledgeBase) {
        for (const key in knowledgeBase[category]) {
            if (normalizedQuery.includes(key)) {
                return knowledgeBase[category][key];
            }
        }
    }
    return null;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getConversationHistory(sessionId) {
    if (!conversationCache.has(sessionId)) {
        conversationCache.set(sessionId, { history: [], lastUpdated: Date.now() });
    }
    const cacheEntry = conversationCache.get(sessionId);
    cacheEntry.lastUpdated = Date.now();
    return cacheEntry.history;
}

function updateConversationHistory(sessionId, userMessage, botResponse) {
    const history = getConversationHistory(sessionId);
    history.push({ role: 'user', content: userMessage });
    history.push({ role: 'assistant', content: botResponse });
    if (history.length > MAX_HISTORY_LENGTH * 2) {
        history.splice(0, 2);
    }
}

router.post('/chat', async (req, res) => {
    const { message, sessionId = Math.random().toString(36).substring(2), personality = 'formal' } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, error: 'No message provided' });
    }
     if (!OPENROUTER_API_KEY) {
        console.error("FATAL: OPENROUTER_API_KEY is not set in environment variables.");
        return res.status(500).json({ success: false, error: "Server is not configured correctly." });
    }

    const normalizedMessage = normalizeInput(message);
    const history = getConversationHistory(sessionId);
    let responseText;
    let responseSource = 'local';

    if (isGreeting(normalizedMessage)) {
        responseText = getRandomElement(fallbackResponses[personality].greetings);
    } else if (isIdentityQuestion(normalizedMessage)) {
        responseText = getRandomElement(fallbackResponses[personality].identity);
    } else {
        const knowledgeBaseResponse = searchKnowledgeBase(normalizedMessage);
        if (knowledgeBaseResponse) {
            responseText = knowledgeBaseResponse;
        }
    }
    
    if (!responseText) {
        responseSource = 'ai';
        try {
            const messages = [];

            if (personality === 'sassy') {
                messages.push({ role: 'system', content: 'You are a sassy, edgy AI assistant with a confident, slightly arrogant tone. You use Gen Z slang and emojis. Keep responses concise but with personality.' });
            } else {
                messages.push({ role: 'system', content: 'You are a helpful, professional AI assistant. Your tone is formal but friendly. Provide clear, accurate information.' });
            }

            messages.push(...history);
            messages.push({ role: 'user', content: normalizedMessage });

            const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "mistralai/mistral-7b-instruct",
                    messages: messages,
                })
            });

            if (!apiResponse.ok) {
                const errorBody = await apiResponse.json();
                console.error("OpenRouter API Error:", errorBody);
                throw new Error(errorBody.error?.message || "Failed to fetch from OpenRouter API");
            }

            const result = await apiResponse.json();
            responseText = result.choices[0]?.message?.content.trim() || getRandomElement(fallbackResponses[personality].unknown);

        } catch (error) {
            console.error("Error calling AI API:", error.message);
            responseSource = 'fallback';
            responseText = getRandomElement(fallbackResponses[personality].unknown);
        }
    }

    updateConversationHistory(sessionId, normalizedMessage, responseText);

    res.json({
        success: true,
        message: responseText,
        sessionId,
        source: responseSource
    });
});

export default router;
