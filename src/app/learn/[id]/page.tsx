'use client';

import { useAuth } from '@/context/AuthContext';
import { ComingSoon } from '@/components/common/ComingSoon';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { redirect } from 'next/navigation';
import { useEffect, use } from 'react';

interface LearningActivity {
  id: string;
  title: string;
  description: string;
}

const learningActivities: { [key: string]: LearningActivity } = {
  'quick-math': {
    id: 'quick-math',
    title: 'Quick Math Challenge',
    description: 'Test your math skills with fun timed challenges! Solve problems quickly and earn bonus stars.'
  },
  'story-builder': {
    id: 'story-builder',
    title: 'Story Builder',
    description: 'Create amazing stories with words and pictures! Let your imagination run wild.'
  },
  'science-lab': {
    id: 'science-lab',
    title: 'Virtual Science Lab',
    description: 'Conduct safe experiments and learn about nature! Explore the wonders of science.'
  },
  'art-studio': {
    id: 'art-studio',
    title: 'Digital Art Studio',
    description: 'Draw, paint, and create beautiful artwork! Express yourself through digital art.'
  },
  'music-maker': {
    id: 'music-maker',
    title: 'Music Maker',
    description: 'Compose your own melodies and learn about rhythm! Create music like a pro.'
  },
  'brain-training': {
    id: 'brain-training',
    title: 'Brain Training Games',
    description: 'Fun puzzles to boost memory and thinking skills! Train your brain with exciting challenges.'
  }
};

export default function LearningActivityPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { user, userType, isLoading } = useAuth();
  const { id } = use(params);

  useEffect(() => {
    if (!isLoading && (!user || userType !== 'child')) {
      redirect('/');
    }
  }, [user, userType, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-400">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="text-white" />
          <div className="text-white text-2xl font-bold">Loading Activity...</div>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'child') {
    return null; // Will redirect
  }

  const activity = learningActivities[id] || {
    id: id,
    title: 'Learning Activity',
    description: 'An exciting learning experience is being prepared for you!'
  };

  return (
    <ComingSoon
      title={activity.title}
      description={activity.description}
      backUrl="/learn"
      backLabel="Back to Learning Center"
    />
  );
}
