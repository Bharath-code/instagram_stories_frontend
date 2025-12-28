import { useEffect, useRef, useState } from 'react';
import { UserStoryGroup } from '../../types';
import { useSeenStories } from '../../context/StoryContext';
import styles from './StoryCard.module.css';

interface StoryCardProps {
  user: UserStoryGroup;
  index: number;
  onOpen: (index: number) => void;
}

export const StoryCard = ({ user, index, onOpen }: StoryCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { seenStories } = useSeenStories();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const allSeen = user.stories.every(story =>
    seenStories[`${user.userId}-${story.storyId}`]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(index);
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.storyCard}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(index)}
      onKeyDown={handleKeyDown}
      aria-label={`View ${user.username}'s stories`}
    >
      <div
        className={`${styles.avatarWrapper} ${allSeen ? styles.seen : styles.unseen}`}
      >
        {!imageLoaded && !imageError && (
          <div className={styles.skeletonAvatar} />
        )}
        {isVisible && !imageError ? (
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className={styles.avatar}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        ) : null}
      </div>
      <span className={styles.username}>{user.username}</span>
    </div>
  );
};
