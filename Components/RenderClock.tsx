import { useEffect, useRef, useState } from "react";
import { Duration, formatDuration } from "../types";
import React from "react";
import { StyleProp, TextStyle, Text } from "react-native";

export const RenderClock: React.FC<{ duration: Duration, styleText: StyleProp<TextStyle>}> = ({ duration, styleText }) => {
    const oneSecondRef = useRef(1);
    const [timeLeft, setTimeLeft] = useState<string>(formatDuration(duration));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setTimeLeft(() => {
            const time = formatDuration(duration, `${oneSecondRef.current}s`);
            oneSecondRef.current += 1;
            return time;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [duration, oneSecondRef.current]);
  
    return <Text style={styleText} >{timeLeft}</Text>
  }
