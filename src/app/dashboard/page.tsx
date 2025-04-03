"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRecycle, FaHistory, FaCalendarAlt, FaMapMarkerAlt, FaUserEdit, FaSignOutAlt, FaLeaf, FaChartLine, FaShieldAlt, FaHeadset, FaEnvelope, FaTrophy, FaLightbulb, FaTruck, FaTimes, FaTree, FaBars, FaBullhorn, FaHandsHelping, FaComments, FaCertificate } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getUserPoints, getUserActivities, subscribeToUserPoints } from '@/lib/firebase';

// Move mock data outside of the component to prevent hydration issues
// Keep some mock data for visualization
const environmentalImpact = {
  treesPlanted: 5,
  waterSaved: 120,
  energySaved: 85,
};

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
          
          // Calculate stats
          const totalItems = activities.length;
          // Rough estimate: 2kg CO2 saved per item recycled (simplified calculation)
          const estimatedCO2 = totalItems * 2; 
          
          setRecentActivities(activities.slice(0, 3)); // Get 3 most recent activities
          
          setRecyclingStats(prev => ({
            ...prev,
            itemsRecycled: totalItems,
            co2Saved: estimatedCO2
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" suppressHydrationWarning={true}>
      {/* Combined Welcome Banner and Recycling Impact */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-500 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <Image
            src="/green-globe.jpg"
            alt="Background pattern"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
          {/* Welcome Header */}
          <div className="md:flex md:items-center md:justify-between mb-10">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold"
              >
                Welcome back, {user.name}!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-green-50 text-lg"
              >
                Your sustainable journey continues. Let's make a difference together.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 md:mt-0 flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm border border-white/20 shadow-lg">
                <div className="bg-green-400 rounded-full p-1.5 mr-2 shadow-sm">
                  <FaLeaf className="h-4 w-4 text-white" />
                </div>
                <span className="text-green-50">Your Eco Impact: </span>
                <span className="font-bold ml-1 text-white">Level 2 Recycler</span>
              </div>
              <button
                onClick={toggleContactModal}
                className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaHeadset className="mr-2" />
                Contact Support
              </button>
            </motion.div>
          </div>

          {/* Recycling Impact Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-white">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-3 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <FaRecycle className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1 text-white shadow-sm">{recyclingStats.itemsRecycled}</h3>
                <p className="text-xs text-white font-medium shadow-sm">Items Recycled</p>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="mb-3 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <FaLeaf className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1 text-white shadow-sm">{recyclingStats.co2Saved} kg</h3>
                <p className="text-xs text-white font-medium shadow-sm">CO<sub>2</sub> Saved</p>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="mb-3 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <FaTrophy className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1 text-white shadow-sm">{recyclingStats.pointsEarned}</h3>
                <p className="text-xs text-white font-medium shadow-sm">Points Earned</p>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="mb-3 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <FaTree className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1 text-white shadow-sm">{environmentalImpact.treesPlanted}</h3>
                <p className="text-xs text-white font-medium shadow-sm">Trees Equivalent</p>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="mb-3 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <FaLightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1 text-white shadow-sm">{environmentalImpact.energySaved}%</h3>
                <p className="text-xs text-white font-medium shadow-sm">Energy Saved</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Recycle Now */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              className="bg-green-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/recycle" className="block">
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-4 mb-4 text-green-600">
                    <FaRecycle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">Recycle Now</h3>
                  <p className="text-sm text-gray-500 text-center">Log your recycling</p>
                </div>
              </Link>
            </motion.div>
            
            {/* Find Locations */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              className="bg-green-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/locations" className="block">
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-4 mb-4 text-green-600">
                    <FaMapMarkerAlt className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">Find Locations</h3>
                  <p className="text-sm text-gray-500 text-center">Drop-off centers</p>
                </div>
              </Link>
            </motion.div>
            
            {/* Doorstep Collection */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              className="bg-green-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/doorstep" className="block">
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-4 mb-4 text-green-600">
                    <FaTruck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">Doorstep Collection</h3>
                  <p className="text-sm text-gray-500 text-center">Schedule a pickup</p>
                </div>
              </Link>
            </motion.div>
            
            {/* My Activity */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              className="bg-green-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/certificates" className="block">
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-4 mb-4 text-green-600">
                    <FaCertificate className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">My Certificates</h3>
                  <p className="text-sm text-gray-500 text-center">View your achievements</p>
                </div>
              </Link>
            </motion.div>
            
            {/* Rewards */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              className="bg-green-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
            >
              <Link href="/rewards" className="block">
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-4 mb-4 text-green-600">
                    <FaChartLine className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">Rewards</h3>
                  <p className="text-sm text-gray-500 text-center">Redeem your points</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Recent Activity and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaHistory className="mr-2 text-green-600" /> Recent Activity
                </h2>
              </div>
              <div className="p-6">
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <FaRecycle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{activity.type} {activity.item}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{activity.date}</span>
                              <span className="mx-2">•</span>
                              <span>{activity.category}</span>
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
                  <div className="text-center p-6">
                    <FaRecycle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity yet. Start recycling to track your progress!</p>
                  </div>
                )}
                
                <div className="mt-4 text-center">
                  <Link href="/activity" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    View all activity
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Upcoming Events */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-2 text-green-600" /> Upcoming Events
                </h2>
              </div>
              <div className="p-6">
                {/* upcomingEvents.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start mb-3">
                            <FaCalendarAlt className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                            <div>
                              <p className="text-gray-700 font-medium">{event.date}</p>
                              <p className="text-gray-500 text-sm">{event.time}</p>
                            </div>
                          </div>
                          <div className="flex items-start mb-3">
                            <FaMapMarkerAlt className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                            <div>
                              <p className="text-gray-700">{event.location}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <FaCalendarAlt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming events at the moment. Check back soon!</p>
                  </div>
                )} */}
                
                <div className="mt-6 text-center">
                  <Link href="/events" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    View all events
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Secure Data Destruction Services (renamed from Data Security Reminder) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden border border-blue-200">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4 md:mb-0 md:mr-6 flex-shrink-0 shadow-sm border border-blue-200">
                  <FaShieldAlt className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Data Destruction Services</h3>
                  <p className="text-gray-700 mb-4 md:text-lg">
                    Protect your sensitive information with our certified data destruction services. We ensure complete removal of personal data before recycling your devices.
                  </p>
                  <Link 
                    href="/services/data-destruction" 
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden max-w-lg w-full mx-4"
          >
            <div className="bg-green-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Contact Support</h3>
              <button 
                onClick={toggleContactModal}
                className="text-white hover:bg-white/10 p-1 rounded"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Please describe your issue in detail"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={toggleContactModal}
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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