import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { Child } from '@/types';

interface ChildLoginProps {
  onSwitchToParent: () => void;
}

// Mock children data for demo
const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Emma',
    avatar: '/images/avatars/cat-happy.png',
    age: 5,
    grade: 'JKG',
    parentId: 'parent-1',
    createdAt: new Date(),
    lastLogin: new Date(),
    totalStars: 45,
    totalCoins: 120,
    badges: [],
    unlockedLevels: ['math-jkg-level-1', 'english-jkg-level-1'],
    currentStreak: 3,
    preferences: {
      soundEnabled: true,
      difficultyLevel: 'easy'
    }
  },
  {
    id: 'child-2',
    name: 'Liam',
    avatar: '/images/avatars/dog-brave.png',
    age: 6,
    grade: 'LKG',
    parentId: 'parent-1',
    createdAt: new Date(),
    lastLogin: new Date(),
    totalStars: 78,
    totalCoins: 200,
    badges: [],
    unlockedLevels: ['math-lkg-level-1', 'english-lkg-level-1'],
    currentStreak: 5,
    preferences: {
      soundEnabled: true,
      difficultyLevel: 'medium'
    }
  },
  {
    id: 'child-3',
    name: 'Zoe',
    avatar: '/images/avatars/owl-smart.png',
    age: 7,
    grade: '1st',
    parentId: 'parent-1',
    createdAt: new Date(),
    lastLogin: new Date(),
    totalStars: 156,
    totalCoins: 350,
    badges: [],
    unlockedLevels: ['math-1st-level-1', 'english-1st-level-1'],
    currentStreak: 8,
    preferences: {
      soundEnabled: true,
      difficultyLevel: 'medium'
    }
  }
];

const ChildLogin: React.FC<ChildLoginProps> = ({ onSwitchToParent }) => {
  const { loginAsChild, isLoading, error } = useAuth();
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const handleChildSelect = async (childId: string) => {
    try {
      setSelectedChild(childId);
      await loginAsChild(childId);
    } catch (error) {
      setSelectedChild(null);
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="text-8xl mb-6">🎓</div>
        <h1 className="text-text-primary text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Welcome to Quest4Fun!
        </h1>
        <p className="text-text-secondary text-xl">
          Choose your profile to start learning
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-6 max-w-md shadow-card"
        >
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {/* Child Selection */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        {mockChildren.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className={`
              bg-card rounded-2xl p-8 shadow-card cursor-pointer
              transition-all duration-200 hover:shadow-card-hover
              ${selectedChild === child.id ? 'ring-4 ring-button-primary' : ''}
            `}
            onClick={() => handleChildSelect(child.id)}
          >
            {/* Loading Overlay */}
            {selectedChild === child.id && isLoading && (
              <div className="absolute inset-0 bg-white/80 rounded-child-xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
              </div>
            )}

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <Avatar
                src={child.avatar}
                alt={child.name}
                size="2xl"
                border
                borderColor="border-primary-blue"
              />
            </div>

            {/* Child Info */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {child.name}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Grade {child.grade} • Age {child.age}
              </p>

              {/* Stats */}
              <div className="flex justify-center items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{ color: '#F1C40F' }}>⭐</span>
                  <span className="font-semibold text-text-primary">{child.totalStars}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{ color: '#F39C12' }}>🪙</span>
                  <span className="font-semibold text-text-primary">{child.totalCoins}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{ color: '#E74C3C' }}>🔥</span>
                  <span className="font-semibold text-text-primary">{child.currentStreak}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add New Child Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10"
      >
        <button
          onClick={() => {/* TODO: Implement add child */}}
          className="px-8 py-4 bg-card text-text-primary font-semibold rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200 hover:scale-105"
        >
          + Add New Child
        </button>
      </motion.div>

      {/* Parent Login Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6"
      >
        <button
          onClick={onSwitchToParent}
          className="text-text-secondary hover:text-text-primary text-sm font-medium underline transition-colors"
        >
          Parent? Click here to access parent dashboard
        </button>
      </motion.div>
    </div>
  );
};

export default ChildLogin;