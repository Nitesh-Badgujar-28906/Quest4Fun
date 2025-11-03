'use client';

import { useAuth } from '@/context/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Play,
  Pause,
  Volume2,
  Star,
  Trophy,
  CheckCircle,
  Circle
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectName: string;
  type: 'video' | 'interactive' | 'quiz' | 'game';
  duration: number;
  content: {
    type: string;
    data: unknown;
  };
  isCompleted: boolean;
  stars: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const getLessonData = (lessonId: string): Lesson => {
  const lessons: { [key: string]: Lesson } = {
    'math-1': {
      id: 'math-1',
      title: 'Counting 1-10',
      description: 'Learn to count from 1 to 10 with fun animations',
      subjectId: 'math',
      subjectName: 'Mathematics',
      type: 'interactive',
      duration: 15,
      isCompleted: true,
      stars: 3,
      difficulty: 'easy',
      content: {
        type: 'counting',
        data: {
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          objects: ['🍎', '🐕', '⭐', '🚗', '🌸']
        }
      }
    },
    'math-2': {
      id: 'math-2',
      title: 'Basic Addition',
      description: 'Add numbers together using visual aids',
      subjectId: 'math',
      subjectName: 'Mathematics',
      type: 'interactive',
      duration: 20,
      isCompleted: true,
      stars: 3,
      difficulty: 'easy',
      content: {
        type: 'addition',
        data: {
          problems: [
            { a: 1, b: 1, answer: 2 },
            { a: 2, b: 2, answer: 4 },
            { a: 3, b: 1, answer: 4 },
            { a: 2, b: 3, answer: 5 }
          ]
        }
      }
    },
    'math-3': {
      id: 'math-3',
      title: 'Shapes Recognition',
      description: 'Identify circles, squares, triangles and more',
      subjectId: 'math',
      subjectName: 'Mathematics',
      type: 'game',
      duration: 25,
      isCompleted: true,
      stars: 2,
      difficulty: 'easy',
      content: {
        type: 'shapes',
        data: {
          shapes: ['circle', 'square', 'triangle', 'rectangle', 'star']
        }
      }
    },
    'math-4': {
      id: 'math-4',
      title: 'Number Patterns',
      description: 'Find patterns in number sequences',
      subjectId: 'math',
      subjectName: 'Mathematics',
      type: 'interactive',
      duration: 18,
      isCompleted: false,
      stars: 0,
      difficulty: 'medium',
      content: {
        type: 'patterns',
        data: {
          sequences: [
            [1, 2, 3, '?', 5],
            [2, 4, 6, '?', 10],
            [1, 3, 5, '?', 9]
          ]
        }
      }
    },
    'english-1': {
      id: 'english-1',
      title: 'Alphabet A-Z',
      description: 'Learn all 26 letters of the alphabet',
      subjectId: 'english',
      subjectName: 'English',
      type: 'interactive',
      duration: 20,
      isCompleted: true,
      stars: 3,
      difficulty: 'easy',
      content: {
        type: 'alphabet',
        data: {
          letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        }
      }
    },
    'english-2': {
      id: 'english-2',
      title: 'Phonics Sounds',
      description: 'Learn letter sounds and pronunciation',
      subjectId: 'english',
      subjectName: 'English',
      type: 'video',
      duration: 15,
      isCompleted: true,
      stars: 3,
      difficulty: 'easy',
      content: {
        type: 'phonics',
        data: {
          sounds: [
            { letter: 'A', sound: 'ay', example: 'Apple' },
            { letter: 'B', sound: 'buh', example: 'Ball' },
            { letter: 'C', sound: 'kuh', example: 'Cat' }
          ]
        }
      }
    }
  };

  return lessons[lessonId] || lessons['math-1'];
};

