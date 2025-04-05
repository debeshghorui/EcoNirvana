"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  centered?: boolean;
  wave?: boolean;
  showBackButton?: boolean;
  backButtonDestination?: string;
}

/**
 * A consistent page header component used across the site
 * This helps maintain UI consistency across all pages
 */
export default function PageHeader({
  title,
  description,
  backgroundImage = "/green-globe.jpg",
  centered = true,
  wave = true,
  showBackButton = false,
  backButtonDestination
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backButtonDestination) {
      router.push(backButtonDestination);
    } else {
      router.back();
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src={backgroundImage}
          alt={title} 
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="mix-blend-overlay opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/70"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10">
        {showBackButton && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBack}
            className="mb-4 flex items-center text-white hover:text-green-200 transition-colors"
          >
            <FaArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-medium">Back</span>
          </motion.button>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-xl mb-8 text-green-50 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>
      </div>
      {/* Wave divider */}
      {wave && (
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      )}
    </section>
  );
} 