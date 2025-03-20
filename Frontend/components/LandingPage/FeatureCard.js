// src/components/LandingPage/FeatureCard.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/LandingPageStyle';

export default function FeatureCard({ icon, title, description, darkMode }) {
  return (
    <View style={[styles.featureCard, { backgroundColor: "#B9C5A9"}]}>
      <View style={[styles.featureIconContainer, { backgroundColor: "#FFF8D9"}]}>
        {icon}
      </View>
      <Text style={[styles.featureTitle, { color: "#1B2418" }]}>
        {title}
      </Text>
      <Text style={[styles.featureDescription, { color:  "#293624"}]}>
        {description}
      </Text>
    </View>
  );
}
