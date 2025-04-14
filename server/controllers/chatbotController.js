// server/controllers/chatbotController.js
const axios = require('axios');
require('dotenv').config(); // Load .env variables

const chatWithBot = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      { inputs: { text: userMessage } },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botReply = response.data.generated_text || "Oops, my sarcasm circuits are overheating!";
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error talking to Hugging Face:', error.message);
    res.status(500).json({ reply: "I'm having a sarcastic meltdown. Try again later!" });
  }
};

module.exports = { chatWithBot };
