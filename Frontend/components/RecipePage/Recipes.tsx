import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import RecipeCard from '@/components/RecipePage/RecipeCard';
import { useUserStore } from '@/stores/useUserStore';
import styles from "@/styles/RecipePageStyle";
import useRecipes from '@/hooks/useRecipes';
import BookLoader from '@/components/RecipePage/BookLoader'; // import loader

export default function RecipesPage() {
  const { recipes, loading } = useRecipes();
  const userId = useUserStore((state) => state.user?.user_id);

  if (userId === undefined || loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <BookLoader message="Loading Recipes..." />
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
