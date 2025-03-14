// src/screens/CameraScreen.js
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import useCameraScanner from '@/hooks/useCameraScanner';
import PermissionScreen from '@/components/CameraScanner/PermissionScreen';
import ResultScreen from '@/components/CameraScanner/ResultScreen';
import CameraViewComponent from '@/components/CameraScanner/CameraViewComponent';
import styles from '@/styles/CameraScannerStyle';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const {
    cameraRef,
    loading,
    gptResponse,
    setGptResponse,
    handleTakePicture,
    handleApprove,
    handleDeleteIngredient,
  } = useCameraScanner();

  const [flashMode, setFlashMode] = useState('off');

  const toggleFlash = () => {
    setFlashMode(flashMode === 'off' ? 'on' : 'off');
  };

  // Handle camera permission state
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <PermissionScreen requestPermission={requestPermission} />;
  }

  // Render result screen if ingredients have been detected
  if (gptResponse && gptResponse.ingredients) {
    return (
      <ResultScreen 
        ingredients={gptResponse.ingredients}
        onApprove={handleApprove}
        onRetake={() => setGptResponse(null)}
        onDelete={handleDeleteIngredient}
      />
    );
  }

  // Render the camera view by default
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CameraViewComponent 
        cameraRef={cameraRef}
        loading={loading}
        onCapture={handleTakePicture}
        flashMode={flashMode}
        toggleFlash={toggleFlash}
      />
    </View>
  );
}
