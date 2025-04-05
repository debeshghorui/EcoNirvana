"use client";

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface BackButtonHeaderProps {
  title: string;
  destination?: string;
  subtitle?: string;
  className?: string;
  rightContent?: React.ReactNode;
}

export default function BackButtonHeader({
  title,
  destination,
  subtitle,
  className = "",
  rightContent
}: BackButtonHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (destination) {
      router.push(destination);
    } else {
      router.back();
    }
  };

  return (
    <div className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.button 
              onClick={handleBack}
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowLeft className="h-5 w-5" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          {rightContent && (
            <div className="text-right">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 