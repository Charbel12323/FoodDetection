import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '@/styles/LandingPageStyle';
import AuthButtons from '@/components/LandingPage/AuthButton'; // Make sure to import your AuthButtons component
import { useRouter } from 'expo-router'; // Import router for navigation

export default function Header({ darkMode, toggleDarkMode }) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <View style={[styles.header, { backgroundColor: darkMode ? "#FFF8D9" : "#E0F2FE" }]}>
      {/* This is the container for logo, title, and AuthButtons */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/fridge.png')} // Make sure the image path is correct
          style={[styles.logoImage, { tintColor: darkMode ? 'rgb(74, 173, 203)' : '#111827' }]}
        />
        <Text style={[styles.logoText, { color: darkMode ? "rgb(74, 173, 203)" : "#111827" }]}>
          FridgeBud
        </Text>
      </View>
      
      {/* Adding AuthButtons in the header to align them horizontally */}
      <View style={styles.authButtonContainer}>
        <AuthButtons 
          onSignIn={handleSignIn} 
          // You can add other props here, such as an optional "Sign Up" button if needed
        />
      </View>
    </View>
  );
}
