import { useState, useEffect, useRef } from 'react';

export const useStoryTimer = (duration: number, isPaused: boolean) => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (isPaused) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current!;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [duration, isPaused]);

  const reset = () => {
    setProgress(0);
  };

  return { progress, reset };
};
