'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  showSidebar?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  currentPage = 'dashboard',
  showSidebar = true 
}) => {
  const { userType } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(currentPage);

  const router = useRouter();

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setSidebarOpen(false);
    
    // Navigate to the appropriate route
    switch(page) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'learning':
        router.push('/learn');
        break;
      case 'rewards':
        router.push('/rewards');
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        router.push('/dashboard');
    }
  };

  if (userType !== 'child') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 relative z-50">
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-purple-100 text-purple-600"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
          <h1 className="text-xl font-bold text-gray-800">Quest4Fun</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        {showSidebar && (
          <Sidebar 
            currentPage={activePage} 
            onNavigate={handleNavigate} 
          />
        )}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="lg:hidden">
            <Sidebar 
              currentPage={activePage} 
              onNavigate={handleNavigate} 
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className={`min-h-screen transition-all duration-300 ${
          showSidebar ? 'lg:ml-70' : ''
        } ${userType === 'child' ? 'pt-0 lg:pt-0' : ''}`}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};