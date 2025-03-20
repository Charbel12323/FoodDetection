import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from './Logo';  // Import Logo component
import AuthButtons from './AuthButtons';
import styles from '@/styles/WelcomePageStyle';

export default function WelcomePage() {
  const navigation = useNavigation();
  
  const handleSignIn = () => {
    navigation.navigate('Login');
  };
  
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Logo />  {/* Add Logo component above the text */}
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>FridgeBud</Text>
          <Text style={styles.subtitle}>the best bud</Text>
        </View>
        
        <AuthButtons 
          onSignIn={handleSignIn} 
          onRegister={handleRegister} 
        />
      </View>
    </SafeAreaView>
  );
}
