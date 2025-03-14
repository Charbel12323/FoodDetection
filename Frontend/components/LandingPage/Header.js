// src/components/LandingPage/Header.js
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { ScanLine } from 'lucide-react-native';
import styles from '@/styles/LandingPageStyle';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <View style={[styles.header, { backgroundColor: darkMode ? "#111827" : "#E0F2FE" }]}>
      <View style={styles.logoContainer}>
        <ScanLine size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />
        <Text style={[styles.logoText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
          FridgeScan
        </Text>
      </View>
      <View style={styles.headerRight}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
    </View>
  );
}
