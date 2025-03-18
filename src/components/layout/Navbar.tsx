"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaRecycle, FaLeaf, FaHome, FaChartLine, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

// Define search suggestions with keywords and their corresponding pages
const searchSuggestions = [
  { keywords: ['dashboard', 'home', 'main', 'profile'], path: '/dashboard' },
  { keywords: ['recycle', 'recycling', 'waste', 'ewaste', 'e-waste', 'electronics'], path: '/recycle' },
  { keywords: ['rewards', 'points', 'earn', 'redeem', 'benefit'], path: '/rewards' },
  { keywords: ['settings', 'account', 'profile', 'preferences'], path: '/settings' },
  { keywords: ['locations', 'centers', 'drop', 'dropoff', 'drop-off', 'collection', 'nearby'], path: '/locations' },
  { keywords: ['events', 'upcoming', 'community', 'drives', 'collection'], path: '/events' },
  { keywords: ['doorstep', 'pickup', 'home collection', 'collect', 'door'], path: '/doorstep' },
  { keywords: ['quiz', 'test', 'knowledge', 'learn', 'education'], path: '/quiz' },
  { keywords: ['blog', 'articles', 'news', 'posts', 'read'], path: '/blog' },
  { keywords: ['services', 'offerings', 'solutions', 'business'], path: '/services' },
  { keywords: ['login', 'signin', 'sign in', 'access'], path: '/login' },
  { keywords: ['signup', 'register', 'join', 'create account', 'sign up'], path: '/signup' },
  { keywords: ['impact', 'environment', 'stats', 'statistics', 'contribution'], path: '/impact' },
  { keywords: ['activity', 'history', 'recent', 'actions'], path: '/activity' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{path: string, text: string}[]>([]);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Check if we're on the data destruction page to use blue theme
  const isDataDestructionPage = pathname.includes('/services/data-destruction');
  const themeColor = isDataDestructionPage ? 'blue' : 'green';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      const matchedSuggestions: {path: string, text: string}[] = [];
      
      // Find matches in our predefined suggestions
      searchSuggestions.forEach(suggestion => {
        const matchedKeyword = suggestion.keywords.find(keyword => 
          keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
        );
        
        if (matchedKeyword) {
          // Format the suggestion text nicely
          const formattedText = matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1);
          // Only add if not already in the list
          if (!matchedSuggestions.some(s => s.path === suggestion.path)) {
            matchedSuggestions.push({
              path: suggestion.path,
              text: formattedText
            });
          }
        }
      });
      
      setSuggestions(matchedSuggestions.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(matchedSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Try to find a direct match first
      const directMatch = findBestMatch(searchQuery.trim().toLowerCase());
      
      if (directMatch) {
        router.push(directMatch);
      } else {
        // If no direct match, go to search results page
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
      
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (path: string) => {
    router.push(path);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Find the best matching page for a search query
  const findBestMatch = (query: string): string | null => {
    let bestMatch = null;
    let highestScore = 0;
    
    for (const suggestion of searchSuggestions) {
      for (const keyword of suggestion.keywords) {
        // Calculate how well the keyword matches the query
        let score = 0;
        
        // Exact match gets highest score
        if (keyword.toLowerCase() === query) {
          score = 100;
        } 
        // Keyword contains query
        else if (keyword.toLowerCase().includes(query)) {
          score = 75;
        }
        // Query contains keyword
        else if (query.includes(keyword.toLowerCase())) {
          score = 50;
        }
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = suggestion.path;
        }
      }
    }
    
    return bestMatch;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16">
      {/* Background that extends full width/height with no gaps */}
      <div className={`absolute inset-0 ${
        isDataDestructionPage 
          ? 'bg-blue-600' 
          : 'bg-gradient-to-br from-black via-gray-900 to-gray-800'
      } transition-all duration-300`}>
        {/* Conditional overlay for scrolled state */}
        {scrolled && (
          <div className={`absolute inset-0 ${
            isDataDestructionPage 
              ? 'bg-blue-700/50' 
              : 'bg-gray-900'
          } shadow-lg shadow-black/30`}></div>
        )}
      </div>
      
      <nav className="relative h-full transition-all duration-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className={`w-10 h-10 relative mr-2 rounded-full ${
                  isDataDestructionPage ? 'bg-white p-2' : ''
                }`}>
                  <Image 
                    src="/logo.svg" 
                    alt="EcoNirvana Logo" 
                    width={40}
                    height={40}
                    priority
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xl font-bold text-white">
                  EcoNirvana
                </span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {/* Search Bar */}
              <div ref={searchRef} className="relative mr-4">
                <form onSubmit={handleSearch} className="relative">
                  <div className={`flex items-center rounded-md overflow-hidden ${
                    isDataDestructionPage ? 'bg-blue-500' : 'bg-gray-800'
                  }`}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                      className={`text-white text-sm px-3 py-1.5 w-40 focus:w-56 transition-all duration-300 focus:outline-none ${
                        isDataDestructionPage ? 'bg-blue-500 placeholder-blue-200' : 'bg-gray-800'
                      }`}
                    />
                    <button 
                      type="submit" 
                      className={`p-2 ${
                        isDataDestructionPage 
                          ? 'text-blue-200 hover:text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <FaSearch className="h-4 w-4" />
                    </button>
                  </div>
                </form>
                
                {/* Search Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 mt-1 bg-gray-800 rounded-md shadow-lg z-50 overflow-hidden"
                    >
                      <ul className="py-1">
                        {suggestions.map((suggestion, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleSuggestionClick(suggestion.path)}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                              <FaSearch className="mr-2 h-3 w-3 text-gray-500" />
                              {suggestion.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {user && (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                        : `text-white hover:bg-gray-800`
                    }`}
                  >
                    <FaHome className="mr-1.5 h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link 
                    href="/recycle" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                        : `text-white hover:bg-gray-800`
                    }`}
                  >
                    <FaRecycle className="mr-1.5 h-4 w-4" />
                    Recycle
                  </Link>
                  <Link 
                    href="/rewards" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                        : `text-white hover:bg-gray-800`
                    }`}
                  >
                    <FaChartLine className="mr-1.5 h-4 w-4" />
                    Rewards
                  </Link>
                </>
              )}
              
              {/* Common links - shown to all users */}
              <Link 
                href="/about" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled 
                    ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                    : `text-white hover:bg-gray-800`
                }`}
              >
                Who we are
              </Link>
              <Link 
                href="/why-econirvana" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled 
                    ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                    : `text-white hover:bg-gray-800`
                }`}
              >
                Why EcoNirvana
              </Link>
              <Link 
                href="/blog" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled 
                    ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                    : `text-white hover:bg-gray-800`
                }`}
              >
                Blog
              </Link>
              
              {user ? (
                <div className="relative ml-3" ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className={`flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      scrolled 
                        ? `focus:ring-green-500 text-gray-300 focus:ring-offset-gray-900` 
                        : 'focus:ring-white text-white focus:ring-offset-black'
                    }`}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className={`flex items-center bg-gray-800 rounded-full p-0.5`}>
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700">
                        {user.name ? (
                          <div className="w-full h-full flex items-center justify-center text-lg font-medium bg-gray-700 text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        ) : (
                          <FaUser className="w-full h-full p-1 text-white" />
                        )}
                      </div>
                      <span className="ml-2 mr-1 text-sm font-medium text-white">
                        {user.name.split(' ')[0]}
                      </span>
                      <svg 
                        className="h-4 w-4 text-gray-400" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Profile dropdown menu */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 divide-y divide-gray-800"
                      >
                        <div className="py-1">
                          <Link
                            href="/settings"
                            className="group flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <FaCog className="mr-3 h-4 w-4 text-gray-400 group-hover:text-white" />
                            Settings
                          </Link>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={handleLogout}
                            className="group flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                          >
                            <FaSignOutAlt className="mr-3 h-4 w-4 text-gray-400 group-hover:text-white" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className={`ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? 'bg-green-500 text-white hover:bg-green-400' 
                        : 'bg-green-500 text-white hover:bg-green-400'
                    }`}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  scrolled 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-white hover:bg-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black border-t border-gray-800"
            >
              {/* Mobile Search Bar */}
              <div className="px-3 pt-3" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                      className="bg-gray-800 text-white text-sm px-3 py-2 w-full focus:outline-none"
                    />
                    <button 
                      type="submit" 
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <FaSearch className="h-4 w-4" />
                    </button>
                  </div>
                </form>
                
                {/* Mobile Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 bg-gray-800 rounded-md shadow-lg overflow-hidden"
                    >
                      <ul className="py-1">
                        {suggestions.map((suggestion, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleSuggestionClick(suggestion.path)}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                              <FaSearch className="mr-2 h-3 w-3 text-gray-500" />
                              {suggestion.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaHome className="mr-2 h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/recycle"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaRecycle className="mr-2 h-5 w-5" />
                      Recycle
                    </Link>
                    <Link
                      href="/rewards"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaChartLine className="mr-2 h-5 w-5" />
                      Rewards
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Who we are
                    </Link>
                    <Link
                      href="/why-econirvana"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Why EcoNirvana
                    </Link>
                    <Link
                      href="/blog"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaCog className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      <FaSignOutAlt className="mr-2 h-5 w-5" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Who we are
                    </Link>
                    <Link
                      href="/why-econirvana"
                      className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Why EcoNirvana
                    </Link>
                    <Link
                      href="/blog"
                      className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/login"
                      className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-green-500 text-white hover:bg-green-400 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar; 