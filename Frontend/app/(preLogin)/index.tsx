// App.js (or LandingPage.tsx)
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import Header from "@/components/LandingPage/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import FeaturesSection from "@/components/LandingPage/FeatureSection";
import HowItWorksSection from "@/components/LandingPage/HowItWorksSection";
import Footer from "@/components/LandingPage/Footer";
import styles from "@/styles/LandingPageStyle";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Global background style
  const backgroundStyle = {
    backgroundColor: darkMode ? "#121212" : "#F9FAFB",
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.scrollContent}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <HeroSection darkMode={darkMode} />
        <FeaturesSection darkMode={darkMode} />
        <HowItWorksSection darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </ScrollView>
    </SafeAreaView>
  );
}
