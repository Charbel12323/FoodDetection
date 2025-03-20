// components/RecipeDetails.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useRecipeDetails } from '@/hooks/useRecipeDetails';
import { styles } from '@/styles/RecipeDetails';

export default function RecipeDetails() {
  const router = useRouter();
  const { recipe, loading, activeTab, setActiveTab, isFavorite, handleCook } = useRecipeDetails();


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
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.headerImage} />
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        {/* Favorite Button */}
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive // ✅ change background color
          ]}
          onPress={handleCook}
        >
          <Text style={[ styles.heartIcon, isFavorite && styles.heartIconActive]}>
            ♡
          </Text>
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ingredients' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={[styles.tabText, activeTab === 'ingredients' ? styles.activeTabText : styles.inactiveTabText]}>
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'instructions' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('instructions')}
        >
          <Text style={[styles.tabText, activeTab === 'instructions' ? styles.activeTabText : styles.inactiveTabText]}>
            Instructions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'nutrition' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('nutrition')}
        >
          <Text style={[styles.tabText, activeTab === 'nutrition' ? styles.activeTabText : styles.inactiveTabText]}>
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
              : recipe.instructions
                  .split(/Step \d+: /)
                  .filter(Boolean)
                  .map((step, index) => (
                    <View key={index} style={styles.instructionStep}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.instructionText}>{step.trim()}</Text>
                    </View>
                  ))}
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