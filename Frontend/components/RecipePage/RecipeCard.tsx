import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useRecipeCard } from '@/hooks/useRecipeCard';
import styles from '@/styles/RecipeCardStyles';

interface RecipeCardProps {
  recipe: any;
  showCookButton?: boolean;
  showfav?: boolean;
}

export default function RecipeCard({
  recipe,
  showCookButton = true,
  showfav=true
}: RecipeCardProps) {
  const { 
    isCooking, 
    isCooked, 
    isFavorite, 
    handlePress, 
    handleCook, 
    handleFavorite 
  } = useRecipeCard(recipe);

  const imageUri = recipe.image || 'https://via.placeholder.com/300';

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Image Section */}
      <View >
        {/* <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        /> */}

        {/* Favorite Button */}
        {showfav &&
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
        </TouchableOpacity>}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.name}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {recipe.cookingTime || "30 min"}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {recipe.difficulty || "Easy"}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {recipe.ingredients?.length || 0} ingredients
        </Text>

        {showCookButton && (
          <TouchableOpacity
            style={styles.cookButton}
            onPress={handleCook}
            disabled={isCooking || isCooked}
          >
            <Text style={styles.cookButtonText}>
              {isCooking ? "Cooking..." : isCooked ? "Cooked" : "Cook"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}