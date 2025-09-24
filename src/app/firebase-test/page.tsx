'use client';

import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface TestResult {
  test: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  duration?: number;
}

export default function FirebaseTest() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const runFirebaseTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Firebase Connection
    const startTime = Date.now();
    try {
      addTestResult({
        test: 'Firebase Connection',
        status: 'pending',
        message: 'Testing Firebase configuration...'
      });

      // Try to read from Firestore
      const testCollection = collection(db, 'test');
      await getDocs(testCollection);
      
      addTestResult({
        test: 'Firebase Connection',
        status: 'success',
        message: 'Firebase connected successfully',
        duration: Date.now() - startTime
      });
    } catch (error) {
      addTestResult({
        test: 'Firebase Connection',
        status: 'error',
        message: `Connection failed: ${error}`,
        duration: Date.now() - startTime
      });
    }

    // Test 2: Authentication
    const authStartTime = Date.now();
    try {
      addTestResult({
        test: 'Authentication',
        status: 'pending',
        message: 'Testing anonymous authentication...'
      });

      await signInAnonymously(auth);
      
      addTestResult({
        test: 'Authentication',
        status: 'success',
        message: 'Anonymous authentication successful',
        duration: Date.now() - authStartTime
      });
    } catch (error) {
      addTestResult({
        test: 'Authentication',
        status: 'error',
        message: `Authentication failed: ${error}`,
        duration: Date.now() - authStartTime
      });
    }

    // Test 3: Firestore Write
    const writeStartTime = Date.now();
    try {
      addTestResult({
        test: 'Firestore Write',
        status: 'pending',
        message: 'Testing Firestore write operation...'
      });

      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Hello from Quest4Fun!',
        timestamp: new Date(),
        testId: Math.random().toString(36).substr(2, 9)
      });
      
      addTestResult({
        test: 'Firestore Write',
        status: 'success',
        message: `Document written with ID: ${docRef.id}`,
        duration: Date.now() - writeStartTime
      });
    } catch (error) {
      addTestResult({
        test: 'Firestore Write',
        status: 'error',
        message: `Write failed: ${error}`,
        duration: Date.now() - writeStartTime
      });
    }

    // Test 4: Firestore Read
    const readStartTime = Date.now();
    try {
      addTestResult({
        test: 'Firestore Read',
        status: 'pending',
        message: 'Testing Firestore read operation...'
      });

      const querySnapshot = await getDocs(collection(db, 'test'));
      const docCount = querySnapshot.size;
      
      addTestResult({
        test: 'Firestore Read',
        status: 'success',
        message: `Successfully read ${docCount} documents from test collection`,
        duration: Date.now() - readStartTime
      });
    } catch (error) {
      addTestResult({
        test: 'Firestore Read',
        status: 'error',
        message: `Read failed: ${error}`,
        duration: Date.now() - readStartTime
      });
    }

    // Test 5: Check if sample data exists
    const dataCheckStartTime = Date.now();
    try {
      addTestResult({
        test: 'Sample Data Check',
        status: 'pending',
        message: 'Checking for sample data...'
      });

      const childDoc = await getDoc(doc(db, 'children', 'child-1'));
      if (childDoc.exists()) {
        const childData = childDoc.data();
        addTestResult({
          test: 'Sample Data Check',
          status: 'success',
          message: `Found sample child: ${childData.name}`,
          duration: Date.now() - dataCheckStartTime
        });
      } else {
        addTestResult({
          test: 'Sample Data Check',
          status: 'error',
          message: 'No sample data found. Please run the data seeder.',
          duration: Date.now() - dataCheckStartTime
        });
      }
    } catch (error) {
      addTestResult({
        test: 'Sample Data Check',
        status: 'error',
        message: `Data check failed: ${error}`,
        duration: Date.now() - dataCheckStartTime
      });
    }

    setIsRunning(false);
  };

  useEffect(() => {
    // Auto-run tests on page load
    runFirebaseTests();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'pending': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const successCount = testResults.filter(r => r.status === 'success').length;
  const errorCount = testResults.filter(r => r.status === 'error').length;
  const totalTests = testResults.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🧪 Firebase Connection Test
        </h1>

        {/* Summary Card */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Test Summary</h2>
            <Button 
              onClick={runFirebaseTests}
              disabled={isRunning}
              variant="secondary"
            >
              {isRunning ? 'Running Tests...' : 'Re-run Tests'}
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalTests}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </Card>

        {/* Test Results */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          
          {testResults.length === 0 && !isRunning && (
            <p className="text-gray-500 text-center py-8">
              No tests run yet. Click "Re-run Tests" to start.
            </p>
          )}

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  result.status === 'success' ? 'bg-green-50 border-green-200' :
                  result.status === 'error' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getStatusIcon(result.status)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{result.test}</h3>
                    <p className={`text-sm ${getStatusColor(result.status)}`}>
                      {result.message}
                    </p>
                  </div>
                </div>
                {result.duration && (
                  <div className="text-sm text-gray-500">
                    {result.duration}ms
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-blue-600">📝</span>
              <span>If tests pass, your Firebase is configured correctly!</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600">🌱</span>
              <a 
                href="/seed-data" 
                className="text-blue-600 hover:underline"
              >
                Seed sample data for your app
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-purple-600">🏠</span>
              <a 
                href="/" 
                className="text-blue-600 hover:underline"
              >
                Go back to the main app
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-600">🔧</span>
              <a 
                href="https://console.firebase.google.com/project/quest4fun-f2ab6" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open Firebase Console
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}