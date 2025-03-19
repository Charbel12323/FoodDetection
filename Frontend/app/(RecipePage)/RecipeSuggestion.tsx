// src/pages/(MainPage)/RecipeSuggestions.tsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
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

  // Number of columns: 3 (≥1200px), 2 (800–1199px), 1 (<800px)
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    // Decide how many columns to show based on window width
    const determineColumns = (width: number) => {
      if (width >= 1200) return 3;
      if (width >= 800) return 2;
      return 1;
    };

    // Initial calculation
    const { width } = Dimensions.get('window');
    setColumnCount(determineColumns(width));

    // Listen for window size changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setColumnCount(determineColumns(window.width));
    });
    return () => subscription?.remove();
  }, []);

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

        const recipesResponse = await generateRecipes(ingredientsData);

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

//
// LAYOUT STYLES
//
const layoutStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // We'll center items along the top row
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // Negative margin so that each card's horizontal padding forms a "gap"
    marginHorizontal: -8,
  },
  cardContainer: {
    // Each card is 100 / columnCount wide, plus we add horizontal padding
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

//
// BASE STYLES
//
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
