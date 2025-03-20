// hooks/useRecipeDetails.ts
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

export const useRecipeDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { recipe: recipeParam } = params; // recipe param comes as a string

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(prev => !prev);
    // Here you would implement your favorite logic with your backend
  };

  useEffect(() => {
    if (!recipeParam) {
      console.warn('❌ No recipe param received!');
      alert('No recipe found!');
      router.back();
      return;
    }

    try {
      const parsedRecipe = JSON.parse(recipeParam);
      console.log('✅ Parsed recipe:', parsedRecipe);
      setRecipe(parsedRecipe);
    } catch (error) {
      console.error('❌ Failed to parse recipe param:', error);
      alert('Recipe data corrupted!');
      router.back();
    } finally {
      setLoading(false);
    }
  }, [recipeParam]);

  return { recipe, loading, activeTab, setActiveTab, isFavorite, handleFavorite };
};
