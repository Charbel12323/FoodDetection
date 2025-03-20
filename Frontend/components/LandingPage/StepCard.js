// src/components/LandingPage/StepCard.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/LandingPageStyle';

export default function StepCard({ number, title, description, darkMode }) {
  return (
    <View style={[styles.stepCard, { backgroundColor: darkMode ? "rgb(242, 213, 137)" : "#FFFFFF" }]}> 
      <View style={[styles.stepNumber, { backgroundColor: darkMode ? "#FFF8D9" : "#EFF6FF" }]}>
        <Text style={[styles.stepNumberText, { color: darkMode ? "#4f3509" : "#2563EB" }]}>
          {number}
        </Text>
      </View>
      <Text style={[styles.stepTitle, { color: darkMode ? "#4f3509" : "#111827" }]}>
        {title}
      </Text>
      <Text style={[styles.stepDescription, { color: darkMode ? "#4f3509" : "#6B7280" }]}>
        {description}
      </Text>
    </View>
  );
}
