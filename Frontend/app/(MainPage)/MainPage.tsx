
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Header from '@/components/MainPage/Header'; // Adjust the path based on your project structure
import styles from '@/styles/MainPage'; // We reuse container style from MainPage

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2027" />
      <Header />
    </SafeAreaView>
  );
}
