export interface StoryItem {
  storyId: string;
  imageUrl: string;
}

export interface UserStoryGroup {
  userId: string;
  username: string;
  profilePicture: string;
  stories: StoryItem[];
}

export interface StoryViewerState {
  isOpen: boolean;
  activeUserIndex: number;
  activeStoryIndex: number;
}
