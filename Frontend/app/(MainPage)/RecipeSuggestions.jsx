import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
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

        if (!userId) {
          router.replace('/(preLogin)/login');
          return;
        }

        const ingredientsData = await getIngredients(userId);
        console.log("ingredientsData =>", ingredientsData);

        if (!ingredientsData || ingredientsData.length === 0) {
          alert("No ingredients found. Please scan items first!");
          router.replace('/(MainPage)/Scanner');
          return;
        }

        const ingredients = ingredientsData;
        const recipesResponse = await generateRecipes(ingredients);
        console.log("recipesResponse =>", recipesResponse);

        if (recipesResponse?.recipes?.length > 0) {
            setRecipes(recipesResponse.recipes);
            console.log("Recipes loaded:", recipesResponse.recipes); // <-- log here!
          } else {
            console.warn("No recipes returned.");
          }

      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
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
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {recipes.length === 0 ? (
          <Text style={styles.noRecipesText}>No recipes found with your ingredients.</Text>
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
    padding: 16,
    backgroundColor: '#f5f5f5'
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
    paddingBottom: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noRecipesText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666'
  }
});
