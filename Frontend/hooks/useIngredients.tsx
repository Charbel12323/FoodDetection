import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { getIngredients, saveIngredients } from '@/api/ingredientService';
import { useUserStore } from '@/stores/useUserStore';

export default function useIngredients() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = useUserStore((state) => state.user?.user_id);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const fetchIngredients = async () => {
      if (!userId) {
        console.warn('No userId found. Cannot fetch ingredients. Please log in');
        
        return;
      }
      try {
        setLoading(true);
        const fetchedIngredients = await getIngredients(userId);
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      } finally {
        setLoading(false);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    fetchIngredients();
  }, [userId, fadeAnim, translateY]);

  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      getIngredients(userId)
        .then(setIngredients)
        .catch((error) => console.error('Polling error:', error));
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  // Updated addIngredient function
  const addIngredient = async (name: string) => {
    if (!userId) {
      console.warn('No userId available.');
      return;
    }
    try {
      // Create a new array that includes the existing ingredients plus the new one
      const updatedIngredients = [...ingredients, name];
      // Save the full updated list to the backend
      await saveIngredients(userId, updatedIngredients);
      // Update the local state
      setIngredients(updatedIngredients);
    } catch (error) {
      console.error('Error saving ingredient:', error);
    }
  };

  return { ingredients, setIngredients, loading, fadeAnim, translateY, addIngredient };
}
