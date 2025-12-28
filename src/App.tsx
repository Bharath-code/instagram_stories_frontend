import { useState } from 'react';
import { StoryViewerState } from './types';
import { StoryProvider } from './context/StoryContext';
import { useStoryData } from './hooks/useStoryData';
import { StoryTray } from './components/StoryTray/StoryTray';
import { StoryViewer } from './components/StoryViewer/StoryViewer';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

const AppContent = () => {
  const { stories, loading, error, retry } = useStoryData();
  const [viewerState, setViewerState] = useState<StoryViewerState>({
    isOpen: false,
    activeUserIndex: 0,
    activeStoryIndex: 0,
  });

  const handleOpenStory = (userIndex: number) => {
    setViewerState({
      isOpen: true,
      activeUserIndex: userIndex,
      activeStoryIndex: 0,
    });
  };

  const handleCloseViewer = () => {
    setViewerState({
      isOpen: false,
      activeUserIndex: 0,
      activeStoryIndex: 0,
    });
  };

  return (
    <>
      <StoryTray
        stories={stories}
        loading={loading}
        error={error}
        onOpenStory={handleOpenStory}
        onRetry={retry}
      />
      {viewerState.isOpen && stories.length > 0 && (
        <StoryViewer
          stories={stories}
          initialUserIndex={viewerState.activeUserIndex}
          initialStoryIndex={viewerState.activeStoryIndex}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <StoryProvider>
        <AppContent />
      </StoryProvider>
    </ErrorBoundary>
  );
};

export default App;
