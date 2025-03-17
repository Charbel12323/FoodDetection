// src/pages/(MainPage)/Recipes.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useUserStore } from '@/stores/useUserStore';
import { getRecipes } from '@/api/recipeService';
import RecipeCard from '@/components/RecipeCard';
import { useRouter } from 'expo-router';
import styles from "@/styles/RecipePageStyle";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // userId might be undefined while loading, null if not logged in
  const userId = useUserStore((state) => state.user?.user_id);
  const router = useRouter();

  useEffect(() => {
    // Wait until user data is loaded
    if (userId === undefined) return;

    // If no user is logged in, delay navigation to allow Root Layout to mount
    if (!userId) {
      setTimeout(() => {
        router.replace('/(preLogin)/login');
      }, 0);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(userId);
        // Assuming your backend returns { recipes: [...] }
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

  // If user data is still loading or recipes are being fetched, show a loader
  if (userId === undefined || loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Recipes</Text>
      </View>
      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You have no recipes yet.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollArea}>
          {recipes.map((recipe, index) => (
            // We pass showCookButton={false} so the Cook button is hidden on this page.
            <RecipeCard key={index} recipe={recipe} showCookButton={false} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
