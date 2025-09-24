'use client';

import { useAuth } from '@/context/AuthContext';
import { ParentDashboard } from '@/components/dashboard/ParentDashboard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ParentPage() {
  const { user, userType, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'parent')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Parent Dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'parent') {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-8">
      <ParentDashboard />
    </div>
  );
}