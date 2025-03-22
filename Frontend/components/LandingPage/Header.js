import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '@/styles/LandingPageStyle';
import AuthButtons from '@/components/LandingPage/AuthButton'; 
import { useRouter } from 'expo-router'; 

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
          source={require('@/assets/images/fridge.png')} 
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
        />
      </View>
    </View>
  );
}
