// src/components/LandingPage/StepCard.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/LandingPageStyle';

export default function StepCard({ number, title, description, darkMode }) {
  return (
    <View style={[styles.stepCard, { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF" }]}>
      <View style={[styles.stepNumber, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
        <Text style={[styles.stepNumberText, { color: darkMode ? "#60A5FA" : "#2563EB" }]}>
          {number}
        </Text>
      </View>
      <Text style={[styles.stepTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
        {title}
      </Text>
      <Text style={[styles.stepDescription, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
        {description}
      </Text>
    </View>
  );
}
