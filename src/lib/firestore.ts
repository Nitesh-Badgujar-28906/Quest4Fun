import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Child, Parent, Progress, Subject, Level, Lesson, GameSession, DailyChallenge } from '@/types';

// User Management
export const createChild = async (childData: Omit<Child, 'id' | 'createdAt' | 'lastLogin'>) => {
  try {
    const docRef = await addDoc(collection(db, 'children'), {
      ...childData,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating child:', error);
    throw error;
  }
};

export const createParent = async (parentData: Omit<Parent, 'id' | 'createdAt' | 'lastLogin'>) => {
  try {
    const docRef = await addDoc(collection(db, 'parents'), {
      ...parentData,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating parent:', error);
    throw error;
  }
};

export const getChild = async (childId: string): Promise<Child | null> => {
  try {
    const docRef = doc(db, 'children', childId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as Child;
    }
    return null;
  } catch (error) {
    console.error('Error getting child:', error);
    throw error;
  }
};

export const getParent = async (parentId: string): Promise<Parent | null> => {
  try {
    const docRef = doc(db, 'parents', parentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as Parent;
    }
    return null;
  } catch (error) {
    console.error('Error getting parent:', error);
    throw error;
  }
};

export const getChildrenByParent = async (parentId: string): Promise<Child[]> => {
  try {
    const q = query(
      collection(db, 'children'),
      where('parentId', '==', parentId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as unknown as Child[];
  } catch (error) {
    console.error('Error getting children by parent:', error);
    throw error;
  }
};

// Learning Content
export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'subjects'));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as unknown as Subject[];
  } catch (error) {
    console.error('Error getting subjects:', error);
    throw error;
  }
};

export const getLevelsBySubject = async (subjectId: string): Promise<Level[]> => {
  try {
    const q = query(
      collection(db, 'levels'),
      where('subjectId', '==', subjectId),
      orderBy('levelNumber', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as unknown as Level[];
  } catch (error) {
    console.error('Error getting levels by subject:', error);
    throw error;
  }
};

export const getLessonsByLevel = async (levelId: string): Promise<Lesson[]> => {
  try {
    const q = query(
      collection(db, 'lessons'),
      where('levelId', '==', levelId),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as unknown as Lesson[];
  } catch (error) {
    console.error('Error getting lessons by level:', error);
    throw error;
  }
};

// Progress Tracking
export const saveProgress = async (progressData: Omit<Progress, 'completedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'progress'), {
      ...progressData,
      completedAt: progressData.completed ? Timestamp.now() : null
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
};

export const getChildProgress = async (childId: string): Promise<Progress[]> => {
  try {
    const q = query(
      collection(db, 'progress'),
      where('childId', '==', childId),
      orderBy('completedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as unknown as Progress[];
  } catch (error) {
    console.error('Error getting child progress:', error);
    throw error;
  }
};

export const updateChildProgress = async (
  childId: string, 
  updates: Partial<Pick<Child, 'totalStars' | 'totalCoins' | 'badges' | 'unlockedLevels' | 'currentStreak'>>
) => {
  try {
    const docRef = doc(db, 'children', childId);
    await updateDoc(docRef, {
      ...updates,
      lastLogin: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating child progress:', error);
    throw error;
  }
};

// Game Sessions
export const startGameSession = async (childId: string): Promise<string> => {
  try {
    const sessionData: Omit<GameSession, 'id'> = {
      childId,
      startTime: new Date(),
      activitiesCompleted: 0,
      totalStarsEarned: 0,
      totalCoinsEarned: 0,
      badgesEarned: [],
      subjectsPlayed: []
    };
    
    const docRef = await addDoc(collection(db, 'gameSessions'), {
      ...sessionData,
      startTime: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error starting game session:', error);
    throw error;
  }
};

export const endGameSession = async (sessionId: string, updates: Partial<GameSession>) => {
  try {
    const docRef = doc(db, 'gameSessions', sessionId);
    await updateDoc(docRef, {
      ...updates,
      endTime: Timestamp.now()
    });
  } catch (error) {
    console.error('Error ending game session:', error);
    throw error;
  }
};

// Daily Challenges
export const getDailyChallenge = async (date: string): Promise<DailyChallenge | null> => {
  try {
    const q = query(
      collection(db, 'dailyChallenges'),
      where('date', '==', date),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as unknown as DailyChallenge;
    }
    return null;
  } catch (error) {
    console.error('Error getting daily challenge:', error);
    throw error;
  }
};

export const completeDailyChallenge = async (challengeId: string, childId: string) => {
  try {
    const docRef = doc(db, 'dailyChallenges', challengeId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as DailyChallenge;
      const completedBy = data.completedBy || [];
      
      if (!completedBy.includes(childId)) {
        await updateDoc(docRef, {
          completedBy: [...completedBy, childId]
        });
      }
    }
  } catch (error) {
    console.error('Error completing daily challenge:', error);
    throw error;
  }
};

// Analytics
export const getChildAnalytics = async (childId: string, days: number = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const q = query(
      collection(db, 'gameSessions'),
      where('childId', '==', childId),
      where('startTime', '>=', Timestamp.fromDate(startDate)),
      orderBy('startTime', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as GameSession[];

    // Calculate analytics
    const totalSessions = sessions.length;
    const totalTimeSpent = sessions.reduce((acc, session) => {
      if (session.endTime) {
        return acc + (session.endTime.getTime() - session.startTime.getTime());
      }
      return acc;
    }, 0);
    
    const averageSessionTime = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;
    const totalActivities = sessions.reduce((acc, session) => acc + session.activitiesCompleted, 0);
    const totalStars = sessions.reduce((acc, session) => acc + session.totalStarsEarned, 0);

    return {
      totalSessions,
      totalTimeSpent,
      averageSessionTime,
      totalActivities,
      totalStars,
      sessions
    };
  } catch (error) {
    console.error('Error getting child analytics:', error);
    throw error;
  }
};