import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import RecipeCard from '@/components/RecipePage/RecipeCard';
import { useRecipeSuggestions } from '@/hooks/useRecipeSuggestions';
import { baseStyles, layoutStyles } from '@/styles/RecipeSuggestions';
import BookLoader from '@/components/RecipePage/BookLoader'; // import loader

export default function RecipeSuggestions() {
  const router = useRouter();
  const { recipes, loading, columnCount } = useRecipeSuggestions();

  if (loading) {
    return (
      <SafeAreaView style={baseStyles.safeArea}>
        <View style={baseStyles.loadingContainer}>
          <BookLoader message="Loading recipes..." />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={baseStyles.safeArea}>
      <View style={baseStyles.container}>
        <View style={baseStyles.header}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push('/(MainPage)/MainPage')}
            style={baseStyles.backButton}
          >
            <Text style={baseStyles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <Text style={baseStyles.title}>Recipes Found</Text>

          <TouchableOpacity
            style={baseStyles.button}
            onPress={() => router.push('/(MainPage)/Scanner')}
          >
            <Text style={baseStyles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={baseStyles.scrollArea}>
          {recipes.length === 0 ? (
            <Text style={baseStyles.noRecipesText}>
              No recipes found with your ingredients.
            </Text>
          ) : (
            <View style={layoutStyles.grid}>
              {recipes.map((recipe, index) => (
                <View
                  key={index}
                  style={[
                    layoutStyles.cardContainer,
                    { width: `${100 / columnCount}%` },
                  ]}
                >
                  <RecipeCard recipe={recipe} />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
