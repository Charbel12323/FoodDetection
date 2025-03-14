// src/components/StatsCard.js
import React from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Layers } from 'lucide-react-native';
import styles from '@/styles/MainPage';

export default function StatsCard({ uniqueIngredients, fadeAnim, translateY }) {
  return (
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
  );
}
