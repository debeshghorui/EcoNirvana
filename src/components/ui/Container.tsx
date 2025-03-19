"use client";

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * A consistent container component used across the site
 * This helps maintain UI consistency across all pages
 */
export default function Container({ 
  children, 
  className = "", 
  size = 'lg' 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[90rem]',
    full: 'max-w-full'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'dark' | 'primary' | 'gradient' | 'none';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * A consistent section component for page layouts
 */
export function Section({ 
  children, 
  className = "", 
  background = 'white',
  containerSize = 'lg'
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-green-600 text-white',
    gradient: 'bg-gradient-to-br from-green-600 to-green-700 text-white',
    none: ''
  };

  return (
    <section className={`py-12 md:py-16 ${backgroundClasses[background]} ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
} 