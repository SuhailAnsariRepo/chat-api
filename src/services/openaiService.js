const { OpenAI } = require('openai');
const dotenv = require('dotenv')
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function generateResponse(partial_text) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: partial_text,
        },
      ],
    });

    return completion.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}

module.exports = {
  generateResponse,
};
