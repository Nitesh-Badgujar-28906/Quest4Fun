import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import { 
  sampleSubjects, 
  sampleAvatars,
  sampleBadges,
  curriculumStructure,
  dailyChallengeTemplates
} from '@/data/sampleData';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Create a batch for efficient writes
    const batch = writeBatch(db);
    
    // 1. Seed Subjects
    console.log('Seeding subjects...');
    for (const subject of sampleSubjects) {
      const subjectRef = doc(collection(db, 'subjects'));
      batch.set(subjectRef, subject);
    }
    
    // 2. Seed Avatars
    console.log('Seeding avatars...');
    for (const avatar of sampleAvatars) {
      const avatarRef = doc(collection(db, 'avatars'));
      batch.set(avatarRef, avatar);
    }
    
    // 3. Seed Badges
    console.log('Seeding badges...');
    for (const badge of sampleBadges) {
      const badgeRef = doc(collection(db, 'badges'));
      batch.set(badgeRef, badge);
    }
    
    // Commit the batch
    await batch.commit();
    
    // 4. Seed Levels and Lessons (separate batches due to size)
    await seedLevelsAndLessons();
    
    // 5. Seed Daily Challenges
    await seedDailyChallenges();
    
    console.log('Database seeding completed successfully!');
    return true;
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

const seedLevelsAndLessons = async () => {
  console.log('Seeding levels and lessons...');
  
  // Create levels for each subject and grade
  const subjects = ['math', 'english', 'evs'];
  const grades = ['JKG', 'LKG', '1st', '2nd', '3rd', '4th'];
  
  for (const subject of subjects) {
    for (const grade of grades) {
      // Skip EVS for JKG
      if (subject === 'evs' && grade === 'JKG') continue;
      
      const curriculum = (curriculumStructure as Record<string, Record<string, { title: string; lessons: string[] }[]>>)[grade]?.[subject];
      if (!curriculum) continue;
      
      for (let levelIndex = 0; levelIndex < curriculum.length; levelIndex++) {
        const levelData = curriculum[levelIndex];
        
        // Create level
        const level = {
          subjectId: `${subject}-subject`, // This would be actual subject ID in production
          levelNumber: levelIndex + 1,
          title: levelData.title,
          description: `Learn ${levelData.title.toLowerCase()} in a fun way!`,
          difficulty: levelIndex === 0 ? 'easy' : levelIndex === 1 ? 'medium' : 'hard',
          prerequisites: levelIndex === 0 ? [] : [`${subject}-${grade}-level-${levelIndex}`],
          lessons: [],
          isUnlocked: levelIndex === 0,
          starsRequired: levelIndex * 5,
          rewards: [
            { type: 'stars', amount: 10 },
            { type: 'coins', amount: 20 }
          ]
        };
        
        const levelRef = await addDoc(collection(db, 'levels'), level);
        
        // Create lessons for this level
        for (let lessonIndex = 0; lessonIndex < levelData.lessons.length; lessonIndex++) {
          const lessonTitle = levelData.lessons[lessonIndex];
          
          const lesson = {
            levelId: levelRef.id,
            title: lessonTitle,
            description: `Master ${lessonTitle.toLowerCase()}!`,
            type: Math.random() > 0.7 ? 'game' : 'quiz',
            duration: Math.floor(Math.random() * 10) + 8, // 8-18 minutes
            maxStars: 3,
            content: {
              instructions: `Complete the ${lessonTitle.toLowerCase()} activities!`,
              hints: ['Take your time', 'Read carefully', 'You can do it!'],
              questions: generateSampleQuestions(subject, lessonTitle)
            }
          };
          
          await addDoc(collection(db, 'lessons'), lesson);
        }
      }
    }
  }
};

const generateSampleQuestions = (subject: string, lessonTitle: string) => {
  // Generate 3-5 sample questions based on subject and lesson
  const questionCount = Math.floor(Math.random() * 3) + 3; // 3-5 questions
  
  const questions = [];
  
  for (let i = 0; i < questionCount; i++) {
    const question = {
      id: `q${i + 1}`,
      type: ['multiple-choice', 'drag-drop', 'matching'][Math.floor(Math.random() * 3)],
      question: `Sample question ${i + 1} for ${lessonTitle}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'Great job! You got it right.',
      points: 10
    };
    
    questions.push(question);
  }
  
  return questions;
};

const seedDailyChallenges = async () => {
  console.log('Seeding daily challenges...');
  
  // Create challenges for the next 30 days
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const challengeDate = new Date(today);
    challengeDate.setDate(today.getDate() + i);
    
    const template = dailyChallengeTemplates[i % dailyChallengeTemplates.length];
    
    const challenge = {
      date: challengeDate.toISOString().split('T')[0], // YYYY-MM-DD format
      title: template.title,
      description: template.description,
      type: template.type,
      difficulty: template.difficulty,
      rewards: [
        { type: 'stars', amount: 5 },
        { type: 'coins', amount: 10 }
      ],
      completedBy: [],
      content: {
        instructions: `Complete today's ${template.title} challenge!`,
        hints: ['You can do this!', 'Take your time'],
        questions: generateSampleQuestions('mixed', template.title)
      }
    };
    
    await addDoc(collection(db, 'dailyChallenges'), challenge);
  }
};

// Utility function to check if database is already seeded
export const isDatabaseSeeded = async (): Promise<boolean> => {
  try {
    // Simple check - in production you'd want more robust verification
    return false; // For now, always allow seeding
  } catch (error) {
    console.error('Error checking if database is seeded:', error);
    return false;
  }
};

// Function to clear all sample data (useful for development)
export const clearSampleData = async () => {
  console.log('This function would clear sample data in development mode');
  // Implementation would delete all documents from the collections
  // Only use in development!
};