import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/stores/useUserStore';
import { getIngredients } from '@/api/ingredientService';
import { generateRecipes } from '@/api/recipeService';
import RecipeCard from '@/components/RecipePage/RecipeCard';

export default function RecipeSuggestions() {
  const router = useRouter();
  const userId = useUserStore(state => state.user?.user_id);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const ingredients = ingredientsData;
        const recipesResponse = await generateRecipes(ingredients);

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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text>Loading recipes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push('/(MainPage)/MainPage')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>Recipes Found</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(MainPage)/Scanner')}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollArea}>
          {recipes.length === 0 ? (
            <Text style={styles.noRecipesText}>
              No recipes found with your ingredients.
            </Text>
          ) : (
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // Optional: if your status bar isn't automatically managed, you can add padding top.
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollArea: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecipesText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666',
  },
});
