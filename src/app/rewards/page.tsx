"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaGift, 
  FaLeaf, 
  FaRecycle, 
  FaShoppingBag, 
  FaHandHoldingHeart, 
  FaTree, 
  FaHistory, 
  FaSearch,
  FaFilter,
  FaStar,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getUserPoints, redeemPoints, getUserRedemptions, subscribeToUserPoints } from '@/lib/firebase';
import BackButtonHeader from '@/components/layout/BackButtonHeader';

// Mock data for rewards
const rewardCategories = [
  { id: 'all', name: 'All Rewards', icon: FaGift },
  { id: 'eco', name: 'Eco Products', icon: FaLeaf },
  { id: 'shopping', name: 'Shopping', icon: FaShoppingBag },
  { id: 'donation', name: 'Donations', icon: FaHandHoldingHeart },
  { id: 'planting', name: 'Tree Planting', icon: FaTree },
];

const availableRewards = [
  { 
    id: 1, 
    title: 'Reusable Water Bottle', 
    description: 'Eco-friendly stainless steel water bottle', 
    points: 150, 
    category: 'eco',
    image: '/rewards/bottle.jpg',
    stock: 15
  },
  { 
    id: 2, 
    title: '$10 Amazon Gift Card', 
    description: 'Digital gift card for Amazon purchases', 
    points: 250, 
    category: 'shopping',
    image: '/rewards/cards.jpg',
    stock: 'Unlimited'
  },
  { 
    id: 3, 
    title: 'Plant a Tree', 
    description: 'We\'ll plant a tree in your name through our reforestation partners', 
    points: 100, 
    category: 'planting',
    image: '/rewards/tree.jpg',
    stock: 'Unlimited'
  },
  { 
    id: 4, 
    title: 'Donate to Ocean Cleanup', 
    description: 'Donate your points to help clean plastic from our oceans', 
    points: 200, 
    category: 'donation',
    image: '/rewards/ocean.jpg',
    stock: 'Unlimited'
  },
  { 
    id: 5, 
    title: 'Bamboo Cutlery Set', 
    description: 'Portable bamboo utensil set with carrying case', 
    points: 180, 
    category: 'eco',
    image: '/rewards/cutlery.jpg',
    stock: 8
  },
  { 
    id: 6, 
    title: '$5 Starbucks Gift Card', 
    description: 'Digital gift card for Starbucks purchases', 
    points: 150, 
    category: 'shopping',
    image: '/rewards/coffee.jpg',
    stock: 'Unlimited'
  },
  { 
    id: 7, 
    title: 'Reusable Produce Bags (Set of 5)', 
    description: 'Mesh bags for plastic-free grocery shopping', 
    points: 120, 
    category: 'eco',
    image: '/rewards/bag.jpg',
    stock: 20
  },
  { 
    id: 8, 
    title: 'Donate to Wildlife Conservation', 
    description: 'Support wildlife conservation efforts worldwide', 
    points: 200, 
    category: 'donation',
    image: '/rewards/wildlife.jpg',
    stock: 'Unlimited'
  },
];

