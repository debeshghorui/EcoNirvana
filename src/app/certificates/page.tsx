"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaMedal, FaTrophy, FaCrown, FaRecycle, FaCertificate } from 'react-icons/fa';
import PageHeader from '@/components/layout/PageHeader';
import { useAuth } from '@/context/AuthContext';

export default function CertificatesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const certificateLevels = [
    {
      name: "Bronze Recycler",
      icon: FaMedal,
      items: 100,
      color: "from-amber-700 to-amber-500",
      description: "Recycle 100 items to earn the Bronze Recycler Certificate. Perfect for beginners starting their recycling journey."
    },
    {
      name: "Silver Guardian",
      icon: FaTrophy,
      items: 250,
      color: "from-gray-400 to-gray-300",
      description: "Achieve 250 recycled items to receive the Silver Guardian Certificate. You're making a significant impact!"
    },
    {
      name: "Gold Champion",
      icon: FaCrown,
      items: 500,
      color: "from-yellow-500 to-yellow-400",
      description: "Recycle 500 items to earn the prestigious Gold Champion Certificate. A true environmental leader!"
    },
    {
      name: "Platinum Master",
      icon: FaRecycle,
      items: 1000,
      color: "from-emerald-600 to-emerald-400",
      description: "The ultimate achievement - recycle 1000 items to receive the Platinum Master Certificate. You're a recycling legend!"
    }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaRecycle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const handleStartRecycling = () => {
    if (!user) {
      // If user is not logged in, redirect to signup page
      router.push('/signup');
      return;
    }
    // If user is logged in, redirect to recycle page
    router.push('/recycle');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Recycling Certificates"
        description="Earn prestigious certificates by reaching recycling milestones. The more you recycle, the higher the recognition!"
        backgroundImage="/certificates-hero.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificateLevels.map((level, index) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${level.color} p-6 flex flex-col items-center`}>
                <level.icon className="h-16 w-16 text-white mb-4" />
                <h3 className="text-xl font-bold text-white text-center">{level.name}</h3>
                <div className="mt-2 text-white/90 text-sm text-center">
                  {level.items} Items
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">{level.description}</p>
                <div className="mt-4">
                  <button 
                    onClick={handleStartRecycling}
                    className="w-full bg-[#0A1533] text-white py-2 px-4 rounded-md hover:bg-[#0A1533]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaRecycle className="h-4 w-4" />
                    Start Recycling
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Earn Certificates</h2>
          <div className="prose max-w-none text-gray-600">
            <p>Follow these simple steps to earn your recycling certificates:</p>
            <ol className="list-decimal list-inside space-y-2 mt-4">
              <li>Create an account or log in to your existing account</li>
              <li>Start recycling your e-waste through our various collection methods</li>
              <li>Track your progress in your dashboard</li>
              <li>Receive notifications when you reach certificate milestones</li>
              <li>Download and share your achievements with your community!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 