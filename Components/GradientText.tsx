import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, Text, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export function GradientText(props: { text: string, style: StyleProp<TextStyle> }) {
  const [progress, setProgress] = useState(0);
  const [isBackwards, setIsBackwards] = useState(false);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        let nextProgress = prevProgress + (isBackwards ? -0.01 : 0.01);
        if (nextProgress > 1) {
          setIsBackwards(true);
        } else if (nextProgress < 0.4) {
          setIsBackwards(false);
        }
        return nextProgress;
      });
      return () => clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [isBackwards, progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate(prevRotate => {
        let nextRotate = prevRotate + 1;
        if (nextRotate > 360) {
          nextRotate = 0;
        }
        return nextRotate;
      });
      return () => clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [rotate]);


  const easedProgress = easeInOut(progress);

  // Calculate start and end based on easedProgress
  const start = easedProgress * 0.4; // Start ranges from 0 to 0.4
  const end = 0.41 + easedProgress * (1 - 0.41); // End ranges from 0.41 to 1

  return (
    <MaskedView maskElement={<Text style={[props.style, { backgroundColor: 'transparent' }]}>{props.text}</Text>}>
      <LinearGradient
        start={{ x: start, y: 0 }}
        end={{ x: end, y: 0,}}
        colors={['#0c4a6e', '#38bdf8', "#15803d", '#ea580c', '#0369a1']}
      >
        <Text style={[props.style, { opacity: 0 }]}>{props.text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}


function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}


const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
