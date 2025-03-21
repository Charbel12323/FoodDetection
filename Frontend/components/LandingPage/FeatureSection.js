// src/components/LandingPage/FeaturesSection.js
import React from 'react';
import { View, Text } from 'react-native';
import { ScanLine, Bell, ShoppingCart, BarChart4 } from 'lucide-react-native';
import FeatureCard from './FeatureCard';
import styles from '@/styles/LandingPageStyle';

export default function FeaturesSection({ darkMode }) {
  return (
    <View style={styles.featuresSection}>
      <Text style={[styles.sectionTitle, { color: darkMode ? "#373737" : "#111827" }]}>
        Smart Features for Smart Kitchens
      </Text>
      <View style={styles.featuresGrid}>
        <FeatureCard
          icon={<ScanLine size={24} color={"#1B2418"} />}
          title="Quick Scanning"
          description="Scan barcodes or take photos to instantly add items to your inventory"
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<Bell size={24} color={"#1B2418"} />}
          title="Expiration Alerts"
          description="Get notified before your food expires to reduce waste"
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<ShoppingCart size={24} color={"#1B2418"} />}
          title="Shopping Lists"
          description="Automatically generate shopping lists based on what you need"
          darkMode={darkMode}
        />
        <FeatureCard
          icon={<BarChart4 size={24} color={"#1B2418"} />}
          title="Consumption Insights"
          description="Track your food habits and spending with detailed analytics"
          darkMode={darkMode}
        />
      </View>
    </View>
  );
}
