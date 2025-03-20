// src/components/LandingPage/HeroSection.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/styles/LandingPageStyle';
import { useRouter } from 'expo-router';
export default function HeroSection({ darkMode }) {
  const router = useRouter();
  return (
    <View style={[styles.heroSection, { backgroundColor: darkMode ? "#1F2937" : "#F0F9FF" }]}>
      <View style={styles.heroContent}>
        <Text style={[styles.heroTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
          Never Forget What's In Your Fridge Again
        </Text>
        <Text style={[styles.heroSubtitle, { color: darkMode ? "#D1D5DB" : "#4B5563" }]}>
          Scan, track, and manage your food inventory with ease. Reduce waste and save money with smart expiration alerts.
        </Text>
        <View style={styles.heroCta}>
        <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/(preLogin)/login')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
