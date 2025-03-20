// hooks/useRecipeSuggestions.ts
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { getIngredients } from '@/api/ingredientService';
import { generateRecipes } from '@/api/recipeService';
import { useUserStore } from '@/stores/useUserStore';

export const useRecipeSuggestions = () => {
  const router = useRouter();
  const userId = useUserStore(state => state.user?.user_id);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnCount, setColumnCount] = useState(1);

  // Determine number of columns based on window width
  useEffect(() => {
    const determineColumns = (width: number) => {
      if (width >= 1200) return 3;
      if (width >= 800) return 2;
      return 1;
    };

    const { width } = Dimensions.get('window');
    setColumnCount(determineColumns(width));

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setColumnCount(determineColumns(window.width));
    });

    return () => subscription?.remove();
  }, []);

  // Fetch recipes from your API endpoints
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        if (!userId) {
          console.warn('User not logged in, redirecting...');
          router.replace('/(preLogin)/login');
          return;
        }

        const ingredientsData = await getIngredients(userId);
        console.log('✅ ingredientsData =>', ingredientsData);

        if (!ingredientsData || ingredientsData.length === 0) {
          alert('No ingredients found. Please scan items first!');
          router.replace('/(MainPage)/Scanner');
          return;
        }

        const recipesResponse = await generateRecipes(ingredientsData);
        console.log('✅ recipesResponse =>', recipesResponse);

        if (recipesResponse?.recipes?.length > 0) {
          setRecipes(recipesResponse.recipes);
          console.log('✅ Recipes loaded:', recipesResponse.recipes);
        } else {
          console.warn('⚠️ No recipes returned.');
        }
      } catch (error) {
        console.error('❌ Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [userId]);

  return { recipes, loading, columnCount };
};
