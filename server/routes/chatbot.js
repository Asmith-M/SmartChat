const express = require('express');
const router = express.Router();
const { chatWithBot } = require('../controllers/chatbotController');

router.post('/ask', chatWithBot);

module.exports = router;
