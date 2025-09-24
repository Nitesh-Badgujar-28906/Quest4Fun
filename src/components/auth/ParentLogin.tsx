import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface ParentLoginProps {
  onSwitchToChild: () => void;
}

const ParentLogin: React.FC<ParentLoginProps> = ({ onSwitchToChild }) => {
  const { loginAsParent, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    pin: ''
  });
  const [showPin, setShowPin] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.pin) {
      errors.pin = 'PIN is required';
    } else if (formData.pin.length !== 4) {
      errors.pin = 'PIN must be 4 digits';
    } else if (!/^\d{4}$/.test(formData.pin)) {
      errors.pin = 'PIN must contain only numbers';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await loginAsParent(formData.email, formData.pin);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePinInput = (value: string) => {
    // Only allow numbers and limit to 4 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    handleInputChange('pin', numericValue);
  };

  return (
    <div className="min-h-screen bg-gradient-forest flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onSwitchToChild}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back to Child Login</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
        <h1 className="text-white text-3xl font-bold mb-2">
          Parent Dashboard
        </h1>
        <p className="text-white/90 text-base">
          Monitor your child&apos;s learning progress
        </p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-child-xl shadow-child-lg p-8 w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`
                w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${validationErrors.email 
                  ? 'border-red-400 focus:ring-red-400' 
                  : 'border-gray-300 focus:ring-primary-blue'
                }
              `}
              placeholder="parent@example.com"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4-Digit PIN
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={formData.pin}
                onChange={(e) => handlePinInput(e.target.value)}
                className={`
                  w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                  font-mono text-center text-lg tracking-widest
                  ${validationErrors.pin 
                    ? 'border-red-400 focus:ring-red-400' 
                    : 'border-gray-300 focus:ring-primary-blue'
                  }
                `}
                placeholder="••••"
                maxLength={4}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {validationErrors.pin && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.pin}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h4 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Email:</strong> parent@quest4fun.com</p>
            <p><strong>PIN:</strong> 1234</p>
          </div>
          <button
            onClick={() => {
              setFormData({ email: 'parent@quest4fun.com', pin: '1234' });
            }}
            className="text-xs text-blue-600 hover:text-blue-800 underline mt-2"
            disabled={isLoading}
          >
            Use demo credentials
          </button>
        </motion.div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 grid grid-cols-3 gap-4 text-center max-w-md"
      >
        <div className="text-white/80">
          <div className="text-2xl mb-1">📊</div>
          <p className="text-xs">Progress Tracking</p>
        </div>
        <div className="text-white/80">
          <div className="text-2xl mb-1">🎯</div>
          <p className="text-xs">Learning Goals</p>
        </div>
        <div className="text-white/80">
          <div className="text-2xl mb-1">📈</div>
          <p className="text-xs">Detailed Reports</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentLogin;