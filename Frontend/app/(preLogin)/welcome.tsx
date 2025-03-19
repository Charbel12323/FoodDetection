import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "@/styles/WelcomePageStyle";
import AuthButtons from "@/components/WelcomePage/AuthButtons";
import BackgroundPattern from "@/components/WelcomePage/BackgroundPattern";

// Define the type for navigation
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;

export default function Welcome() {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  // Global background style
  const backgroundStyle = {
    backgroundColor: "#FFFBE5",
    flex: 1,
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <BackgroundPattern />

        <View style={styles.content}>
          {/* App Title and Subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>FridgeBud</Text>
            <Text style={styles.subtitle}>the best bud</Text>
          </View>

          {/* Authentication Buttons */}
          <AuthButtons onSignIn={handleSignIn} onRegister={handleRegister} />
        </View>
      </View>
    </SafeAreaView>
  );
}
