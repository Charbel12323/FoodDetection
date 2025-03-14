// controllers/openaiController.js

// Import OpenAI SDK
const OpenAI = require('openai');

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Toggle between using mock data or OpenAI GPT responses
const USE_MOCK = process.env.USE_MOCK === 'true';

/**
 * Real GPT-4o implementation (use when API key is available)
 * @param {string} photo - Base64 encoded photo string
 * @returns {Promise<Object>} - GPT-4o API response
 */
const analyzeImageWithGPT = async (photo) => {
  const dataUrl = `data:image/jpeg;base64,${photo}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Identify food ingredients from an image and return only a structured JSON object.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "List all food ingredients visible in this image as a JSON object." },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      },
    ],
    response_format: { type: "json_object" },
    store: true,
  });

  return response.choices[0];
};

/**
 * Helper function to return a randomized set of ingredients for testing purposes.
 * @returns {Array<string>} - List of mock ingredients
 */
const getRandomIngredients = () => {
  const fridgeData = [
    ['chicken', 'tomatoes', 'garlic', 'spinach'],
    ['beef', 'potatoes', 'carrots', 'onions'],
    ['tofu', 'broccoli', 'bell peppers', 'soy sauce'],
    ['fish', 'lemon', 'dill', 'zucchini'],
    ['eggs', 'cheese', 'milk', 'bread'],
    ['mushrooms', 'pasta', 'parmesan', 'cream'],
    ['shrimp', 'rice', 'peas', 'corn'],
    ['lentils', 'cucumber', 'feta', 'olive oil'],
    ['bacon', 'lettuce', 'tomato', 'mayo'],
    ['sweet potatoes', 'black beans', 'avocado', 'lime'],
  ];

  const randomIndex = Math.floor(Math.random() * fridgeData.length);
  return fridgeData[randomIndex];
};

/**
 * Unified controller function for handling analyzeImage requests.
 * Decides between mock data and real GPT-4o integration based on USE_MOCK flag.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.analyzeImage = async (req, res) => {
  try {
    // Handle mock data scenario
    if (USE_MOCK) {
      const ingredients = getRandomIngredients();

      return res.json({
        ingredients,
        source: 'mock',
      });
    }

    // If not mock, proceed with GPT-4o analysis
    const { photo } = req.body;

    if (!photo) {
      return res.status(400).json({ error: 'No photo provided.' });
    }

    const gptResponse = await analyzeImageWithGPT(photo);

    return res.json({
      data: gptResponse,
      source: 'gpt',
    });

  } catch (error) {
    console.error("Error processing analyzeImage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
