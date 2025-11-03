'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import Avatar from '@/components/ui/Avatar';
import { AddStudentModal } from '@/components/dashboard/AddStudentModal';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Award,
  Calendar,
  Settings,
  Download,
  Eye,
  Star,
  Trophy,
  BarChart3,
  PieChart,
  Users,
  Shield,
  Timer,
  CheckCircle,
  AlertTriangle,
  LogOut,
  UserPlus
} from 'lucide-react';

interface ChildProgress {
  id: string;
  name: string;
  avatar: string;
  age: number;
  currentLevel: number;
  totalStars: number;
  totalCoins: number;
  currentStreak: number;
  weeklyProgress: number;
  completedLessons: number;
  totalLessons: number;
  favoriteSubject: string;
  averageScore: number;
  timeSpentToday: number; // in minutes
  lastLogin: string;
  subjects: {
    name: string;
    progress: number;
    starsEarned: number;
    timeSpent: number;
  }[];
}

const ProgressCard: React.FC<{
  child: ChildProgress;
  onClick: () => void;
}> = ({ child, onClick }) => {
  const overallProgress = (child.completedLessons / child.totalLessons) * 100;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={onClick}>
        <div className="p-6">
          {/* Child Header */}
          <div className="flex items-center gap-4 mb-4">
            <Avatar
              src={child.avatar}
              alt={child.name}
              size="lg"
              className="border-2 border-blue-200"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
              <p className="text-gray-600">Age {child.age} • Level {child.currentLevel}</p>
              <p className="text-sm text-gray-500">Last login: {child.lastLogin}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-600 mb-1">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold">{child.totalStars}</span>
              </div>
              <div className="text-sm text-gray-500">🔥 {child.currentStreak} days</div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <ProgressBar value={overallProgress} variant="default" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">{child.averageScore}%</div>
                <div className="text-xs text-gray-600">Avg Score</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">{child.timeSpentToday}m</div>
                <div className="text-xs text-gray-600">Today</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-600">{child.completedLessons}</div>
                <div className="text-xs text-gray-600">Lessons</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const SubjectProgressChart: React.FC<{
  subjects: ChildProgress['subjects'];
}> = ({ subjects }) => {
  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => (
        <motion.div
          key={subject.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4"
        >
          <div className="w-20 text-sm font-medium text-gray-700">
            {subject.name}
          </div>
          <div className="flex-1">
            <ProgressBar value={subject.progress} variant="default" />
          </div>
          <div className="w-16 text-sm text-gray-600 text-right">
            {Math.round(subject.progress)}%
          </div>
          <div className="w-12 text-sm text-yellow-600 text-right">
            ⭐ {subject.starsEarned}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const ParentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedChild, setSelectedChild] = useState<string>('1');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  if (!user) return null;
  
  const parentId = (user as any).id || 'demo-parent';

  // Mock data - in real app, this would come from Firebase
  const children: ChildProgress[] = [
    {
      id: '1',
      name: 'Emma',
      avatar: '/images/avatars/girl-1.png',
      age: 7,
      currentLevel: 3,
      totalStars: 247,
      totalCoins: 156,
      currentStreak: 12,
      weeklyProgress: 85,
      completedLessons: 28,
      totalLessons: 45,
      favoriteSubject: 'Math',
      averageScore: 92,
      timeSpentToday: 45,
      lastLogin: '2 hours ago',
      subjects: [
        { name: 'Math', progress: 85, starsEarned: 67, timeSpent: 120 },
        { name: 'English', progress: 72, starsEarned: 54, timeSpent: 95 },
        { name: 'Science', progress: 60, starsEarned: 42, timeSpent: 80 },
        { name: 'Art', progress: 90, starsEarned: 48, timeSpent: 60 }
      ]
    },
    {
      id: '2',
      name: 'Alex',
      avatar: '/images/avatars/boy-1.png',
      age: 9,
      currentLevel: 4,
      totalStars: 189,
      totalCoins: 98,
      currentStreak: 8,
      weeklyProgress: 65,
      completedLessons: 22,
      totalLessons: 40,
      favoriteSubject: 'Science',
      averageScore: 87,
      timeSpentToday: 25,
      lastLogin: '1 day ago',
      subjects: [
        { name: 'Math', progress: 78, starsEarned: 45, timeSpent: 85 },
        { name: 'English', progress: 65, starsEarned: 38, timeSpent: 70 },
        { name: 'Science', progress: 88, starsEarned: 52, timeSpent: 110 },
        { name: 'Art', progress: 45, starsEarned: 22, timeSpent: 35 }
      ]
    }
  ];

  const selectedChildData = children.find(c => c.id === selectedChild);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Parent Dashboard 👨‍👩‍👧‍👦
            </h1>
            <p className="text-gray-600">
              Monitor your children&apos;s learning progress and celebrate their achievements
            </p>
          </div>
          <Button
            variant="secondary"
            size="md"
            onClick={logout}
            icon={LogOut}
            iconPosition="left"
            className="flex-shrink-0"
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
          <div className="p-6 text-center">
            <Users size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">{children.length}</div>
            <div className="text-blue-100 text-sm">Children</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 text-white">
          <div className="p-6 text-center">
            <Trophy size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">
              {children.reduce((sum, child) => sum + child.totalStars, 0)}
            </div>
            <div className="text-green-100 text-sm">Total Stars</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
          <div className="p-6 text-center">
            <BookOpen size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">
              {children.reduce((sum, child) => sum + child.completedLessons, 0)}
            </div>
            <div className="text-purple-100 text-sm">Lessons Completed</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white">
          <div className="p-6 text-center">
            <Timer size={32} className="mx-auto mb-3" />
            <div className="text-2xl font-bold">
              {children.reduce((sum, child) => sum + child.timeSpentToday, 0)}m
            </div>
            <div className="text-orange-100 text-sm">Today&apos;s Learning</div>
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

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Children Progress Cards */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Children&apos;s Progress</h2>
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddStudentModalOpen(true)}
                icon={UserPlus}
                iconPosition="left"
              >
                Add Student
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children.map((child) => (
                <ProgressCard
                  key={child.id}
                  child={child}
                  onClick={() => setSelectedChild(child.id)}
                />
              ))}
            </div>
          </div>

          {/* Today's Activity */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Today&apos;s Activity</h3>
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Avatar src={child.avatar} alt={child.name} size="sm" />
                      <div>
                        <div className="font-semibold text-gray-800">{child.name}</div>
                        <div className="text-sm text-gray-600">
                          {child.timeSpentToday > 0 ? `${child.timeSpentToday} minutes learned` : 'No activity today'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {child.timeSpentToday > 0 ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <AlertTriangle size={20} className="text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'progress' && selectedChildData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Child Header */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar
                  src={selectedChildData.avatar}
                  alt={selectedChildData.name}
                  size="xl"
                  className="border-4 border-blue-200"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedChildData.name}&apos;s Progress</h2>
                  <p className="text-gray-600">Age {selectedChildData.age} • Level {selectedChildData.currentLevel}</p>
                </div>
              </div>

              {/* Subject Progress */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Progress</h3>
              <SubjectProgressChart subjects={selectedChildData.subjects} />
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'progress' && !selectedChildData && (
        <Card className="p-8 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Child</h3>
          <p className="text-gray-500">Choose a child from the overview to see detailed progress.</p>
        </Card>
      )}

      {activeTab === 'reports' && (
        <Card className="p-8 text-center">
          <Download size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Progress Reports</h3>
          <p className="text-gray-500 mb-6">Download detailed learning reports for your children.</p>
          <div className="space-y-3">
            <Button className="w-full max-w-sm">
              <Download size={20} className="mr-2" />
              Weekly Progress Report
            </Button>
            <Button variant="secondary" className="w-full max-w-sm">
              <Download size={20} className="mr-2" />
              Monthly Summary
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card className="p-8 text-center">
          <Settings size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Parental Controls</h3>
          <p className="text-gray-500 mb-6">Manage screen time, content filters, and learning goals.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Timer size={20} />
              Screen Time Limits
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Shield size={20} />
              Content Filters
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Target size={20} />
              Learning Goals
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2">
              <Eye size={20} />
              Activity Monitor
            </Button>
          </div>
        </Card>
      )}

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        parentId={parentId}
        onStudentAdded={() => {
          // Refresh the children list
          console.log('Student added successfully! Refreshing list...');
          // In real app, this would refetch children from Firebase
        }}
      />
    </div>
  );
};