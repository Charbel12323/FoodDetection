// Example useRecipes hook
import { useState, useEffect } from 'react';
import { getRecipes } from '@/api/recipeService';
import { useUserStore } from '@/stores/useUserStore';

export default function useRecipes() {
  const userId = useUserStore(state => state.user?.user_id);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(userId);
        setRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [userId]);

  return { recipes, loading };
}
