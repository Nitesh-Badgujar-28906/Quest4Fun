'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import { 
  ArrowLeft, 
  Star, 
  Lock, 
  Play, 
  CheckCircle, 
  Trophy,
  Target,
  BookOpen,
  Timer,
  Award
} from 'lucide-react';

interface Level {
  id: string;
  levelNumber: number;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  isUnlocked: boolean;
  starsEarned: number;
  maxStars: number;
  estimatedTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
  bgGradient: string;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'interactive' | 'quiz' | 'game';
  duration: number; // in minutes
  isCompleted: boolean;
  isUnlocked: boolean;
  starsEarned: number;
  maxStars: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface LearningMapProps {
  subjectId: string;
  subjectName: string;
  onBack: () => void;
  onLessonSelect: (levelId: string, lessonId: string) => void;
}

const LevelCard: React.FC<{
  level: Level;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}> = ({ level, index, onClick, isSelected }) => {
  const progressPercentage = (level.completedLessons / level.totalLessons) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: level.isUnlocked ? 1.02 : 1 }}
      whileTap={{ scale: level.isUnlocked ? 0.98 : 1 }}
      onClick={level.isUnlocked ? onClick : undefined}
    >
      <Card 
        className={`relative overflow-hidden cursor-pointer transition-all duration-300
          ${level.isUnlocked 
            ? `${level.bgGradient} border-0 shadow-lg` 
            : 'bg-gray-200 border-2 border-dashed border-gray-300'
          }
          ${isSelected ? 'ring-4 ring-yellow-400 shadow-xl scale-105' : ''}
        `}
      >
        <div className="p-6">
          {/* Level Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {level.isUnlocked ? (
                <div className={`w-12 h-12 ${level.color} bg-white/20 rounded-xl flex items-center justify-center font-bold text-white text-lg`}>
                  {level.levelNumber}
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <Lock size={24} className="text-gray-600" />
                </div>
              )}
              <div>
                <h3 className={`text-xl font-bold ${level.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                  Level {level.levelNumber}
                </h3>
                <p className={`text-sm ${level.isUnlocked ? 'text-white/80' : 'text-gray-400'}`}>
                  {level.title}
                </p>
              </div>
            </div>
            
            {level.completedLessons === level.totalLessons && level.isUnlocked && (
              <Trophy size={24} className="text-yellow-300" />
            )}
          </div>

          {/* Level Stats */}
          {level.isUnlocked && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-white/90">
                <span>{level.completedLessons}/{level.totalLessons} lessons</span>
                <span>{level.difficulty}</span>
              </div>
              
              <ProgressBar 
                value={progressPercentage}
                variant="default"
                className="mb-3"
              />
              
              <div className="flex items-center justify-between text-sm text-white/90">
                <div className="flex items-center gap-1">
                  <Star size={16} fill="currentColor" />
                  <span>{level.starsEarned}/{level.maxStars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer size={16} />
                  <span>{level.estimatedTime}min</span>
                </div>
              </div>
            </div>
          )}

          {!level.isUnlocked && (
            <div className="text-center text-gray-500">
              <p className="text-sm mb-2">Complete the previous level to unlock</p>
              <div className="text-xs text-gray-400">
                {level.totalLessons} lessons • {level.estimatedTime} minutes
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        {level.isUnlocked && (
          <>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
          </>
        )}
      </Card>
    </motion.div>
  );
};

