import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { UserStoryGroup } from '../../types';
import { useStoryTimer } from '../../hooks/useStoryTimer';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { useImagePreload } from '../../hooks/useImagePreload';
import { useSeenStories } from '../../context/StoryContext';
import { STORY_DURATION } from '../../utils/constants';
import { ProgressBar } from './ProgressBar';
import { Header } from './Header';
import { StoryContent } from './StoryContent';
import styles from './StoryViewer.module.css';

interface StoryViewerProps {
  stories: UserStoryGroup[];
  initialUserIndex: number;
  initialStoryIndex: number;
  onClose: () => void;
}

export const StoryViewer = ({
  stories,
  initialUserIndex,
  initialStoryIndex,
  onClose,
}: StoryViewerProps) => {
  const [activeUserIndex, setActiveUserIndex] = useState(initialUserIndex);
  const [activeStoryIndex, setActiveStoryIndex] = useState(initialStoryIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [completedStories, setCompletedStories] = useState<Set<number>>(new Set());

  const currentUser = stories[activeUserIndex];
  const currentStory = currentUser?.stories[activeStoryIndex];
  const { markAsSeen } = useSeenStories();

  const { progress, reset } = useStoryTimer(STORY_DURATION, isPaused);

  const nextStoryIndex = activeStoryIndex + 1;
  const nextUserIndex = activeUserIndex + 1;
  const prevStoryIndex = activeStoryIndex - 1;
  const prevUserIndex = activeUserIndex - 1;

  const nextImageUrl = useMemo(() => {
    if (nextStoryIndex < currentUser?.stories.length) {
      return currentUser.stories[nextStoryIndex].imageUrl;
    } else if (nextUserIndex < stories.length) {
      return stories[nextUserIndex].stories[0].imageUrl;
    }
    return null;
  }, [nextStoryIndex, currentUser, nextUserIndex, stories]);

  useImagePreload(nextImageUrl || '');

  const goToNext = useCallback(() => {
    if (nextStoryIndex < currentUser?.stories.length) {
      setActiveStoryIndex(nextStoryIndex);
      setCompletedStories(prev => new Set(prev).add(activeStoryIndex));
      reset();
    } else if (nextUserIndex < stories.length) {
      setActiveUserIndex(nextUserIndex);
      setActiveStoryIndex(0);
      setCompletedStories(new Set());
      reset();
    } else {
      onClose();
    }
  }, [nextStoryIndex, currentUser, nextUserIndex, stories, activeStoryIndex, reset, onClose]);

  const goToPrevious = useCallback(() => {
    if (prevStoryIndex >= 0) {
      setActiveStoryIndex(prevStoryIndex);
      setCompletedStories(prev => {
        const newSet = new Set(prev);
        newSet.delete(prevStoryIndex);
        return newSet;
      });
      reset();
    } else if (prevUserIndex >= 0) {
      setActiveUserIndex(prevUserIndex);
      setActiveStoryIndex(stories[prevUserIndex].stories.length - 1);
      setCompletedStories(new Set());
      reset();
    } else {
      reset();
    }
  }, [prevStoryIndex, prevUserIndex, stories, reset]);

  const { onTouchStart, onTouchEnd } = useSwipeGesture(goToNext, goToPrevious);

  const handleTap = (e: React.MouseEvent) => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.25) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [goToNext, goToPrevious, onClose]);

  useEffect(() => {
    if (currentStory) {
      markAsSeen(currentUser.userId, currentStory.storyId);
    }
  }, [currentStory, currentUser.userId, markAsSeen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (progress >= 100 && !isPaused) {
      goToNext();
    }
  }, [progress, isPaused, goToNext]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  if (!currentUser || !currentStory) {
    return null;
  }

  return (
    <div
      className={styles.viewer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={handlePause}
      onMouseUp={handleResume}
      onMouseLeave={handleResume}
    >
      <div className={styles.storyWrapper}>
        <ProgressBar
          totalStories={currentUser.stories.length}
          currentIndex={activeStoryIndex}
          currentProgress={progress}
          completedIndices={completedStories}
        />
        <Header
          username={currentUser.username}
          profilePicture={currentUser.profilePicture}
          onClose={onClose}
        />
        <StoryContent
          imageUrl={currentStory.imageUrl}
          onRetry={() => reset()}
        />
        <div className={styles.viewerOverlay} onClick={handleTap}>
          <div className={`${styles.navigationZone} ${styles.leftZone}`} />
          <div className={`${styles.navigationZone} ${styles.rightZone}`} />
        </div>
      </div>
    </div>
  );
};
