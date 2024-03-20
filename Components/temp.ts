import { useEffect, useState } from "react";

export const useElapsedTime = (isActive: boolean) => {
    const [startTime, setStartTime] = useState<number>();
    const [elapsedTime, setElapsedTime] = useState(0);
  
    useEffect(() => {
      let interval: NodeJS.Timeout | undefined;
      if (isActive) {
        if (!startTime) {
          setStartTime(Date.now());
        } else {
          interval = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
          }, 1000);
        }
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isActive, startTime]);
  
    // Reset function to reset the timer
    const resetTimer = () => {
      setStartTime(undefined);
      setElapsedTime(0);
    };
  
    // Format elapsedTime as needed for display...
  
    return { elapsedTime, resetTimer };
  };