// app/RecipePage/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
     
      <Stack.Screen
        name="RecipeDetails"
        options={{ title: 'Recipe Detail' }}
      />
      <Stack.Screen
        name="RecipeSuggestions"
        options={{ title: 'Suggestions' }}
      />
    </Stack>
  );
}
