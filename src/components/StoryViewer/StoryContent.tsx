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
      <div className={styles.storyContent} role="alert" aria-live="assertive">
        <div className={styles.errorState}>
          <p>Failed to load story</p>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            Check your connection or try again later
          </p>
          {onRetry && (
            <button
              className={styles.retryButton}
              onClick={onRetry}
              aria-label="Retry loading story"
            >
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
        <div className={styles.loadingState} role="status" aria-live="polite">
          <div className={styles.spinner} aria-hidden="true" />
          <p style={{ color: 'white', marginTop: '16px', fontSize: '14px' }}>
            Loading story...
          </p>
        </div>
      )}
      <img
        src={imageUrl}
        alt="Story image"
        className={`${styles.storyImage} ${isLoading ? styles.loading : styles.loaded}`}
        draggable={false}
      />
    </div>
  );
};
