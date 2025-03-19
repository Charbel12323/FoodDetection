const BASE_URL = "http://10.13.151.142:3000"; 

export const generateRecipes = async (ingredients) => {
  try {
    const response = await fetch(`${BASE_URL}/api/generate-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate recipes');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw error;
  }
};

export const saveRecipeToFavorites = async (userId, recipe) => {
  try {
    const response = await fetch(`${BASE_URL}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, recipe }),
    });

    if (!response.ok) {
      throw new Error('Failed to save recipe to favorites');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving recipe to favorites:', error);
    throw error;
  }
};

// New function: Add a recipe to the database
export const addRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

// New function: Get recipes for a specific user
export const getRecipes = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/recipes?user_id=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
