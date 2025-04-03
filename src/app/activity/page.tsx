"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRecycle, FaArrowLeft, FaFilter, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getUserActivities, subscribeToUserPoints } from '@/lib/firebase';

export default function ActivityPage() {
  const router = useRouter();
  const { user, loading, justLoggedOut } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [allActivities, setAllActivities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && !justLoggedOut) {
      router.push('/login');
    }
  }, [user, loading, router, justLoggedOut]);
  
  // Load activities from Firestore and setup points listener
  useEffect(() => {
    let pointsUnsubscribe: () => void = () => {};
    
    async function loadActivities() {
      if (user?.id) {
        setIsLoading(true);
        try {
          // Set up real-time points listener
          pointsUnsubscribe = subscribeToUserPoints(user.id, (points) => {
            setTotalPoints(points);
          });
          
          // Fetch activities (one-time)
          const userActivities = await getUserActivities(user.id);
          setAllActivities(userActivities);
          setActivities(userActivities);
        } catch (error) {
          console.error("Error loading activities:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    if (!loading && user) {
      loadActivities();
    }
    
    // Clean up on unmount
    return () => {
      pointsUnsubscribe();
    };
  }, [user, loading]);
  
  // Filter and sort activities
  useEffect(() => {
    let filteredActivities = [...allActivities];
    
    // Apply search filter
    if (searchTerm) {
      filteredActivities = filteredActivities.filter(
        activity => 
          activity.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterCategory) {
      filteredActivities = filteredActivities.filter(
        activity => activity.category === filterCategory
      );
    }
    
    // Apply sorting
    filteredActivities.sort((a, b) => {
      if (sortOrder === 'newest') {
        // For Firestore timestamps, we're using the formatted string for display,
        // but we'll sort by the document ID which is generated with a timestamp component
        return a.id < b.id ? 1 : -1;
      } else if (sortOrder === 'oldest') {
        return a.id > b.id ? 1 : -1;
      } else if (sortOrder === 'points-high') {
        return a.points < b.points ? 1 : -1;
      } else if (sortOrder === 'points-low') {
        return a.points > b.points ? 1 : -1;
      }
      return 0;
    });
    
    setActivities(filteredActivities);
  }, [searchTerm, filterCategory, sortOrder, allActivities]);
  
  // Show loading state
  if (loading || !user || isLoading) {
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
          <p className="text-gray-600 font-medium">Loading your activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">My Activity</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Points Earned</p>
              <p className="text-2xl font-bold text-green-600">{totalPoints} pts</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-700"
                placeholder="Search by item or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative inline-block">
                <div className="flex items-center">
                  <FaFilter className="h-4 w-4 text-gray-500 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-700"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Hazardous">Hazardous</option>
                    <option value="Glass">Glass</option>
                    <option value="Paper">Paper</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="Textiles">Textiles</option>
                  </select>
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="flex items-center">
                  <FaCalendarAlt className="h-4 w-4 text-gray-500 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-700"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="points-high">Highest Points</option>
                    <option value="points-low">Lowest Points</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity History</h2>
            
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-3 mr-4">
                        <FaRecycle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.type} {activity.item}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                        <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-green-50 text-green-800 rounded-full border border-green-300 shadow-sm">
                          {activity.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium text-lg">+{activity.points} pts</div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaRecycle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No activities found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm || filterCategory ? 
                    "Try adjusting your search or filter criteria." : 
                    "Start recycling to see your activity history here."}
                </p>
                {(searchTerm || filterCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('');
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 