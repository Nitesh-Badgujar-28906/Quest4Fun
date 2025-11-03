    'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut,
  Star,
  Coins
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { user, userType, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (userType !== 'child' || !user) {
    return null;
  }

  const child = user as { 
    name: string; 
    avatar?: string; 
    currentLevel?: number; 
    totalStars?: number; 
    totalCoins?: number; 
    currentStreak?: number; 
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: Home, color: 'text-purple-600', href: '/dashboard' },
    { id: 'learning', label: 'Learn', icon: BookOpen, color: 'text-blue-600', href: '/learn' },
    { id: 'rewards', label: 'Rewards', icon: Trophy, color: 'text-yellow-600', href: '/rewards' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600', href: '/settings' }
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-70 bg-gradient-to-b from-purple-100 to-blue-100 shadow-lg z-40"
    >
      <div className="p-6">
        {/* Child Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <Avatar
              src={child.avatar}
              alt={child.name}
              size="lg"
              className="border-4 border-purple-200"
            />
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{child.name}</h3>
              <p className="text-sm text-gray-600">Level {child.currentLevel || 1}</p>
            </div>
          </div>
          
          {/* Progress Stats */}
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-yellow-600">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold">{child.totalStars || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <Coins size={16} />
              <span className="font-semibold">{child.totalCoins || 0}</span>
            </div>
            <div className="text-green-600">
              <span className="font-semibold">🔥 {child.currentStreak || 0}</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => {
                  router.push(item.href);
                  onNavigate(item.id);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white shadow-md transform scale-105'
                    : 'hover:bg-white/50 hover:transform hover:scale-102'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${item.color} ${isActive ? 'scale-110' : ''}`} 
                />
                <span className={`font-medium ${
                  isActive ? 'text-gray-800' : 'text-gray-700'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 mt-8 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};