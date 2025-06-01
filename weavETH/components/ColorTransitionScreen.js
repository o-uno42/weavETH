import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

export default function ColorTransitionScreen() {
  const bgColorAnim = useRef(new Animated.Value(0)).current; // value 0 to 1

  useEffect(() => {
    Animated.timing(bgColorAnim, {
      toValue: 1,
      duration: 1000, // 1 second
      useNativeDriver: false, // can't animate color with native driver
    }).start();
  }, []);

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#3366FF'], // from black to blue
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>Color Fade Animation</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
