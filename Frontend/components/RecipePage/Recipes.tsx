import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUserStore } from '@/stores/useUserStore';
import { getRecipes } from '@/api/recipeService';
import RecipeCard from '@/components/RecipePage/RecipeCard';
import { useRouter } from 'expo-router';
import styles from '@/styles/RecipePageStyle';
import BookLoader from '@/components/RecipePage/BookLoader';

// Ensure COLORS is correctly imported or defined
const COLORS = {
  accent: '#FF5733', // Replace with actual color from styles if defined
  text: '#333333',
};

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // userId might be undefined while loading, null if not logged in
  const userId = useUserStore((state) => state.user?.user_id);
  const router = useRouter();

  useEffect(() => {
    if (userId === undefined) return;

    if (!userId) {
      setTimeout(() => {
        router.replace('/(preLogin)/login');
      }, 0);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(userId);
        if (data?.recipes) {
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

  if (userId === undefined || loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <BookLoader message="Loading recipes..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Saved Recipes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.recipeList || { paddingBottom: 20 }}>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} showCookButton={false} showfav={false}/>
          ))
        ) : (
          <Text style={styles.noRecipesText}>No recipes found.</Text>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

export default RecipesPage;
