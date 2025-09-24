'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getChild, getParent } from '@/lib/firestore';
import { Child, Parent, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  loginAsChild: (childId: string) => Promise<void>;
  loginAsParent: (email: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  switchToChild: (childId: string) => Promise<void>;
  switchToParent: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    userType: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to restore user session from localStorage
        const savedUserType = localStorage.getItem('quest4fun_user_type');
        const savedUserId = localStorage.getItem('quest4fun_user_id');
        
        if (savedUserType && savedUserId) {
          try {
            if (savedUserType === 'child') {
              const child = await getChild(savedUserId);
              if (child) {
                setState({
                  user: child,
                  userType: 'child',
                  isLoading: false,
                  error: null
                });
                return;
              }
            } else if (savedUserType === 'parent') {
              const parent = await getParent(savedUserId);
              if (parent) {
                setState({
                  user: parent,
                  userType: 'parent',
                  isLoading: false,
                  error: null
                });
                return;
              }
            }
          } catch (error) {
            console.error('Error restoring user session:', error);
          }
        }
      }
      
      setState({
        user: null,
        userType: null,
        isLoading: false,
        error: null
      });
    });

    return unsubscribe;
  }, []);

  const loginAsChild = async (childId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Sign in anonymously to Firebase
      await signInAnonymously(auth);
      
      // Get child data
      const child = await getChild(childId);
      if (!child) {
        throw new Error('Child not found');
      }
      
      // Update last login
      // await updateDoc(doc(db, 'children', childId), {
      //   lastLogin: Timestamp.now()
      // });
      
      // Save session
      localStorage.setItem('quest4fun_user_type', 'child');
      localStorage.setItem('quest4fun_user_id', childId);
      
      setState({
        user: child,
        userType: 'child',
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error logging in as child:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  };

  const loginAsParent = async (email: string, pin: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Sign in anonymously to Firebase (in production, you'd use proper email auth)
      await signInAnonymously(auth);
      
      // For demo purposes, we'll simulate parent login
      // In production, you'd validate email/pin against the database
      const mockParent: Parent = {
        id: 'parent-1',
        email,
        name: 'Parent User',
        pin,
        children: ['child-1', 'child-2'],
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      // Save session
      localStorage.setItem('quest4fun_user_type', 'parent');
      localStorage.setItem('quest4fun_user_id', mockParent.id);
      
      setState({
        user: mockParent,
        userType: 'parent',
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error logging in as parent:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('quest4fun_user_type');
      localStorage.removeItem('quest4fun_user_id');
      
      setState({
        user: null,
        userType: null,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const switchToChild = async (childId: string) => {
    try {
      const child = await getChild(childId);
      if (!child) {
        throw new Error('Child not found');
      }
      
      localStorage.setItem('quest4fun_user_type', 'child');
      localStorage.setItem('quest4fun_user_id', childId);
      
      setState(prev => ({
        ...prev,
        user: child,
        userType: 'child'
      }));
    } catch (error) {
      console.error('Error switching to child:', error);
      throw error;
    }
  };

  const switchToParent = () => {
    // This would typically require re-authentication
    // For now, we'll just switch if we have parent data
    const savedParentId = localStorage.getItem('quest4fun_parent_id');
    if (savedParentId) {
      localStorage.setItem('quest4fun_user_type', 'parent');
      localStorage.setItem('quest4fun_user_id', savedParentId);
      // In production, you'd reload parent data here
    }
  };

  const value: AuthContextType = {
    ...state,
    loginAsChild,
    loginAsParent,
    logout,
    switchToChild,
    switchToParent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};