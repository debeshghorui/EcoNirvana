"use client";

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface BackButtonProps {
  destination?: string;
  label?: string;
  className?: string;
}

/**
 * A consistent back button component that can either go to a specific destination
 * or use router.back() if no destination is provided
 */
export default function BackButton({
  destination,
  label = "Back",
  className = "inline-flex items-center text-green-600 font-medium hover:text-green-700"
}: BackButtonProps) {
  const router = useRouter();

  // If destination is provided, render a Link component
  if (destination) {
    return (
      <Link 
        href={destination} 
        className={className}
      >
        <FaArrowLeft className="mr-2" /> {label}
      </Link>
    );
  }

  // Otherwise, render a button that uses router.back()
  return (
    <button 
      onClick={() => router.back()} 
      className={className}
    >
      <FaArrowLeft className="mr-2" /> {label}
    </button>
  );
} 