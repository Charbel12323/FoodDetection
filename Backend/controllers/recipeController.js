// backend/controllers/recipeController.js
const recipeService = require('../services/recipeService');

exports.addRecipe = async (req, res) => {
  try {
    const { user_id, name, cookingTime, difficulty, servings, nutrition, instructions, ingredients } = req.body;

    // Basic validation – you may expand this as needed
    if (!user_id || !name || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Invalid recipe data' });
    }

    const newRecipe = await recipeService.addRecipe({
      user_id,
      name,
      cookingTime,
      difficulty,
      servings,
      nutrition,       // expected to be sent as an object (will be stored as JSONB)
      instructions,
      ingredients,
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    return res.status(500).json({ error: 'Failed to add recipe' });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    // In this example, we get the user_id from the query parameters
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }
    const recipes = await recipeService.getRecipes(user_id);
    return res.status(200).json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};
