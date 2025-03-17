// src/pages/(MainPage)/Recipes.tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import RecipeCard from '@/components/RecipePage/RecipeCard';
import { useUserStore } from '@/stores/useUserStore'; // if needed elsewhere in this file
import { useRouter } from 'expo-router'; // if needed elsewhere in this file
import styles from "@/styles/RecipePageStyle";
import useRecipes from '@/hooks/useRecipes';

export default function RecipesPage() {
  const { recipes, loading } = useRecipes();
  const userId = useUserStore((state) => state.user?.user_id);

  // Show a loader if user data is still loading or recipes are being fetched.
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
            <RecipeCard key={index} recipe={recipe} showCookButton={false} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
