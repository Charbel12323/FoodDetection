import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RecipeDetail() {
  const router = useRouter();
  const { recipe } = useLocalSearchParams();

  // Parse the recipe from route params
  let recipeObj = {};
  try {
    recipeObj = JSON.parse(recipe);
  } catch (err) {
    console.warn('Could not parse recipe param:', err);
  }

  // Destructure fields with fallback values
  const {
    name = 'Recipe Title',
    time = '30 min',
    difficulty = 'Easy',
    servings = 2,
    ingredients = [],
    instructions = 'No instructions available.',
    nutrition = {
      calories: 320,
      protein: '25g',
      carbs: '50g',
      fat: '10g',
    },
  } = recipeObj;

  const [activeTab, setActiveTab] = useState('ingredients');

  const handleFavorite = () => {
    console.log('Favoriting recipe:', name);
    alert(`Favorited ${name}!`);
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/600x300.png?text=Recipe+Image',
          }}
          style={styles.headerImage}
        />
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'←'}</Text>
        </TouchableOpacity>
        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.recipeName}>{name}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{time}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{difficulty}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{servings} servings</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'ingredients' && styles.tabButtonActive]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'ingredients' && styles.tabButtonTextActive]}>
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'instructions' && styles.tabButtonActive]}
          onPress={() => setActiveTab('instructions')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'instructions' && styles.tabButtonTextActive]}>
            Instructions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'nutrition' && styles.tabButtonActive]}
          onPress={() => setActiveTab('nutrition')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'nutrition' && styles.tabButtonTextActive]}>
            Nutrition
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.tabContentContainer}>
        {activeTab === 'ingredients' && (
          <View style={styles.tabContent}>
            {ingredients.length === 0 ? (
              <Text style={styles.placeholderText}>No ingredients info</Text>
            ) : (
              ingredients.map((ing, index) => (
                <Text key={index} style={styles.ingredientItem}>
                  • {ing}
                </Text>
              ))
            )}
          </View>
        )}

        {activeTab === 'instructions' && (
          <View style={styles.tabContent}>
            <Text style={styles.instructionsText}>{instructions}</Text>
          </View>
        )}

        {activeTab === 'nutrition' && (
          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Calories</Text>
              <Text style={styles.nutritionValue}>{nutrition.calories}</Text>
            </View>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{nutrition.protein}</Text>
            </View>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Carbs</Text>
              <Text style={styles.nutritionValue}>{nutrition.carbs}</Text>
            </View>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Fat</Text>
              <Text style={styles.nutritionValue}>{nutrition.fat}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const HEADER_HEIGHT = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImageContainer: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'relative',
    backgroundColor: '#ccc',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#ffffffaa',
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#333',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#ffffffaa',
    padding: 8,
    borderRadius: 20,
  },
  heartIcon: {
    fontSize: 18,
    color: '#f00',
  },
  infoSection: {
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#ffffff33',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#4CAF50',
  },
  tabButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#4CAF50',
  },
  tabContentContainer: {
    flex: 1,
    padding: 16,
  },
  tabContent: {
    marginBottom: 50,
  },
  ingredientItem: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  placeholderText: {
    fontStyle: 'italic',
    color: '#999',
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nutritionBox: {
    width: '45%',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
