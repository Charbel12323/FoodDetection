import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/LandingPage/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import FeaturesSection from "@/components/LandingPage/FeatureSection";
import HowItWorksSection from "@/components/LandingPage/HowItWorksSection";
import Footer from "@/components/LandingPage/Footer";
import styles from "@/styles/LandingPageStyle";  
import AuthButton from "@/components/LandingPage/AuthButton";

export default function Landing() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8D9"}}>
      
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <ScrollView contentContainerStyle={styles.container}>
        <HeroSection darkMode={darkMode} />
        <FeaturesSection darkMode={darkMode} />
        <HowItWorksSection darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </ScrollView>
    </SafeAreaView>

  );
}

