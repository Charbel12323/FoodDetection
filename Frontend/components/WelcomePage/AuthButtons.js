import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/styles/WelcomePageStyle';

export default function AuthButtons({ onSignIn, onLearnMore }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.signInButton}
        onPress={onSignIn}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.learnMoreButton}
        onPress={onLearnMore}
      >
        <Text style={styles.learnMoreButtonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
}