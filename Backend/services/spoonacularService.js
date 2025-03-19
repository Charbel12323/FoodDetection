const axios = require('axios');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

async function fetchRecipeImage(recipeName) {
  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          query: recipeName,
          number: 1,
        },
      }
    );

    const results = response.data.results;

    if (results && results.length > 0) {
      return results[0].image; // ✅ The image URL
    }

    return null;
  } catch (error) {
    console.error('Error fetching recipe image from Spoonacular:', error);
    return null;
  }
}

module.exports = { fetchRecipeImage };
