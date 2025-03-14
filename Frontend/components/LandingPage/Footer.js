// src/components/LandingPage/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScanLine } from 'lucide-react-native';
import styles from '@/styles/LandingPageStyle';

export default function Footer({ darkMode }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerTop}>
        <View style={styles.footerLogoContainer}>
          <ScanLine size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
          <Text style={[styles.footerLogoText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
            FridgeScan
          </Text>
        </View>
        <Text style={[styles.footerTagline, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
          Smart kitchen management at your fingertips
        </Text>
      </View>
      <View style={styles.footerLinks}>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.copyright, { color: darkMode ? "#9CA3AF" : "#9CA3AF" }]}>
        © {new Date().getFullYear()} FridgeScan. All rights reserved.
      </Text>
    </View>
  );
}
