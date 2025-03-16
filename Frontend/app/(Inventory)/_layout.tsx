// app/RecipePage/_layout.tsx
"use client"
import { Stack } from 'expo-router';

import React, { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";



export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // or true if you want the default header
      }}
    >
     
      <Stack.Screen
        name="Inventory"
        options={{ title: 'Inventory' }}
      />
     
    </Stack>
  );
}
