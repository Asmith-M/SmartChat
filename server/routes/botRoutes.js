import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { normalizeInput } from '../utils/inputNormalizer.js';
import {
  greetings,
  identityQuestions,
  fallbackResponses,
  sassyResponses,
  genZPhrases,
  spicyPhrases,
  sassyCatchphrases,
  topicResponses,
  enhancedPrompts
} from '../utils/responseMap.js';

dotenv.config();
const router = express.Router();

const HF_TOKEN = process.env.HUGGING_FACE_API_KEY || "HUGGING_FACE_API_KEY";
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Store conversation history for better context
const conversationCache = new Map();
const MAX_HISTORY_LENGTH = 4; // Keep last 4 exchanges for context
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

// Enhanced knowledge base with more topics
const knowledgeBase = {
  "capital": {
    "india": "Delhi is the capital of India.",
    "usa": "Washington D.C. is the capital of the United States.",
    "uk": "London is the capital of the United Kingdom.",
    "china": "Beijing is the capital of China.",
    "japan": "Tokyo is the capital of Japan.",
    "france": "Paris is the capital of France.",
    "germany": "Berlin is the capital of Germany.",
    "australia": "Canberra is the capital of Australia.",
    "canada": "Ottawa is the capital of Canada.",
    "brazil": "Brasília is the capital of Brazil.",
    "russia": "Moscow is the capital of Russia.",
    "italy": "Rome is the capital of Italy.",
    "spain": "Madrid is the capital of Spain.",
    "mexico": "Mexico City is the capital of Mexico."
  },
  "weather": {
    "sunny": "It's a beautiful sunny day! Perfect for outdoor activities.",
    "rainy": "It's raining outside. Don't forget your umbrella!",
    "snowy": "It's snowing! Bundle up and stay warm.",
    "cloudy": "It's cloudy today. The temperature might be mild.",
    "stormy": "There's a storm outside. Better stay indoors!",
    "windy": "It's quite windy today. Hold onto your hats!",
    "foggy": "It's foggy outside. Drive carefully if you're going out."
  },
  "facts": {
    "earth": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    "water": "Water covers about 71% of Earth's surface, mostly in seas and oceans.",
    "human": "The human body contains enough carbon to fill about 9,000 pencils.",
    "space": "Space is completely silent as there is no medium for sound waves to travel through.",
    "amazon": "The Amazon rainforest produces about 20% of Earth's oxygen.",
    "brain": "The human brain can process information at up to 120 meters per second.",
    "internet": "The first message sent over the internet was 'LO' - it was supposed to be 'LOGIN' but the system crashed."
  },
  "coding": {
    "javascript": "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.",
    "python": "Python is an interpreted, high-level, general-purpose programming language known for its readability.",
    "html": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
    "css": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.",
    "java": "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
    "react": "React is an open-source, front end JavaScript library for building user interfaces or UI components.",
    "node": "Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser."
  }
};

function isFlirtyMessage(message) {
  const flirtyPatterns = [
    /\b(hot|sexy|cute|beautiful|love you|marry|date|kiss|flirt|wink)\b/i,
    /\b(number|single|relationship|boyfriend|girlfriend)\b/i,
    /\b(want to|with you|together)\b/i,
    /\b(go out|dinner|romantic|cuddle|holding hands)\b/i,
    /\b(attracted|attractive|pretty|handsome|gorgeous)\b/i
  ];
  return flirtyPatterns.some(pattern => pattern.test(message));
}

function extractTopic(message) {
  // Check for topic keywords
  const topicKeywords = {
    programming: ["code", "program", "javascript", "python", "coding", "developer", "script", "function", "variable", "bug", "debug"],
    technology: ["tech", "computer", "software", "hardware", "device", "gadget", "app", "application", "smartphone", "laptop"],
    help: ["help", "assist", "support", "guide", "how to", "explain", "tell me", "show me"],
    movies: ["movie", "film", "cinema", "actor", "actress", "director", "scene", "watch", "theater", "hollywood"],
    science: ["science", "scientific", "biology", "chemistry", "physics", "experiment", "theory", "research", "discovery"],
    math: ["math", "calculate", "equation", "number", "formula", "geometry", "algebra", "arithmetic"],
    history: ["history", "historical", "ancient", "century", "era", "period", "civilization", "war", "revolution"]
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return topic;
    }
  }

  return null;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSassyResponse(baseText, topic = null) {
  let cleanedText = baseText.trim();

  // If topic-specific response exists and we randomly choose to use it
  if (topic && topicResponses.sassy[topic] && Math.random() < 0.4) {
    cleanedText = getRandomElement(topicResponses.sassy[topic]);
  } else if (cleanedText.length < 10 || Math.random() < 0.3) {
    cleanedText = getRandomElement([
      "Let me explain this to you in a way even YOU can understand...",
      "Hang on while I dumb this down for you...",
      "This might be beyond your comprehension, but...",
      "Not me spilling facts when I could be ignoring you...",
      "Attention please, dropping knowledge bombs in 3, 2, 1..."
    ]);
  }

  // Add Gen Z slang at beginning (with 60% probability)
  if (Math.random() < 0.6) {
    const slang = getRandomElement(genZPhrases);
    cleanedText = `${slang}, ${cleanedText.charAt(0).toLowerCase() + cleanedText.slice(1)}`;
  }

  // Add spicy phrase (with 40% probability)
  if (Math.random() < 0.4) {
    const spicyPhrase = getRandomElement(spicyPhrases);
    cleanedText = `<span class="math-inline">\{cleanedText\} \(</span>{spicyPhrase})`;
  }

  // Always add a catchphrase at the end
  const catchphrase = getRandomElement(sassyCatchphrases);
  return `<span class="math-inline">\{cleanedText\}\\n\\n</span>{catchphrase}`;
}

