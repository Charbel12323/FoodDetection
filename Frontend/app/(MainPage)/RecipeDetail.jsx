import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RecipeDetail() {
  const router = useRouter();
  const { recipe } = useLocalSearchParams();

  // Convert string param back to JSON
  const recipeObj = JSON.parse(recipe);

  const handleSaveRecipe = () => {
    // TODO: send to backend "favorites" table later
    console.log('Saving recipe:', recipeObj);
    alert(`Saved ${recipeObj.name} to favorites!`);
  };

  return (
    <ScrollView className="flex-1 bg-dark p-4">
      <Text className="text-white text-2xl font-bold mb-4">{recipeObj.name}</Text>

      <Text className="text-white text-lg font-semibold mb-2">Ingredients:</Text>
      {recipeObj.ingredients.map((ing, index) => (
        <Text key={index} className="text-white mb-1">• {ing}</Text>
      ))}

      <Text className="text-white text-lg font-semibold mt-4 mb-2">Instructions:</Text>
      <Text className="text-white leading-6">{recipeObj.instructions}</Text>

      <TouchableOpacity
        className="bg-green-500 py-3 px-6 rounded-xl mt-6"
        onPress={handleSaveRecipe}
      >
        <Text className="text-white text-center font-semibold">Save Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-500 py-3 px-6 rounded-xl mt-4"
        onPress={() => router.back()}
      >
        <Text className="text-white text-center font-semibold">Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
