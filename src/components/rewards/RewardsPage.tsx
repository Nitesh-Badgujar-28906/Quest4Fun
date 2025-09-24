'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { 
  Star, 
  Coins, 
  Trophy, 
  Crown,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  Zap,
  Heart,
  Shield,
  Sparkles,
  Gift,
  Users,
  Medal
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  isEarned: boolean;
  earnedDate?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  category: 'Learning' | 'Streak' | 'Achievement' | 'Special';
}

interface AvatarCustomization {
  id: string;
  name: string;
  type: 'hat' | 'glasses' | 'background' | 'pet';
  cost: number;
  isUnlocked: boolean;
  preview: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

const BadgeCard: React.FC<{
  badge: Badge;
  index: number;
}> = ({ badge, index }) => {
  const Icon = badge.icon;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
        badge.isEarned 
          ? `${badge.bgColor} border-0 shadow-lg` 
          : 'bg-gray-100 border-2 border-dashed border-gray-300 opacity-60'
      }`}>
        <div className="p-6 text-center">
          {/* Badge Icon */}
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            badge.isEarned ? 'bg-white/20' : 'bg-gray-300'
          }`}>
            <Icon 
              size={32} 
              className={badge.isEarned ? badge.color : 'text-gray-500'} 
            />
          </div>

          {/* Badge Info */}
          <h3 className={`font-bold text-lg mb-2 ${
            badge.isEarned ? 'text-white' : 'text-gray-500'
          }`}>
            {badge.name}
          </h3>
          
          <p className={`text-sm mb-3 ${
            badge.isEarned ? 'text-white/90' : 'text-gray-400'
          }`}>
            {badge.description}
          </p>

          {/* Rarity Badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            badge.isEarned ? 'bg-white/20 text-white' : getRarityColor(badge.rarity)
          }`}>
            {badge.rarity}
          </div>

          {/* Earned Date */}
          {badge.isEarned && badge.earnedDate && (
            <div className="mt-3 text-xs text-white/80">
              Earned: {badge.earnedDate}
            </div>
          )}
        </div>

        {/* Decorative elements for earned badges */}
        {badge.isEarned && (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
          </>
        )}
      </Card>
    </motion.div>
  );
};

