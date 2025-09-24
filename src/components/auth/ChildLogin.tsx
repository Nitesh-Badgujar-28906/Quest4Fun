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
    <div className="min-h-screen bg-gradient-sky flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="text-8xl mb-4">🎓</div>
        <h1 className="text-white text-child-4xl font-bold mb-2">
          Welcome to Quest4Fun!
        </h1>
        <p className="text-white/90 text-child-lg">
          Choose your profile to start learning
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-child mb-6 max-w-md"
        >
          <p className="text-child-sm">{error}</p>
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              bg-white rounded-child-xl p-6 shadow-child-lg cursor-pointer
              transition-all duration-200 hover:shadow-child-lg
              ${selectedChild === child.id ? 'ring-4 ring-primary-yellow' : ''}
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
              <h3 className="text-child-xl font-bold text-gray-800 mb-1">
                {child.name}
              </h3>
              <p className="text-child-sm text-gray-600 mb-3">
                Grade {child.grade} • Age {child.age}
              </p>

              {/* Stats */}
              <div className="flex justify-center items-center gap-4 text-child-sm">
                <div className="flex items-center gap-1">
                  <span className="text-primary-yellow">⭐</span>
                  <span className="font-medium">{child.totalStars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-primary-orange">🪙</span>
                  <span className="font-medium">{child.totalCoins}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-primary-green">🔥</span>
                  <span className="font-medium">{child.currentStreak}</span>
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
        className="mt-8"
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {/* TODO: Implement add child */}}
          className="bg-white/20 text-white border-2 border-white/30 hover:bg-white/30"
        >
          + Add New Child
        </Button>
      </motion.div>

      {/* Parent Login Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8"
      >
        <button
          onClick={onSwitchToParent}
          className="text-white/80 hover:text-white text-child-sm underline transition-colors"
        >
          Parent? Click here to access parent dashboard
        </button>
      </motion.div>
    </div>
  );
};

export default ChildLogin;