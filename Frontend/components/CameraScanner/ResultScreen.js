// src/components/ResultScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/styles/CameraScannerStyle';

export default function ResultScreen({ ingredients, onApprove, onRetake, onDelete }) {
  return (
    <SafeAreaView style={styles.resultContainer}>
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        style={styles.gradientBackground}
      />
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>Ingredients Found</Text>
        <Text style={styles.resultSubtitle}>
          {ingredients.length} items detected
        </Text>
      </View>
      <ScrollView 
        contentContainerStyle={styles.ingredientsList}
        showsVerticalScrollIndicator={false}
      >
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientCard}>
            <View style={styles.ingredientIconContainer}>
              <Text style={styles.ingredientIcon}>🥘</Text>
            </View>
            <Text style={styles.ingredientText}>{ingredient}</Text>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => onDelete(index)}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={styles.approveButton}
        onPress={onApprove}
      >
        <Text style={styles.approveButtonText}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onRetake}
      >
        <Text style={styles.backButtonText}>Take Another Photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
