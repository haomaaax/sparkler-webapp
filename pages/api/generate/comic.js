import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Illustration of the storyline, focus on the character and scenario, vibrant colors.

Storyline: 
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createImage({
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    n: 1,
    size: '512x512'
  });
  const basePromptOutput = baseCompletion.data.data[0]

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;