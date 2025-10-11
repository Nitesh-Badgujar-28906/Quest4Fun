'use client';

import { useAuth } from '@/context/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  Medal, 
  Gift,
  Coins,
  Flame,
  Target,
  Zap,
  Diamond,
  Sparkles,
  Calendar,
  LucideIcon
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isEarned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  category: 'learning' | 'streak' | 'achievement' | 'special';
}

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'avatar' | 'theme' | 'power-up' | 'unlock';
  icon: LucideIcon;
  isUnlocked: boolean;
  isPurchased: boolean;
}

const badges: Badge[] = [
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: Trophy,
    rarity: 'common',
    isEarned: true,
    earnedDate: '2025-09-20',
    category: 'learning'
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Complete 10 math lessons',
    icon: Medal,
    rarity: 'rare',
    isEarned: true,
    earnedDate: '2025-09-22',
    category: 'learning'
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Learn for 7 days straight',
    icon: Flame,
    rarity: 'epic',
    isEarned: false,
    progress: 5,
    maxProgress: 7,
    category: 'streak'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: Target,
    rarity: 'rare',
    isEarned: true,
    earnedDate: '2025-09-21',
    category: 'achievement'
  },
  {
    id: 'star-collector',
    name: 'Star Collector',
    description: 'Earn 100 stars',
    icon: Star,
    rarity: 'epic',
    isEarned: false,
    progress: 67,
    maxProgress: 100,
    category: 'achievement'
  },
  {
    id: 'legend',
    name: 'Learning Legend',
    description: 'Complete all subjects to 100%',
    icon: Crown,
    rarity: 'legendary',
    isEarned: false,
    progress: 0,
    maxProgress: 4,
    category: 'special'
  }
];

const rewards: Reward[] = [
  {
    id: 'ninja-avatar',
    name: 'Ninja Avatar',
    description: 'Become a learning ninja!',
    cost: 50,
    type: 'avatar',
    icon: Crown,
    isUnlocked: true,
    isPurchased: false
  },
  {
    id: 'rainbow-theme',
    name: 'Rainbow Theme',
    description: 'Make your dashboard colorful',
    cost: 100,
    type: 'theme',
    icon: Sparkles,
    isUnlocked: true,
    isPurchased: false
  },
  {
    id: 'double-stars',
    name: 'Double Stars',
    description: 'Get 2x stars for 1 hour',
    cost: 75,
    type: 'power-up',
    icon: Zap,
    isUnlocked: true,
    isPurchased: false
  },
  {
    id: 'bonus-level',
    name: 'Bonus Level Access',
    description: 'Unlock secret bonus levels',
    cost: 200,
    type: 'unlock',
    icon: Diamond,
    isUnlocked: false,
    isPurchased: false
  }
];

