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

    // Construct prompt based on personality
    let prompt = '';
    if (personality === 'sassy') {
      prompt = `You are a sassy, edgy AI assistant. Respond with attitude and slang.\nUser: ${message}`;
    } else if (personality === 'spicy') {
      prompt = `You are a spicy, bold AI assistant. Add humor and boldness.\nUser: ${message}`;
    } else {
      prompt = `You are a helpful, professional AI assistant.\nUser: ${message}`;
    }

    // Call Hugging Face API with consistent model
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: personality === 'sassy' || personality === 'spicy' ? 0.9 : 0.7,
          top_p: 0.9,
          do_sample: true
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract generated text
    let botReply = response.data[0]?.generated_text || "Oops, my circuits are overheating!";

    // Clean up response
    botReply = botReply.replace(/^(Assistant:|Bot:|AI:)\s*/i, '');

    res.json({ success: true, message: botReply });

  } catch (error) {
    console.error('Error talking to Hugging Face:', error.message);
    res.status(500).json({ success: false, error: "I'm having a meltdown. Try again later!" });
  }
};
