
import { useState, useRef } from 'react';
import { uploadBase64, saveIngredients } from '@/api/ingredientService';
import { useUserStore } from '@/stores/useUserStore';

export default function useCameraScanner() {
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const userId = useUserStore(state => state.user?.user_id);

  console.log(userId);


  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log('Photo taken:', photo);

      const result = await uploadBase64(photo.base64);
      console.log('Scan result:', result);

      if (result.data && result.data.ingredients) {
        setGptResponse(result.data);
      } else if (result.ingredients) {
        setGptResponse(result);
      } else if (result.message && result.message.content) {
        const rawResponse = result.message.content;
        try {
          const parsedResponse = JSON.parse(rawResponse);
          setGptResponse(parsedResponse);
        } catch (error) {
          console.error('Error parsing GPT response as JSON:', error);
        }
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
