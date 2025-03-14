// src/components/LandingPage/HowItWorksSection.js
import React from 'react';
import { View, Text } from 'react-native';
import StepCard from './StepCard';
import styles from '@/styles/LandingPageStyle';

export default function HowItWorksSection({ darkMode }) {
  return (
    <View style={styles.howItWorksSection}>
      <Text style={[styles.sectionTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
        How It Works
      </Text>
      <View style={styles.stepsContainer}>
        <StepCard
          number="1"
          title="Scan Your Items"
          description="Use your camera to scan barcodes or take photos of your groceries"
          darkMode={darkMode}
        />
        <StepCard
          number="2"
          title="Organize Your Inventory"
          description="Items are automatically categorized and expiration dates are tracked"
          darkMode={darkMode}
        />
        <StepCard
          number="3"
          title="Get Smart Recommendations"
          description="Receive recipe ideas based on what's in your fridge"
          darkMode={darkMode}
        />
      </View>
    </View>
  );
}