export default function RewardsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [redeemingReward, setRedeemingReward] = useState<number | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [redemptionHistory, setRedemptionHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get user points from Firestore
  const [userPoints, setUserPoints] = useState<number>(0);
  
  // Load points from Firestore with real-time updates
  useEffect(() => {
    async function loadUserData() {
      if (user?.id) {
        try {
          // Load redemption history (one-time)
          const history = await getUserRedemptions(user.id);
          setRedemptionHistory(history);
          setIsLoading(false);
        } catch (error) {
          console.error("Error loading user data:", error);
          setIsLoading(false);
        }
      }
    }
    
    // Set up real-time points listener
    let pointsUnsubscribe: () => void = () => {};
    
    if (!loading && user) {
      // Initialize points listener
      pointsUnsubscribe = subscribeToUserPoints(user.id, (points) => {
        setUserPoints(points);
      });
      
      // Load other user data
      loadUserData();
    }
    
    // Clean up listener on unmount
    return () => {
      pointsUnsubscribe();
    };
  }, [user, loading]);
  
  // Filter rewards based on category and search term
  const filteredRewards = availableRewards.filter(reward => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesSearch = reward.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle reward redemption with real-time updates
  const handleRedeemReward = async (reward: any) => {
    setSelectedReward(reward);
    setConfirmationOpen(true);
  };
  
  // Process the reward redemption
  const processRedemption = async () => {
    if (!user?.id || !selectedReward) return;
    
    setRedeemingReward(selectedReward.id);
    setConfirmationOpen(false);
    
    try {
      const success = await redeemPoints(user.id, selectedReward.points, selectedReward.title);
      
      if (success) {
        // Update redemption history
        const updatedHistory = await getUserRedemptions(user.id);
        setRedemptionHistory(updatedHistory);
        
        // No alert needed - real-time points update will show the change
      } else {
        // Handle error silently or add a non-intrusive notification here if needed
        console.error("Failed to redeem reward - insufficient points");
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    } finally {
      setRedeemingReward(null);
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
              <FaGift className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
      {/* Header */}
      <BackButtonHeader 
        title="Rewards" 
        destination="/dashboard"
        rightContent={
          <div className="text-right">
            <p className="text-sm text-gray-500">Available Points</p>
            <p className="text-2xl font-bold text-green-600">{userPoints} pts</p>
          </div>
        }
      />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Points Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8 text-white">
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold mb-2">Your Rewards Points</h2>
                <p className="text-green-100">Earn points by recycling e-waste and redeem them for eco-friendly rewards!</p>
              </div>
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-3">
                <div className="mr-3">
                  <FaStar className="h-8 w-8 text-yellow-300" />
                </div>
                <div>
                  <p className="text-sm text-green-100">Available Balance</p>
                  <p className="text-2xl font-bold">{userPoints} points</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-700 px-6 md:px-8 py-3 flex items-center justify-between">
            <p className="text-green-100 text-sm">Next reward available at 500 points</p>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="text-white flex items-center text-sm hover:text-green-200 transition-colors"
            >
              <FaHistory className="mr-1" />
              {showHistory ? 'Hide History' : 'View History'}
            </button>
          </div>
        </motion.div>
        
        {/* Redemption History (Collapsible) */}
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Redemption History</h2>
              
              {redemptionHistory.length > 0 ? (
                <div className="space-y-4">
                  {redemptionHistory.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="bg-green-100 rounded-full p-3 mr-4">
                          {item.category === 'eco' && <FaLeaf className="h-5 w-5 text-green-600" />}
                          {item.category === 'shopping' && <FaShoppingBag className="h-5 w-5 text-green-600" />}
                          {item.category === 'donation' && <FaHandHoldingHeart className="h-5 w-5 text-green-600" />}
                          {item.category === 'planting' && <FaTree className="h-5 w-5 text-green-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.reward}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                          <span className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full border shadow-sm
                            ${item.status === 'Completed' ? 'bg-green-50 text-green-800 border-green-300' : 
                              item.status === 'Shipped' ? 'bg-blue-50 text-blue-800 border-blue-300' : 
                              'bg-yellow-50 text-yellow-800 border-yellow-300'}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-700 font-medium text-lg">-{item.points} pts</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No redemption history yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Redeem your points to see your history here!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Reward Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Rewards</h2>
          <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
            {rewardCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <category.icon className={`mr-2 h-4 w-4 ${selectedCategory === category.id ? 'text-white' : 'text-green-600'}`} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search rewards"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRewards.length > 0 ? (
            filteredRewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="h-48 bg-gray-200 relative">
                  {reward.title === 'Reusable Water Bottle' ? (
                    <Image
                      src="/rewards/bottle.jpg"
                      alt="Reusable Water Bottle"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === '$10 Amazon Gift Card' ? (
                    <Image
                      src="/rewards/cards.jpg"
                      alt="$10 Amazon Gift Card"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === 'Plant a Tree' ? (
                    <Image
                      src="/rewards/tree.jpg"
                      alt="Plant a Tree"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === 'Bamboo Cutlery Set' ? (
                    <Image
                      src="/rewards/cutlery.jpg"
                      alt="Bamboo Cutlery Set"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === 'Donate to Ocean Cleanup' ? (
                    <Image
                      src="/rewards/ocean.jpg"
                      alt="Donate to Ocean Cleanup"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === 'Donate to Wildlife Conservation' ? (
                    <Image
                      src="/rewards/wildlife.jpg"
                      alt="Donate to Wildlife Conservation"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === 'Reusable Produce Bags (Set of 5)' ? (
                    <Image
                      src="/rewards/bag.jpg"
                      alt="Reusable Produce Bags"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : reward.title === '$5 Starbucks Gift Card' ? (
                    <Image
                      src="/rewards/coffee.jpg"
                      alt="$5 Starbucks Gift Card"
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                      {reward.category === 'eco' && <FaLeaf className="h-16 w-16 text-white opacity-30" />}
                      {reward.category === 'shopping' && <FaShoppingBag className="h-16 w-16 text-white opacity-30" />}
                      {reward.category === 'donation' && <FaHandHoldingHeart className="h-16 w-16 text-white opacity-30" />}
                      {reward.category === 'planting' && <FaTree className="h-16 w-16 text-white opacity-30" />}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-sm font-medium text-green-700 shadow-sm">
                    {reward.points} pts
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{reward.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {typeof reward.stock === 'number' ? `${reward.stock} left in stock` : reward.stock}
                    </div>
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={userPoints < reward.points || redeemingReward === reward.id}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        userPoints < reward.points
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : redeemingReward === reward.id
                          ? 'bg-green-200 text-green-700 cursor-wait'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {redeemingReward === reward.id ? 'Processing...' : 'Redeem'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaGift className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No rewards found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || selectedCategory !== 'all' ? 
                  "Try adjusting your search or filter criteria." : 
                  "Check back soon for new rewards."}
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* How to Earn More Points */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                <FaInfoCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Earn More Points</h3>
                <p className="text-gray-600 mb-4">
                  Earn points by recycling your e-waste with us. The more you recycle, the more points you earn!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">Small Electronics</div>
                    <div className="text-green-600 font-medium">+30 points</div>
                    <div className="text-sm text-gray-500">Phones, tablets, small gadgets</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">Medium Electronics</div>
                    <div className="text-green-600 font-medium">+50 points</div>
                    <div className="text-sm text-gray-500">Laptops, monitors, printers</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">Large Electronics</div>
                    <div className="text-green-600 font-medium">+100 points</div>
                    <div className="text-sm text-gray-500">TVs, servers, large appliances</div>
                  </div>
                </div>
                <Link 
                  href="/recycle" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Start recycling now
                  <FaChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Redemption Confirmation Modal */}
      {confirmationOpen && selectedReward && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-green-600 text-white p-4">
              <h3 className="text-lg font-semibold">Confirm Redemption</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to redeem <span className="font-medium">{selectedReward.title}</span> for <span className="font-medium">{selectedReward.points} points</span>?
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Your current balance:</span>
                  <span className="font-medium text-green-600">{userPoints} points</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Redemption cost:</span>
                  <span className="font-medium text-red-600">-{selectedReward.points} points</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">New balance:</span>
                  <span className="font-medium text-green-600">{userPoints - selectedReward.points} points</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmationOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={processRedemption}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Confirm Redemption
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 