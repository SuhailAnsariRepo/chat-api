const openaiService = require('../services/openaiService');

async function completeChat(req, res) {
    try {
        const { partial_text } = req.body;

        if (!partial_text) {
            return res.status(400).json({ error: "Invalid input. 'partial_text' is required." });
        }

        const completedText = await openaiService.generateResponse(partial_text);

        res.status(200).json({ completed_text: completedText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    completeChat,
};