function generateFormalResponse(baseText, topic = null) {
  // Use topic-specific formal response if available and randomly chosen
  if (topic && topicResponses.formal[topic] && Math.random() < 0.4) {
    return getRandomElement(topicResponses.formal[topic]);
  }

  const intros = [
    "Certainly. Here's what I found:",
    "I'd be happy to elaborate:",
    "Based on reliable sources:",
    "Here's a concise explanation:",
    "According to my knowledge base:"
  ];

  const closings = [
    "I hope that answers your query.",
    "Please let me know if you'd like further information.",
    "I'm always here to help.",
    "Let me know if you'd like more clarity.",
    "Happy to provide more details upon request."
  ];

  const intro = getRandomElement(intros);
  const closing = getRandomElement(closings);

  // Format the response more professionally
  let formattedText = baseText;

  // If response is long, consider adding structure
  if (formattedText.length > 100 && Math.random() < 0.5) {
    // Split into sentences and reorganize
    const sentences = formattedText.split(/(?<=[.!?])\s+/);
    if (sentences.length > 3) {
      formattedText = sentences[0] + " " + sentences[1] + "\n\n";

      // Add bullet points for some of the remaining sentences
      for (let i = 2; i < sentences.length; i++) {
        if (sentences[i].length > 5) {
          formattedText += `• ${sentences[i]}\n`;
        }
      }
    }
  }

  return `<span class="math-inline">\{intro\}\\n\\n</span>{formattedText}\n\n${closing}`;
}

// Function to determine if text contains a greeting
function isGreeting(text) {
  const normalizedText = text.toLowerCase().trim();
  return greetings.some(greeting => normalizedText.includes(greeting));
}

// Function to determine if text is asking about identity
function isIdentityQuestion(text) {
  const normalizedText = text.toLowerCase().trim();
  return identityQuestions.some(question => normalizedText.includes(question));
}

// Function to search the knowledge base
function searchKnowledgeBase(query) {
  const normalizedQuery = query.toLowerCase();

  // Check each category in the knowledge base
  for (const [category, entries] of Object.entries(knowledgeBase)) {
    // Check each entry in the category
    for (const [key, value] of Object.entries(entries)) {
      if (normalizedQuery.includes(key)) {
        return value;
      }
    }
  }

  return null;
}

// Generate session ID for new users
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Get or create conversation history
function getConversationHistory(sessionId) {
  if (!conversationCache.has(sessionId)) {
    conversationCache.set(sessionId, {
      history: [],
      lastUpdated: Date.now()
    });
  }

  const cacheEntry = conversationCache.get(sessionId);
  cacheEntry.lastUpdated = Date.now(); // Update the timestamp
  return cacheEntry.history;
}

// Update conversation history
function updateConversationHistory(sessionId, userMessage, botResponse) {
  const history = getConversationHistory(sessionId);

  history.push({
    user: userMessage,
    bot: botResponse,
    timestamp: Date.now()
  });

  // Keep history at a manageable size
  if (history.length > MAX_HISTORY_LENGTH) {
    history.shift(); // Remove oldest conversation
  }
}

// Periodically clean up old conversations
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, cacheEntry] of conversationCache.entries()) {
    if (now - cacheEntry.lastUpdated > CACHE_EXPIRY) {
      conversationCache.delete(sessionId);
    }
  }
}, 15 * 60 * 1000); // Check every 15 minutes

