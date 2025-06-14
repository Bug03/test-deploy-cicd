'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return <button className={classes} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button };
