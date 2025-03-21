// src/components/AuthForm.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react-native";
import styles from "@/styles/Login";

export default function AuthForm({ darkMode, authState }) {
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
    <View style={styles.formContainer}>
      <Text style={[styles.formTitle, { color: darkMode ? "#FFFFFF" : "#111827" }]}>
        {isLogin ? "Welcome Back" : "Create Account"}
      </Text>
      <Text style={[styles.formSubtitle, { color: darkMode ? "#D1D5DB" : "#4B5563" }]}>
        {isLogin
          ? "Sign in to continue managing your kitchen inventory"
          : "Join FridgeScan to start tracking your food and reduce waste"}
      </Text>

      <View style={styles.inputsContainer}>
        {/* Username field is shown only for sign-up */}
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

        
      </View>

      {/* Authentication Button */}
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
  );
}
