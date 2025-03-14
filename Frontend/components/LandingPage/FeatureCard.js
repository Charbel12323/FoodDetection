// src/components/LandingPage/FeatureCard.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/LandingPageStyle';

export default function FeatureCard({ icon, title, description, darkMode }) {
  return (
    <View style={[styles.featureCard, { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF" }]}>
      <View style={[styles.featureIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
        {icon}
      </View>
      <Text style={[styles.featureTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
        {title}
      </Text>
      <Text style={[styles.featureDescription, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
        {description}
      </Text>
    </View>
  );
}
