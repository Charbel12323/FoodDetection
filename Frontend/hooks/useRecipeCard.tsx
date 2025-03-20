import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { addRecipe } from '@/api/recipeService';
import { useUserStore } from '@/stores/useUserStore';

export function useRecipeCard(recipe: any) {
  const router = useRouter();
  const userId = useUserStore((state) => state.user?.user_id);

  const [isCooking, setIsCooking] = useState(false);
  const [isCooked, setIsCooked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    router.push({
      pathname: '/(RecipePage)/RecipeDetails',
      params: { recipe: JSON.stringify(recipe) },
    });
  };

  const handleCook = async () => {
    if (!userId) {
      Alert.alert("Error", "User not logged in.");
      return;
    }
    if (isCooked) return; // prevent re-cooking

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
      setIsCooked(true);
      Alert.alert("Success", "Recipe added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add recipe.");
    } finally {
      setIsCooking(false);
    }
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      Alert.alert("Info", "This recipe is already favorited!");
      return;
    }

    try {
      setIsFavorite(true);
      // You can decide if favoriting should have its own API call,
      // or just re-use the cooking logic as shown here.
      await handleCook();
    } catch (error) {
      setIsFavorite(false);
    }
  };

  return { isCooking, isCooked, isFavorite, handlePress, handleCook, handleFavorite };
}
