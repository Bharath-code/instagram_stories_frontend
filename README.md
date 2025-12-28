# Instagram Stories Clone

A mobile-first Instagram Stories viewer built with React, TypeScript, and Vite.

## Features

- ✅ Horizontal scrollable story tray with lazy loading
- ✅ Fullscreen story viewer with 5-second auto-advance
- ✅ Touch gestures (swipe left/right to navigate)
- ✅ Tap navigation (left 25% / right 75% zones)
- ✅ Segmented progress bar per user
- ✅ Pause/resume on touch
- ✅ Story seen status with gradient rings
- ✅ Smooth transitions and animations
- ✅ Loading states with skeleton loaders
- ✅ Error handling with exponential backoff retry
- ✅ Keyboard navigation support
- ✅ Story preloading for seamless transitions
- ✅ Safe area support for notched devices
- ✅ Accessibility (ARIA labels, keyboard, focus states)

## Tech Stack

- **React 18** - Functional components with hooks
- **TypeScript** - Full type safety
- **Vite** - Fast build tool
- **CSS Modules** - Scoped styling
- **No external libraries** - Pure React and native APIs

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── StoryTray/
│   │   ├── StoryTray.tsx           # Horizontal scroll container
│   │   ├── StoryCard.tsx            # Individual story thumbnail
│   │   └── StoryCard.module.css     # Circular styling, gradient rings
│   ├── StoryViewer/
│   │   ├── StoryViewer.tsx          # Main fullscreen modal
│   │   ├── ProgressBar.tsx          # Segmented progress bars
│   │   ├── Header.tsx               # User info, close button
│   │   ├── StoryContent.tsx         # Image display, loading/error
│   │   └── StoryViewer.module.css   # Fullscreen styling
│   └── ErrorBoundary.tsx            # Error catching
├── hooks/
│   ├── useStoryTimer.ts             # 5s timer logic with pause/resume
│   ├── useSwipeGesture.ts           # Touch event abstraction
│   ├── useImagePreload.ts           # Next image caching
│   └── useStoryData.ts              # Fetch with retry, localStorage
├── types/
│   ├── story.types.ts               # TypeScript interfaces
│   └── css-modules.d.ts             # CSS module declarations
├── utils/
│   ├── helpers.ts                   # Retry logic, seen status helpers
│   └── constants.ts                 # Magic numbers
├── context/
│   └── StoryContext.tsx             # Global state (seen, data)
├── App.tsx                          # Main app, error boundary
└── main.tsx                         # Entry point
```

## Key Implementation Details

### Custom Hooks

- **useStoryTimer**: Uses requestAnimationFrame for smooth progress animation
- **useSwipeGesture**: Handles touch events for swipe navigation
- **useImagePreload**: Preloads next story images for zero-lag transitions
- **useStoryData**: Fetches data with exponential backoff retry logic

### State Management

- React Context for global state (seen stories)
- localStorage for persistence
- Local component state for viewer navigation

### Performance Optimizations

- Lazy loading for tray images (IntersectionObserver)
- Image preloading for smooth transitions
- CSS transitions for smooth animations
- Efficient re-render prevention with useCallback

### Mobile UX

- Touch-friendly tap zones
- Swipe gestures
- Safe area support
- Touch feedback
- Responsive design

## Testing

Open browser DevTools and test:

1. **Story Tray**: Horizontal scroll, seen status rings
2. **Story Viewer**: Auto-advance, tap navigation, swipe gestures
3. **Pause/Resume**: Long press to pause, release to resume
4. **Loading States**: Network throttling, skeleton loaders
5. **Error Handling**: Network errors, retry functionality
6. **Keyboard**: Arrow keys for navigation, Escape to close
7. **Accessibility**: Screen reader, keyboard navigation, focus states

## Browser Support

Modern browsers only (Chrome, Firefox, Safari, Edge).

## License

MIT
