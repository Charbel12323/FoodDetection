import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated, Image } from 'react-native';
import { CameraView } from 'expo-camera';
import styles from '@/styles/CameraScannerStyle';

export default function CameraViewComponent({ cameraRef, loading, onCapture, flashMode, toggleFlash }) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(spinAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(spinAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [loading]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  return (
    <CameraView 
      style={styles.camera} 
      ref={cameraRef}
      flashMode={flashMode}
    >
      <SafeAreaView style={styles.cameraControls}>
        {/* Header */}
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

        {/* Footer */}
        <View style={styles.cameraFooter}>
          {!loading && (
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

      {/* Animated Fridge Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <Animated.Image
              source={require('@/assets/images/fridge.png')} 
              style={{
                width: 100,
                height: 100,
                transform: [{ rotate: spin }],
              }}
            />
            <Text style={[styles.loadingText, { marginTop: 15 }]}>Scanning fridge...</Text>
          </View>
        </View>
      )}
    </CameraView>
  );
}
