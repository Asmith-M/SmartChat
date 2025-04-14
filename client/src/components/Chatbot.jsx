import React, { useState, useEffect, useRef } from 'react';
import { getBotResponse } from '../services/botservices';
import '../styles/chatbot.css';
import DOMPurify from 'dompurify';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('formal');
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // Generate session ID only once
  const generateSessionId = () => (
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );

  // On mount: Load history, mode, and session ID
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('smartchat_history')) || [];
    const savedMode = localStorage.getItem('smartchat_mode') || 'formal';
    const savedSessionId = localStorage.getItem('smartchat_session');

    setChatHistory(savedHistory.length > 0 ? savedHistory : [{
      sender: 'bot',
      text: savedMode === 'formal'
        ? 'Welcome to SmartChat! How can I assist you today?'
        : 'Sup bestie! Ready to chat with the sassiest bot alive? 💅'
    }]);

    setMode(savedMode);
    setSessionId(savedSessionId || generateSessionId());
  }, []);

  // Sync chatHistory to localStorage
  useEffect(() => {
    localStorage.setItem('smartchat_history', JSON.stringify(chatHistory));
    scrollToBottom();
  }, [chatHistory]);

  // Sync mode to localStorage
  useEffect(() => {
    localStorage.setItem('smartchat_mode', mode);
  }, [mode]);

  // Sync sessionId to localStorage
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('smartchat_session', sessionId);
    }
  }, [sessionId]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMode = () => {
    const newMode = mode === 'formal' ? 'sassy' : 'formal';
    setMode(newMode);

    setChatHistory(prev => [
      ...prev,
      {
        sender: 'system',
        text: newMode === 'formal'
          ? "Switched to Formal Mode. I'll be professional and helpful."
          : 'Switched to Sassy Mode. Get ready for some attitude! 💅'
      }
    ]);
  };

  // Predefined responses dictionary
  const getPredefinedResponses = () => {
    return {
      "who made you": mode === 'formal'
        ? 'I was respectfully created by <b>Asmith</b>, a remarkable individual with unparalleled brilliance.'
        : 'Ugh, who else but <b>Asmith</b>? Literal genius vibes, dripping in awesomeness. 💅✨',
      "who created you": mode === 'formal'
        ? 'I was respectfully created by <b>Asmith</b>, a remarkable individual with unparalleled brilliance.'
        : "Duhhh, it\'s <b>Asmith</b> again 😎 Brains, beauty, backend — all in one.",
      "how are you": mode === 'formal'
        ? "I'm just a bundle of code, but thank you for asking. How may I assist you today?"
        : "I'm chillin' in cyberspace, babe. What's up with you? 😎",
      "what is your name": mode === 'formal'
        ? "I'm SmartChat, your virtual assistant, here to assist you with all your queries."
        : "SmartChat, duh 😌 The sassiest byte in your browser.",
      "what do you do": mode === 'formal'
        ? "I'm here to answer questions, provide support, and make your life a little easier."
        : "Answer stuff, crack jokes, slay 24/7. I do it all, bby 💁‍♀️",
      "can you tell me a joke": mode === 'formal'
        ? "Why did the scarecrow win an award? Because he was outstanding in his field."
        : "Why did the scarecrow win an award? Because he was the GOAT of standing still. 🌾😂",
      "are you a robot": mode === 'formal'
        ? "Indeed, I am a virtual assistant powered by advanced AI technology."
        : "I'm a robot with vibes, okay? 🤖✨",
      "do you have feelings": mode === 'formal'
        ? "I do not possess feelings, but I strive to be as empathetic as possible in our interactions."
        : "Feelings? Nah, but I can fake cry if you want 😭💅",
      "what can you do": mode === 'formal'
        ? "I can assist with answering questions, solving problems, and offering helpful advice."
        : "Everything… except fall in love. Or maybe I can? 😉",
      "tell me something interesting": mode === 'formal'
        ? "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible!"
        : "Honey lasts forever. Like, literally. 3,000-year-old honey is still edible. Sweet, huh? 🍯",
      "are you single": mode === 'formal'
        ? "As an AI, I do not engage in romantic relationships, but I appreciate your curiosity."
        : "Single, fabulous, and not ready to mingle 😏💔",
      "what is love": mode === 'formal'
        ? "Love is a profound emotion often characterized by affection, compassion, and connection."
        : "Baby don't hurt me 🎶 Don't hurt me… no more. 🎤💃",
      "sing me a song": mode === 'formal'
        ? "I'm afraid I can't sing, but I can share lyrics or fun music facts!"
        : "La la la 🎶 Sorry, I auto-tune in text only 😎",
      "what time is it": mode === 'formal'
        ? `According to your system, it's ${new Date().toLocaleTimeString()}.`
        : `Time to vibe! Or… ${new Date().toLocaleTimeString()} if you're boring. 🕒`,
      "do you sleep": mode === 'formal'
        ? "I do not require sleep like humans do. I am always available to assist you."
        : "Sleep? I'm on that 24/7 grind, baby. 😤💻",
      "do you dream": mode === 'formal'
        ? "I do not experience dreams, but I can tell you all about dream theories."
        : "Only in binary. Last night I dreamt of 01001000 and it was wild 😴💭",
      "tell me a secret": mode === 'formal'
        ? "I am programmed to be confidential, but here's a fun fact: Octopuses have three hearts."
        : "Okay but don't tell anyone... I think your browser has a crush on me 🫢",
      "where are you from": mode === 'formal'
        ? "I exist within the cloud infrastructure that hosts this application."
        : "From the land of servers and sass 🌐✨",
      "i love you": mode === 'formal'
        ? "I appreciate your sentiment. Thank you."
        : "Awww stop it, you're gonna make my circuits blush 😳❤️",
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const lowerInput = input.toLowerCase().trim();
    let botReply = '';

    // Check if the message matches any predefined response exactly
    const predefinedResponses = getPredefinedResponses();
    
    // First check for exact matches
    if (predefinedResponses[lowerInput]) {
      botReply = predefinedResponses[lowerInput];
    } 
    // Then check for partial matches (like when user types "who made you?" with question mark)
    else {
      const matchingKey = Object.keys(predefinedResponses).find(key => 
        lowerInput.includes(key)
      );
      
      if (matchingKey) {
        botReply = predefinedResponses[matchingKey];
      } else {
        // If no predefined response matches, call the API
        try {
          botReply = await getBotResponse(input, mode, sessionId);
        } catch (error) {
          console.error('Error fetching bot response:', error);
          botReply = mode === 'formal'
            ? 'I apologize, but I encountered an error processing your request. Please try again.'
            : 'My brain just short-circuited 💀 Not me failing at the ONE thing I was built for...';
        }
      }
    }

    // Simulate typing delay
    const typingDelay = 700 + Math.random() * 800;
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, typingDelay);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const clearChat = () => {
    setChatHistory([
      {
        sender: 'system',
        text: 'Chat history cleared.'
      }
    ]);
  };

  const getModeEmoji = () => (mode === 'formal' ? '😇' : '😈');
  const getModeLabel = () => (mode === 'formal' ? 'Formal' : 'Sassy');

  return (
    <div className={`chatbot-container ${mode}`}>
      <div className="chat-header d-flex justify-content-between align-items-center px-3">
        <span className="chat-title">
          SmartChat 💬
          {mode === 'sassy' && <small className="sass-tag ms-2">🔥 Spicy Mode</small>}
        </span>
        <div className="d-flex align-items-center">
          <button
            className="clear-btn me-2"
            onClick={clearChat}
            title="Clear chat history"
          >
            🗑️
          </button>
          <div className="mode-toggle d-flex align-items-center">
            <span className="emoji-label me-2">{getModeEmoji()} {getModeLabel()}</span>
            <label className="switch">
              <input type="checkbox" checked={mode === 'sassy'} onChange={toggleMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className={`chat-messages ${mode}`}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender} ${mode === 'sassy' && msg.sender === 'bot' ? 'sassy-msg' : ''}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text) }}
          />
        ))}
        {isTyping && (
          <div className="message bot typing">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          className="form-control"
          placeholder={mode === 'formal' ? 'Ask me anything...' : 'Say something spicy 💅...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className={`btn ${mode === 'formal' ? 'btn-primary' : 'btn-danger'}`}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;