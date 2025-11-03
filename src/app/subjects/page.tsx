'use client';

import { useAuth } from '@/context/AuthContext';
import { ComingSoon } from '@/components/common/ComingSoon';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SubjectsPage() {
  const { user, userType, isLoading } = useAuth();

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
          <div className="text-white text-2xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  return (
    <ComingSoon
      title="Subjects Directory Coming Soon!"
      description="We're creating a comprehensive subjects directory. For now, you can browse subjects from your dashboard and start learning!"
      backUrl="/dashboard"
      backLabel="Back to Dashboard"
    />
  );
}
