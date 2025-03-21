import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'expo-router';
import styles from '@/styles/UpdateProfileStyle';

export default function UpdateProfile() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const router = useRouter();

  const handleUpdate = async () => {
    // Debug log to check current values
    console.log('Updating user with:', { username, email });

    if (!username.trim() || !email.trim()) {
      Alert.alert('Error', 'Username and Email cannot be empty.');
      return;
    }

    try {
      await updateUser({ username, email });
      alert('Success', 'Profile updated successfully.');
      router.back();
    } catch (error) {
      console.error('Update error:', error);
      alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter new username"
      />
      <Text style={styles.label}>New Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter new email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
