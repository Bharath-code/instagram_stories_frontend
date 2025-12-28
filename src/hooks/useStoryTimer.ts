import { useState, useEffect, useRef } from 'react';

export const useStoryTimer = (duration: number, isPaused: boolean, key: string | number) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Reset state when key changes
    setProgress(0);
    startTimeRef.current = null;
    pausedAtRef.current = null;
  }, [key]);

  useEffect(() => {
    if (isPaused) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (!pausedAtRef.current) {
        pausedAtRef.current = performance.now();
      }
      return;
    }

    if (pausedAtRef.current && startTimeRef.current) {
      const pausedDuration = performance.now() - pausedAtRef.current;
      startTimeRef.current += pausedDuration;
      pausedAtRef.current = null;
    } else if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
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
  }, [duration, isPaused, key]);

  return { progress };
};
