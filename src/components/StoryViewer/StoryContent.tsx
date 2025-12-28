import { useState, useEffect } from 'react';
import styles from './StoryContent.module.css';

interface StoryContentProps {
  imageUrl: string;
  onRetry?: () => void;
}

export const StoryContent = ({ imageUrl, onRetry }: StoryContentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = imageUrl;

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  if (hasError) {
    return (
      <div className={styles.storyContent}>
        <div className={styles.errorState}>
          <p>Failed to load story</p>
          {onRetry && (
            <button className={styles.retryButton} onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.storyContent}>
      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
        </div>
      )}
      <img
        src={imageUrl}
        alt="Story"
        className={`${styles.storyImage} ${isLoading ? styles.loading : styles.loaded}`}
      />
    </div>
  );
};
