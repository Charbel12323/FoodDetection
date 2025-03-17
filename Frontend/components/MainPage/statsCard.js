// src/components/StatsCard.js
import React from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/styles/MainPage';

export default function StatsCard({ icon: Icon, value, title, fadeAnim, translateY, onPress }) {
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
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <LinearGradient
          colors={['#0BAB64', '#3BB78F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardIconContainer}>
            <Icon size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.cardValue}>{value}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
