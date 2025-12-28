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
      { threshold: 0.1, rootMargin: '50px' }
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

  const fallbackColor = user.username.charCodeAt(0) % 3 === 0 ? '#e6683c' :
                       user.username.charCodeAt(0) % 2 === 0 ? '#cc2366' : '#bc1888';

  return (
    <div
      ref={cardRef}
      className={styles.storyCard}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(index)}
      onKeyDown={handleKeyDown}
      aria-label={`View ${user.username}'s stories`}
      style={{ contain: 'layout style paint' }}
    >
      <div
        className={`${styles.avatarWrapper} ${allSeen ? styles.seen : styles.unseen}`}
      >
        {!imageLoaded && !imageError && (
          <div className={styles.skeletonAvatar} />
        )}
        {imageError ? (
          <div
            className={styles.avatar}
            style={{
              background: fallbackColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
        ) : isVisible && (
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
        )}
      </div>
      <span className={styles.username}>{user.username}</span>
    </div>
  );
};
