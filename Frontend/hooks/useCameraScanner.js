
import { useState, useRef } from 'react';
import { uploadBase64, saveIngredients } from '@/api/ingredientService';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'expo-router';

export default function useCameraScanner() {
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const userId = useUserStore(state => state.user?.user_id);
  const router = useRouter();

  console.log(userId);


  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
  
    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log('Photo taken:', photo);
  
      const result = await uploadBase64(photo.base64);
      console.log('Scan result:', result);
  
      // 1) If the response is wrapped in `result.data` with an `ingredients` array
      if (result.data && result.data.ingredients) {
        setGptResponse(result.data);
  
      // 2) If the top-level `result` itself has an `ingredients` array
      } else if (result.ingredients) {
        setGptResponse(result);
  
      // 3) If the JSON string is in `result.message.content`
      } else if (result.message && result.message.content) {
        const rawResponse = result.message.content;
        try {
          const parsedResponse = JSON.parse(rawResponse);
          setGptResponse(parsedResponse);
        } catch (error) {
          console.error('Error parsing GPT response as JSON:', error);
        }
  
      // 4) If none of the above conditions match
      } else {
        console.error('Unexpected response format:', result);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleApprove = async () => {
    if (!gptResponse || !gptResponse.ingredients) return;
    try {
      // For demonstration, the userId is hardcoded.
      const response = await saveIngredients(userId, gptResponse.ingredients);
      console.log('Ingredients saved:', response);
      alert('Ingredients approved and saved!');
      router.push('/(MainPage)/RecipeSuggestions'); 
    } catch (error) {
      alert('Error saving ingredients');
      console.error('Error approving ingredients:', error);
    }
  };

  const handleDeleteIngredient = (index) => {
    setGptResponse(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  return {
    cameraRef,
    loading,
    gptResponse,
    setGptResponse,
    handleTakePicture,
    handleApprove,
    handleDeleteIngredient,
  };
}
