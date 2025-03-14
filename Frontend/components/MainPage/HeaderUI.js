// src/components/HeaderUI.js
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScanLine } from 'lucide-react-native';
import styles from '@/styles/MainPage';

export default function HeaderUI() {
  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerGradient}
    >
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <ScanLine size={22} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>
            Fridge<Text style={styles.logoTextHighlight}>Scan</Text>
          </Text>
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Your Kitchen Inventory</Text>
        <Text style={styles.welcomeSubtext}>
          Track and manage your ingredients
        </Text>
      </View>
    </LinearGradient>
  );
}
