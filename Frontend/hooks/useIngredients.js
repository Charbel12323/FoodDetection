import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { getIngredients } from '@/api/ingredientService';
import { useUserStore } from '@/stores/useUserStore';

// useIngredients.js
export default function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access userId from the user object
  const userId = useUserStore((state) => state.user?.user_id);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);

        if (!userId) {
          console.warn('No userId found. Cannot fetch ingredients.');
          return;
        }

        // Now userId is valid
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

  return { ingredients, loading, fadeAnim, translateY };
}
