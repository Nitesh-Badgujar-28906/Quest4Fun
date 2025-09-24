import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedUserTypes?: ('child' | 'parent')[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  allowedUserTypes = ['child', 'parent'],
  fallback
}) => {
  const { user, userType, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-child-xl font-bold">Loading Quest4Fun...</h2>
          <p className="text-white/80 text-child-base mt-2">Getting ready for learning adventures!</p>
        </motion.div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-rainbow">
        <motion.div 
          className="text-center p-8 bg-white rounded-child-xl shadow-child-lg max-w-md mx-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-gray-800 text-child-2xl font-bold mb-2">Oops!</h2>
          <p className="text-gray-600 text-child-base mb-4">
            You need to log in to access this page
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-primary-blue text-white px-6 py-3 rounded-child font-bold text-child-base hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  // If user type is not allowed
  if (requireAuth && user && userType && !allowedUserTypes.includes(userType)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sunset">
        <motion.div 
          className="text-center p-8 bg-white rounded-child-xl shadow-child-lg max-w-md mx-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">⛔</div>
          <h2 className="text-gray-800 text-child-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-600 text-child-base mb-4">
            You don&apos;t have permission to view this page
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary-orange text-white px-6 py-3 rounded-child font-bold text-child-base hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;