const CustomizationItem: React.FC<{
  item: AvatarCustomization;
  index: number;
  onPurchase: (item: AvatarCustomization) => void;
  canAfford: boolean;
}> = ({ item, index, onPurchase, canAfford }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'border-gray-300 bg-gray-50';
      case 'Rare': return 'border-blue-300 bg-blue-50';
      case 'Epic': return 'border-purple-300 bg-purple-50';
      case 'Legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`border-2 ${getRarityColor(item.rarity)} ${
        item.isUnlocked ? 'opacity-100' : 'opacity-90'
      }`}>
        <div className="p-4 text-center">
          {/* Item Preview */}
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl">
            {item.preview}
          </div>

          {/* Item Info */}
          <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
          <p className="text-xs text-gray-600 mb-3 capitalize">{item.type}</p>

          {/* Price/Status */}
          <div className="flex items-center justify-center gap-1 mb-3">
            <Coins size={16} className="text-blue-500" />
            <span className="font-semibold text-gray-800">{item.cost}</span>
          </div>

          {/* Purchase Button */}
          {item.isUnlocked ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              disabled
            >
              Owned
            </Button>
          ) : (
            <Button
              size="sm"
              className="w-full text-xs"
              onClick={() => onPurchase(item)}
              disabled={!canAfford}
            >
              {canAfford ? 'Buy' : 'Need More Coins'}
            </Button>
          )}

          {/* Rarity */}
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.rarity === 'Common' ? 'bg-gray-100 text-gray-700' :
              item.rarity === 'Rare' ? 'bg-blue-100 text-blue-700' :
              item.rarity === 'Epic' ? 'bg-purple-100 text-purple-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {item.rarity}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const RewardsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'customize'>('overview');

  if (!user) return null;

  const child = user as { 
    name: string; 
    totalStars?: number; 
    totalCoins?: number; 
    currentStreak?: number; 
    badges?: string[];
    avatar?: string;
  };

  // Mock data
  const stats = {
    totalStars: child.totalStars || 247,
    totalCoins: child.totalCoins || 156,
    currentStreak: child.currentStreak || 12,
    badgesEarned: 15,
    totalBadges: 24,
    rank: 'Super Learner',
    level: 8
  };

  const badges: Badge[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
      isEarned: true,
      earnedDate: '2024-01-15',
      rarity: 'Common',
      category: 'Learning'
    },
    {
      id: '2',
      name: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      isEarned: true,
      earnedDate: '2024-01-22',
      rarity: 'Rare',
      category: 'Streak'
    },
    {
      id: '3',
      name: 'Math Master',
      description: 'Complete all math levels with 3 stars',
      icon: Trophy,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      isEarned: true,
      earnedDate: '2024-02-01',
      rarity: 'Epic',
      category: 'Achievement'
    },
    {
      id: '4',
      name: 'Quiz Champion',
      description: 'Score 100% on 5 consecutive quizzes',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      isEarned: false,
      rarity: 'Legendary',
      category: 'Achievement'
    },
    {
      id: '5',
      name: 'Speed Reader',
      description: 'Complete 10 reading lessons in one day',
      icon: BookOpen,
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600',
      isEarned: true,
      earnedDate: '2024-01-28',
      rarity: 'Rare',
      category: 'Learning'
    },
    {
      id: '6',
      name: 'Super Streak',
      description: 'Maintain a 30-day learning streak',
      icon: Medal,
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-500 to-pink-600',
      isEarned: false,
      rarity: 'Legendary',
      category: 'Streak'
    }
  ];

  const customizationItems: AvatarCustomization[] = [
    {
      id: '1',
      name: 'Wizard Hat',
      type: 'hat',
      cost: 50,
      isUnlocked: true,
      preview: '🎩',
      rarity: 'Common'
    },
    {
      id: '2',
      name: 'Cool Glasses',
      type: 'glasses',
      cost: 30,
      isUnlocked: false,
      preview: '😎',
      rarity: 'Common'
    },
    {
      id: '3',
      name: 'Dragon Pet',
      type: 'pet',
      cost: 200,
      isUnlocked: false,
      preview: '🐉',
      rarity: 'Epic'
    },
    {
      id: '4',
      name: 'Galaxy Background',
      type: 'background',
      cost: 150,
      isUnlocked: false,
      preview: '🌌',
      rarity: 'Rare'
    },
    {
      id: '5',
      name: 'Crown',
      type: 'hat',
      cost: 300,
      isUnlocked: false,
      preview: '👑',
      rarity: 'Legendary'
    },
    {
      id: '6',
      name: 'Unicorn Pet',
      type: 'pet',
      cost: 250,
      isUnlocked: false,
      preview: '🦄',
      rarity: 'Epic'
    }
  ];

  const handlePurchase = (item: AvatarCustomization) => {
    if (stats.totalCoins >= item.cost) {
      console.log(`Purchasing ${item.name} for ${item.cost} coins`);
      // In real app, this would update the user's coins and unlock the item
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'badges', label: 'Badges', icon: Medal },
    { id: 'customize', label: 'Customize', icon: Sparkles }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🏆 Rewards & Achievements
        </h1>
        <p className="text-gray-600 text-lg">
          Celebrate your learning journey and customize your avatar!
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 border-0 text-white">
          <div className="p-6 text-center">
            <Star size={32} className="mx-auto mb-3" fill="currentColor" />
            <div className="text-2xl font-bold">{stats.totalStars}</div>
            <div className="text-white/90 text-sm">Total Stars</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 text-white">
          <div className="p-6 text-center">
            <Coins size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">{stats.totalCoins}</div>
            <div className="text-white/90 text-sm">Coins</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white">
          <div className="p-6 text-center">
            <Zap size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-white/90 text-sm">Day Streak</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 border-0 text-white">
          <div className="p-6 text-center">
            <Trophy size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">{stats.badgesEarned}</div>
            <div className="text-white/90 text-sm">Badges</div>
          </div>
        </Card>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-xl p-2 shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'secondary'}
                onClick={() => setActiveTab(tab.id as any)}
                className="mr-2 last:mr-0"
              >
                <Icon size={20} className="mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Rank Card */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white">
              <div className="p-8 text-center">
                <Crown size={48} className="mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">{stats.rank}</h2>
                <p className="text-white/90 mb-4">Level {stats.level}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Medal size={16} />
                    <span>{stats.badgesEarned}/{stats.totalBadges} Badges</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target size={16} />
                    <span>85% Progress</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {badges.filter(b => b.isEarned).slice(0, 3).map((badge, index) => (
                  <BadgeCard key={badge.id} badge={badge} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'badges' && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <BadgeCard key={badge.id} badge={badge} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'customize' && (
          <motion.div
            key="customize"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Avatar Preview */}
            <Card className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Avatar</h3>
              <div className="flex justify-center items-center gap-8">
                <Avatar
                  src={child.avatar}
                  alt={child.name}
                  size="2xl"
                  className="border-4 border-purple-200"
                />
                <div className="text-left">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{child.name}</h4>
                  <p className="text-gray-600 mb-4">Customize your look with coins!</p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Coins size={20} />
                    <span className="font-semibold">{stats.totalCoins} Coins Available</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Customization Shop */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Customization Shop</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {customizationItems.map((item, index) => (
                  <CustomizationItem
                    key={item.id}
                    item={item}
                    index={index}
                    onPurchase={handlePurchase}
                    canAfford={stats.totalCoins >= item.cost}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};