// botservices.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/bot'; // Define your API base URL

export const getBotResponse = async (message, mode, sessionId) => {
  try {
    // Make sure mode is valid
    const validMode = ['formal', 'sassy'].includes(mode) ? mode : 'formal';

    // Call the correct endpoint with proper parameters
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message,
      personality: validMode, // Changed from mode to personality to match backend
      sessionId: sessionId, // Include sessionId in the request
    });

    // Return the message from the API (not reply)
    return response.data.message; // Changed from reply to message
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