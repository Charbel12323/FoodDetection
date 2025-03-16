import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { getIngredients } from '@/api/ingredientService';
import { useUserStore } from '@/stores/useUserStore';

export default function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access userId from the user object
  const userId = useUserStore((state) => state.user?.user_id);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  // Initial fetch of ingredients when userId changes
  useEffect(() => {
    const fetchIngredients = async () => {
      if (!userId) {
        console.warn('No userId found. Cannot fetch ingredients.');
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

  // Polling effect for real-time updates every 5 seconds
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      getIngredients(userId)
        .then(setIngredients)
        .catch((error) => console.error('Polling error:', error));
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  return { ingredients, loading, fadeAnim, translateY };
}
