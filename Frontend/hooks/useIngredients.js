// src/hooks/useIngredients.js
import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { getIngredients } from '@/api/ingredientService';

export default function useIngredients(userId = 6) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const fetchedIngredients = await getIngredients(userId);
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        // Start animations after data loads
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
  }, [fadeAnim, translateY, userId]);

  return { ingredients, loading, fadeAnim, translateY };
}
