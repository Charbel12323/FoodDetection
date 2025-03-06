import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useRouter } from 'expo-router';
import React, {  useState , useRef} from 'react';


export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);


  if (!permission) {
    // Permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Permissions not granted.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        setLoading(true);
  
        // Capture photo with Base64 enabled
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        console.log('Photo taken:', photo);
  
        // Send the Base64 string (optionally stripping the prefix) to the backend
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
            // Optionally handle the error (e.g., show a message to the user)
          }
        } else {
          console.error("Unexpected response format:", result);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleDeleteIngredient = (index) => {
    setGptResponse((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };
  
  if (gptResponse && gptResponse.ingredients) {
    return (
      <ScrollView contentContainerStyle={styles.responseContainer}>
        <Text style={styles.heading}>Ingredients:</Text>
        {gptResponse.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{'\u2022'} {ingredient}</Text>
            <TouchableOpacity onPress={() => handleDeleteIngredient(index)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Button title="Back" onPress={() => setGptResponse(null)} />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        {loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        ) : (
          <Button title="Take Pic" onPress={handleTakePicture} />
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
  responseContainer: {
    flexGrow: 1,
    backgroundColor: '#000', // Black background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    color: '#1E90FF', // Bright blue color (DodgerBlue)
    marginBottom: 20,
    fontWeight: 'bold',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF', // Blue background for each ingredient
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '30%',
    justifyContent: 'space-between',
  },
  ingredientText: {
    fontSize: 18,
    color: '#fff', // White text for contrast
  },
  deleteButtonContainer: {
    backgroundColor: 'black', // White background for the button
    borderRadius: 50,
    padding: 5,
  },
  deleteButton: {
    color: 'red', // Blue text to match the theme
    fontSize: 16,
    fontWeight: 'bold',
  },
});
