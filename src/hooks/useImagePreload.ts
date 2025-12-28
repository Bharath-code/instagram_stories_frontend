import { useEffect, useRef } from 'react';

export const useImagePreload = (url: string) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!url) return;

    if (!imageRef.current) {
      imageRef.current = new Image();
    }

    imageRef.current.src = url;
  }, [url]);

  return imageRef.current;
};
