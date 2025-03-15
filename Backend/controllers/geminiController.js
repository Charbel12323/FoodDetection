// backend/controllers/geminiController.js

const { generateRecipes } = require('../services/geminiService');

/**
 * getRecipes
 * Controller to handle POST requests for recipe generation.
 * Expects JSON body: { ingredients: string[] }
 */
exports.getRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;

    // Validate input
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: "Invalid input: 'ingredients' must be a non-empty array.",
      });
    }

    // Call our gemini service
    const data = await generateRecipes(ingredients);

    // Return the data in the response
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in getRecipes controller:", error);
    return res.status(500).json({ error: "Failed to generate recipes" });
  }
};
