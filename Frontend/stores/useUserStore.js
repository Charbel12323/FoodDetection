import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  user: null, // Initial state is no user logged in

  // Function to set the logged-in user and persist it to AsyncStorage
  setUser: (userData) => {
    AsyncStorage.setItem('user', JSON.stringify(userData))
      .catch((error) => console.error('Error saving user to storage:', error));
    set({ user: userData });
  },

  // Function to clear user (useful for logout) and remove it from AsyncStorage
  clearUser: () => {
    AsyncStorage.removeItem('user')
      .catch((error) => console.error('Error removing user from storage:', error));
    set({ user: null });
  },

  // Function to load the user from AsyncStorage
  loadUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
    }
  },

  // Function to update the user data both in the store and in AsyncStorage
  updateUser: async (newData) => {
    const currentUser = get().user;
    if (!currentUser) {
      console.error('No user is logged in.');
      return;
    }
    // Merge the existing user data with the new data
    const updatedUser = { ...currentUser, ...newData };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser });
    } catch (error) {
      console.error('Error updating user in storage:', error);
    }
  },
}));
