'use client';

import { useAuth } from '@/context/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calculator, 
  Globe, 
  Palette, 
  Play,
  Lock,
  Star,
  Trophy,
  ArrowLeft,
  LucideIcon
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'quiz' | 'game';
  duration: number;
  isCompleted: boolean;
  isLocked: boolean;
  stars: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  lessons: Lesson[];
}

const getSubjectData = (subjectId: string): Subject => {
  const subjects: { [key: string]: Subject } = {
    'math': {
      id: 'math',
      name: 'Mathematics',
      description: 'Learn numbers, counting, addition, subtraction and more!',
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
      totalLessons: 12,
      completedLessons: 8,
      progress: 67,
      lessons: [
        {
          id: 'math-1',
          title: 'Counting 1-10',
          description: 'Learn to count from 1 to 10 with fun animations',
          type: 'interactive',
          duration: 15,
          isCompleted: true,
          isLocked: false,
          stars: 3,
          difficulty: 'easy'
        },
        {
          id: 'math-2',
          title: 'Basic Addition',
          description: 'Add numbers together using visual aids',
          type: 'interactive',
          duration: 20,
          isCompleted: true,
          isLocked: false,
          stars: 3,
          difficulty: 'easy'
        },
        {
          id: 'math-3',
          title: 'Shapes Recognition',
          description: 'Identify circles, squares, triangles and more',
          type: 'game',
          duration: 25,
          isCompleted: true,
          isLocked: false,
          stars: 2,
          difficulty: 'easy'
        },
        {
          id: 'math-4',
          title: 'Number Patterns',
          description: 'Find patterns in number sequences',
          type: 'interactive',
          duration: 18,
          isCompleted: false,
          isLocked: false,
          stars: 0,
          difficulty: 'medium'
        },
        {
          id: 'math-5',
          title: 'Simple Subtraction',
          description: 'Learn to subtract numbers',
          type: 'interactive',
          duration: 22,
          isCompleted: false,
          isLocked: true,
          stars: 0,
          difficulty: 'medium'
        }
      ]
    },
    'english': {
      id: 'english',
      name: 'English',
      description: 'Learn letters, words, reading and writing!',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
      totalLessons: 10,
      completedLessons: 6,
      progress: 60,
      lessons: [
        {
          id: 'english-1',
          title: 'Alphabet A-Z',
          description: 'Learn all 26 letters of the alphabet',
          type: 'interactive',
          duration: 20,
          isCompleted: true,
          isLocked: false,
          stars: 3,
          difficulty: 'easy'
        },
        {
          id: 'english-2',
          title: 'Phonics Sounds',
          description: 'Learn letter sounds and pronunciation',
          type: 'video',
          duration: 15,
          isCompleted: true,
          isLocked: false,
          stars: 3,
          difficulty: 'easy'
        },
        {
          id: 'english-3',
          title: 'Simple Words',
          description: 'Read and write simple 3-letter words',
          type: 'interactive',
          duration: 25,
          isCompleted: false,
          isLocked: false,
          stars: 0,
          difficulty: 'medium'
        }
      ]
    },
    'science': {
      id: 'science',
      name: 'Science',
      description: 'Explore the world around us through fun experiments!',
      icon: Globe,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
      totalLessons: 8,
      completedLessons: 3,
      progress: 38,
      lessons: [
        {
          id: 'science-1',
          title: 'Animals & Their Homes',
          description: 'Learn where different animals live',
          type: 'interactive',
          duration: 18,
          isCompleted: true,
          isLocked: false,
          stars: 3,
          difficulty: 'easy'
        },
        {
          id: 'science-2',
          title: 'Weather & Seasons',
          description: 'Understand different types of weather',
          type: 'video',
          duration: 20,
          isCompleted: false,
          isLocked: false,
          stars: 0,
          difficulty: 'easy'
        }
      ]
    },
    'art': {
      id: 'art',
      name: 'Art & Creativity',
      description: 'Express yourself through colors, drawing and crafts!',
      icon: Palette,
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-400 to-pink-600',
      totalLessons: 6,
      completedLessons: 4,
      progress: 67,
      lessons: [
        {
          id: 'art-1',
          title: 'Color Mixing',
          description: 'Learn how colors combine to make new colors',
          type: 'interactive',
          duration: 15,
          isCompleted: true,
          isLocked: false,
          stars: 3,
          difficulty: 'easy'
        },
        {
          id: 'art-2',
          title: 'Drawing Shapes',
          description: 'Practice drawing basic shapes',
          type: 'interactive',
          duration: 20,
          isCompleted: false,
          isLocked: false,
          stars: 0,
          difficulty: 'easy'
        }
      ]
    }
  };

  return subjects[subjectId] || subjects['math'];
};

export default function SubjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setSubjectId(p.id));
  }, [params]);

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'child')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  useEffect(() => {
    if (subjectId) {
      setSubject(getSubjectData(subjectId));
    }
  }, [subjectId]);

  if (isLoading || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Subject...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  const handleLessonClick = (lessonId: string) => {
    if (!subject.lessons.find(l => l.id === lessonId)?.isLocked) {
      router.push(`/lessons/${lessonId}`);
    }
  };

  const IconComponent = subject.icon;

  return (
    <AppLayout currentPage="subjects">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="secondary"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Subject Header */}
        <Card className={`${subject.bgColor} border-0 text-white mb-8`}>
          <div className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
                <p className="text-xl text-white/90 mb-4">{subject.description}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>{subject.completedLessons} of {subject.totalLessons} completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span>{subject.lessons.reduce((sum, lesson) => sum + lesson.stars, 0)} stars earned</span>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressBar 
                    value={subject.progress} 
                    variant="default" 
                    className="bg-white/20"
                  />
                  <p className="text-sm text-white/80 mt-1">{subject.progress}% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subject.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`
                  cursor-pointer transition-all duration-200 hover:scale-105
                  ${lesson.isLocked 
                    ? 'bg-gray-100 border-gray-200' 
                    : lesson.isCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }
                `}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <div className="p-6">
                  {/* Lesson Status Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${lesson.isLocked 
                        ? 'bg-gray-200' 
                        : lesson.isCompleted 
                          ? 'bg-green-100' 
                          : 'bg-blue-100'
                      }
                    `}>
                      {lesson.isLocked ? (
                        <Lock className="w-6 h-6 text-gray-500" />
                      ) : lesson.isCompleted ? (
                        <Trophy className="w-6 h-6 text-green-600" />
                      ) : (
                        <Play className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    
                    {/* Stars */}
                    {lesson.stars > 0 && (
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < lesson.stars 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <h3 className={`
                    text-lg font-semibold mb-2
                    ${lesson.isLocked ? 'text-gray-500' : 'text-gray-800'}
                  `}>
                    {lesson.title}
                  </h3>
                  
                  <p className={`
                    text-sm mb-4
                    ${lesson.isLocked ? 'text-gray-400' : 'text-gray-600'}
                  `}>
                    {lesson.description}
                  </p>

                  {/* Lesson Meta */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`
                      px-2 py-1 rounded-full
                      ${lesson.difficulty === 'easy' 
                        ? 'bg-green-100 text-green-600' 
                        : lesson.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }
                    `}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-gray-500">{lesson.duration} min</span>
                  </div>

                  {/* Status Badge */}
                  {lesson.isCompleted && (
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        <Trophy className="w-3 h-3" />
                        Completed
                      </span>
                    </div>
                  )}
                  
                  {lesson.isLocked && (
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                        <Lock className="w-3 h-3" />
                        Complete previous lessons
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}