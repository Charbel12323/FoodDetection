import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { ScanLine, Layers } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getIngredients } from '@/api/ingredientService';
import styles from '@/styles/MainPage'; // adjust the path based on your project structure

function Header() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        // Replace 6 with the actual logged-in user's ID if needed
        const fetchedIngredients = await getIngredients(6);
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        // Start animations after data loads
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        ]).start();
      }
    };

    fetchIngredients();
  }, [fadeAnim, translateY]);

  // Calculate number of unique ingredients
  const uniqueIngredients = new Set(ingredients).size;

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIconContainer}>
              <ScanLine size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>
              Fridge<Text style={styles.logoTextHighlight}>Scan</Text>
            </Text>
          </View>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Your Kitchen Inventory</Text>
          <Text style={styles.welcomeSubtext}>
            Track and manage your ingredients
          </Text>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <Animated.View 
        style={[
          styles.cardsContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateY }] 
          }
        ]}
      >
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={['#0BAB64', '#3BB78F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardIconContainer}>
              <Layers size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.cardValue}>{uniqueIngredients}</Text>
            <Text style={styles.cardTitle}>Unique Items</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <View style={styles.decorativeCircle} />
      <View style={styles.decorativeCircleSmall} />
    </View>
  );
}

export default Header;
