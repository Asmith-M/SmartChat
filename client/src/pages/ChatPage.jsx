import React, { useState, useEffect, useRef } from 'react';
import { getBotResponse } from '../services/api';
import { SendIcon } from '../components/icons';
import DOMPurify from 'dompurify';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('formal');
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const chatEndRef = useRef(null);

  // Generate session ID only once
  const generateSessionId = () => (
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );

  // On mount: Clear previous chat and session to start fresh on app load
  useEffect(() => {
    // Clear previous chat history and sessionId from localStorage
    localStorage.removeItem('smartchat_history');
    localStorage.removeItem('smartchat_session');

    const savedMode = localStorage.getItem('smartchat_mode') || 'formal';

    setChatHistory([{
      sender: 'bot',
      text: savedMode === 'formal'
        ? 'Welcome to SmartChat! How can I assist you today?'
        : 'Sup bestie! Ready to chat with the sassiest bot alive? 💅'
    }]);

    setMode(savedMode);
    setSessionId(generateSessionId());
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
    const responses = {
      formal: {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hi there! What can I assist you with?',
        'how are you': 'I\'m doing well, thank you for asking. How can I help you?',
        'bye': 'Goodbye! Have a great day.',
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Is there anything else I can help you with?',
      },
      sassy: {
        'hello': 'Well hello there, gorgeous! 💅 What\'s the tea?',
        'hi': 'Hey bestie! 💖 What\'s popping?',
        'how are you': 'I\'m fabulous, darling! And you?',
        'bye': 'Bye felicia! 👋 Don\'t forget to slay!',
        'thanks': 'No prob, boo! 😘',
        'thank you': 'You\'re welcome, honey! 💋',
      }
    };
    return responses[mode] || responses.formal;
  };

  const validateInput = (message) => {
    if (!message || message.trim().length === 0) {
      return 'Please enter a message.';
    }
    if (message.length > 1000) {
      return 'Message is too long. Please keep it under 1000 characters.';
    }
    return null;
  };

  const handleSend = async () => {
    const message = input.trim();
    const validationError = validateInput(message);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Check for predefined responses first
      const predefined = getPredefinedResponses();
      const lowerMessage = message.toLowerCase();
      let botResponse = null;

      for (const [key, response] of Object.entries(predefined)) {
        if (lowerMessage.includes(key)) {
          botResponse = response;
          break;
        }
      }

      if (!botResponse) {
        // Call API if no predefined response
        botResponse = await getBotResponse(message, mode, sessionId);
      }

      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setRetryCount(0);
    } catch (err) {
      console.error('Error in handleSend:', err);
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => handleSend(), 1000 * retryCount);
      } else {
        const errorMessage = mode === 'sassy'
          ? "Ugh, I crashed 💀 Not me having a mental breakdown in the middle of our convo. Try again?"
          : "I apologize, but I encountered an error processing your request. Please try again later.";
        setChatHistory(prev => [...prev, { sender: 'bot', text: errorMessage }]);
        setRetryCount(0);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setChatHistory([
      {
        sender: 'system',
        text: 'Chat history cleared.'
      }
    ]);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>New Conversation</h1>
        <div className="mode-toggle">
          <label className="switch">
            <input type="checkbox" checked={mode === 'sassy'} onChange={toggleMode} />
            <span className="slider round"></span>
          </label>
          <span className="mode-label">{mode === 'formal' ? 'Formal' : 'Sassy'}</span>
        </div>
      </div>

      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
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
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={mode === 'formal' ? 'Ask me anything...' : 'Say something spicy 💅...'}
          rows="1"
        />
        <button onClick={handleSend} disabled={!input.trim()}>
          <SendIcon />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
