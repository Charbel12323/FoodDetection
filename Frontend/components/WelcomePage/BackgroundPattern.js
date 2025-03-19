import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function BackgroundPattern() {
  return (
    <View style={styles.patternContainer}>
      <Image
        source={require('@/assets/images/fridge.png')}
        style={styles.patternTopRight}
        resizeMode="contain"
      />
      <Image
        source={require('@/assets/images/fridge.png')}
        style={styles.patternBottomLeft}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  patternTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 120,
    height: 120,
    opacity: 0.1,
  },
  patternBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 120,
    height: 120,
    opacity: 0.1,
  },
});
