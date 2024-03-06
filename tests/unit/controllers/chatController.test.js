const chatController = require('../../../src/controllers/chatController');

describe('chatController', () => {
    test('completeChat should handle valid input', async () => {
        const req = { body: { partial_text: 'What is OpenAI?' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await chatController.completeChat(req, res);

        // Update the expectation to match the structure of OpenAI API response
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            completed_text: expect.objectContaining({
                choices: expect.any(Array),
                created: expect.any(Number),
                id: expect.any(String),
                model: expect.any(String),
                // Add more properties as needed
            }),
        });
    });

    test('completeChat should handle invalid input', async () => {
        const req = { body: { partial_text: '' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await chatController.completeChat(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid input. 'partial_text' is required." });
    });

    test('completeChat should handle errors', async () => {
        const req = { body: { partial_text: 'What is OpenAI?' } };
        const res = { status: jest.fn(), json: jest.fn() };

        // Mocking an error in your controller logic
        jest.spyOn(chatController, 'completeChat').mockImplementation(() => {
            throw new Error('Some error occurred');
        });

        await chatController.completeChat(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Some error occurred' });
    });
});