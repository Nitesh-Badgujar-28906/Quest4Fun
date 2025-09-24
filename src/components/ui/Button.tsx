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
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-child transition-all duration-200 focus-visible:focus shadow-child';
  
  const variantClasses = {
    primary: 'bg-primary-blue hover:bg-blue-600 text-white shadow-colorful',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-primary-green hover:bg-green-600 text-white shadow-success',
    warning: 'bg-primary-orange hover:bg-orange-600 text-white shadow-warning',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    fun: 'bg-gradient-rainbow hover:bg-gradient-sunset text-white'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-child-sm gap-1',
    md: 'px-4 py-3 text-child-base gap-2',
    lg: 'px-6 py-4 text-child-lg gap-2',
    xl: 'px-8 py-5 text-child-xl gap-3'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'btn-bounce cursor-pointer';
  
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