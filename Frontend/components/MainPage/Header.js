import React from 'react';
import { View } from 'react-native';
import HeaderUI from './HeaderUI';
import StatsCard from './statsCard';
import useIngredients from '@/hooks/useIngredients';
import useRecipes from '@/hooks/userRecipes'; // new hook
import styles from '@/styles/MainPage';
import { Layers, BookOpen } from 'lucide-react-native';

function Header() {
  const { ingredients, fadeAnim, translateY } = useIngredients();
  const uniqueIngredients = new Set(ingredients).size;
  
  const { recipes } = useRecipes(); 
  const numberOfRecipes = recipes ? recipes.length : 0;

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
        />
        <StatsCard 
          icon={BookOpen} 
          value={numberOfRecipes.toString()}
          title="Number of Recipes" 
          fadeAnim={fadeAnim} 
          translateY={translateY} 
        />
      </View>
      {/* Decorative elements */}
      <View style={styles.decorativeCircle} />
      <View style={styles.decorativeCircleSmall} />
    </View>
  );
}

export default Header;
