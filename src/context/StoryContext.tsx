import { createContext, useContext, useState, ReactNode } from 'react';
import { getStoryKey } from '../utils/helpers';

interface SeenStories {
  [key: string]: boolean;
}

interface StoryContextType {
  seenStories: SeenStories;
  markAsSeen: (userId: string, storyId: string) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [seenStories, setSeenStories] = useState<SeenStories>(() => {
    const saved = localStorage.getItem('seenStories');
    return saved ? JSON.parse(saved) : {};
  });

  const markAsSeen = (userId: string, storyId: string) => {
    const key = getStoryKey(userId, storyId);
    setSeenStories(prev => {
      if (prev[key]) return prev;
      const updated = { ...prev, [key]: true };
      localStorage.setItem('seenStories', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StoryContext.Provider value={{ seenStories, markAsSeen }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useSeenStories = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useSeenStories must be used within StoryProvider');
  }
  return context;
};
