// app/RecipePage/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // or true if you want the default header
      }}
    >
     
      <Stack.Screen
        name="UpdatePage"
        options={{ title: 'UpdatePage' }}
      />
      
    </Stack>
  );
}
