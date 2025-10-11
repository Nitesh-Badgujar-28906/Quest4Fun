'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import { 
  BookOpen, 
  Calculator, 
  Globe, 
  Palette, 
  Music,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Coins,
  Trophy
} from 'lucide-react';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    color: string;
    bgColor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    stars: number;
  };
  index: number;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, index, onClick }) => {
  const Icon = subject.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`${subject.bgColor} border-0 cursor-pointer overflow-hidden relative`} onClick={onClick}>
        <div className="p-6">
          {/* Subject Icon */}
          <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center mb-4">
            <Icon size={24} className="text-white drop-shadow" />
          </div>

          {/* Subject Info */}
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow">{subject.name}</h3>
          <p className="text-white text-sm mb-4 drop-shadow">
            {subject.completedLessons} of {subject.totalLessons} lessons
          </p>

          {/* Progress Bar */}
          <ProgressBar 
            value={subject.progress} 
            className="mb-4"
            variant="default"
          />

          {/* Stars Earned */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-white drop-shadow">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold">{subject.stars}</span>
            </div>
            <div className="text-white text-sm drop-shadow">
              {subject.progress}% Complete
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
      </Card>
    </motion.div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, bgColor, trend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
  >
    <Card className={`${bgColor} border-0 text-white`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
            <Icon size={24} className="text-white drop-shadow" />
          </div>
          {trend && (
            <span className="text-white text-sm drop-shadow">+{trend}</span>
          )}
        </div>
        <h3 className="text-2xl font-bold mb-1 text-white drop-shadow">{value}</h3>
        <p className="text-white text-sm drop-shadow">{title}</p>
      </div>
    </Card>
  </motion.div>
);

export const ChildDashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  const child = user as { 
    name: string; 
    totalStars?: number; 
    totalCoins?: number; 
    currentStreak?: number; 
    badges?: string[]; 
  } | null;

  // Mock subjects data - in real app, this would come from Firebase
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      stars: 45
    },
    {
      id: 'english',
      name: 'English',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      progress: 60,
      totalLessons: 18,
      completedLessons: 11,
      stars: 33
    },
    {
      id: 'science',
      name: 'Science',
      icon: Globe,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      stars: 18
    },
    {
      id: 'art',
      name: 'Art & Craft',
      icon: Palette,
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
      progress: 85,
      totalLessons: 12,
      completedLessons: 10,
      stars: 28
    }
  ];
  
  if (!user) return null;

  const handleSubjectClick = (subjectId: string) => {
    console.log(`Opening subject: ${subjectId}`);
    router.push(`/subjects/${subjectId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Welcome back, {child.name}! 🌟
        </h1>
        <p className="text-gray-600 text-lg">
          Ready to continue your learning adventure?
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Stars"
          value={child.totalStars || 124}
          icon={Star}
          color="text-yellow-600"
          bgColor="bg-gradient-to-br from-yellow-500 to-orange-500"
          trend="12"
        />
        <StatsCard
          title="Coins Earned"
          value={child.totalCoins || 85}
          icon={Coins}
          color="text-blue-600"
          bgColor="bg-gradient-to-br from-blue-500 to-cyan-500"
          trend="8"
        />
        <StatsCard
          title="Current Streak"
          value={`${child.currentStreak || 5} days`}
          icon={Target}
          color="text-green-600"
          bgColor="bg-gradient-to-br from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Achievements"
          value={child.badges?.length || 7}
          icon={Trophy}
          color="text-purple-600"
          bgColor="bg-gradient-to-br from-purple-500 to-indigo-500"
          trend="2"
        />
      </div>

      {/* Continue Learning Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-2xl font-bold mb-2">Continue Your Adventure! 🚀</h2>
                <p className="text-white/90 mb-4">
                  You&apos;re doing great! Complete today&apos;s lesson to keep your streak going.
                </p>
                <Button 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  onClick={() => handleSubjectClick('math')}
                >
                  <BookOpen size={20} className="mr-2" />
                  Continue Learning
                </Button>
              </div>
              <div className="text-6xl">🎯</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              index={index}
              onClick={() => handleSubjectClick(subject.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Today's Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-amber-400 to-orange-500 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Today&apos;s Challenge 🎯</h3>
              <Award size={24} />
            </div>
            <p className="mb-4 text-white/90">
              Complete 3 math lessons to earn 50 bonus coins!
            </p>
            <div className="flex items-center justify-between">
              <ProgressBar 
                value={66} 
                className="flex-1 mr-4"
                variant="default"
              />
              <span className="font-semibold">2/3</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('View progress')}>
            <div className="p-6 text-center">
              <TrendingUp size={32} className="text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">View Progress</h3>
            </div>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Daily challenges')}>
            <div className="p-6 text-center">
              <Calendar size={32} className="text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Daily Challenges</h3>
            </div>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('View rewards')}>
            <div className="p-6 text-center">
              <Trophy size={32} className="text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">My Rewards</h3>
            </div>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Music time')}>
            <div className="p-6 text-center">
              <Music size={32} className="text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Music Time</h3>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};