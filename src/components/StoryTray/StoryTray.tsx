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
  if (loading) {
    return (
      <div className={styles.storyTray}>
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <h3>Loading stories...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.storyTray}>
        <div className={styles.errorState}>
          <h3>{error}</h3>
          <button className={styles.retryButton} onClick={onRetry}>
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
          <h3>No stories available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.storyTray}>
      <div className={styles.trayContainer}>
        {stories.map((user, index) => (
          <StoryCard key={user.userId} user={user} index={index} onOpen={onOpenStory} />
        ))}
      </div>
    </div>
  );
};
