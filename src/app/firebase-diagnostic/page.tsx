'use client';

import React, { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInAnonymously, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  error?: string;
}

export default function FirebaseDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (result: DiagnosticResult) => {
    setResults(prev => [...prev, result]);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);

    // Test 1: Firebase Config
    addResult({
      test: 'Firebase Configuration',
      status: 'pending',
      message: 'Checking Firebase config...'
    });

    try {
      if (!auth || !db) {
        throw new Error('Firebase not initialized');
      }
      addResult({
        test: 'Firebase Configuration',
        status: 'success',
        message: 'Firebase SDK initialized successfully'
      });
    } catch (error) {
      addResult({
        test: 'Firebase Configuration',
        status: 'error',
        message: 'Firebase configuration failed',
        error: String(error)
      });
    }

    // Test 2: Anonymous Authentication
    addResult({
      test: 'Anonymous Authentication',
      status: 'pending',
      message: 'Testing anonymous sign-in...'
    });

    try {
      const userCredential = await signInAnonymously(auth);
      addResult({
        test: 'Anonymous Authentication',
        status: 'success',
        message: `Anonymous user created: ${userCredential.user.uid}`
      });
    } catch (error: unknown) {
      let errorMessage = 'Unknown authentication error';
      let errorCode = 'unknown';
      let errorMessageText = 'Unknown error';
      
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const firebaseError = error as { code: string; message: string };
        errorCode = firebaseError.code;
        errorMessageText = firebaseError.message;
        
        if (firebaseError.code === 'auth/operation-not-allowed') {
          errorMessage = 'Anonymous authentication is not enabled. Enable it in Firebase Console → Authentication → Sign-in method';
        } else if (firebaseError.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Check your internet connection.';
        } else if (firebaseError.code === 'auth/invalid-api-key') {
          errorMessage = 'Invalid API key. Check your Firebase configuration.';
        }
      }
      
      addResult({
        test: 'Anonymous Authentication',
        status: 'error',
        message: errorMessage,
        error: `${errorCode}: ${errorMessageText}`
      });
    }

    // Test 3: Firestore Read (Public)
    addResult({
      test: 'Firestore Read (Public)',
      status: 'pending',
      message: 'Testing public read access...'
    });

    try {
      const testCollection = collection(db, 'subjects');
      const snapshot = await getDocs(testCollection);
      addResult({
        test: 'Firestore Read (Public)',
        status: 'success',
        message: `Read ${snapshot.size} documents from subjects collection`
      });
    } catch (error: unknown) {
      let errorMessage = 'Unknown Firestore error';
      let errorCode = 'unknown';
      let errorMessageText = 'Unknown error';
      
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const firebaseError = error as { code: string; message: string };
        errorCode = firebaseError.code;
        errorMessageText = firebaseError.message;
        
        if (firebaseError.code === 'permission-denied') {
          errorMessage = 'Permission denied. Update Firestore security rules to allow public reads for subjects.';
        } else if (firebaseError.code === 'unavailable') {
          errorMessage = 'Firestore service unavailable. Enable Firestore Database in Firebase Console.';
        }
      }
      
      addResult({
        test: 'Firestore Read (Public)',
        status: 'error',
        message: errorMessage,
        error: `${errorCode}: ${errorMessageText}`
      });
    }

    // Test 4: Firestore Write (Authenticated)
    addResult({
      test: 'Firestore Write (Authenticated)',
      status: 'pending',
      message: 'Testing authenticated write access...'
    });

    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Diagnostic test',
        userId: auth.currentUser.uid,
        timestamp: new Date(),
        testId: Math.random().toString(36).substr(2, 9)
      });
      
      addResult({
        test: 'Firestore Write (Authenticated)',
        status: 'success',
        message: `Successfully wrote document: ${docRef.id}`
      });
    } catch (error: unknown) {
      let errorMessage = 'Unknown write error';
      let errorCode = 'unknown';
      let errorMessageText = 'Unknown error';
      
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const firebaseError = error as { code: string; message: string };
        errorCode = firebaseError.code;
        errorMessageText = firebaseError.message;
        
        if (firebaseError.code === 'permission-denied') {
          errorMessage = 'Permission denied. Update Firestore security rules to allow authenticated writes.';
        } else if (firebaseError.code === 'unauthenticated') {
          errorMessage = 'User not authenticated. This test requires a signed-in user.';
        }
      }
      
      addResult({
        test: 'Firestore Write (Authenticated)',
        status: 'error',
        message: errorMessage,
        error: `${errorCode}: ${errorMessageText}`
      });
    }

    // Test 5: Sample Data Check
    addResult({
      test: 'Sample Data Check',
      status: 'pending',
      message: 'Checking for sample data...'
    });

    try {
      const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
      const childrenSnapshot = await getDocs(collection(db, 'children'));
      
      if (subjectsSnapshot.size > 0 && childrenSnapshot.size > 0) {
        addResult({
          test: 'Sample Data Check',
          status: 'success',
          message: `Found ${subjectsSnapshot.size} subjects and ${childrenSnapshot.size} children`
        });
      } else {
        addResult({
          test: 'Sample Data Check',
          status: 'error',
          message: 'No sample data found. Visit /seed-data to populate initial data.',
          error: 'Missing sample data'
        });
      }
    } catch (error: unknown) {
      let errorCode = 'unknown';
      let errorMessageText = 'Unknown error';
      
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const firebaseError = error as { code: string; message: string };
        errorCode = firebaseError.code;
        errorMessageText = firebaseError.message;
      }
      
      addResult({
        test: 'Sample Data Check',
        status: 'error',
        message: 'Could not check sample data',
        error: `${errorCode}: ${errorMessageText}`
      });
    }

    setIsRunning(false);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      addResult({
        test: 'Sign Out',
        status: 'success',
        message: 'User signed out successfully'
      });
    } catch (error) {
      addResult({
        test: 'Sign Out',
        status: 'error',
        message: 'Sign out failed',
        error: String(error)
      });
    }
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
    }
  };

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'pending': return 'text-blue-600';
    }
  };

  const errorCount = results.filter(r => r.status === 'error').length;
  const successCount = results.filter(r => r.status === 'success').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🔍 Firebase Diagnostic Tool
        </h1>

        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Firebase Health Check</h2>
            <div className="flex gap-2">
              <Button onClick={runDiagnostics} disabled={isRunning}>
                {isRunning ? 'Running...' : 'Run Diagnostics'}
              </Button>
              <Button onClick={signOutUser} variant="secondary">
                Sign Out
              </Button>
            </div>
          </div>
          
          {results.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{successCount}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Diagnostic Results</h2>
          
          {results.length === 0 && !isRunning && (
            <p className="text-gray-500 text-center py-8">
              Click &quot;Run Diagnostics&quot; to check your Firebase setup
            </p>
          )}

          <div className="space-y-4">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  result.status === 'success' ? 'bg-green-50 border-green-200' :
                  result.status === 'error' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getStatusIcon(result.status)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{result.test}</h3>
                    <p className={`text-sm ${getStatusColor(result.status)} mb-2`}>
                      {result.message}
                    </p>
                    {result.error && (
                      <details className="text-xs text-gray-600">
                        <summary className="cursor-pointer hover:text-gray-800">
                          Error Details
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                          {result.error}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://console.firebase.google.com/project/quest4fun-f2ab6/authentication/users"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-800">🔐 Authentication</h3>
              <p className="text-sm text-blue-600">Enable sign-in methods</p>
            </a>
            
            <a 
              href="https://console.firebase.google.com/project/quest4fun-f2ab6/firestore/databases/-default-/rules"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold text-green-800">📝 Firestore Rules</h3>
              <p className="text-sm text-green-600">Update security rules</p>
            </a>
            
            <a 
              href="/seed-data"
              className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold text-purple-800">🌱 Seed Data</h3>
              <p className="text-sm text-purple-600">Populate sample content</p>
            </a>
            
            <a 
              href="/firebase-test"
              className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <h3 className="font-semibold text-orange-800">🧪 Firebase Test</h3>
              <p className="text-sm text-orange-600">General connection test</p>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}