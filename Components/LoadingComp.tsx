import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const Loading = () => {
   const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      rotateAnim.setValue(0); 
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: true, 
        })
      ).start();
    };

    startRotation();
    return () => {
        rotateAnim.stopAnimation();
    };

  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '360deg'],
  });

  return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <AntDesign name="loading1" size={60} color="#7dd3fc" />
        </Animated.View>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
