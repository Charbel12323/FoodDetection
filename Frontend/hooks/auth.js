import { useState } from "react";
import { login, signup } from "@/api/authService";
import { useUserStore } from '@/stores/useUserStore'; 

export default function useAuth(router) {
  // Zustand action to set the userId globally
  const setUser = useUserStore(state => state.setUser);
  console.log(setUser)

  // Local state management for the auth form
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle login/signup
  const handleAuth = async () => {
    setMessage("");
    setLoading(true);

    // Basic validation for signup (confirm password)
    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      let data;

      if (isLogin) {
        // Call login API
        data = await login(email, password);
        setMessage("Login successful!");

        // Set the userId globally in Zustand
        // Set the entire user object globally in Zustand
        setUser(data.user);


        // Navigate to the Main Page after login
        router.push("/(MainPage)/MainPage");
      } else {
        // Call signup API
        data = await signup(username, email, password);
        setMessage("Sign up successful!");

        // Optionally auto-login or prompt user to login manually
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle between login/signup modes
  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
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
