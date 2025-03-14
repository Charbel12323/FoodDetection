// LoginScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ScanLine, Mail, Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react-native";

import { login, signup } from "@/api/authService";
import styles from "@/styles/Login"; // adjust the path based on your project structure

export default function LoginScreen({ darkMode = true, toggleDarkMode = () => {} }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const backgroundStyle = { backgroundColor: darkMode ? "#121212" : "#F9FAFB", flex: 1 };

  const handleAuth = async () => {
    setMessage("");
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        setMessage("Login successful!");
        router.push("/(MainPage)/home");
      } else {
        data = await signup(username, email, password);
        setMessage("Sign up successful!");
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={darkMode ? "#60A5FA" : "#2563EB"} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <ScanLine size={40} color={darkMode ? "#60A5FA" : "#2563EB"} />
            <Text style={[styles.logoText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
              FridgeScan
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={[styles.formTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={[styles.formSubtitle, { color: darkMode ? "#D1D5DB" : "#4B5563" }]}>
              {isLogin 
                ? "Sign in to continue managing your kitchen inventory" 
                : "Join FridgeScan to start tracking your food and reduce waste"
              }
            </Text>

            <View style={styles.inputsContainer}>
              {!isLogin && (
                <View style={styles.inputWrapper}>
                  <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                    <User size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", 
                        color: darkMode ? "#FFFFFF" : "#111827", 
                        borderColor: darkMode ? "#374151" : "#E5E7EB" 
                      },
                    ]}
                    placeholder="Username"
                    placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Email Field */}
              <View style={styles.inputWrapper}>
                <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                  <Mail size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                      color: darkMode ? "#FFFFFF" : "#111827",
                      borderColor: darkMode ? "#374151" : "#E5E7EB" 
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputWrapper}>
                <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                  <Lock size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                      color: darkMode ? "#FFFFFF" : "#111827",
                      borderColor: darkMode ? "#374151" : "#E5E7EB" 
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.passwordToggle} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword 
                    ? <EyeOff size={20} color={darkMode ? "#9CA3AF" : "#6B7280"} />
                    : <Eye size={20} color={darkMode ? "#9CA3AF" : "#6B7280"} />
                  }
                </TouchableOpacity>
              </View>

              {/* Confirm Password (Sign-Up Only) */}
              {!isLogin && (
                <View style={styles.inputWrapper}>
                  <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                    <Lock size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                        color: darkMode ? "#FFFFFF" : "#111827",
                        borderColor: darkMode ? "#374151" : "#E5E7EB" 
                      },
                    ]}
                    placeholder="Confirm Password"
                    placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                  />
                </View>
              )}

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={[styles.forgotPasswordText, { color: darkMode ? "#60A5FA" : "#2563EB" }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Auth Button */}
            <TouchableOpacity
              style={[styles.authButton, { opacity: loading ? 0.7 : 1 }]}
              onPress={handleAuth}
              disabled={loading}
            >
              <Text style={styles.authButtonText}>
                {isLogin ? "Sign In" : "Create Account"}
              </Text>
            </TouchableOpacity>

            {/* Message Text */}
            {message ? (
              <Text style={[styles.messageText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
                {message}
              </Text>
            ) : null}

            {/* Toggle Between Login and Sign-Up */}
            <View style={styles.switchModeContainer}>
              <Text style={[styles.switchModeText, { color: darkMode ? "#D1D5DB" : "#6B7280" }]}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={[styles.switchModeLink, { color: darkMode ? "#60A5FA" : "#2563EB" }]}>
                  {isLogin ? "Sign Up" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
