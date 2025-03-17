// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RecipePage from '@/components/RecipePage/Recipes'; // Adjust path as needed
import SideBar from '@/components/MainPage/SideBar'; // Adjust path as needed

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content */}
      <RecipePage />
      {/* Sidebar as an overlay */}
      <SideBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
