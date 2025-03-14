// src/hooks/useAuth.js
import { useState } from "react";
import { login, signup } from "@/api/authService";

export default function useAuth(router) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setMessage("");
    setLoading(true);

    // For sign-up, ensure the passwords match.
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
        router.push("/(MainPage)/MainPage");
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
    setIsLogin((prev) => !prev);
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  return {
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
  };
}
