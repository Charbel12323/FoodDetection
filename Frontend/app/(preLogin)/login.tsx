// src/screens/LoginScreen.js
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from "expo-router";
import { ScanLine, ArrowLeft } from "lucide-react-native";
import styles from "@/styles/Login";
import useAuth from "@/hooks/auth";
import AuthForm from "@/components/Login/AuthForm";

export default function LoginScreen({ darkMode = true, toggleDarkMode = () => {} }) {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const authState = useAuth(router);

  const backgroundStyle = { backgroundColor: darkMode ? "#121212" : "#F9FAFB", flex: 1 };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle} contentContainerStyle={styles.scrollContent}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <ScanLine size={40} color={darkMode ? "#60A5FA" : "#2563EB"} />
          </View>

          {/* Authentication Form */}
          <AuthForm darkMode={darkMode} authState={authState} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
