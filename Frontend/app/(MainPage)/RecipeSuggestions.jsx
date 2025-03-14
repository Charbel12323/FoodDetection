import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router'; // Use Expo Router's navigation
import { useUserStore } from '@/stores/useUserStore';
import { getIngredients } from '@/api/ingredientService';
import { generateRecipes } from '@/api/recipeService';

import RecipeCard from '@/components/RecipeCard';
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function RecipeSuggestions() {
  const router = useRouter();

  const userId = useUserStore(state => state.user?.user_id);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const ingredientsData = await getIngredients(userId);

        if (!ingredientsData || ingredientsData.ingredients.length === 0) {
          alert("No ingredients found. Please scan items first!");
          router.push('/(MainPage)/Scanner');
          return;
        }

        const ingredients = ingredientsData.ingredients;

        const recipesResponse = await generateRecipes(ingredients);

        if (recipesResponse?.recipes?.length > 0) {
          setRecipes(recipesResponse.recipes);
        } else {
          console.warn("No recipes returned.");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecipes();
    } else {
      router.push('/(preLogin)/login'); // Redirect to login if no user
    }
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipes Found</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(MainPage)/Scanner')}>
          <Text style={styles.buttonText}>Back to Ingredients</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {recipes.length === 0 ? (
          <Text>No recipes found with your ingredients.</Text>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  scrollArea: {
    gap: 12
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
