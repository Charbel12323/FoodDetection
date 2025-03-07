import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const [flashMode, setFlashMode] = useState('off');


  
  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        setLoading(true);
  
        // Capture photo with Base64 enabled
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        console.log('Photo taken:', photo);
  
        // Send the Base64 string to the backend
        const response = await fetch('http://192.168.1.66:3000/upload-base64', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            photo: photo.base64.replace(/^data:image\/\w+;base64,/, '')
          })
        });
        
        const result = await response.json();
        console.log('Scan result:', result);
  
        // Process the raw GPT response
        if (result.data && result.data.ingredients) {
          setGptResponse(result.data);
        } else if (result.ingredients) {
          setGptResponse(result);
        } else if (result.message && result.message.content) {
          // Fallback: if there's a nested message, try to parse it.
          const rawResponse = result.message.content;
          console.log("Raw GPT response:", rawResponse);
          try {
            const parsedResponse = JSON.parse(rawResponse);
            setGptResponse(parsedResponse);
          } catch (error) {
            console.error("Error parsing GPT response as JSON:", error);
          }
        } else {
          console.error("Unexpected response format:", result);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleApprove = async () => {
    try {
      // Replace with your actual logged-in user ID
      const userId = 6;
      const response = await fetch('http://192.168.1.66:3000/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          ingredients: gptResponse.ingredients
        })
      });
      const result = await response.json();
      if (response.ok) {
        alert('Ingredients approved and saved!');
      } else {
        alert('Error saving ingredients');
        console.error(result);
      }
    } catch (error) {
      console.error('Error approving ingredients:', error);
    }
  };
  
  
  const handleDeleteIngredient = (index) => {
    setGptResponse((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const toggleFlash = () => {
    setFlashMode(flashMode === 'off' ? 'on' : 'off');
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  cameraTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  flashButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  flashButtonActive: {
    backgroundColor: 'rgba(255, 204, 0, 0.7)',
  },
  flashButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  cameraFooter: {
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: width * 0.8,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Permission screen styles
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContent: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  permissionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a2a6c',
  },
  permissionMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#555',
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#1a2a6c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Results screen styles
  resultContainer: {
    flex: 1,
  },
  resultHeader: {
    padding: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 20,
  },
  ingredientsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  ingredientCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  ingredientIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ingredientIcon: {
    fontSize: 20,
  },
  ingredientText: {
    flex: 1,
    fontSize: 17,
    color: '#333333',
    fontWeight: '500',
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  backButton: {
    // Remove absolute positioning
    // position: 'absolute',
    // bottom: 30,
    // left: 20,
    // right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20, // Add marginTop to space from the approve button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backButtonText: {
    color: '#2C5364',
    fontSize: 18,
    fontWeight: 'bold',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  approveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});