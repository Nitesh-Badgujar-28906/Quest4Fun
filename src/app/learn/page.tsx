'use client';

import { useAuth } from '@/context/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calculator, 
  Globe, 
  Palette, 
  Music,
  Video,
  Gamepad2,
  Brain,
  Target,
  Clock,
  Star,
  Trophy,
  Play,
  Users,
  Zap
} from 'lucide-react';

interface LearningActivity {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'game' | 'quiz' | 'interactive' | 'challenge';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  icon: any;
  color: string;
  bgColor: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const learningActivities: LearningActivity[] = [
  {
    id: 'quick-math',
    title: 'Quick Math Challenge',
    description: 'Test your math skills with fun timed challenges',
    type: 'challenge',
    subject: 'Math',
    difficulty: 'medium',
    duration: 10,
    icon: Calculator,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
    isPopular: true
  },
  {
    id: 'story-builder',
    title: 'Story Builder',
    description: 'Create amazing stories with words and pictures',
    type: 'interactive',
    subject: 'English',
    difficulty: 'easy',
    duration: 15,
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
    isNew: true
  },
  {
    id: 'science-lab',
    title: 'Virtual Science Lab',
    description: 'Conduct safe experiments and learn about nature',
    type: 'interactive',
    subject: 'Science',
    difficulty: 'medium',
    duration: 20,
    icon: Globe,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600'
  },
  {
    id: 'art-studio',
    title: 'Digital Art Studio',
    description: 'Draw, paint, and create beautiful artwork',
    type: 'interactive',
    subject: 'Art',
    difficulty: 'easy',
    duration: 25,
    icon: Palette,
    color: 'text-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-400 to-pink-600'
  },
  {
    id: 'music-maker',
    title: 'Music Maker',
    description: 'Compose your own melodies and learn about rhythm',
    type: 'interactive',
    subject: 'Music',
    difficulty: 'easy',
    duration: 18,
    icon: Music,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600',
    isNew: true
  },
  {
    id: 'brain-training',
    title: 'Brain Training Games',
    description: 'Fun puzzles to boost memory and thinking skills',
    type: 'game',
    subject: 'Logic',
    difficulty: 'medium',
    duration: 12,
    icon: Brain,
    color: 'text-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    isPopular: true
  }
];

const categories = [
  { id: 'all', label: 'All Activities', icon: Target },
  { id: 'Math', label: 'Math', icon: Calculator },
  { id: 'English', label: 'English', icon: BookOpen },
  { id: 'Science', label: 'Science', icon: Globe },
  { id: 'Art', label: 'Art', icon: Palette },
  { id: 'Music', label: 'Music', icon: Music },
  { id: 'Logic', label: 'Logic', icon: Brain }
];

export default function LearnPage() {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredActivities, setFilteredActivities] = useState(learningActivities);

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'child')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredActivities(learningActivities);
    } else {
      setFilteredActivities(learningActivities.filter(activity => activity.subject === selectedCategory));
    }
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Learning Center...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  const handleActivityClick = (activityId: string) => {
    // In a real app, this would navigate to the specific learning activity
    console.log(`Starting activity: ${activityId}`);
    router.push(`/learn/${activityId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'hard': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'game': return Gamepad2;
      case 'quiz': return Target;
      case 'interactive': return Play;
      case 'challenge': return Zap;
      default: return Play;
    }
  };

  return (
    <AppLayout currentPage="learning">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Learning Center</h1>
            <p className="text-xl text-gray-600">Discover fun activities and challenges!</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0 text-white">
              <div className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-white/90">Activities Completed</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white">
              <div className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">180</div>
                <div className="text-sm text-white/90">Stars Earned</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 border-0 text-white">
              <div className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">5h 23m</div>
                <div className="text-sm text-white/90">Time Learning</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'all' ? 'All Activities' : `${selectedCategory} Activities`}
            </h2>
            <div className="text-sm text-gray-600">
              {filteredActivities.length} activities available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity, index) => {
              const Icon = activity.icon;
              const TypeIcon = getTypeIcon(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card 
                    className="cursor-pointer transition-all duration-200 hover:shadow-xl relative overflow-hidden"
                    onClick={() => handleActivityClick(activity.id)}
                  >
                    {/* Activity Header */}
                    <div className={`${activity.bgColor} p-4 text-white relative`}>
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {activity.isNew && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                        {activity.isPopular && (
                          <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                            POPULAR
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                          <p className="text-sm text-white/90">{activity.subject}</p>
                        </div>
                      </div>
                    </div>

                    {/* Activity Details */}
                    <div className="p-4">
                      <p className="text-gray-600 mb-4 text-sm">
                        {activity.description}
                      </p>

                      {/* Activity Meta */}
                      <div className="flex items-center justify-between text-xs mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <TypeIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500 capitalize">{activity.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500">{activity.duration} min</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>

                      {/* Start Button */}
                      <Button 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActivityClick(activity.id);
                        }}
                      >
                        <Play className="w-4 h-4" />
                        Start Activity
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready for a Challenge?</h3>
                <p className="text-white/90">Try our daily challenges and compete with friends!</p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Users className="w-4 h-4 mr-2" />
                  Multiplayer
                </Button>
                <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Zap className="w-4 h-4 mr-2" />
                  Daily Challenge
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}