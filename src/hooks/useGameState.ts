import { useState, useCallback, useEffect } from 'react';
import { GameState, Child, Progress } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { saveProgress, updateChildProgress } from '@/lib/firestore';

export const useGameState = () => {
  const { user, userType } = useAuth();
  const [gameState, setGameState] = useState<GameState>({
    currentSubject: null,
    currentLevel: null,
    currentLesson: null,
    isPlaying: false,
    isPaused: false,
    score: 0,
    timeRemaining: 0
  });

  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    totalTimeSpent: 0,
    starsEarned: 0,
    coinsEarned: 0
  });

  // Start a new game session
  const startGame = useCallback((subjectId: string, levelId: string, lessonId: string) => {
    setGameState({
      currentSubject: subjectId,
      currentLevel: levelId,
      currentLesson: lessonId,
      isPlaying: true,
      isPaused: false,
      score: 0,
      timeRemaining: 0
    });

    setSessionStats({
      questionsAnswered: 0,
      correctAnswers: 0,
      totalTimeSpent: 0,
      starsEarned: 0,
      coinsEarned: 0
    });
  }, []);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  // Update score
  const updateScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  // Record answer
  const recordAnswer = useCallback((isCorrect: boolean, points: number = 0) => {
    setSessionStats(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
    }));

    if (isCorrect) {
      updateScore(points);
    }
  }, [updateScore]);

  // Calculate stars based on performance
  const calculateStars = useCallback((accuracy: number, timeBonus: number = 0) => {
    let stars = 0;
    
    if (accuracy >= 0.9) stars = 3;
    else if (accuracy >= 0.7) stars = 2;
    else if (accuracy >= 0.5) stars = 1;
    
    // Time bonus can add extra star
    if (timeBonus > 0.8 && stars > 0) {
      stars = Math.min(3, stars + 1);
    }

    return stars;
  }, []);

  // End game and save progress
  const endGame = useCallback(async () => {
    if (!user || userType !== 'child' || !gameState.currentLesson) {
      return;
    }

    const child = user as Child;
    const accuracy = sessionStats.questionsAnswered > 0 
      ? sessionStats.correctAnswers / sessionStats.questionsAnswered 
      : 0;
    
    const stars = calculateStars(accuracy);
    const coins = Math.floor(gameState.score / 10); // 1 coin per 10 points

    // Create progress record
    const progressData: Omit<Progress, 'completedAt'> = {
      childId: child.id,
      subjectId: gameState.currentSubject!,
      levelId: gameState.currentLevel!,
      lessonId: gameState.currentLesson,
      completed: true,
      stars,
      attempts: 1, // This would be incremented if lesson is repeated
      bestScore: gameState.score,
      timeSpent: sessionStats.totalTimeSpent,
      weakAreas: accuracy < 0.7 ? [gameState.currentSubject!] : [],
      strongAreas: accuracy >= 0.8 ? [gameState.currentSubject!] : []
    };

    try {
      // Save progress to database
      await saveProgress(progressData);

      // Update child's overall stats
      await updateChildProgress(child.id, {
        totalStars: child.totalStars + stars,
        totalCoins: child.totalCoins + coins,
        currentStreak: child.currentStreak + 1
      });

      setSessionStats(prev => ({
        ...prev,
        starsEarned: stars,
        coinsEarned: coins
      }));

    } catch (error) {
      console.error('Error saving game progress:', error);
    }

    // Reset game state
    setGameState({
      currentSubject: null,
      currentLevel: null,
      currentLesson: null,
      isPlaying: false,
      isPaused: false,
      score: 0,
      timeRemaining: 0
    });

    return { stars, coins, accuracy };
  }, [user, userType, gameState, sessionStats, calculateStars]);

  // Update time
  const updateTimeRemaining = useCallback((time: number) => {
    setGameState(prev => ({
      ...prev,
      timeRemaining: time
    }));
  }, []);

  // Track time spent
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameState.isPlaying && !gameState.isPaused) {
      interval = setInterval(() => {
        setSessionStats(prev => ({
          ...prev,
          totalTimeSpent: prev.totalTimeSpent + 1
        }));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused]);

  return {
    gameState,
    sessionStats,
    startGame,
    endGame,
    togglePause,
    updateScore,
    recordAnswer,
    updateTimeRemaining,
    calculateStars
  };
};