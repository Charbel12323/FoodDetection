import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // <-- Use expo-router's hook
import { ScanLine, Mail, Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react-native";

export default function LoginScreen({ darkMode = true, toggleDarkMode = () => {} }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const backgroundStyle = {
    backgroundColor: darkMode ? "#121212" : "#F9FAFB",
    flex: 1,
  };

  // Function to handle authentication (login or sign-up)
  const handleAuth = async () => {
    setMessage('');
    setLoading(true);
    // If we're in sign-up mode, check that passwords match
    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/signup';
    const body = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage("Login successful!");
          // Optionally, store tokens or navigate to a protected route
        } else {
          setMessage("Sign up successful!");
          // Navigate to login page after a brief delay (or immediately)
          
          
          setIsLogin(true);
        }
      } else {
        setMessage(data.error || (isLogin ? "Login failed" : "Sign up failed"));
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
    setMessage('');
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
                : "Join FridgeScan to start tracking your food and reduce waste"}
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
                      { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", color: darkMode ? "#FFFFFF" : "#111827", borderColor: darkMode ? "#374151" : "#E5E7EB" },
                    ]}
                    placeholder="Username"
                    placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              )}
              
              <View style={styles.inputWrapper}>
                <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                  <Mail size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", color: darkMode ? "#FFFFFF" : "#111827", borderColor: darkMode ? "#374151" : "#E5E7EB" },
                  ]}
                  placeholder="Email"
                  placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                  <Lock size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", color: darkMode ? "#FFFFFF" : "#111827", borderColor: darkMode ? "#374151" : "#E5E7EB" },
                  ]}
                  placeholder="Password"
                  placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={20} color={darkMode ? "#9CA3AF" : "#6B7280"} />
                  ) : (
                    <Eye size={20} color={darkMode ? "#9CA3AF" : "#6B7280"} />
                  )}
                </TouchableOpacity>
              </View>
              
              {!isLogin && (
                <View style={styles.inputWrapper}>
                  <View style={[styles.inputIconContainer, { backgroundColor: darkMode ? "#374151" : "#EFF6FF" }]}>
                    <Lock size={20} color={darkMode ? "#60A5FA" : "#2563EB"} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: darkMode ? "#1F2937" : "#FFFFFF", color: darkMode ? "#FFFFFF" : "#111827", borderColor: darkMode ? "#374151" : "#E5E7EB" },
                    ]}
                    placeholder="Confirm Password"
                    placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                  />
                </View>
              )}
              
              {isLogin && (
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={[styles.forgotPasswordText, { color: darkMode ? "#60A5FA" : "#2563EB" }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            
            <TouchableOpacity
              style={[styles.authButton, { opacity: loading ? 0.7 : 1 }]}
              onPress={handleAuth}
              disabled={loading}
            >
              <Text style={styles.authButtonText}>
                {isLogin ? "Sign In" : "Create Account"}
              </Text>
            </TouchableOpacity>
            
            {message ? <Text style={[styles.messageText, { color: darkMode ? "#FFFFFF" : "#111827" }]}>{message}</Text> : null}
            
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

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
    alignSelf: "flex-start",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },
  formContainer: {
    width: "100%",
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  formSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  inputsContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  inputIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    height: 50,
    justifyContent: "center",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  authButton: {
    backgroundColor: "#2563EB",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  authButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
  },
  switchModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  switchModeText: {
    fontSize: 14,
    marginRight: 4,
  },
  switchModeLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
