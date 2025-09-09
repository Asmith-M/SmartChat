import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

export const chatWithBot = async (req, res) => {
  const { message, personality = 'formal' } = req.body;

  try {
    // Log received payload
    console.log('chatWithBot Controller Payload:', { message, personality });

    // Validate message
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Invalid or empty message' });
    }

    // Construct system message based on personality
    let systemMessage = '';
    if (personality === 'sassy') {
      systemMessage = 'You are a sassy, edgy AI assistant. Respond with attitude and slang.';
    } else if (personality === 'spicy') {
      systemMessage = 'You are a spicy, bold AI assistant. Add humor and boldness to your responses.';
    } else {
      systemMessage = 'You are a helpful, professional AI assistant.';
    }

    // Prepare OpenRouter API request payload
    const requestBody = {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 250,
      temperature: personality === 'sassy' || personality === 'spicy' ? 0.9 : 0.7,
      top_p: 0.9
    };

    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://smartchat-seven.vercel.app',
          'X-Title': 'SmartChat'
        },
      }
    );

    // Extract generated text from OpenRouter response
    let botReply = response.data.choices[0]?.message?.content || "Oops, my circuits are overheating!";

    // Clean up response
    botReply = botReply.replace(/^(Assistant:|Bot:|AI:)\s*/i, '');

    res.json({ success: true, message: botReply });

  } catch (error) {
    console.error('Error talking to OpenRouter:', error.message);
    res.status(500).json({ success: false, error: "I'm having a meltdown. Try again later!" });
  }
};
