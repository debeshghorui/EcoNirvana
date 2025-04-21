"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRecycle, FaHistory, FaCalendarAlt, FaMapMarkerAlt, FaUserEdit, FaSignOutAlt, FaLeaf, FaChartLine, FaShieldAlt, FaHeadset, FaEnvelope, FaTrophy, FaLightbulb, FaTruck, FaTimes, FaTree, FaBars, FaBullhorn, FaHandsHelping, FaComments, FaCertificate, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getUserPoints, getUserActivities, subscribeToUserPoints } from '@/lib/firebase';
import RecyclingMeter from '@/components/dashboard/RecyclingMeter';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout, justLoggedOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showContactModal, setShowContactModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for user stats from Firestore
  const [recyclingStats, setRecyclingStats] = useState({
    itemsRecycled: 0,
    co2Saved: 0,
    pointsEarned: 0,
    treesPlanted: 0,
    energySaved: 0
  });
  
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  
  // Fetch user data from Firestore
  useEffect(() => {
    let pointsUnsubscribe: () => void = () => {};
    
    async function fetchUserData() {
      if (user?.id) {
        try {
          // Set up real-time points listener
          pointsUnsubscribe = subscribeToUserPoints(user.id, (points) => {
            setRecyclingStats(prev => ({
              ...prev,
              pointsEarned: points
            }));
          });
          
          // Fetch activities (one-time)
          const activities = await getUserActivities(user.id);
          
          // Calculate stats - only count actual recycled items (not quizzes)
          const recycledItems = activities.filter(activity => 
            activity.isRecycledItem !== false && activity.type === 'Recycled'
          );
          const totalItems = recycledItems.length;
          
          // Rough estimate: 2kg CO2 saved per item recycled (simplified calculation)
          const estimatedCO2 = totalItems * 2; 
          
          // Calculate trees planted based on items recycled (1 tree per 2 items)
          const treesPlanted = Math.floor(totalItems / 2);
          
          // Calculate energy saved percentage (5% per item, max 95%)
          const energySaved = Math.min(totalItems * 5, 95);
          
          setRecentActivities(activities.slice(0, 3)); // Get 3 most recent activities
          
          setRecyclingStats(prev => ({
            ...prev,
            itemsRecycled: totalItems,
            co2Saved: estimatedCO2,
            treesPlanted: treesPlanted,
            energySaved: energySaved
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    if (hasMounted && !loading && user) {
      fetchUserData();
    }
    
    // Clean up on unmount
    return () => {
      pointsUnsubscribe();
    };
  }, [user, loading, hasMounted]);
  
  // Client-side initialization
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (hasMounted && !loading && !user && !justLoggedOut) {
      router.push('/login');
    }
  }, [user, loading, router, justLoggedOut, hasMounted]);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Toggle contact modal
  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };
  
  // Show minimal loading state during SSR to prevent hydration mismatch
  if (!hasMounted || loading || !user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white" suppressHydrationWarning={true}>
        {hasMounted && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRecycle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <p className="text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white" suppressHydrationWarning={true}>
      {/* Hero Section with Impact Overview */}
      <section className="relative overflow-hidden">
        {/* Organic wave background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-600 z-0">
          <svg className="absolute bottom-0 left-0 right-0 w-full h-48 text-white transform translate-y-1" fill="currentColor" viewBox="0 0 1200 120">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".5"></path>
            <path d="M0,0V15.81C205.46,36.92,405.84,68,602.48,56,748.51,46.32,892.62,5.73,1032.74,3.49c58.58-1,134.5,15.82,207.08,48.16V0Z" opacity=".75"></path>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 z-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-3"
              >
                Hello, {user.name}! 
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-green-50"
              >
                Your sustainable journey is making a real impact. Together we're creating a cleaner future.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 w-full md:max-w-sm"
              >
                <RecyclingMeter itemsRecycled={recyclingStats.itemsRecycled} />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 md:mt-0"
            >
              <button
                onClick={toggleContactModal}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-5 py-2.5 rounded-lg text-white font-medium flex items-center transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaHeadset className="mr-2" />
                Need Help?
              </button>
            </motion.div>
          </div>
          
          {/* Impact Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
          >
            {/* Items Recycled */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl border-2 border-white/40 p-6 text-center group hover:bg-white/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-full mb-4 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg border-2 border-white/40">
                  <FaRecycle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{recyclingStats.itemsRecycled}</h3>
                <p className="text-sm font-semibold text-white uppercase tracking-wider bg-green-600/50 backdrop-blur-sm rounded-full py-1 px-4 inline-block shadow-md">Items Recycled</p>
              </div>
            </div>
            
            {/* CO2 Saved */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl border-2 border-white/40 p-6 text-center group hover:bg-white/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-full mb-4 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg border-2 border-white/40">
                  <FaLeaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{recyclingStats.co2Saved} <span className="text-2xl">kg</span></h3>
                <p className="text-sm font-semibold text-white uppercase tracking-wider bg-green-600/50 backdrop-blur-sm rounded-full py-1 px-4 inline-block shadow-md">CO<sub>2</sub> Saved</p>
              </div>
            </div>
            
            {/* Points Earned */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl border-2 border-white/40 p-6 text-center group hover:bg-white/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-full mb-4 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg border-2 border-white/40">
                  <FaTrophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{recyclingStats.pointsEarned}</h3>
                <p className="text-sm font-semibold text-white uppercase tracking-wider bg-green-600/50 backdrop-blur-sm rounded-full py-1 px-4 inline-block shadow-md">Points Earned</p>
              </div>
            </div>
            
            {/* Trees Equivalent */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl border-2 border-white/40 p-6 text-center group hover:bg-white/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-full mb-4 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg border-2 border-white/40">
                  <FaTree className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{recyclingStats.treesPlanted}</h3>
                <p className="text-sm font-semibold text-white uppercase tracking-wider bg-green-600/50 backdrop-blur-sm rounded-full py-1 px-4 inline-block shadow-md">Trees Saved</p>
              </div>
            </div>
            
            {/* Energy Saved */}
            <div className="bg-white/30 backdrop-blur-md rounded-xl border-2 border-white/40 p-6 text-center group hover:bg-white/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-full mb-4 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg border-2 border-white/40">
                  <FaLightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{recyclingStats.energySaved}<span className="text-3xl">%</span></h3>
                <p className="text-sm font-semibold text-white uppercase tracking-wider bg-green-600/50 backdrop-blur-sm rounded-full py-1 px-4 inline-block shadow-md">Energy Saved</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,165.3C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {/* Primary Actions - Enhanced Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 mt-4"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-green-100 p-1.5 rounded-md mr-2">
              <FaRecycle className="h-5 w-5 text-green-600" />
            </span>
            Take Action
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {/* Recycle Now - Primary CTA */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)' }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg overflow-hidden relative group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Link href="/recycle" className="block relative z-10 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                    <FaRecycle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Recycle Your E-Waste</h3>
                </div>
                <p className="text-green-50 mb-5">Log your recycling activity and earn rewards for your environmental contributions.</p>
                <div className="flex items-center text-white font-medium">
                  <span>Start Now</span>
                  <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            </motion.div>
            
            {/* Find Locations */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)' }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:border-green-200 group transition-all duration-300"
            >
              <Link href="/locations" className="block p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 rounded-full p-3 mr-4 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <FaMapMarkerAlt className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Find Drop-off Locations</h3>
                </div>
                <p className="text-gray-600 mb-5">Discover convenient e-waste recycling centers near you with our interactive map.</p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>View Map</span>
                  <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            </motion.div>
            
            {/* Schedule Pickup */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)' }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:border-green-200 group transition-all duration-300"
            >
              <Link href="/doorstep" className="block p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 rounded-full p-3 mr-4 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <FaTruck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Schedule a Pickup</h3>
                </div>
                <p className="text-gray-600 mb-5">Have your e-waste collected right from your doorstep with our convenient pickup service.</p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Book Now</span>
                  <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Secondary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-green-100 p-1.5 rounded-md mr-2">
              <FaLeaf className="h-5 w-5 text-green-600" />
            </span>
            Explore More
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Rewards */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/rewards" className="block">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="bg-yellow-100 rounded-full p-3 mb-3 text-yellow-600">
                    <FaTrophy className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Rewards</h3>
                  <p className="text-xs text-gray-500">Redeem your points</p>
                </div>
              </Link>
            </motion.div>
            
            {/* My Activity */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/activity" className="block">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-3 text-blue-600">
                    <FaHistory className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Recycling History</h3>
                  <p className="text-xs text-gray-500">Items, pickups & more</p>
                </div>
              </Link>
            </motion.div>
            
            {/* Certificates */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/certificates" className="block">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="bg-purple-100 rounded-full p-3 mb-3 text-purple-600">
                    <FaCertificate className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Certificates</h3>
                  <p className="text-xs text-gray-500">Your achievements</p>
                </div>
              </Link>
            </motion.div>
            
            {/* Learn */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/blog" className="block">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="bg-orange-100 rounded-full p-3 mb-3 text-orange-600">
                    <FaGraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Learn</h3>
                  <p className="text-xs text-gray-500">E-waste education</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Recent Activity and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaHistory className="mr-2 text-green-600" /> Points History
                </h2>
                <Link href="/points" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
                  View All 
                  <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div className="p-6">
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-100 border border-transparent transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <FaRecycle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{activity.type} {activity.item}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span>{activity.date}</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{activity.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center bg-green-100 py-1 px-3 rounded-full text-sm font-medium text-green-800">
                          +{activity.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 px-4">
                    <div className="bg-gray-100 rounded-full p-3 inline-flex mb-4">
                      <FaRecycle className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No points history yet</h3>
                    <p className="text-gray-500 mb-6">Start recycling to earn points and track your rewards!</p>
                    <Link 
                      href="/recycle"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md font-medium"
                    >
                      <FaRecycle className="mr-2" />
                      Start Recycling
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Data Security Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative rounded-2xl shadow-md overflow-hidden border border-blue-100 h-full">
              <Image 
                src="/images/security.jpg"
                alt="Data Security"
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0 z-0"
              />
              <div className="relative z-10 p-6 flex flex-col h-full bg-gradient-to-br from-blue-300/70 to-indigo-900/70 text-white">
                <div className="bg-blue-100 rounded-full p-3 mb-4 inline-flex w-fit">
                  <FaShieldAlt className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Data Wiping</h3>
                <p className="mb-6 flex-grow">
                  Protect your sensitive information when recycling electronics. Our certified data destruction ensures complete privacy.
                </p>
                <Link 
                  href="/services/data-destruction" 
                  className="inline-flex items-center text-white font-medium hover:text-blue-100 group"
                >
                  Learn more
                  <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-md bg-white/30 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg w-full mx-4"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Contact Support</h3>
              <button 
                onClick={toggleContactModal}
                className="text-white hover:bg-white/10 p-1 rounded-full"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Please describe your issue in detail"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={toggleContactModal}
                    className="mr-3 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 