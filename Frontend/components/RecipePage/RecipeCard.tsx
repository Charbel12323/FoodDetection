import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { addRecipe } from '@/api/recipeService';
import { useUserStore } from '@/stores/useUserStore';

interface RecipeCardProps {
  recipe: any;
  showCookButton?: boolean;
}

export default function RecipeCard({
  recipe,
  showCookButton = true
}: RecipeCardProps) {
  const router = useRouter();
  const [isCooking, setIsCooking] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Favorite state
  const userId = useUserStore((state) => state.user?.user_id);

  const handlePress = () => {
    router.push({
      pathname: '/(RecipePage)/RecipeDetails',
      params: { recipe: JSON.stringify(recipe) },
    });
  };

  // ✅ This function adds the recipe to the database
  const handleCook = async () => {
    if (!userId) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    try {
      setIsCooking(true);
      await addRecipe({
        user_id: userId,
        name: recipe.name,
        cookingTime: recipe.cookingTime || '30 minutes',
        difficulty: recipe.difficulty || 'Easy',
        servings: recipe.servings || 1,
        nutrition: recipe.nutrition || {},
        instructions: recipe.instructions,
        ingredients: recipe.ingredients || [],
      });
      Alert.alert("Success", "Recipe added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add recipe.");
    } finally {
      setIsCooking(false);
    }
  };

  // ✅ Favorite button triggers the same function as cook
  const handleFavorite = async () => {
    if (isFavorite) {
      Alert.alert("Info", "This recipe is already favorited!");
      return;
    }

    try {
      setIsFavorite(true); // Mark as favorite in the UI
      await handleCook(); // Call the same logic as "Cook"
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const imageUri = recipe.image || 'https://via.placeholder.com/300';

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* ✅ Favorite Button Positioned Over Image */}
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive
          ]}
          onPress={handleFavorite}
        >
          <Text
            style={[
              styles.heartIcon,
              isFavorite && styles.heartIconActive
            ]}
          >
            ♡
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.name}</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.cookingTime || "30 min"}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{recipe.difficulty || "Easy"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {recipe.ingredients?.length || 0} ingredients
        </Text>

        {showCookButton && (
          <TouchableOpacity
            style={styles.cookButton}
            onPress={handleCook}
            disabled={isCooking}
          >
            <Text style={styles.cookButtonText}>
              {isCooking ? "Cooking..." : "Cook"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  favoriteButtonActive: {
    backgroundColor: '#4CAF50',
  },
  heartIcon: {
    fontSize: 18,
    color: '#999',
  },
  heartIconActive: {
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontSize: 12,
  },
  footer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
  },
  cookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
