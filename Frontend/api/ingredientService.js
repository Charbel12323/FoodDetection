// services/ingredientService.js
import { baseURL } from "@/utilities/constants";


const BASE_URL = baseURL;

// Upload Base64 image to the server/OpenAI
export async function uploadBase64(photoBase64) {
  try {
    const response = await fetch(`${BASE_URL}/api/upload-base64`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        photo: photoBase64.replace(/^data:image\/\w+;base64,/, '')
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Image upload failed');
    }
    return data;
  } catch (error) {
    console.error('Error uploading base64 image:', error);
    throw error;
  }
}

// Save identified ingredients to the user’s account
export async function saveIngredients(userId, ingredients) {
  try {
    const response = await fetch(`${BASE_URL}/api/addIngredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ingredients }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save ingredients');
    }
    return data;
  } catch (error) {
    console.error('Error saving ingredients:', error);
    throw error;
  }
}




export async function getIngredients(userId) {
  const response = await fetch(`${BASE_URL}/api/getIngredients?userId=${userId}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch ingredients');
  }
    console.log("ingredients data from backend:", data);
    return data.ingredients || [];
}

