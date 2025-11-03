import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'colorful' | 'subject' | 'level' | 'achievement';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  background?: string;
  shadow?: boolean;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  disabled = false,
  background,
  shadow = true,
  animate = true
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-card border-2 border-gray-200',
    colorful: 'bg-gradient-to-br from-button-primary to-purple-600 border-0',
    subject: 'bg-card border-2 border-gray-200',
    level: 'bg-card border-2 border-gray-200',
    achievement: 'bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 border-0'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const shadowClasses = shadow ? 'shadow-card' : '';
  const hoverClasses = hover && !disabled ? 'hover:shadow-card-hover cursor-pointer' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const cardStyle = background ? { background } : {};

  const cardContent = (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses} ${hoverClasses} ${disabledClasses} ${className}`}
      style={cardStyle}
      onClick={handleClick}
    >
      {children}
    </div>
  );

  if (animate && hover && !disabled) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.02,
          y: -4
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;