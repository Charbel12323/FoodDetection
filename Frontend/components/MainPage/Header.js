// src/components/Header.js
import React from 'react';
import { View } from 'react-native';
import HeaderUI from './HeaderUI';
import StatsCard from './statsCard';

import useIngredients from '@/hooks/useIngredients';
import styles from '@/styles/MainPage';

function Header() {
  // Use our custom hook to fetch ingredients and manage animations
  const { ingredients, fadeAnim, translateY } = useIngredients();

  // Calculate the number of unique ingredients
  const uniqueIngredients = new Set(ingredients).size;

  return (
    <View style={styles.container}>
      <HeaderUI />
      <StatsCard uniqueIngredients={uniqueIngredients} fadeAnim={fadeAnim} translateY={translateY} />
      
      {/* Decorative Elements */}
      <View style={styles.decorativeCircle} />
      <View style={styles.decorativeCircleSmall} />
    </View>
  );
}

export default Header;
