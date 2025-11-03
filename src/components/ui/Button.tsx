import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'fun';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  animate?: boolean;
  sound?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  animate = true,
  sound = true
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#4A90E2] hover:bg-[#357ABD] text-white shadow-card hover:shadow-card-hover focus:ring-[#4A90E2]',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-text-primary border-2 border-gray-400 hover:border-gray-500 shadow-card hover:shadow-card-hover',
    success: 'bg-primary-green hover:bg-green-600 text-white shadow-card hover:shadow-card-hover focus:ring-green-500',
    warning: 'bg-primary-orange hover:bg-orange-600 text-white shadow-card hover:shadow-card-hover focus:ring-orange-500',
    danger: 'bg-primary-red hover:bg-red-600 text-white shadow-card hover:shadow-card-hover focus:ring-red-500',
    fun: 'bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-purple-500 hover:via-pink-600 hover:to-yellow-500 text-white shadow-card hover:shadow-card-hover'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
    xl: 'px-10 py-5 text-xl gap-3'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'cursor-pointer hover:scale-105';
  
  const handleClick = () => {
    if (disabled || loading) return;
    
    // Play sound effect if enabled
    if (sound && typeof window !== 'undefined') {
      // You can add sound effects here later
    }
    
    onClick?.();
  };

  const buttonContent = (
    <>
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' || size === 'xl' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' || size === 'xl' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      )}
    </>
  );

  if (animate) {
    return (
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
        onClick={handleClick}
        disabled={disabled || loading}
        type={type}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
    >
      {buttonContent}
    </button>
  );
};

export default Button;