export default function RewardsPage() {
  const { user, userType, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState('badges');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock user stats
  const [userStats] = useState({
    totalStars: 267,
    totalCoins: 145,
    currentLevel: 8,
    streak: 5,
    badgesEarned: badges.filter(b => b.isEarned).length,
    totalBadges: badges.length
  });

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'child')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Rewards...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const handlePurchaseReward = (rewardId: string) => {
    console.log(`Purchasing reward: ${rewardId}`);
    // In real app, this would update Firebase and deduct coins
  };

  return (
    <AppLayout currentPage="rewards">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Rewards Center</h1>
            <p className="text-xl text-gray-600">Celebrate your achievements and unlock cool rewards!</p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 border-0 text-white">
              <div className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userStats.totalStars}</div>
                <div className="text-sm text-white/90">Total Stars</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 text-white">
              <div className="p-4 text-center">
                <Coins className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userStats.totalCoins}</div>
                <div className="text-sm text-white/90">Coins</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white">
              <div className="p-4 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userStats.streak}</div>
                <div className="text-sm text-white/90">Day Streak</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 border-0 text-white">
              <div className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userStats.badgesEarned}/{userStats.totalBadges}</div>
                <div className="text-sm text-white/90">Badges</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('badges')}
              className={`pb-3 px-1 font-medium transition-colors ${
                selectedTab === 'badges'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🏅 Badges & Achievements
            </button>
            <button
              onClick={() => setSelectedTab('shop')}
              className={`pb-3 px-1 font-medium transition-colors ${
                selectedTab === 'shop'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🛍️ Rewards Shop
            </button>
          </div>
        </div>

        {/* Badges Tab */}
        {selectedTab === 'badges' && (
          <div>
            {/* Badge Categories */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                {['all', 'learning', 'streak', 'achievement', 'special'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Badges' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`relative overflow-hidden transition-all duration-200 hover:shadow-xl ${
                      badge.isEarned ? 'bg-gradient-to-br from-gray-50 to-white' : 'bg-gray-50 opacity-75'
                    }`}>
                      {/* Rarity Border */}
                      <div className={`h-1 ${getRarityColor(badge.rarity)}`} />
                      
                      <div className="p-6">
                        {/* Badge Icon */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          badge.isEarned ? getRarityColor(badge.rarity) : 'bg-gray-300'
                        }`}>
                          <Icon className={`w-8 h-8 ${
                            badge.isEarned ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>

                        {/* Badge Info */}
                        <div className="text-center mb-4">
                          <h3 className={`text-lg font-bold mb-2 ${
                            badge.isEarned ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {badge.name}
                          </h3>
                          <p className={`text-sm ${
                            badge.isEarned ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {badge.description}
                          </p>
                        </div>

                        {/* Rarity & Status */}
                        <div className="flex items-center justify-between text-xs mb-4">
                          <span className={`px-2 py-1 rounded-full font-medium capitalize ${getRarityTextColor(badge.rarity)}`}>
                            {badge.rarity}
                          </span>
                          {badge.isEarned ? (
                            <span className="text-green-600 font-medium">✓ Earned</span>
                          ) : (
                            <span className="text-gray-500">Not earned</span>
                          )}
                        </div>

                        {/* Progress Bar (for unearned badges with progress) */}
                        {!badge.isEarned && badge.progress !== undefined && badge.maxProgress && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{badge.progress}/{badge.maxProgress}</span>
                            </div>
                            <ProgressBar 
                              value={(badge.progress / badge.maxProgress) * 100} 
                              variant="default"
                              className="h-2"
                            />
                          </div>
                        )}

                        {/* Earned Date */}
                        {badge.isEarned && badge.earnedDate && (
                          <div className="text-center">
                            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Earned {new Date(badge.earnedDate).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Shop Tab */}
        {selectedTab === 'shop' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Spend Your Coins!</h2>
              <p className="text-gray-600">You have <span className="font-bold text-blue-600">{userStats.totalCoins} coins</span> to spend</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => {
                const Icon = reward.icon;
                const canAfford = userStats.totalCoins >= reward.cost;
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`transition-all duration-200 hover:shadow-xl ${
                      !reward.isUnlocked ? 'opacity-50' : ''
                    }`}>
                      <div className="p-6">
                        {/* Reward Icon */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Reward Info */}
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{reward.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                          
                          <div className="flex items-center justify-center gap-1 text-blue-600 font-bold">
                            <Coins className="w-4 h-4" />
                            <span>{reward.cost} coins</span>
                          </div>
                        </div>

                        {/* Purchase Button */}
                        <Button
                          onClick={() => handlePurchaseReward(reward.id)}
                          disabled={!reward.isUnlocked || reward.isPurchased || !canAfford}
                          className="w-full"
                          variant={canAfford && reward.isUnlocked ? 'primary' : 'secondary'}
                        >
                          {reward.isPurchased ? (
                            'Purchased ✓'
                          ) : !reward.isUnlocked ? (
                            '🔒 Locked'
                          ) : !canAfford ? (
                            'Not enough coins'
                          ) : (
                            <>
                              <Gift className="w-4 h-4 mr-2" />
                              Purchase
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily Challenge Card */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white mt-8">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">🎯 Daily Challenge</h3>
                <p className="text-white/90 mb-4">Complete 3 lessons today to earn bonus rewards!</p>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    Progress: <span className="font-bold">1/3 lessons</span>
                  </div>
                  <div className="text-sm">
                    Reward: <span className="font-bold">+50 coins</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <Target className="w-10 h-10" />
                </div>
                <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  Start Challenge
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}