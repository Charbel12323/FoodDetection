import React from 'react';
import { View, Image } from 'react-native';
import styles from '@/styles/WelcomePageStyle';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('@/assets/images/fridge.png')}  // Make sure the image path is correct
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}
