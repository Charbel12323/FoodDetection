import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'; // Import Image
import styles from '@/styles/LandingPageStyle';

export default function Footer({ darkMode }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerTop}>
        <View style={styles.footerLogoContainer}>
          {/* Replace ScanLine with the fridge image */}
          <Image
            source={require('@/assets/images/fridge.png')} // Ensure this path is correct
            style={[styles.logoImage, { tintColor: darkMode ? 'rgb(74, 173, 203)' : '#111827' }]}
          />
          <Text style={[styles.footerLogoText, { color: darkMode ? "rgb(74, 173, 203)" : "#111827" }]}>
            FridgeBud
          </Text>
        </View>
        <Text style={[styles.footerTagline, { color: darkMode ? "#373737" : "#6B7280" }]}>
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
