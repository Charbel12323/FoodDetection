// src/components/CameraViewComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/styles/CameraScannerStyle';

export default function CameraViewComponent({ cameraRef, loading, onCapture, flashMode, toggleFlash }) {
  return (
    <CameraView 
      style={styles.camera} 
      ref={cameraRef}
      flashMode={flashMode}
    >
      <SafeAreaView style={styles.cameraControls}>
        <View style={styles.cameraHeader}>
          <Text style={styles.cameraTitle}>Ingredient Scanner</Text>
          <TouchableOpacity 
            style={[styles.flashButton, flashMode === 'on' && styles.flashButtonActive]} 
            onPress={toggleFlash}
          >
            <Text style={styles.flashButtonText}>
              {flashMode === 'on' ? '⚡️ ON' : '⚡️ OFF'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraFooter}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loadingText}>Analyzing ingredients...</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={onCapture}
              activeOpacity={0.7}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </CameraView>
  );
}
