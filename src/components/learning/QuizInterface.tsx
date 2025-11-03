'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  XCircle, 
  Award,
  Timer,
  Lightbulb,
  Target,
  RefreshCw
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  hint?: string;
}

interface QuizProps {
  lessonId: string;
  lessonTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number, starsEarned: number) => void;
  onBack: () => void;
}

interface QuestionResult {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  pointsEarned: number;
}

const MultipleChoiceQuestion: React.FC<{
  question: QuizQuestion;
  selectedAnswer: string;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean;
}> = ({ question, selectedAnswer, onAnswer, showResult, isCorrect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      
      <div className="grid gap-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = question.correctAnswer === option;
          
          let buttonClass = 'w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ';
          
          if (showResult) {
            if (isCorrectOption) {
              buttonClass += 'border-green-500 bg-green-50 text-green-800';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-500 bg-red-50 text-red-800';
            } else {
              buttonClass += 'border-gray-200 bg-gray-50 text-gray-600';
            }
          } else {
            if (isSelected) {
              buttonClass += 'border-blue-500 bg-blue-50 text-blue-800';
            } else {
              buttonClass += 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700';
            }
          }
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={buttonClass}
              onClick={() => !showResult && onAnswer(option)}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && (
                  <div>
                    {isCorrectOption && <CheckCircle size={20} className="text-green-600" />}
                    {isSelected && !isCorrect && <XCircle size={20} className="text-red-600" />}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

const TrueFalseQuestion: React.FC<{
  question: QuizQuestion;
  selectedAnswer: string;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean;
}> = ({ question, selectedAnswer, onAnswer, showResult, isCorrect }) => {
  const options = ['True', 'False'];
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      
      <div className="flex gap-4 justify-center">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = question.correctAnswer === option;
          
          let buttonClass = 'px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 border-2 ';
          
          if (showResult) {
            if (isCorrectOption) {
              buttonClass += 'border-green-500 bg-green-500 text-white';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-500 bg-red-500 text-white';
            } else {
              buttonClass += 'border-gray-300 bg-gray-100 text-gray-500';
            }
          } else {
            if (isSelected) {
              buttonClass += 'border-blue-500 bg-blue-500 text-white';
            } else {
              buttonClass += 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700';
            }
          }
          
          return (
            <motion.button
              key={option}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={!showResult ? { scale: 1.05 } : {}}
              whileTap={!showResult ? { scale: 0.95 } : {}}
              className={buttonClass}
              onClick={() => !showResult && onAnswer(option)}
              disabled={showResult}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export const QuizInterface: React.FC<QuizProps> = ({
  lessonTitle,
  questions,
  onComplete,
  onBack
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showHint, setShowHint] = useState(false);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleQuizComplete = () => {
    // Calculate results
    const calculatedResults = questions.map(q => {
      const userAns = userAnswers[q.id];
      const correct = Array.isArray(q.correctAnswer)
        ? Array.isArray(userAns) && 
          q.correctAnswer.length === userAns.length &&
          q.correctAnswer.every(ans => userAns.includes(ans))
        : userAns === q.correctAnswer;
      
      return {
        questionId: q.id,
        isCorrect: correct,
        userAnswer: userAns,
        correctAnswer: q.correctAnswer
      };
    });
    
    setResults(calculatedResults);
    setQuizComplete(true);
    
    // Calculate score
    const correctCount = calculatedResults.filter(r => r.isCorrect).length;
    const score = (correctCount / questions.length) * 100;
    const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
    
    onComplete({
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: Math.round(score),
      stars,
      timeSpent: 300 - timeLeft
    });
  };

  // Timer effect
  useEffect(() => {
    if (quizComplete || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto submit quiz
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizComplete, handleQuizComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string | string[]) => {
    if (showResult) return;
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };

  const checkAnswer = (question: QuizQuestion, userAnswer: string | string[]) => {
    if (Array.isArray(question.correctAnswer)) {
      return Array.isArray(userAnswer) && 
        question.correctAnswer.every(ans => userAnswer.includes(ans)) &&
        userAnswer.every(ans => question.correctAnswer.includes(ans));
    }
    return question.correctAnswer === userAnswer;
  };

  const handleSubmitAnswer = () => {
    const userAnswer = userAnswers[currentQ.id];
    if (!userAnswer) return;

    const isCorrect = checkAnswer(currentQ, userAnswer);
    const pointsEarned = isCorrect ? currentQ.points : 0;

    const result: QuestionResult = {
      questionId: currentQ.id,
      userAnswer,
      isCorrect,
      pointsEarned
    };

    setResults(prev => [...prev, result]);
    setShowResult(true);

    // Auto advance after showing result
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowResult(false);
        setShowHint(false);
      } else {
        handleQuizComplete();
      }
    }, 2000);
  };



  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResult(false);
    setQuizComplete(false);
    setResults([]);
    setTimeLeft(300);
    setShowHint(false);
  };

  if (quizComplete) {
    const totalPoints = results.reduce((sum, result) => sum + result.pointsEarned, 0);
    const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const score = Math.round((totalPoints / maxPoints) * 100);
    const correctAnswers = results.filter(r => r.isCorrect).length;

    let starsEarned = 0;
    if (score >= 90) starsEarned = 3;
    else if (score >= 70) starsEarned = 2;
    else if (score >= 50) starsEarned = 1;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Award size={64} className="text-yellow-500 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{score}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{correctAnswers}/{questions.length}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-1 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={`${i < starsEarned ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill={i < starsEarned ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={restartQuiz} variant="secondary">
              <RefreshCw size={20} className="mr-2" />
              Try Again
            </Button>
            <Button onClick={onBack}>
              Continue Learning
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  const currentAnswer = userAnswers[currentQ.id];
  const isAnswered = currentAnswer !== undefined && currentAnswer !== '';
  const isCurrentCorrect = showResult && checkAnswer(currentQ, currentAnswer);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{lessonTitle}</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Timer size={20} />
            <span className={`font-mono ${timeLeft < 60 ? 'text-red-600' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar value={progress} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress: {Math.round(progress)}%</span>
          <span>{currentQ.difficulty} • {currentQ.points} points</span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {currentQ.type === 'multiple-choice' && (
              <MultipleChoiceQuestion
                question={currentQ}
                selectedAnswer={currentAnswer as string}
                onAnswer={handleAnswer}
                showResult={showResult}
                isCorrect={isCurrentCorrect}
              />
            )}
            
            {currentQ.type === 'true-false' && (
              <TrueFalseQuestion
                question={currentQ}
                selectedAnswer={currentAnswer as string}
                onAnswer={handleAnswer}
                showResult={showResult}
                isCorrect={isCurrentCorrect}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Hint Section */}
        {currentQ.hint && !showResult && (
          <div className="mt-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2"
            >
              <Lightbulb size={16} />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex items-start gap-2 text-yellow-800">
                    <Lightbulb size={16} className="mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{currentQ.hint}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Result Section */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg border ${
                isCurrentCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCurrentCorrect ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <XCircle size={20} className="text-red-600" />
                )}
                <span className={`font-semibold ${
                  isCurrentCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCurrentCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className={`text-sm ${
                isCurrentCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center">
        {!showResult && (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!isAnswered}
            size="lg"
            className="px-8"
          >
            <Target size={20} className="mr-2" />
            Submit Answer
          </Button>
        )}
      </div>
    </div>
  );
};