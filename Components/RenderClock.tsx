import { useEffect, useRef, useState } from "react";
import { Duration, formatClockDuration, formatTimerDuration } from "../types";
import React from "react";
import { StyleProp, TextStyle, Text } from "react-native";

type DurationFormatter = (duration: Duration, subtract: `${number}s`) => `${string}:${string}`;

const useIntervalTimer = (duration: Duration, formatDuration: DurationFormatter) => {
  const oneSecondRef = useRef(1);
  const [timeLeft, setTimeLeft] = useState<string>(formatDuration(duration, '0s'));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((currentValue) => {
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
  }, [duration, formatDuration]);

  return timeLeft;
};

export const RenderClock: React.FC<{ duration: Duration, styleText: StyleProp<TextStyle>, formatDuration: DurationFormatter }> = ({ duration, styleText, formatDuration }) => {
  const timeLeft = useIntervalTimer(duration, formatDuration);
  return <Text style={styleText}>{timeLeft}</Text>;
};

// Usage example for Timer Clock
// <RenderClock duration="1h" styleText={yourTextStyle} formatDuration={formatTimerDuration} />

// Usage example for Clock
// <RenderClock duration="30m" styleText={yourTextStyle} formatDuration={formatClockDuration} />
