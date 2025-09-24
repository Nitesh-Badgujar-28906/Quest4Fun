'use client';

import React, { useState } from 'react';
import { collection, doc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Child, Parent, Subject, Level, Lesson } from '@/types';

const seedData = {
  // Sample children
  children: [
    {
      id: 'child-1',
      name: 'Emma',
      avatar: '/images/avatars/cat-happy.png',
      age: 5,
      grade: 'JKG',
      parentId: 'parent-1',
      createdAt: new Date(),
      lastLogin: new Date(),
      totalStars: 45,
      totalCoins: 120,
      badges: ['first-steps', 'week-warrior'],
      unlockedLevels: ['math-jkg-level-1', 'english-jkg-level-1'],
      currentStreak: 3,
      preferences: {
        soundEnabled: true,
        difficultyLevel: 'easy'
      }
    },
    {
      id: 'child-2',
      name: 'Liam',
      avatar: '/images/avatars/dog-brave.png',
      age: 6,
      grade: 'LKG',
      parentId: 'parent-1',
      createdAt: new Date(),
      lastLogin: new Date(),
      totalStars: 78,
      totalCoins: 200,
      badges: ['first-steps', 'week-warrior', 'math-master'],
      unlockedLevels: ['math-lkg-level-1', 'english-lkg-level-1'],
      currentStreak: 5,
      preferences: {
        soundEnabled: true,
        difficultyLevel: 'medium'
      }
    },
    {
      id: 'child-3',
      name: 'Zoe',
      avatar: '/images/avatars/owl-smart.png',
      age: 7,
      grade: '1st',
      parentId: 'parent-1',
      createdAt: new Date(),
      lastLogin: new Date(),
      totalStars: 156,
      totalCoins: 350,
      badges: ['first-steps', 'week-warrior', 'math-master', 'quiz-champion'],
      unlockedLevels: ['math-1st-level-1', 'english-1st-level-1', 'science-1st-level-1'],
      currentStreak: 8,
      preferences: {
        soundEnabled: true,
        difficultyLevel: 'medium'
      }
    }
  ] as Child[],

  // Sample parent
  parents: [
    {
      id: 'parent-1',
      email: 'parent@quest4fun.demo',
      name: 'Sarah Johnson',
      pin: '1234',
      children: ['child-1', 'child-2', 'child-3'],
      createdAt: new Date(),
      lastLogin: new Date()
    }
  ] as Parent[],

  // Sample subjects
  subjects: [
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Learn numbers, counting, shapes, and basic arithmetic',
      icon: 'calculator',
      color: '#3B82F6',
      grades: ['JKG', 'LKG', '1st', '2nd', '3rd', '4th'],
      isActive: true
    },
    {
      id: 'english',
      name: 'English',
      description: 'Reading, writing, vocabulary, and language skills',
      icon: 'book-open',
      color: '#10B981',
      grades: ['JKG', 'LKG', '1st', '2nd', '3rd', '4th'],
      isActive: true
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Explore the world around us through fun experiments',
      icon: 'globe',
      color: '#8B5CF6',
      grades: ['1st', '2nd', '3rd', '4th'],
      isActive: true
    },
    {
      id: 'art',
      name: 'Art & Craft',
      description: 'Express creativity through drawing, coloring, and crafts',
      icon: 'palette',
      color: '#EC4899',
      grades: ['JKG', 'LKG', '1st', '2nd', '3rd', '4th'],
      isActive: true
    }
  ] as Subject[],

  // Sample levels
  levels: [
    {
      id: 'math-jkg-level-1',
      subjectId: 'math',
      grade: 'JKG',
      levelNumber: 1,
      title: 'Numbers 1-10',
      description: 'Learn to count and recognize numbers from 1 to 10',
      isActive: true,
      estimatedDuration: 30
    },
    {
      id: 'english-jkg-level-1',
      subjectId: 'english',
      grade: 'JKG',
      levelNumber: 1,
      title: 'Alphabet A-M',
      description: 'Learn the first half of the alphabet with fun activities',
      isActive: true,
      estimatedDuration: 25
    }
  ] as Level[],

  // Sample lessons
  lessons: [
    {
      id: 'lesson-1',
      levelId: 'math-jkg-level-1',
      title: 'Counting 1, 2, 3',
      description: 'Learn to count from 1 to 3 with fun animations',
      type: 'interactive',
      duration: 5,
      difficulty: 'Easy',
      order: 1,
      content: {
        type: 'counting',
        maxNumber: 3,
        objects: ['apple', 'ball', 'car']
      },
      isActive: true,
      createdAt: new Date()
    },
    {
      id: 'lesson-2',
      levelId: 'math-jkg-level-1',
      title: 'Numbers 4 and 5',
      description: 'Discover numbers 4 and 5 through games',
      type: 'game',
      duration: 8,
      difficulty: 'Easy',
      order: 2,
      content: {
        type: 'number-recognition',
        numbers: [4, 5],
        gameType: 'matching'
      },
      isActive: true,
      createdAt: new Date()
    }
  ] as Lesson[]
};

