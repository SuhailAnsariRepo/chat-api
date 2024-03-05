const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/complete_chat', chatController.completeChat);

module.exports = router;
