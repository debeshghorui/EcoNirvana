"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRecycle, FaHistory, FaCalendarAlt, FaMapMarkerAlt, FaUserEdit, FaSignOutAlt, FaLeaf, FaChartLine, FaShieldAlt, FaHeadset, FaEnvelope, FaTrophy, FaLightbulb, FaTree, FaTruck } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

// Mock data for the dashboard
const recyclingStats = {
  itemsRecycled: 12,
  co2Saved: 45.8,
  pointsEarned: 230,
};

const recentActivities = [
  { id: 1, type: 'Recycled', item: 'Laptop', date: '2 days ago', points: 50, category: 'Electronics' },
  { id: 2, type: 'Recycled', item: 'Smartphone', date: '1 week ago', points: 30, category: 'Electronics' },
  { id: 3, type: 'Recycled', item: 'Printer', date: '2 weeks ago', points: 40, category: 'Electronics' },
];

const upcomingEvents = [
  { 
    id: 1, 
    title: 'Community Recycling Day', 
    date: 'June 5, 2023', 
    time: '10:00 AM - 2:00 PM',
    location: 'Downtown Green City',
    description: 'Bring your electronic waste for free recycling. All community members welcome!'
  },
  { 
    id: 2, 
    title: 'Electronics Collection Drive', 
    date: 'July 15, 2023', 
    time: '9:00 AM - 3:00 PM',
    location: 'Westside Community Center',
    description: 'Special collection event for computers, TVs, and other electronic devices.'
  },
];

// Environmental impact data
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
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && !justLoggedOut) {
      router.push('/login');
    }
  }, [user, loading, router, justLoggedOut]);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Toggle contact modal
  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };
  
  // Show loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold"
              >
                Welcome back, {user.name}!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-2 text-green-100"
              >
                Your sustainable journey continues. Let's make a difference together.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 md:mt-0 flex items-center space-x-4"
            >
              <div className="flex items-center bg-green-600 rounded-lg p-2 text-sm">
                <div className="bg-green-500 rounded-full p-1 mr-2">
                  <FaLeaf className="h-4 w-4" />
                </div>
                <span>Your Eco Impact: </span>
                <span className="font-bold ml-1">Level 2 Recycler</span>
              </div>
              <button
                onClick={toggleContactModal}
                className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <FaHeadset className="mr-2" />
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Environmental Impact Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 bg-green-500 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Recycling Impact</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-green-400/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FaRecycle className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">{recyclingStats.itemsRecycled}</div>
                <div className="text-sm">Items Recycled</div>
              </div>
              <div className="text-center">
                <div className="bg-green-400/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FaLeaf className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">{recyclingStats.co2Saved} kg</div>
                <div className="text-sm">CO<sub>2</sub> Saved</div>
              </div>
              <div className="text-center">
                <div className="bg-green-400/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FaTrophy className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">{recyclingStats.pointsEarned}</div>
                <div className="text-sm">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="bg-green-400/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FaTree className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">{environmentalImpact.treesPlanted}</div>
                <div className="text-sm">Trees Equivalent</div>
              </div>
              <div className="text-center">
                <div className="bg-green-400/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FaLightbulb className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">{environmentalImpact.energySaved}%</div>
                <div className="text-sm">Energy Saved</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/recycle" className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all hover:translate-y-[-2px] group flex flex-col items-center text-center h-32">
              <div className="bg-green-100 group-hover:bg-green-200 transition-colors rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                <FaRecycle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Recycle Now</h3>
              <p className="text-xs text-gray-500 mt-1">Log your recycling</p>
            </Link>
            
            <Link href="/locations" className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all hover:translate-y-[-2px] group flex flex-col items-center text-center h-32">
              <div className="bg-green-100 group-hover:bg-green-200 transition-colors rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Find Locations</h3>
              <p className="text-xs text-gray-500 mt-1">Drop-off centers</p>
            </Link>
            
            <Link href="/doorstep" className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all hover:translate-y-[-2px] group flex flex-col items-center text-center h-32">
              <div className="bg-green-100 group-hover:bg-green-200 transition-colors rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                <FaTruck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Doorstep Collection</h3>
              <p className="text-xs text-gray-500 mt-1">Schedule a pickup</p>
            </Link>
            
            <Link href="/activity" className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all hover:translate-y-[-2px] group flex flex-col items-center text-center h-32">
              <div className="bg-green-100 group-hover:bg-green-200 transition-colors rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                <FaHistory className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">My Activity</h3>
              <p className="text-xs text-gray-500 mt-1">View your history</p>
            </Link>
            
            <Link href="/rewards" className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all hover:translate-y-[-2px] group flex flex-col items-center text-center h-32">
              <div className="bg-green-100 group-hover:bg-green-200 transition-colors rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                <FaChartLine className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Rewards</h3>
              <p className="text-xs text-gray-500 mt-1">Redeem your points</p>
            </Link>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <Link href="/activity" className="text-sm text-green-600 hover:text-green-700 font-medium">View All</Link>
                </div>
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <FaRecycle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.type} {activity.item}</p>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                            {activity.category && (
                              <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-green-50 text-green-800 rounded-full border border-green-300 shadow-sm">
                                {activity.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-green-600 font-medium">+{activity.points} pts</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent activity to display.</p>
                    <p className="text-gray-500 text-sm mt-2">Start recycling to see your activity here!</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Data Security Reminder */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <FaShieldAlt className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Security Reminder</h3>
                    <p className="text-gray-600 mb-4">
                      Remember to wipe your personal data before recycling electronic devices. We offer secure data destruction services for your peace of mind.
                    </p>
                    <Link 
                      href="/services/data-destruction" 
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                    >
                      Learn more about our data security
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                  <Link href="/events" className="text-sm text-green-600 hover:text-green-700 font-medium">View All</Link>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-green-500 pl-4 py-2 hover:bg-green-50 transition-colors rounded-r-lg">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                      <Link 
                        href={`/events/${event.id}`} 
                        className="text-sm text-green-600 hover:text-green-700 mt-2 inline-block font-medium"
                      >
                        View details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Nearest Locations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Nearest Drop-off</h3>
                  <Link href="/locations" className="text-sm text-green-600 hover:text-green-700 font-medium">View All</Link>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <h4 className="font-medium text-gray-900">EcoRecycle Main Facility</h4>
                  <p className="text-sm text-gray-600 mt-1">123 Recycling Way, Green City, EC 12345</p>
                  <p className="text-sm text-gray-600 mt-1">2.3 miles away</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Open Now</span>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center"
                    >
                      Get Directions
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Us Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full p-3 mr-4 flex-shrink-0">
                    <FaEnvelope className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                      Our support team is here to help with any questions about recycling, pickup services, or your account.
                    </p>
                    <button
                      onClick={toggleContactModal}
                      className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors"
                    >
                      <FaHeadset className="mr-2" />
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Contact Support</h3>
                <button 
                  onClick={toggleContactModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Pickup Service</option>
                    <option>Account Issues</option>
                    <option>Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={toggleContactModal}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
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