export default function DataSeeder() {
  const [status, setStatus] = useState<string>('Ready to seed data');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResults, setSeedResults] = useState<Record<string, number>>({});

  const seedFirestore = async () => {
    setIsSeeding(true);
    setStatus('Starting data seeding...');
    const results: Record<string, number> = {};

    try {
      // Seed children
      setStatus('Seeding children data...');
      for (const child of seedData.children) {
        await setDoc(doc(db, 'children', child.id), child);
      }
      results.children = seedData.children.length;

      // Seed parents
      setStatus('Seeding parents data...');
      for (const parent of seedData.parents) {
        await setDoc(doc(db, 'parents', parent.id), parent);
      }
      results.parents = seedData.parents.length;

      // Seed subjects
      setStatus('Seeding subjects data...');
      for (const subject of seedData.subjects) {
        await setDoc(doc(db, 'subjects', subject.id), subject);
      }
      results.subjects = seedData.subjects.length;

      // Seed levels
      setStatus('Seeding levels data...');
      for (const level of seedData.levels) {
        await setDoc(doc(db, 'levels', level.id), level);
      }
      results.levels = seedData.levels.length;

      // Seed lessons
      setStatus('Seeding lessons data...');
      for (const lesson of seedData.lessons) {
        await setDoc(doc(db, 'lessons', lesson.id), lesson);
      }
      results.lessons = seedData.lessons.length;

      setSeedResults(results);
      setStatus('✅ Data seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding data:', error);
      setStatus(`❌ Error seeding data: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const testConnection = async () => {
    setStatus('Testing Firebase connection...');
    try {
      // Test by reading a collection
      const testCollection = collection(db, 'test');
      await getDocs(testCollection);
      setStatus('✅ Firebase connection successful!');
    } catch (error) {
      console.error('Connection test failed:', error);
      setStatus(`❌ Connection failed: ${error}`);
    }
  };

  const clearData = async () => {
    setStatus('This would clear all data... (not implemented for safety)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🔧 Firebase Data Seeder
        </h1>

        <div className="grid gap-6 mb-8">
          {/* Status Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <p className={`text-lg ${
              status.includes('✅') ? 'text-green-600' : 
              status.includes('❌') ? 'text-red-600' : 
              'text-blue-600'
            }`}>
              {status}
            </p>
            
            {isSeeding && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
                </div>
              </div>
            )}
          </Card>

          {/* Results Card */}
          {Object.keys(seedResults).length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Seeding Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(seedResults).map(([collection, count]) => (
                  <div key={collection} className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{count}</div>
                    <div className="text-sm text-gray-600 capitalize">{collection}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Actions Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={testConnection}
                variant="secondary"
                disabled={isSeeding}
              >
                Test Connection
              </Button>
              <Button 
                onClick={seedFirestore}
                disabled={isSeeding}
              >
                {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
              </Button>
              <Button 
                onClick={clearData}
                variant="secondary"
                disabled={isSeeding}
              >
                Clear Data
              </Button>
            </div>
          </Card>

          {/* Data Preview Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Children ({seedData.children.length})</h3>
                <div className="text-sm text-gray-600">
                  {seedData.children.map(c => c.name).join(', ')}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Subjects ({seedData.subjects.length})</h3>
                <div className="text-sm text-gray-600">
                  {seedData.subjects.map(s => s.name).join(', ')}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Levels ({seedData.levels.length})</h3>
                <div className="text-sm text-gray-600">
                  {seedData.levels.map(l => l.title).join(', ')}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Lessons ({seedData.lessons.length})</h3>
                <div className="text-sm text-gray-600">
                  {seedData.lessons.map(l => l.title).join(', ')}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="secondary"
          >
            ← Back to App
          </Button>
        </div>
      </div>
    </div>
  );
}