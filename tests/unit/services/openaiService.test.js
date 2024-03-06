const openaiService = require('../../../src/services/openaiService');

describe('openaiService', () => {
    test('generateResponse should return a response', async () => {
        const partialText = 'What is OpenAI?';
        const response = await openaiService.generateResponse(partialText);

        // Ensure response.choices is defined and non-empty
        if (!response.choices || response.choices.length === 0) {
            console.error('Unexpected response format from OpenAI API:', response);
            throw new Error('Unexpected response format from OpenAI API');
        }

        // Extract text from the OpenAI API response
        const generatedText = response.choices[0]?.message?.content;

        // Ensure generatedText is defined
        if (generatedText === undefined) {
            console.error('Unexpected response format from OpenAI API:', response);
            throw new Error('Unexpected response format from OpenAI API');
        }

        console.log('Generated Text:', generatedText);
        expect(generatedText).toEqual(expect.any(String));
    });
});
