import React from 'react';
import { View, Pressable } from 'react-native';
import HeaderUI from './HeaderUI';
import StatsCard from './statsCard';
import useIngredients from '@/hooks/useIngredients';
import useRecipes from '@/hooks/useRecipes'; // new hook
import styles from '@/styles/MainPage';
import { Layers, BookOpen } from 'lucide-react-native';
import { useRouter } from 'expo-router';

function Header() {
  const { ingredients, fadeAnim, translateY } = useIngredients();
  const uniqueIngredients = new Set(ingredients).size;
  
  const { recipes } = useRecipes(); 
  const numberOfRecipes = recipes ? recipes.length : 0;
  
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderUI />
      <View style={styles.cardsContainer}>
      <StatsCard 
  icon={Layers} 
  value={uniqueIngredients} 
  title="Unique Items" 
  fadeAnim={fadeAnim} 
  translateY={translateY} 
  onPress={() => router.push('/(Inventory)/Inventory')}
/>

<StatsCard 
  icon={BookOpen} 
  value={numberOfRecipes.toString()}
  title="Number of Recipes" 
  fadeAnim={fadeAnim} 
  translateY={translateY} 
  onPress={() => router.push('/(Recipes)/Recipes')}
/>
      </View>
      {/* Decorative elements */}
      <View style={styles.decorativeCircle} />
      <View style={styles.decorativeCircleSmall} />
    </View>
  );
}

export default Header;
