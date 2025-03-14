// src/components/PermissionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/styles/CameraScannerStyle';

export default function PermissionScreen({ requestPermission }) {
  return (
    <SafeAreaView style={styles.permissionContainer}>
      <LinearGradient
        colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
        style={styles.gradientBackground}
      />
      <View style={styles.permissionContent}>
        <Text style={styles.permissionTitle}>Camera Access</Text>
        <Text style={styles.permissionMessage}>
          We need your permission to analyze ingredients with the camera
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
