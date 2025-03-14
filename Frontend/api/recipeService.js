import { baseURL } from "@/utilities/constants";

// API call to backend Gemini recipe generator
export async function generateRecipes(ingredients) {
  try {
    const response = await fetch(`${baseURL}/api/generate-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json(); // JSON already parsed!

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate recipes');
    }

    return data; // this is your { recipes: [...] }
  } catch (error) {
    console.error('Error in recipeService generateRecipes:', error);
    throw error;
  }
}
