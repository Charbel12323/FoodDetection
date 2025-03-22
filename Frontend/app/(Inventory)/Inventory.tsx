// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import InventoryPage from '@/components/InventoryPage/Inventory'; 
import SideBar from '@/components/MainPage/SideBar'; 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content */}
      <InventoryPage />
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
