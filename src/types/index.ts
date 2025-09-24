export interface Child {
  id: string;
  name: string;
  avatar: string;
  age: number;
  grade: string; // JKG, LKG, 1st, 2nd, 3rd, 4th
  parentId: string;
  createdAt: Date;
  lastLogin: Date;
  totalStars: number;
  totalCoins: number;
  badges: string[]; // Badge IDs
  unlockedLevels: string[];
  currentStreak: number;
  preferences: {
    soundEnabled: boolean;
    difficultyLevel: 'easy' | 'medium' | 'hard';
  };
}

export interface Parent {
  id: string;
  email: string;
  name: string;
  pin: string;
  children: string[]; // Child IDs
  createdAt: Date;
  lastLogin: Date;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  levels?: Level[];
  requiredGrades?: string[];
  grades?: string[];
  isActive?: boolean;
}

export interface Level {
  id: string;
  subjectId: string;
  levelNumber: number;
  title: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  prerequisites?: string[]; // Level IDs
  lessons?: Lesson[];
  isUnlocked?: boolean;
  starsRequired?: number;
  rewards?: Reward[];
  grade?: string;
  isActive?: boolean;
  estimatedDuration?: number;
}

export interface Lesson {
  id: string;
  levelId: string;
  title: string;
  description: string;
  type: 'quiz' | 'game' | 'story' | 'practice' | 'interactive';
  content: LessonContent | any; // Allow flexible content types
  duration: number; // in minutes
  maxStars?: number;
  audioUrl?: string;
  imageUrl?: string;
  difficulty?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: Date;
}

export interface LessonContent {
  questions: Question[];
  instructions: string;
  hints: string[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'drag-drop' | 'matching' | 'fill-blank' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  audioUrl?: string;
  imageUrl?: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: string;
  earnedAt?: Date;
}

export interface Reward {
  type: 'stars' | 'coins' | 'badge' | 'avatar-item';
  amount?: number;
  itemId?: string;
}

export interface Progress {
  childId: string;
  subjectId: string;
  levelId: string;
  lessonId: string;
  completed: boolean;
  stars: number;
  attempts: number;
  bestScore: number;
  timeSpent: number; // in seconds
  completedAt?: Date;
  weakAreas: string[];
  strongAreas: string[];
}

export interface GameSession {
  id: string;
  childId: string;
  startTime: Date;
  endTime?: Date;
  activitiesCompleted: number;
  totalStarsEarned: number;
  totalCoinsEarned: number;
  badgesEarned: string[];
  subjectsPlayed: string[];
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'quiz' | 'mini-game';
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: Reward[];
  completedBy: string[]; // Child IDs
  content: LessonContent;
}

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlockRequirement: {
    type: 'stars' | 'badges' | 'levels';
    amount: number;
  };
}

export interface AvatarCustomization {
  childId: string;
  currentAvatar: string;
  unlockedItems: {
    hats: string[];
    clothes: string[];
    accessories: string[];
  };
  currentItems: {
    hat?: string;
    clothes?: string;
    accessory?: string;
  };
}

// UI and State Types
export interface AuthState {
  user: Child | Parent | null;
  userType: 'child' | 'parent' | null;
  isLoading: boolean;
  error: string | null;
}

export interface GameState {
  currentSubject: string | null;
  currentLevel: string | null;
  currentLesson: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  timeRemaining: number;
}

export interface UIState {
  sidebarOpen: boolean;
  currentModal: string | null;
  notifications: Notification[];
  theme: 'light' | 'dark';
  soundEnabled: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  timestamp: Date;
}