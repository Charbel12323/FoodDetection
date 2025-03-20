import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RecipeDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { recipe: recipeParam } = params; // ✅ recipe param comes as a string
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would implement your favorite logic with your backend
  };
  
  useEffect(() => {
    if (!recipeParam) {
      console.warn('❌ No recipe param received!');
      alert('No recipe found!');
      router.back();
      return;
    }
  
    try {
      const parsedRecipe = JSON.parse(recipeParam);
      console.log('✅ Parsed recipe:', parsedRecipe);
      setRecipe(parsedRecipe);
    } catch (error) {
      console.error('❌ Failed to parse recipe param:', error);
      alert('Recipe data corrupted!');
      router.back();
    } finally {
      setLoading(false);
    }
  }, [recipeParam]);

  if (loading || !recipe) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading Recipe...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300'}} //recipe.image }}
          style={styles.headerImage}
        />
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        {/* Favorite Button */}
        <TouchableOpacity 
          style={[
            styles.favoriteButton, 
            isFavorite && styles.favoriteButtonActive
          ]} 
          onPress={handleFavorite}
        >
          <Text style={[
            styles.heartIcon,
            isFavorite && styles.heartIconActive
          ]}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.cookingTime}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.difficulty}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.servings} Servings</Text>
          </View>
        </View>
      </View>

      {/* Tabs - Styled to match the image */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'ingredients' ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'ingredients' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'instructions' ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab('instructions')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'instructions' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Instructions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'nutrition' ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => setActiveTab('nutrition')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'nutrition' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Nutrition
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.tabContentContainer}>
        {activeTab === 'ingredients' && (
          <View style={styles.tabContent}>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'instructions' && (
  <View style={styles.tabContent}>
    {Array.isArray(recipe.instructions) 
      ? recipe.instructions.map((step, index) => (
          <View key={index} style={styles.instructionStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.instructionText}>{step}</Text>
          </View>
        ))
      : recipe.instructions.split(/Step \d+: /).filter(Boolean).map((step, index) => (
          <View key={index} style={styles.instructionStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.instructionText}>{step.trim()}</Text>
          </View>
        ))
    }
  </View>
)}

        {activeTab === 'nutrition' && (
          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Calories</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.calories}</Text>
            </View>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.protein}</Text>
            </View>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Carbs</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.carbs}</Text>
            </View>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionLabel}>Fat</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.fat}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const HEADER_HEIGHT = 260;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageContainer: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'relative',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#333',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#4CAF50',
  },
  heartIcon: {
    fontSize: 18,
    color: '#f00',
  },
  heartIconActive: {
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // New tab styling to match the image exactly
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    backgroundColor: '#f5f5f5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  inactiveTab: {
    backgroundColor: '#f5f5f5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
  },
  inactiveTabText: {
    color: '#888888',
  },
  tabContentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  tabContent: {
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionBox: {
    width: '48%',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});