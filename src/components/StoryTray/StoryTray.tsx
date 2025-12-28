import { UserStoryGroup } from '../../types';
import { StoryCard } from './StoryCard';
import styles from './StoryTray.module.css';

interface StoryTrayProps {
  stories: UserStoryGroup[];
  loading: boolean;
  error: string | null;
  onOpenStory: (index: number) => void;
  onRetry: () => void;
}

export const StoryTray = ({ stories, loading, error, onOpenStory, onRetry }: StoryTrayProps) => {
  // NOTE: Virtualization is already implemented via IntersectionObserver in StoryCard.
  // For 50+ users, consider adding windowing (react-window) to render only visible items
  // and recycle DOM nodes for better performance.

  if (loading) {
    return (
      <div className={styles.storyTray} role="status" aria-live="polite">
        <div className={styles.loadingState}>
          <div className={styles.spinner} aria-hidden="true" />
          <h2>Loading stories...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.storyTray} role="alert" aria-live="assertive">
        <div className={styles.errorState}>
          <h2>{error}</h2>
          <button
            className={styles.retryButton}
            onClick={onRetry}
            aria-label="Retry loading stories"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className={styles.storyTray}>
        <div className={styles.emptyState}>
          <h2>No stories available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.storyTray} role="region" aria-label="Story tray">
      <div className={styles.trayContainer}>
        {stories.map((user, index) => (
          <StoryCard key={user.userId} user={user} index={index} onOpen={onOpenStory} />
        ))}
      </div>
    </div>
  );
};
