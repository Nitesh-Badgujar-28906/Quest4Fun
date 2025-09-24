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
  const baseClasses = 'rounded-child-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    colorful: 'bg-gradient-sky border-0',
    subject: 'bg-white border-2 border-transparent',
    level: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100',
    achievement: 'bg-gradient-rainbow border-0'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const shadowClasses = shadow ? 'shadow-child' : '';
  const hoverClasses = hover && !disabled ? 'hover:shadow-child-lg cursor-pointer' : '';
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