

import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, 
  SafeAreaView, StatusBar, Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { uploadBase64, saveIngredients } from '../../api/ingredientService'; 
import styles from '@/styles/CameraScannerStyle'
export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  
  // 1) Take a picture and upload to the server
  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      setLoading(true);
      // Capture photo with Base64 enabled
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log('Photo taken:', photo);

      // Use service to send the Base64 string to your backend
      const result = await uploadBase64(photo.base64);
      console.log('Scan result from service:', result);

      // Process the raw GPT response
      if (result.data && result.data.ingredients) {
        setGptResponse(result.data);
      } else if (result.ingredients) {
        setGptResponse(result);
      } else if (result.message && result.message.content) {
       
        const rawResponse = result.message.content;
        try {
          const parsedResponse = JSON.parse(rawResponse);
          setGptResponse(parsedResponse);
        } catch (error) {
          console.error('Error parsing GPT response as JSON:', error);
        }
      } else {
        console.error('Unexpected response format:', result);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2) Approve the detected ingredients and save to the backend
  const handleApprove = async () => {
    if (!gptResponse || !gptResponse.ingredients) return;

    try {
      // For demonstration, we still have a hardcoded userId.
      // In a real app, fetch userId from AsyncStorage, Redux, or
      // from your current user session.
      const userId = 6;

      const response = await saveIngredients(userId, gptResponse.ingredients);
      console.log('Ingredients saved:', response);

      alert('Ingredients approved and saved!');
    } catch (error) {
      alert('Error saving ingredients');
      console.error('Error approving ingredients:', error);
    }
  };

  // 3) Remove an ingredient from the list
  const handleDeleteIngredient = (index) => {
    setGptResponse(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // 4) Toggle flash mode
  const toggleFlash = () => {
    setFlashMode(flashMode === 'off' ? 'on' : 'off');
  };

  // Handle camera permission state
  if (!permission) {
    // If permission object is null, we can return an empty view or a loading spinner
    return <View />;
  }

  if (!permission.granted) {
    // Permission not yet granted
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

  // 5) Render the result screen if we have recognized ingredients
  if (gptResponse && gptResponse.ingredients) {
    return (
      <SafeAreaView style={styles.resultContainer}>
        <LinearGradient
          colors={['#0F2027', '#203A43', '#2C5364']}
          style={styles.gradientBackground}
        />
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Ingredients Found</Text>
          <Text style={styles.resultSubtitle}>
            {gptResponse.ingredients.length} items detected
          </Text>
        </View>
        <ScrollView 
          contentContainerStyle={styles.ingredientsList}
          showsVerticalScrollIndicator={false}
        >
          {gptResponse.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientCard}>
              <View style={styles.ingredientIconContainer}>
                <Text style={styles.ingredientIcon}>🥘</Text>
              </View>
              <Text style={styles.ingredientText}>{ingredient}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteIngredient(index)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity 
          style={styles.approveButton}
          onPress={handleApprove}
        >
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setGptResponse(null)}
        >
          <Text style={styles.backButtonText}>Take Another Photo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 6) Default UI with CameraView
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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
                onPress={handleTakePicture}
                activeOpacity={0.7}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}


