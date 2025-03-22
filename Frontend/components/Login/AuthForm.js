// src/components/AuthForm.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import styles from "@/styles/Login";

export default function AuthForm({ authState }) {
  const router = useRouter();
  const {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    username,
    setUsername,
    showPassword,
    setShowPassword,
    message,
    loading,
    handleAuth,
    toggleAuthMode,
  } = authState;

  return (
    <View style={styles.container}>
      {/* Back Button on the Top Left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(preLogin)/landing')}
      >
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      {/* Header Section - Yellow Background */}
      <View style={styles.headerSection}>
        <Text style={styles.formTitle}>
          {isLogin ? "Sign in" : "Register"}
        </Text>
        <Text style={styles.formSubtitle}>
          {isLogin
            ? "Please login to continue to your account."
            : "Please sign up to enjoy FridgeBud."}
        </Text>
      </View>

      {/* Form Fields - Green Background */}
      <View style={styles.formFieldsSection}>
        {/* Input Fields */}
        <View style={styles.inputsContainer}>
          {/* Username field is shown only for sign-up */}
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter your username</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="John"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>
          )}

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter your email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="you@yourmail.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter your password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.passwordToggle} 
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword 
                  ? <EyeOff size={20} color="#9CA3AF" />
                  : <Eye size={20} color="#9CA3AF" />
                }
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field - Only for registration */}
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm your password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>
          )}
        </View>

        {/* Authentication Button */}
        <TouchableOpacity
          style={styles.authButton}
          onPress={handleAuth}
          disabled={loading}
        >
          <Text style={styles.authButtonText}>
            {isLogin ? "Sign in" : "Register"}
          </Text>
        </TouchableOpacity>

        {/* Message Text */}
        {message && (
          <Text style={styles.messageText}>
            {message}
          </Text>
        )}

        {/* Toggle Between Login and Sign-Up */}
        <View style={styles.switchModeContainer}>
          <Text style={styles.switchModeText}>
            {isLogin ? "Need an account? " : "Have an account? "}
            <Text style={styles.switchModeLink} onPress={toggleAuthMode}>
              {isLogin ? "Create one" : "Sign in"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
