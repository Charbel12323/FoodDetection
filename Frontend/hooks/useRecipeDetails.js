// hooks/useRecipeDetails.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUserStore } from '@/stores/useUserStore'; // ✅ your user state
import { addRecipe } from '@/api/recipeService'; // ✅ the addRecipe API

export const useRecipeDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { recipe: recipeParam } = params; // recipe param comes as a string

  const userId = useUserStore((state) => state.user?.user_id);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);

  // New states for cooking flow
  const [isCooking, setIsCooking] = useState(false);
  const [isCooked, setIsCooked] = useState(false);

  // ✅ Handle "Favorite" logic (uses cook functionality here optionally)
  const handleFavorite = async () => {
    if (isFavorite) {
      Alert.alert('Info', 'This recipe is already favorited!');
      return;
    }

    try {
      setIsFavorite(true);
      // You can call handleCook here if you want favorites to also save the recipe
      await handleCook();
    } catch (error) {
      console.error('Error favoriting recipe:', error);
      setIsFavorite(false);
    }
  };

  const handleCook = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }
    if (isFavorite) {
      Alert.alert('Info', 'Recipe is already favorited!');
      return;
    }

    try {
      setIsCooking(true);

      await addRecipe({
        user_id: userId,
        name: recipe.name,
        cookingTime: recipe.cookingTime || '30 minutes',
        difficulty: recipe.difficulty || 'Easy',
        servings: recipe.servings || 1,
        nutrition: recipe.nutrition || {},
        instructions: recipe.instructions,
        ingredients: recipe.ingredients || [],
      });

      setIsFavorite(true); // ✅ This toggles the style when recipe is favorited
      Alert.alert('Success', 'Recipe added to favorites!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add recipe.');
      console.error('handleCook error:', error);
    } finally {
      setIsCooking(false);
    }
  };

  // ✅ Load recipe data from params
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

  return {
    recipe,
    loading,
    activeTab,
    setActiveTab,
    isFavorite,
    isCooking,
    isCooked,
    handleFavorite,
    handleCook,
  };
};