// Chat endpoint with enhanced features
router.post('/chat', async (req, res) => {
  try {
    // Extract message, session ID and bot personality from request body
    const { message, sessionId = generateSessionId(), personality = 'formal' } = req.body;

    // Log received payload
    console.log('Backend Received Payload:', {
      message,
      sessionId,
      personality,
      rawBody: req.body
    });

    // Normalize input
    const normalizedMessage = normalizeInput(message);

    if (!normalizedMessage) {
      return res.status(400).json({
        success: false,
        error: 'No message provided'
      });
    }

    // Get conversation history
    const history = getConversationHistory(sessionId);

    // Process the message locally if possible
    let response;
    let responseSource = 'local'; // Track where the response came from

    // Check if this is a greeting
    if (isGreeting(normalizedMessage)) {
      response = personality === 'sassy'
        ? getRandomElement(fallbackResponses.sassy.greetings)
        : getRandomElement(fallbackResponses.formal.greetings);
    }
    // Check if user is asking who the bot is
    else if (isIdentityQuestion(normalizedMessage)) {
      response = personality === 'sassy'
        ? getRandomElement(fallbackResponses.sassy.identity)
        : getRandomElement(fallbackResponses.formal.identity);
    }
    // Handle flirty messages differently based on personality
    else if (isFlirtyMessage(normalizedMessage)) {
      if (personality === 'sassy') {
        response = getRandomElement(sassyResponses.flirty);
      } else {
        response = "I'm just an AI assistant. I'm here to provide information and help with various tasks.";
      }
    }
    // Check knowledge base
    else {
      const knowledgeBaseResponse = searchKnowledgeBase(normalizedMessage);

      if (knowledgeBaseResponse) {
        // Format response based on personality
        response = personality === 'sassy'
          ? generateSassyResponse(knowledgeBaseResponse, extractTopic(normalizedMessage))
          : generateFormalResponse(knowledgeBaseResponse, extractTopic(normalizedMessage));
      } else {
        // If we don't have a local response, try the AI model
        try {
          // Extract conversation context
          const conversationContext = history.map(item =>
            `User: ${item.user}\nAssistant: ${item.bot}`
          ).join('\n\n');

          // Generate a topic-appropriate prompt enhancer if topic is detected
          const topic = extractTopic(normalizedMessage);
          const promptType = topic
            ? (["programming", "science", "math"].includes(topic) ? "technical" :
                ["movies", "history"].includes(topic) ? "educational" : "conversational")
            : "conversational";

          const promptEnhancer = getRandomElement(enhancedPrompts[promptType]);

          // Build the AI prompt with history and personality
          let prompt = "";

          if (conversationContext) {
            prompt += `Previous conversation:\n${conversationContext}\n\n`;
          }

          // Add personality instructions
          if (personality === 'sassy') {
            prompt += `You are a sassy, somewhat edgy AI assistant with attitude. You use Gen Z slang, emojis, and have a confident, slightly arrogant tone. Keep responses concise but with personality.\n\n`;
          } else {
            prompt += `You are a helpful, professional AI assistant. Your tone is formal but friendly. Provide clear, accurate information in a respectful manner.\n\n`;
          }

          // Add the user's message with context
          prompt += `User: <span class="math-inline">\{normalizedMessage\}\\n\\n</span>{promptEnhancer}`;

          // Send request to Hugging Face hosted endpoint
          const aiResponse = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            {
              headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify({
                inputs: prompt,
                parameters: {
                  max_new_tokens: 250,
                  temperature: personality === 'sassy' ? 0.9 : 0.7,
                  top_p: 0.9,
                  do_sample: true
                }
              })
            }
          );

          // Handle potential API errors
          if (!aiResponse.ok) {
            const errorData = await aiResponse.json();

            // Check if model is loading
            if (errorData.error && errorData.error.includes("Loading")) {
              // Wait a moment and retry once
              await wait(5000);

              // Fallback to default response if we're still loading
              throw new Error("Model is still loading");
            } else {
              throw new Error(`API Error: ${errorData.error || aiResponse.statusText}`);
            }
          }

          const result = await aiResponse.json();

          // Extract the generated text
          let aiText = result[0]?.generated_text || "";

          // Clean up the response - remove any prefixes like "Assistant:"
          aiText = aiText.replace(/^(Assistant:|Bot:|AI:)\s*/i, "");

          // Format based on personality
          response = personality === 'sassy'
            ? generateSassyResponse(aiText, topic)
            : aiText;

          responseSource = 'ai';
        } catch (error) {
          console.error("AI API error:", error.message);

          // Fallback to default responses if AI fails
          response = personality === 'sassy'
            ? getRandomElement(fallbackResponses.sassy.unknown)
            : getRandomElement(fallbackResponses.formal.unknown);

          responseSource = 'fallback';
        }
      }
    }

    // Update conversation history
    updateConversationHistory(sessionId, normalizedMessage, response);

    // Send response
    res.json({
      success: true,
      message: response,
      sessionId,
      source: responseSource
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({
      success: false,
      error: "Server error processing your request"
    });
  }
});

export default router;