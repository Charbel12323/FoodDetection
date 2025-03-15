import { baseURL } from '@/utilities/constants'; // your backend URL

export const generateRecipes = async (ingredients) => {
  try {
    const response = await fetch(`${baseURL}/api/generate-recipes`, {
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
    const response = await fetch(`${baseURL}/api/favorites`, {
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