const LessonItem: React.FC<{
  lesson: Lesson;
  index: number;
  onClick: () => void;
}> = ({ lesson, index, onClick }) => {
  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video': return <Play size={20} className="text-blue-500" />;
      case 'interactive': return <Target size={20} className="text-green-500" />;
      case 'quiz': return <BookOpen size={20} className="text-purple-500" />;
      case 'game': return <Trophy size={20} className="text-orange-500" />;
      default: return <BookOpen size={20} className="text-gray-500" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'interactive': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-purple-100 text-purple-800';
      case 'game': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: lesson.isUnlocked ? 1.02 : 1 }}
      whileTap={{ scale: lesson.isUnlocked ? 0.98 : 1 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 
          ${lesson.isUnlocked 
            ? 'hover:shadow-md bg-white' 
            : 'bg-gray-100 opacity-60'
          }
          ${lesson.isCompleted ? 'ring-2 ring-green-200' : ''}
        `}
        onClick={lesson.isUnlocked ? onClick : undefined}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* Lesson Status Icon */}
            <div className="flex-shrink-0">
              {lesson.isCompleted ? (
                <CheckCircle size={24} className="text-green-500" />
              ) : lesson.isUnlocked ? (
                getTypeIcon()
              ) : (
                <Lock size={24} className="text-gray-400" />
              )}
            </div>

            {/* Lesson Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold text-sm ${
                lesson.isUnlocked ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {lesson.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor()}`}>
                  {lesson.type}
                </span>
                <span className="text-xs text-gray-500">
                  {lesson.duration}min
                </span>
                {lesson.isUnlocked && (
                  <div className="flex items-center gap-1 text-xs text-yellow-600">
                    <Star size={12} fill="currentColor" />
                    <span>{lesson.starsEarned}/{lesson.maxStars}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className={`text-xs px-2 py-1 rounded ${
              lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {lesson.difficulty}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const LearningMap: React.FC<LearningMapProps> = ({
  subjectId,
  subjectName,
  onBack,
  onLessonSelect
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Mock data - in real app, this would come from Firebase
  const levels: Level[] = [
    {
      id: 'level-1',
      levelNumber: 1,
      title: 'Getting Started',
      description: 'Learn the basics and fundamentals',
      totalLessons: 5,
      completedLessons: 5,
      isUnlocked: true,
      starsEarned: 15,
      maxStars: 15,
      estimatedTime: 30,
      difficulty: 'Easy',
      color: 'text-green-600',
      bgGradient: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      id: 'level-2',
      levelNumber: 2,
      title: 'Building Skills',
      description: 'Practice and improve your abilities',
      totalLessons: 6,
      completedLessons: 3,
      isUnlocked: true,
      starsEarned: 8,
      maxStars: 18,
      estimatedTime: 45,
      difficulty: 'Medium',
      color: 'text-blue-600',
      bgGradient: 'bg-gradient-to-br from-blue-500 to-cyan-600'
    },
    {
      id: 'level-3',
      levelNumber: 3,
      title: 'Advanced Concepts',
      description: 'Master challenging topics',
      totalLessons: 7,
      completedLessons: 0,
      isUnlocked: true,
      starsEarned: 0,
      maxStars: 21,
      estimatedTime: 60,
      difficulty: 'Hard',
      color: 'text-purple-600',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    {
      id: 'level-4',
      levelNumber: 4,
      title: 'Expert Level',
      description: 'Challenge yourself with complex problems',
      totalLessons: 8,
      completedLessons: 0,
      isUnlocked: false,
      starsEarned: 0,
      maxStars: 24,
      estimatedTime: 90,
      difficulty: 'Hard',
      color: 'text-red-600',
      bgGradient: 'bg-gradient-to-br from-red-500 to-pink-600'
    }
  ];

  // Mock lessons for selected level
  const getLessonsForLevel = (levelId: string): Lesson[] => {
    const lessonsByLevel: Record<string, Lesson[]> = {
      'level-1': [
        { id: 'lesson-1-1', title: 'Introduction Video', type: 'video', duration: 5, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Easy' },
        { id: 'lesson-1-2', title: 'Basic Concepts', type: 'interactive', duration: 8, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Easy' },
        { id: 'lesson-1-3', title: 'Practice Quiz', type: 'quiz', duration: 10, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Easy' },
        { id: 'lesson-1-4', title: 'Fun Game', type: 'game', duration: 12, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Easy' },
        { id: 'lesson-1-5', title: 'Level Review', type: 'interactive', duration: 15, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Easy' }
      ],
      'level-2': [
        { id: 'lesson-2-1', title: 'Advanced Topics', type: 'video', duration: 8, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Medium' },
        { id: 'lesson-2-2', title: 'Interactive Learning', type: 'interactive', duration: 12, isCompleted: true, isUnlocked: true, starsEarned: 2, maxStars: 3, difficulty: 'Medium' },
        { id: 'lesson-2-3', title: 'Challenge Quiz', type: 'quiz', duration: 15, isCompleted: true, isUnlocked: true, starsEarned: 3, maxStars: 3, difficulty: 'Medium' },
        { id: 'lesson-2-4', title: 'Problem Solving', type: 'interactive', duration: 18, isCompleted: false, isUnlocked: true, starsEarned: 0, maxStars: 3, difficulty: 'Medium' },
        { id: 'lesson-2-5', title: 'Brain Teaser Game', type: 'game', duration: 20, isCompleted: false, isUnlocked: true, starsEarned: 0, maxStars: 3, difficulty: 'Medium' },
        { id: 'lesson-2-6', title: 'Level Challenge', type: 'quiz', duration: 25, isCompleted: false, isUnlocked: false, starsEarned: 0, maxStars: 3, difficulty: 'Medium' }
      ]
    };
    
    return lessonsByLevel[levelId] || [];
  };

  const selectedLevelData = levels.find(l => l.id === selectedLevel);
  const lessons = selectedLevel ? getLessonsForLevel(selectedLevel) : [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{subjectName} Learning Map</h1>
          <p className="text-gray-600">Choose a level to start your learning journey!</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Levels Column */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Levels</h2>
          <div className="space-y-4">
            {levels.map((level, index) => (
              <LevelCard
                key={level.id}
                level={level}
                index={index}
                onClick={() => setSelectedLevel(level.id)}
                isSelected={selectedLevel === level.id}
              />
            ))}
          </div>
        </div>

        {/* Lessons Column */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedLevel && selectedLevelData ? (
              <motion.div
                key={selectedLevel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Level {selectedLevelData.levelNumber}: {selectedLevelData.title}
                    </h2>
                    <p className="text-gray-600">{selectedLevelData.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600 mb-1">
                      <Star size={16} fill="currentColor" />
                      <span className="font-semibold">
                        {selectedLevelData.starsEarned}/{selectedLevelData.maxStars}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedLevelData.completedLessons}/{selectedLevelData.totalLessons} completed
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      index={index}
                      onClick={() => onLessonSelect(selectedLevel, lesson.id)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-96 text-center"
              >
                <Award size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Select a Level to Start Learning
                </h3>
                <p className="text-gray-500">
                  Choose a level from the left to see available lessons and activities.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};