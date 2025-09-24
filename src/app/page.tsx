'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginPage from '@/components/auth/LoginPage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && userType) {
      if (userType === 'child') {
        router.push('/dashboard');
      } else if (userType === 'parent') {
        router.push('/parent');
      }
    }
  }, [user, userType, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Quest4Fun...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Show redirecting message while navigating
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" color="text-white" />
        <div className="text-white text-2xl font-bold">Redirecting...</div>
        <div className="text-white/80 text-lg">Taking you to your {userType} dashboard</div>
      </div>
    </div>
  );
}
