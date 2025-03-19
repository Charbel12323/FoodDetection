import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/styles/WelcomePageStyle';

export default function AuthButtons({ onSignIn, onRegister }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.signInButton}
        onPress={onSignIn}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={onRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}