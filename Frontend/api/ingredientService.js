// services/ingredientService.js




const BASE_URL = "http://localhost:3000";

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


export async function deleteIngredient(userId, ingredient) {
  try {
    const response = await fetch(`${BASE_URL}/api/deleteIngredient`, {
      method: 'POST', // or 'DELETE' if you prefer and update your backend accordingly
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ingredient }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete ingredient');
    }
    return data;
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    throw error;
  }
}
export const updateIngredient = async (userId, originalName, updatedIngredient) => {
  try {
    // First, delete the original ingredient
    await deleteIngredient(userId, originalName);
    
    // Then, add the updated ingredient with the new details
    // You'll need to implement this part based on how you're adding ingredients
    // This is a placeholder implementation
    const response = await fetch(`/api/users/${userId}/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: updatedIngredient.name,
        // Add any other properties you want to save
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update ingredient');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating ingredient:', error);
    throw error;
  }
};