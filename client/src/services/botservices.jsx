// botservices.jsx
import axios from 'axios';

const API_BASE_URL = 'https://smartchat-syem.onrender.com'; // Define your API base URL

export const getBotResponse = async (message, mode, sessionId) => {
  try {
    // Ensure mode is valid
    const validMode = ['formal', 'sassy'].includes(mode) ? mode : 'formal';

    // Call the correct endpoint with proper parameters
    const response = await axios.post(`${API_BASE_URL}/api/bot/chat`, {
      message,
      personality: validMode,
      sessionId: sessionId,
    });

    // Return the message from the API (not reply)
    return response.data.message;
  } catch (error) {
    console.error('Error fetching bot response:', error);

    // Return appropriate error message based on mode
    if (mode === 'sassy') {
      return "Ugh, I crashed 💀 Not me having a mental breakdown in the middle of our convo. Try again?";
    } else {
      return "I apologize, but I encountered an error processing your request. Please try again later.";
    }
  }
};
