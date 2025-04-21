"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRecycle, 
  FaFilter, 
  FaCalendarAlt, 
  FaSearch, 
  FaTruck, 
  FaTimes, 
  FaInfoCircle, 
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { 
  getUserActivities, 
  subscribeToUserPoints, 
  getDoorstepPickups, 
  cancelDoorstepPickup 
} from '@/lib/firebase';
import BackButtonHeader from '@/components/layout/BackButtonHeader';

type ActivityTab = 'recycling' | 'pickups';

export default function ActivityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, justLoggedOut } = useAuth();
  const [activeTab, setActiveTab] = useState<ActivityTab>('recycling');
  
  // Recycling activities state
  const [activities, setActivities] = useState<any[]>([]);
  const [allActivities, setAllActivities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Doorstep pickups state
  const [pickups, setPickups] = useState<any[]>([]);
  const [selectedPickup, setSelectedPickup] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [pickupToCancel, setPickupToCancel] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Common state
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  
  // Set active tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'pickups') {
      setActiveTab('pickups');
    }
  }, [searchParams]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && !justLoggedOut) {
      router.push('/login');
    }
  }, [user, loading, router, justLoggedOut]);
  
  // Load activities from Firestore and setup points listener
  useEffect(() => {
    let pointsUnsubscribe: () => void = () => {};
    
    async function loadData() {
      if (user?.id) {
        setIsLoading(true);
        try {
          // Set up real-time points listener
          pointsUnsubscribe = subscribeToUserPoints(user.id, (points) => {
            setTotalPoints(points);
          });
          
          // Fetch recycling activities
          const userActivities = await getUserActivities(user.id);
          setAllActivities(userActivities);
          setActivities(userActivities);
          
          // Fetch doorstep pickups
          const userPickups = await getDoorstepPickups(user.id);
          setPickups(userPickups);
        } catch (error) {
          console.error("Error loading activities:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    if (!loading && user) {
      loadData();
    }
    
    // Clean up on unmount
    return () => {
      pointsUnsubscribe();
    };
  }, [user, loading]);
  
  // Filter and sort recycling activities
  useEffect(() => {
    let filteredActivities = [...allActivities];
    
    // Apply search filter
    if (searchTerm) {
      filteredActivities = filteredActivities.filter(
        activity => 
          activity.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.category?.toLowerCase().includes(searchTerm.toLowerCase())
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
  
  // Handle cancelling a pickup
  const handleCancelPickup = async () => {
    if (!pickupToCancel) return;
    
    setIsCancelling(true);
    try {
      const success = await cancelDoorstepPickup(pickupToCancel);
      if (success) {
        // Update local state
        setPickups(prevPickups => 
          prevPickups.map(pickup => 
            pickup.id === pickupToCancel 
              ? { ...pickup, status: 'Cancelled' } 
              : pickup
          )
        );
        setIsCancelModalOpen(false);
      } else {
        alert('Failed to cancel pickup. Please try again.');
      }
    } catch (error) {
      console.error("Error cancelling pickup:", error);
      alert('An error occurred while cancelling your pickup.');
    } finally {
      setIsCancelling(false);
      setPickupToCancel(null);
    }
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FaCalendarAlt className="mr-1 h-3 w-3" />
            Scheduled
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheck className="mr-1 h-3 w-3" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimes className="mr-1 h-3 w-3" />
            Cancelled
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaExclamationTriangle className="mr-1 h-3 w-3" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };
  
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4 pb-16">
      {/* Header */}
      <BackButtonHeader 
        title="Activity History" 
        destination="/dashboard"
      />
      
      {/* Activity Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-t-xl shadow-sm p-1 border border-gray-200 flex">
          <button
            onClick={() => setActiveTab('recycling')}
            className={`flex-1 py-3 px-4 text-center rounded-lg transition-colors ${
              activeTab === 'recycling'
                ? 'bg-green-100 text-green-800 font-medium'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <FaRecycle className="h-4 w-4 mr-2" />
              Recycling History
            </div>
          </button>
          <button
            onClick={() => setActiveTab('pickups')}
            className={`flex-1 py-3 px-4 text-center rounded-lg transition-colors ${
              activeTab === 'pickups'
                ? 'bg-green-100 text-green-800 font-medium'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center">
              <FaTruck className="h-4 w-4 mr-2" />
              Doorstep Pickups
            </div>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {/* Recycling History Tab */}
          {activeTab === 'recycling' && (
            <motion.div
              key="recycling"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Filters and Search */}
              <div className="bg-white rounded-b-xl shadow-sm p-4 mb-6 border border-gray-200 border-t-0">
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
              
              {/* Recycling Activity List */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Recycling Activity</h2>
                  
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
            </motion.div>
          )}
          
          {/* Doorstep Pickups Tab */}
          {activeTab === 'pickups' && (
            <motion.div
              key="pickups"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Pickups List */}
              <div className="bg-white rounded-b-xl shadow-sm overflow-hidden mb-8 border-t-0 border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Your Doorstep Pickups</h2>
                    <Link
                      href="/doorstep"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaTruck className="mr-2 h-4 w-4" />
                      Schedule New Pickup
                    </Link>
                  </div>
                  
                  {pickups.length > 0 ? (
                    <div className="space-y-4">
                      {pickups.map((pickup) => (
                        <motion.div 
                          key={pickup.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-start">
                              <div className="bg-green-100 rounded-full p-3 mr-4 mt-1">
                                <FaTruck className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium text-gray-900 mr-3">Doorstep Pickup</p>
                                  {getStatusBadge(pickup.status)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{pickup.scheduledDate} • {pickup.timeSlot}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  Requested on {pickup.createdAt}
                                </p>
                                <div className="mt-2">
                                  <button
                                    onClick={() => {
                                      setSelectedPickup(pickup);
                                      setIsDetailModalOpen(true);
                                    }}
                                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors mr-2"
                                  >
                                    <FaInfoCircle className="mr-1 h-3 w-3" />
                                    View Details
                                  </button>
                                  {pickup.status === 'Scheduled' && (
                                    <button
                                      onClick={() => {
                                        setPickupToCancel(pickup.id);
                                        setIsCancelModalOpen(true);
                                      }}
                                      className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                    >
                                      <FaTimes className="mr-1 h-3 w-3" />
                                      Cancel Pickup
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right hidden md:block">
                              <p className="text-sm font-medium text-gray-700">Items:</p>
                              <p className="text-sm text-gray-500">
                                {pickup.items.length > 0 
                                  ? pickup.items.slice(0, 3).join(', ') + (pickup.items.length > 3 ? '...' : '')
                                  : 'No items specified'}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaTruck className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No pickups scheduled</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        You haven't scheduled any doorstep pickups yet. Schedule a pickup to have your e-waste collected from your doorstep.
                      </p>
                      <Link
                        href="/doorstep"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaTruck className="mr-2 h-4 w-4" />
                        Schedule Now
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Pickup Detail Modal */}
      {isDetailModalOpen && selectedPickup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Pickup Details</h3>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <FaTruck className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Doorstep Pickup</p>
                    <div className="mt-1">{getStatusBadge(selectedPickup.status)}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Scheduled Date & Time</h4>
                  <p className="text-base text-gray-900">{selectedPickup.scheduledDate}</p>
                  <p className="text-base text-gray-900">{selectedPickup.timeSlot}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Pickup Location</h4>
                  <p className="text-base text-gray-900">{selectedPickup.address}</p>
                  <p className="text-base text-gray-900">{selectedPickup.city}, {selectedPickup.zipCode}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                  <p className="text-base text-gray-900">{selectedPickup.name}</p>
                  <p className="text-base text-gray-900">{selectedPickup.email}</p>
                  <p className="text-base text-gray-900">{selectedPickup.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Items for Collection</h4>
                  {selectedPickup.items && selectedPickup.items.length > 0 ? (
                    <ul className="list-disc pl-5 text-base text-gray-900">
                      {selectedPickup.items.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base text-gray-900">No items specified</p>
                  )}
                </div>
                {selectedPickup.specialInstructions && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Special Instructions</h4>
                    <p className="text-base text-gray-900">{selectedPickup.specialInstructions}</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
                {selectedPickup.status === 'Scheduled' && (
                  <button
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      setPickupToCancel(selectedPickup.id);
                      setIsCancelModalOpen(true);
                    }}
                    className="ml-3 px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors font-medium flex items-center"
                  >
                    <FaTimes className="mr-2 h-4 w-4" />
                    Cancel Pickup
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Cancel Pickup</h3>
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isCancelling}
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-base text-gray-900 mb-2">
                  Are you sure you want to cancel this pickup? This action cannot be undone.
                </p>
                <p className="text-sm text-gray-500">
                  If you still need to recycle these items, you'll need to schedule a new pickup.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                  disabled={isCancelling}
                >
                  No, Keep Pickup
                </button>
                <button
                  onClick={handleCancelPickup}
                  disabled={isCancelling}
                  className="ml-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium flex items-center"
                >
                  {isCancelling ? (
                    <>Cancelling...</>
                  ) : (
                    <>
                      <FaTimes className="mr-2 h-4 w-4" />
                      Yes, Cancel Pickup
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 