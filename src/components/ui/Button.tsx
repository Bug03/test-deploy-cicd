'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'cosmic' | 'nebula' | 'aurora';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', glow = false, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-mono font-bold
      transition-all duration-300 focus-visible:outline-none 
      disabled:pointer-events-none disabled:opacity-50
      border-2 pixel-border-glow relative overflow-hidden
      active:scale-95 transform
    `.replace(/\s+/g, ' ').trim();
    
    const variants = {
      default: 'bg-slate-800 border-slate-600 text-slate-100 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 border-cyan-400 text-white hover:from-blue-700 hover:to-cyan-700 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]',
      secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]',
      danger: 'bg-gradient-to-r from-red-600 to-orange-600 border-red-400 text-white hover:from-red-700 hover:to-orange-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]',
      cosmic: 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-cyan-400 text-cyan-100 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]',
      nebula: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 border-pink-400 text-white hover:border-pink-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]',
      aurora: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 border-green-400 text-white hover:border-green-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]'
    };

    const sizes = {
      sm: 'h-8 px-4 text-xs tracking-wider',
      md: 'h-12 px-6 text-sm tracking-wide',
      lg: 'h-14 px-8 text-base tracking-wide',
    };

    const glowEffect = glow ? 'animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.5)]' : '';

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${glowEffect} ${className}`;

    return (
      <button className={classes} ref={ref} {...props}>
        {/* Pixel spark effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 transform -skew-x-12" />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
