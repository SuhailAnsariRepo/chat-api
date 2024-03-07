const openaiService = require('../services/openaiService');

async function completeChat(req, res) {
    try {
        const { partial_text } = req.body;

        // Validate input
        if (!partial_text) {
            res.status(400).json({ error: "Invalid input. 'partial_text' is required." });
            return;
        }

        // Your existing code for generating the completed text
        const completedText = await openaiService.generateResponse(partial_text);
        const generatedText = completedText.choices[0]?.message?.content;
        
        // Send the completed text as a JSON response
        res.status(200).json({ completed_text: generatedText });
    } catch (error) {
        // Handle errors and send a 500 status with an error message
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    completeChat,
};