const CountingActivity = ({ objects }: { objects: string[] }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  
  return (
    <div className="text-center p-8">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Count the Objects!</h3>
      
      <div className="mb-8">
        <div className="text-6xl font-bold text-blue-600 mb-4">{currentNumber}</div>
        <div className="flex justify-center gap-2 mb-6">
          {Array(currentNumber).fill(0).map((_, i) => (
            <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {objects[i % objects.length]}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setCurrentNumber(Math.max(1, currentNumber - 1))}
          disabled={currentNumber === 1}
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentNumber(Math.min(10, currentNumber + 1))}
          disabled={currentNumber === 10}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const AdditionActivity = ({ problems }: { problems: { num1: number; num2: number; answer: number }[] }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const problem = problems[currentProblem];
  
  return (
    <div className="text-center p-8">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Addition Practice!</h3>
      
      <div className="mb-8">
        <div className="text-4xl font-bold text-blue-600 mb-6">
          {problem.a} + {problem.b} = {showAnswer ? problem.answer : '?'}
        </div>
        
        <div className="flex justify-center gap-8 mb-6">
          <div className="flex gap-1">
            {Array(problem.a).fill(0).map((_, i) => (
              <Circle key={i} className="w-8 h-8 fill-blue-200 text-blue-400" />
            ))}
          </div>
          <span className="text-2xl">+</span>
          <div className="flex gap-1">
            {Array(problem.b).fill(0).map((_, i) => (
              <Circle key={i} className="w-8 h-8 fill-green-200 text-green-400" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setShowAnswer(!showAnswer)}
          variant="secondary"
        >
          {showAnswer ? 'Hide' : 'Show'} Answer
        </Button>
        <Button
          onClick={() => {
            setCurrentProblem((currentProblem + 1) % problems.length);
            setShowAnswer(false);
          }}
        >
          Next Problem
        </Button>
      </div>
    </div>
  );
};

const AlphabetActivity = ({ letters }: { letters: string[] }) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  
  return (
    <div className="text-center p-8">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Learn the Alphabet!</h3>
      
      <div className="mb-8">
        <div className="text-8xl font-bold text-green-600 mb-4">
          {letters[currentLetter]}
        </div>
        <div className="text-xl text-gray-600">
          Letter {currentLetter + 1} of {letters.length}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setCurrentLetter(Math.max(0, currentLetter - 1))}
          disabled={currentLetter === 0}
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentLetter(Math.min(letters.length - 1, currentLetter + 1))}
          disabled={currentLetter === letters.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const LessonContent = ({ lesson }: { lesson: Lesson }) => {
  switch (lesson.content.type) {
    case 'counting':
      return <CountingActivity {...lesson.content.data} />;
    case 'addition':
      return <AdditionActivity {...lesson.content.data} />;
    case 'alphabet':
      return <AlphabetActivity {...lesson.content.data} />;
    default:
      return (
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">{lesson.title}</h3>
          <p className="text-gray-600 mb-8">{lesson.description}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800">Interactive lesson content would be loaded here.</p>
            <p className="text-blue-600 text-sm mt-2">This is a demo lesson - full content coming soon!</p>
          </div>
        </div>
      );
  }
};

export default function LessonPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'child')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  useEffect(() => {
    if (params.id) {
      setLesson(getLessonData(params.id));
    }
  }, [params.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(100, prev + 2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  if (isLoading || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Lesson...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  const handleComplete = () => {
    // In real app, mark lesson as completed in Firebase
    console.log(`Lesson ${lesson.id} completed!`);
    router.push(`/subjects/${lesson.subjectId}`);
  };

  return (
    <AppLayout currentPage="lessons">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="secondary"
            onClick={() => router.push(`/subjects/${lesson.subjectId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {lesson.subjectName}
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${
                    i < lesson.stars 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {lesson.isCompleted && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
            )}
          </div>
        </div>

        {/* Lesson Header */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-4 h-4" />
                    {lesson.duration} minutes
                  </span>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${lesson.difficulty === 'easy' 
                      ? 'bg-green-100 text-green-600' 
                      : lesson.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }
                  `}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2"
                size="lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start
                  </>
                )}
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress}% Complete</p>
          </div>
        </Card>

        {/* Lesson Content */}
        <Card className="mb-8">
          <LessonContent lesson={lesson} />
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() => router.push(`/subjects/${lesson.subjectId}`)}
          >
            Exit Lesson
          </Button>
          
          <Button
            onClick={handleComplete}
            className="flex items-center gap-2"
            disabled={progress < 100}
          >
            <Trophy className="w-4 h-4" />
            {lesson.isCompleted ? 'Review Complete' : 'Complete Lesson'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}