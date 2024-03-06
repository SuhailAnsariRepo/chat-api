const request = require('supertest');
const app = require('../../src/server');

beforeAll(async () => {
    // Setup code, if needed
});

afterAll(async () => {
    await app.close();
});

describe('Chat API', () => {
    test('POST /api/complete_chat should return a valid response', async () => {
        const response = await request(app)
            .post('/api/complete_chat')
            .send({ partial_text: 'What is OpenAI?' });

        expect(response.status).toBe(200);
        expect(response.body.completed_text.choices[0].message.content).toEqual(expect.any(String));
    });

    test('POST /api/complete_chat should handle invalid input', async () => {
        const response = await request(app)
            .post('/api/complete_chat')
            .send({ partial_text: '' });

        expect(response.status).toBe(400);
        expect(response.body.error).toEqual("Invalid input. 'partial_text' is required.");
    });
});
