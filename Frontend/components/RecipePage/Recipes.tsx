// // src/pages/(MainPage)/Recipes.tsx
// import React from 'react';
// import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
// import RecipeCard from '@/components/RecipePage/RecipeCard';
// import { useUserStore } from '@/stores/useUserStore'; // if needed elsewhere in this file
// import { useRouter } from 'expo-router'; // if needed elsewhere in this file
// import styles from "@/styles/RecipePageStyle";
// import useRecipes from '@/hooks/useRecipes';

// export default function RecipesPage() {
//   const { recipes, loading } = useRecipes();
//   const userId = useUserStore((state) => state.user?.user_id);

//   // Show a loader if user data is still loading or recipes are being fetched.
//   if (userId === undefined || loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Recipes</Text>
//       </View>
//       {recipes.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>You have no recipes yet.</Text>
//         </View>
//       ) : (
//         <ScrollView contentContainerStyle={styles.scrollArea}>
//           {recipes.map((recipe, index) => (
//             <RecipeCard key={index} recipe={recipe} showCookButton={false} />
//           ))}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUserStore } from '@/stores/useUserStore';
import { getRecipes } from '@/api/recipeService';
import RecipeCard from '@/components/RecipePage/RecipeCard';
import { useRouter } from 'expo-router';
import styles from '@/styles/RecipePageStyle';

// Ensure COLORS is correctly imported or defined
const COLORS = {
  accent: '#FF5733', // Replace with actual color from styles if defined
  text: '#333333',
};

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // userId might be undefined while loading, null if not logged in
  const userId = useUserStore((state) => state.user?.user_id);
  const router = useRouter();

  useEffect(() => {
    if (userId === undefined) return;

    if (!userId) {
      setTimeout(() => {
        router.replace('/(preLogin)/login');
      }, 0);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(userId);
        if (data?.recipes) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [userId, router]);

  if (userId === undefined || loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={{ marginTop: 12, color: COLORS.text }}>Loading your recipes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Saved Recipes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.recipeList || { paddingBottom: 20 }}>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <Text style={styles.noRecipesText}>No recipes found.</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/RecipeDetails')}>
        <Text style={styles.addButtonText}>+ Add Recipe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecipesPage;
