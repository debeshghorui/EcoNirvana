"use client";

import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * A consistent button component used across the site
 * This helps maintain UI consistency across all pages
 */
export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  icon,
  type = 'button'
}: ButtonProps) {
  // Define base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500';
  
  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2.5 rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    outline: 'border border-green-600 text-green-700 hover:bg-green-50',
    ghost: 'text-green-700 hover:bg-green-50'
  };
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Disabled style
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  // Combine all styles
  const buttonStyle = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`;
  
  // If href is provided, return a Link, otherwise return a button
  if (href) {
    return (
      <Link href={href} className={buttonStyle} suppressHydrationWarning>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle}
      suppressHydrationWarning
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
} 