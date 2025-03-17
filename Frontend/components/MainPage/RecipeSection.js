// src/components/MainPage/RecipesSection.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getRecipes } from '@/api/recipeService';
import { useUserStore } from '@/stores/useUserStore';

export default function RecipesSection() {
  const [recipes, setRecipes] = useState([]); // Initially empty
  const [loading, setLoading] = useState(false);
  const userId = useUserStore((state) => state.user?.user_id);

  // Fetch recipes from the backend for the current user
  const fetchRecipes = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getRecipes(userId);
      // Assuming your backend returns an object with a recipes array
      if (data.recipes) {
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [userId]);

  // Placeholder function for adding a recipe
  const handleAddRecipe = () => {
    console.log("Let's get cooking!");
    // You can navigate to a recipe creation screen here.
  };

  // Show loading indicator if data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0BAB64" />
      </View>
    );
  }

  // Display only the first 3 recipes if they exist
  const recipesToDisplay = recipes.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Recipes</Text>
      </View>
      {recipes.length === 0 ? (
        <TouchableOpacity style={styles.button} onPress={handleAddRecipe}>
          <Text style={styles.buttonText}>Looks like you have no recipes, start cooking</Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={recipesToDisplay}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0BAB64',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  recipeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeTitle: {
    fontSize: 16,
  },
});
