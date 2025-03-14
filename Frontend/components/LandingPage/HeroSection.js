// src/components/LandingPage/HeroSection.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/styles/LandingPageStyle';

export default function HeroSection({ darkMode }) {
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
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { borderColor: darkMode ? "#374151" : "#E5E7EB" }]}>
            <Text style={[styles.secondaryButtonText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
