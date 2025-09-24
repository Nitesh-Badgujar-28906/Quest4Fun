import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'rainbow' | 'subject';
  size?: 'sm' | 'md' | 'lg';
  showStars?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
  color?: string;
  label?: string;
  starsEarned?: number;
  maxStars?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showStars = false,
  showPercentage = false,
  animated = true,
  className = '',
  color,
  label,
  starsEarned = 0,
  maxStars = 3
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const percentage = (normalizedValue / max) * 100;
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const variantClasses = {
    default: 'from-primary-blue to-blue-600',
    rainbow: 'from-purple-400 via-pink-500 to-red-500',
    subject: color ? '' : 'from-primary-green to-green-600'
  };
  
  const backgroundStyle = color 
    ? { background: `linear-gradient(to right, ${color}, ${color}dd)` }
    : {};

  return (
    <div className={`w-full ${className}`}>
      {/* Label and percentage */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-child-sm font-medium text-gray-700">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-child-sm font-bold text-primary-blue">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      {/* Progress bar container */}
      <div className={`relative bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        {/* Progress fill */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${variantClasses[variant]}`}
          style={color ? backgroundStyle : {}}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
        />
        
        {/* Sparkle effect for full progress */}
        {percentage >= 100 && animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: 'easeInOut' 
            }}
          />
        )}
      </div>
      
      {/* Stars display */}
      {showStars && (
        <div className="flex items-center justify-center mt-2 gap-1">
          {[...Array(maxStars)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 500,
                damping: 15
              }}
            >
              <Star
                className={`w-5 h-5 ${
                  index < starsEarned
                    ? 'text-primary-yellow fill-primary-yellow animate-sparkle'
                    : 'text-gray-300'
                }`}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;