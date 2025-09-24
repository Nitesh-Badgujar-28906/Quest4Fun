import { Subject, Lesson, Avatar, Badge } from '@/types';

// Sample Subjects
export const sampleSubjects: Omit<Subject, 'id'>[] = [
  {
    name: 'Mathematics',
    icon: '🔢',
    color: '#4299E1',
    description: 'Fun with numbers, counting, and basic math!',
    levels: [],
    requiredGrades: ['JKG', 'LKG', '1st', '2nd', '3rd', '4th']
  },
  {
    name: 'English',
    icon: '📚',
    color: '#48BB78',
    description: 'Learn letters, words, and reading!',
    levels: [],
    requiredGrades: ['JKG', 'LKG', '1st', '2nd', '3rd', '4th']
  },
  {
    name: 'Science & Nature',
    icon: '🌱',
    color: '#F6AD55',
    description: 'Explore the world around us!',
    levels: [],
    requiredGrades: ['LKG', '1st', '2nd', '3rd', '4th']
  }
];

// Sample Math Lessons for JKG
export const sampleMathLessonsJKG: Omit<Lesson, 'id'>[] = [
  {
    levelId: 'math-jkg-level-1',
    title: 'Count to 5',
    description: 'Learn to count from 1 to 5 with fun objects!',
    type: 'quiz',
    duration: 10,
    maxStars: 3,
    content: {
      instructions: 'Count the objects and pick the right number!',
      hints: ['Count each object carefully', 'Use your fingers to help count'],
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'How many apples are there?',
          options: ['1', '2', '3', '4'],
          correctAnswer: '3',
          explanation: 'Great! There are 3 apples.',
          imageUrl: '/images/lessons/3-apples.png',
          audioUrl: '/audio/lessons/count-apples.mp3',
          points: 10
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: 'Count the stars!',
          options: ['3', '4', '5', '6'],
          correctAnswer: '5',
          explanation: 'Excellent! You counted 5 stars.',
          imageUrl: '/images/lessons/5-stars.png',
          audioUrl: '/audio/lessons/count-stars.mp3',
          points: 10
        }
      ]
    }
  },
  {
    levelId: 'math-jkg-level-1',
    title: 'Big and Small',
    description: 'Learn about size differences!',
    type: 'quiz',
    duration: 8,
    maxStars: 3,
    content: {
      instructions: 'Choose the bigger or smaller object!',
      hints: ['Look carefully at the sizes', 'Compare the objects'],
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Which elephant is bigger?',
          options: ['Left elephant', 'Right elephant'],
          correctAnswer: 'Left elephant',
          explanation: 'Yes! The left elephant is bigger.',
          imageUrl: '/images/lessons/elephants-size.png',
          audioUrl: '/audio/lessons/big-small.mp3',
          points: 10
        }
      ]
    }
  }
];

// Sample English Lessons for JKG
export const sampleEnglishLessonsJKG: Omit<Lesson, 'id'>[] = [
  {
    levelId: 'english-jkg-level-1',
    title: 'Letter A',
    description: 'Learn about the letter A and words that start with A!',
    type: 'quiz',
    duration: 12,
    maxStars: 3,
    content: {
      instructions: 'Find words that start with the letter A!',
      hints: ['Listen to the sound', 'A says "ah" like in Apple'],
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Which word starts with A?',
          options: ['Apple', 'Ball', 'Cat'],
          correctAnswer: 'Apple',
          explanation: 'Perfect! Apple starts with A.',
          imageUrl: '/images/lessons/letter-a-words.png',
          audioUrl: '/audio/lessons/letter-a.mp3',
          points: 10
        },
        {
          id: 'q2',
          type: 'drag-drop',
          question: 'Drag the letter A to the apple!',
          options: ['A', 'B', 'C'],
          correctAnswer: 'A',
          explanation: 'Great job! A is for Apple.',
          imageUrl: '/images/lessons/drag-a-to-apple.png',
          audioUrl: '/audio/lessons/a-for-apple.mp3',
          points: 15
        }
      ]
    }
  }
];

// Sample Avatars
export const sampleAvatars: Omit<Avatar, 'id'>[] = [
  {
    name: 'Happy Cat',
    imageUrl: '/images/avatars/cat-happy.png',
    unlockRequirement: { type: 'stars', amount: 0 }
  },
  {
    name: 'Brave Dog',
    imageUrl: '/images/avatars/dog-brave.png',
    unlockRequirement: { type: 'stars', amount: 0 }
  },
  {
    name: 'Smart Owl',
    imageUrl: '/images/avatars/owl-smart.png',
    unlockRequirement: { type: 'stars', amount: 50 }
  },
  {
    name: 'Fun Monkey',
    imageUrl: '/images/avatars/monkey-fun.png',
    unlockRequirement: { type: 'stars', amount: 100 }
  },
  {
    name: 'Cool Lion',
    imageUrl: '/images/avatars/lion-cool.png',
    unlockRequirement: { type: 'stars', amount: 200 }
  }
];

// Sample Badges
export const sampleBadges: Omit<Badge, 'id'>[] = [
  {
    name: 'First Steps',
    description: 'Complete your first lesson!',
    icon: '👶',
    rarity: 'common',
    criteria: 'Complete 1 lesson'
  },
  {
    name: 'Star Collector',
    description: 'Earn 10 stars!',
    icon: '⭐',
    rarity: 'common',
    criteria: 'Earn 10 stars'
  },
  {
    name: 'Math Wizard',
    description: 'Complete 5 math lessons!',
    icon: '🧙‍♂️',
    rarity: 'rare',
    criteria: 'Complete 5 math lessons'
  },
  {
    name: 'Reading Champion',
    description: 'Complete 5 English lessons!',
    icon: '📖',
    rarity: 'rare',
    criteria: 'Complete 5 English lessons'
  },
  {
    name: 'Perfect Score',
    description: 'Get 3 stars on a lesson!',
    icon: '🏆',
    rarity: 'epic',
    criteria: 'Get 3 stars on any lesson'
  },
  {
    name: 'Explorer',
    description: 'Try all subjects!',
    icon: '🗺️',
    rarity: 'epic',
    criteria: 'Complete lessons in all subjects'
  },
  {
    name: 'Learning Legend',
    description: 'Complete 50 lessons!',
    icon: '👑',
    rarity: 'legendary',
    criteria: 'Complete 50 lessons'
  }
];

// Grade-specific curriculum structure
export const curriculumStructure = {
  JKG: {
    math: [
      { title: 'Numbers 1-5', lessons: ['Count to 5', 'Number Recognition', 'Big and Small'] },
      { title: 'Shapes', lessons: ['Circle and Square', 'Triangle', 'Shape Matching'] },
      { title: 'Colors', lessons: ['Primary Colors', 'Color Matching', 'Rainbow Fun'] }
    ],
    english: [
      { title: 'Letters A-E', lessons: ['Letter A', 'Letter B', 'Letter C', 'Letter D', 'Letter E'] },
      { title: 'Phonics', lessons: ['Letter Sounds', 'Rhyming Words', 'First Words'] }
    ]
  },
  LKG: {
    math: [
      { title: 'Numbers 1-10', lessons: ['Count to 10', 'Number Writing', 'Before and After'] },
      { title: 'Addition Basics', lessons: ['Adding with Objects', 'Simple Addition', 'Addition Stories'] },
      { title: 'Patterns', lessons: ['Color Patterns', 'Shape Patterns', 'Number Patterns'] }
    ],
    english: [
      { title: 'Letters F-J', lessons: ['Letter F', 'Letter G', 'Letter H', 'Letter I', 'Letter J'] },
      { title: 'Simple Words', lessons: ['CVC Words', 'Sight Words', 'Word Building'] }
    ],
    evs: [
      { title: 'My Body', lessons: ['Body Parts', 'Senses', 'Keeping Clean'] },
      { title: 'My Family', lessons: ['Family Members', 'My Home', 'Community Helpers'] }
    ]
  },
  '1st': {
    math: [
      { title: 'Numbers 1-20', lessons: ['Counting to 20', 'Number Order', 'Tens and Ones'] },
      { title: 'Addition & Subtraction', lessons: ['Adding Numbers', 'Taking Away', 'Word Problems'] },
      { title: 'Time and Money', lessons: ['Clock Reading', 'Coins', 'Days and Months'] }
    ],
    english: [
      { title: 'Complete Alphabet', lessons: ['Letters K-P', 'Letters Q-U', 'Letters V-Z'] },
      { title: 'Reading', lessons: ['Simple Sentences', 'Story Reading', 'Comprehension'] }
    ],
    evs: [
      { title: 'Animals', lessons: ['Pet Animals', 'Wild Animals', 'Animal Homes'] },
      { title: 'Plants', lessons: ['Parts of Plant', 'Trees and Flowers', 'Growing Plants'] }
    ]
  }
};

// Daily challenge templates
export const dailyChallengeTemplates = [
  {
    title: 'Speed Counter',
    description: 'Count as fast as you can!',
    type: 'quiz' as const,
    difficulty: 'easy' as const
  },
  {
    title: 'Letter Hunt',
    description: 'Find all the hidden letters!',
    type: 'mini-game' as const,
    difficulty: 'medium' as const
  },
  {
    title: 'Shape Master',
    description: 'Match all the shapes correctly!',
    type: 'quiz' as const,
    difficulty: 'hard' as const
  }
];