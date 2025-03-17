// src/hooks/useRecipes.ts
import { useState, useEffect } from 'react';
import { getRecipes } from '@/api/recipeService';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'expo-router';

interface RecipesHook {
  recipes: any[];
  loading: boolean;
}

export default function useRecipes(): RecipesHook {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useUserStore((state) => state.user?.user_id);
  const router = useRouter();

  useEffect(() => {
    // Wait until user data is loaded
    if (userId === undefined) return;

    // If no user is logged in, redirect to login
    if (!userId) {
      setTimeout(() => {
        router.replace('/(preLogin)/login');
      }, 0);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(userId);
        if (data.recipes) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [userId, router]);

  return { recipes, loading };
}
