import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/styles/WelcomePageStyle';

export default function AuthButtons({ onSignIn}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.signInButton}
        onPress={onSignIn}
      >
        <Text style={styles.signInButtonText}>Join Now</Text>
      </TouchableOpacity>
    </View>
  );
}