import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'rounded' | 'square';
  border?: boolean;
  borderColor?: string;
  animate?: boolean;
  onClick?: () => void;
  className?: string;
  fallback?: React.ReactNode;
  badge?: React.ReactNode;
  online?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'circle',
  border = false,
  borderColor = 'border-primary-blue',
  animate = true,
  onClick,
  className = '',
  fallback,
  badge,
  online
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };
  
  const variantClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-child',
    square: 'rounded-md'
  };
  
  const borderClasses = border ? `border-2 ${borderColor}` : '';
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80' : '';
  
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10'
  };

  const badgeSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5'
  };

  const avatarContent = (
    <div className={`relative inline-block ${className}`}>
      {/* Main avatar */}
      <div
        className={`
          ${sizeClasses[size]} 
          ${variantClasses[variant]} 
          ${borderClasses} 
          ${clickableClasses}
          bg-gray-200 
          flex items-center justify-center 
          overflow-hidden
          transition-all duration-200
        `}
        onClick={onClick}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : fallback ? (
          fallback
        ) : (
          <User className={`${iconSizes[size]} text-gray-500`} />
        )}
      </div>
      
      {/* Online indicator */}
      {online && (
        <div
          className={`
            absolute -bottom-0.5 -right-0.5 
            ${badgeSizes[size]} 
            bg-primary-green 
            rounded-full 
            border-2 border-white
          `}
        />
      )}
      
      {/* Custom badge */}
      {badge && (
        <div className="absolute -top-1 -right-1">
          {badge}
        </div>
      )}
    </div>
  );

  if (animate && onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {avatarContent}
      </motion.div>
    );
  }

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20 
        }}
      >
        {avatarContent}
      </motion.div>
    );
  }

  return avatarContent;
};

export default Avatar;