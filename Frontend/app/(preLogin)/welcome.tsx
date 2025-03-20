import React from "react";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import { useRouter } from "expo-router";
import styles from "@/styles/WelcomePageStyle";
import AuthButtons from "@/components/WelcomePage/AuthButtons";
import BackgroundPattern from "@/components/WelcomePage/BackgroundPattern";

export default function Welcome() {
  const router = useRouter(); // Use expo-router's navigation system

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFBE5" }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <BackgroundPattern />

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>FridgeBud</Text>
            <Text style={styles.subtitle}>the best bud</Text>
          </View>

          {/* Authentication Buttons */}
          <AuthButtons 
            onSignIn={() => router.push("/login")} 
            onLearnMore={() => router.push("/landing")} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
