import {create} from 'zustand';

export const useUserStore = create((set) => ({
  user: null, // Initial state is no user logged in

  // Function to set the logged-in user
  setUser: (userData) => set({ user: userData }),

  // Function to clear user (useful for logout)
  clearUser: () => set({ user: null }),
}));

