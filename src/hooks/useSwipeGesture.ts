import { useState, useCallback } from 'react';
import { SWIPE_THRESHOLD } from '../utils/constants';

export const useSwipeGesture = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  }, [touchStart, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};
