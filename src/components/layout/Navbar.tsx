"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaRecycle, FaLeaf, FaHome, FaChartLine, FaCaretDown, FaQuestionCircle, FaInfoCircle, FaBlog, FaChevronRight, FaSearch, FaCalendarAlt, FaTools, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

// Define search categories with their pages and keywords
const searchCategories = [
  {
    title: 'Recycling',
    icon: <FaRecycle className="h-5 w-5 text-green-500" />,
    pages: [
      { title: 'Recycle Your E-Waste', path: '/recycle', keywords: ['recycle', 'recycling', 'waste', 'ewaste', 'e-waste', 'electronics'] },
      { title: 'Find Drop-off Locations', path: '/locations', keywords: ['locations', 'centers', 'drop', 'dropoff', 'drop-off', 'collection', 'nearby'] },
      { title: 'Doorstep Collection', path: '/doorstep', keywords: ['doorstep', 'pickup', 'home collection', 'collect', 'door'] },
      { title: 'Schedule a Pickup', path: '/recycle/schedule-pickup', keywords: ['schedule', 'pickup', 'collection'] }
    ]
  },
  {
    title: 'Community',
    icon: <FaCalendarAlt className="h-5 w-5 text-green-500" />,
    pages: [
      { title: 'Upcoming Events', path: '/events', keywords: ['events', 'upcoming', 'community', 'drives', 'collection'] },
      { title: 'E-Waste Quiz', path: '/quiz', keywords: ['quiz', 'test', 'knowledge', 'learn', 'education'] },
      { title: 'Blog & Resources', path: '/blog', keywords: ['blog', 'articles', 'news', 'posts', 'read'] }
    ]
  },
  {
    title: 'Account',
    icon: <FaChartLine className="h-5 w-5 text-green-500" />,
    pages: [
      { title: 'Dashboard', path: '/dashboard', keywords: ['dashboard', 'home', 'main', 'profile'] },
      { title: 'Your Rewards', path: '/rewards', keywords: ['rewards', 'points', 'earn', 'redeem', 'benefit'] },
      { title: 'Account Settings', path: '/settings', keywords: ['settings', 'account', 'profile', 'preferences'] },
      { title: 'Activity History', path: '/activity', keywords: ['activity', 'history', 'recent', 'actions'] }
    ]
  },
  {
    title: 'Services',
    icon: <FaTools className="h-5 w-5 text-green-500" />,
    pages: [
      { title: 'Our Services', path: '/services', keywords: ['services', 'offerings', 'solutions', 'business'] },
      { title: 'Environmental Impact', path: '/impact', keywords: ['impact', 'environment', 'stats', 'statistics', 'contribution'] },
      { title: 'Data Destruction', path: '/services/data-destruction', keywords: ['data', 'destruction', 'security', 'privacy', 'wipe'] }
    ]
  }
];

// Flatten all pages for searching
const allPages = searchCategories.flatMap(category => category.pages);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Check if we're on the data destruction page to use blue theme
  const isDataDestructionPage = pathname?.includes('/services/data-destruction') || 
                               pathname?.includes('/services/data-security') || false;
  // Check if we're on the home page
  const isHomePage = pathname === '/';
  // Check if we're on login or signup pages
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  // Check if we're on pages where search should be hidden for non-logged in users
  const isHideSearchPage = pathname === '/about' || pathname === '/why-econirvana' || pathname === '/blog' || pathname === '/quiz';
  // Only show search if not on excluded pages or if user is logged in
  const showSearch = !isHomePage && !isAuthPage && !(isHideSearchPage && !user);
  
  const themeColor = isDataDestructionPage ? '#0A1533' : 'green';

  // Set mounted state on client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

  // Close suggestions when clicking outside
  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target as Node)) &&
        (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node))
      ) {
        setShowSuggestions(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target as Node)) {
        setIsAboutMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMounted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isAboutMenuOpen) setIsAboutMenuOpen(false);
  };

  const toggleAboutMenu = () => {
    setIsAboutMenuOpen(!isAboutMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    router.push('/');
  };

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  // Find matching pages based on search term
  const findMatches = (query: string) => {
    if (!query.trim()) return [];
    
    const searchQuery = query.toLowerCase().trim();
    
    // Score each page based on how well it matches the query
    const scoredPages = allPages.map(page => {
      let score = 0;
      
      // Check title match
      if (page.title.toLowerCase().includes(searchQuery)) {
        score += 10;
        // Check for exact title match
        if (page.title.toLowerCase() === searchQuery) {
          score += 50;
        }
      }
      
      // Check keyword matches
      page.keywords.forEach(keyword => {
        if (keyword === searchQuery) {
          score += 15; // Exact match
        } else if (keyword.includes(searchQuery)) {
          score += 8; // Keyword contains query
        } else if (searchQuery.includes(keyword)) {
          score += 5; // Query contains keyword
        }
      });
      
      return { ...page, score };
    });
    
    // Filter out pages with no match and sort by score
    return scoredPages
      .filter(page => page.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Limit to top 5 results
  };

  // Update suggestions as the user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const matches = findMatches(searchTerm);
      setSearchSuggestions(matches);
      setShowSuggestions(matches.length > 0);
      
      // If there's an exact match with very high score, redirect immediately
      const exactMatch = matches.find(match => match.score >= 50);
      if (exactMatch) {
        router.push(exactMatch.path);
        setSearchTerm('');
        setShowSuggestions(false);
      }
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Handle navigation back
  const handleBackNavigation = () => {
    router.back();
  };

  // Handle initial SSR render
  if (!isMounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <div className={`absolute inset-0 ${
          isDataDestructionPage 
            ? 'bg-[#0A1533]' 
            : 'bg-[#0A1533]'
        } transition-all duration-300`}></div>
        <nav className="relative h-full transition-all duration-300 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <div className="w-10 h-10 relative mr-2 rounded-md overflow-hidden bg-white">
                    <Image 
                      src="/logo.jpeg" 
                      alt="EcoNirvana Logo" 
                      width={40}
                      height={40}
                      priority
                      className="w-full h-full scale-110"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                  <span className="text-xl font-bold text-white">
                    EcoNirvana
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-1"></div>
              <div className="md:hidden flex items-center"></div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16">
      {/* Background that extends full width/height with no gaps */}
      <div className={`absolute inset-0 ${
        isDataDestructionPage 
          ? 'bg-[#0A1533]' 
          : 'bg-[#0A1533]'
      } transition-all duration-300`}>
        {/* Conditional overlay for scrolled state */}
        {scrolled && (
          <div className={`absolute inset-0 ${
            isDataDestructionPage 
              ? 'bg-[#0A1533]/90' 
              : 'bg-[#0A1533]/90'
          } shadow-lg shadow-black/30`}></div>
        )}
      </div>
      
      <nav className="relative h-full transition-all duration-300 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Back button - show on all pages except home, dashboard, and data destruction */}
              {!isHomePage && pathname !== '/dashboard' && !isDataDestructionPage && (
                <button
                  onClick={handleBackNavigation}
                  className={`mr-3 p-2 rounded-full transition-colors ${
                    isDataDestructionPage 
                      ? 'text-white hover:bg-[#0A1533]/80' 
                      : 'text-white hover:bg-gray-800'
                  }`}
                  aria-label="Go back"
                >
                  <FaArrowLeft className="h-4 w-4" />
                </button>
              )}
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 relative mr-2 rounded-md overflow-hidden bg-white">
                  <Image 
                    src="/logo.jpeg" 
                    alt="EcoNirvana Logo" 
                    width={40}
                    height={40}
                    priority
                    className="w-full h-full scale-110"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <span className="text-xl font-bold text-white">
                  EcoNirvana
                </span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-1">              
              {showSearch && (
                <div className="relative mr-2" ref={desktopSearchRef}>
                  <form onSubmit={handleSearch} className="relative">
                    <div className={`flex items-center ${
                      isDataDestructionPage 
                        ? 'bg-[#0A1533]/90 rounded-lg overflow-hidden' 
                        : 'bg-gray-800 rounded-lg overflow-hidden'
                    }`}>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent text-white px-3 py-1.5 text-sm focus:outline-none w-32 lg:w-40"
                      />
                      <button
                        type="submit"
                        className={`p-1.5 ${
                          isDataDestructionPage 
                            ? 'bg-[#0A1533] hover:bg-[#0A1533]/80 text-white hover:text-white' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                        }`}
                        aria-label="Search"
                      >
                        <FaSearch className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Search Suggestions */}
                    {showSuggestions && (
                      <div className="absolute mt-1 w-64 bg-white rounded-md shadow-lg overflow-hidden z-50">
                        <ul className="divide-y divide-gray-100">
                          {searchSuggestions.map((result, index) => (
                            <li key={index}>
                              <Link 
                                href={result.path}
                                className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
                                onClick={() => {
                                  setSearchTerm('');
                                  setShowSuggestions(false);
                                }}
                              >
                                {result.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </form>
                </div>
              )}
              
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
              
              {/* About Dropdown Menu - Only shown when not on the home page */}
              {!isHomePage && (
                <div className="relative" ref={aboutMenuRef}>
                  <button
                    onClick={toggleAboutMenu}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                        : `text-white hover:bg-gray-800`
                    }`}
                  >
                    <FaInfoCircle className="mr-1.5 h-4 w-4" />
                    About
                    <FaCaretDown className="ml-1 h-3 w-3" />
                  </button>
                  
                  <AnimatePresence>
                    {isAboutMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-50 overflow-hidden"
                      >
                        <div className="py-1">
                          <Link
                            href="/about"
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setIsAboutMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <FaInfoCircle className="mr-2 h-4 w-4" />
                              Who we are
                            </div>
                            <FaChevronRight className="h-3 w-3 opacity-50" />
                          </Link>
                          <Link
                            href="/why-econirvana"
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setIsAboutMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <FaLeaf className="mr-2 h-4 w-4" />
                              Why EcoNirvana
                            </div>
                            <FaChevronRight className="h-3 w-3 opacity-50" />
                          </Link>
                          <Link
                            href="/blog"
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setIsAboutMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <FaBlog className="mr-2 h-4 w-4" />
                              Blog
                            </div>
                            <FaChevronRight className="h-3 w-3 opacity-50" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              {/* Individual Links for About section - Only shown on the home page */}
              {isHomePage && (
                <>
                  <Link 
                    href="/about" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                        : `text-white hover:bg-gray-800`
                    }`}
                  >
                    <FaInfoCircle className="mr-1.5 h-4 w-4" />
                    Who We Are
                  </Link>
                  <Link 
                    href="/why-econirvana" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled 
                        ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                        : `text-white hover:bg-gray-800`
                    }`}
                  >
                    <FaLeaf className="mr-1.5 h-4 w-4" />
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
                    <FaBlog className="mr-1.5 h-4 w-4" />
                    Blog
                  </Link>
                </>
              )}
              
              {/* Quiz Button */}
              <Link 
                href="/quiz" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled 
                    ? `text-gray-300 hover:text-green-400 hover:bg-gray-800` 
                    : `text-white hover:bg-gray-800`
                }`}
              >
                <FaQuestionCircle className="mr-1.5 h-4 w-4" />
                Quiz
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
                    <div className={`flex items-center ${
                      isDataDestructionPage 
                        ? 'bg-[#0A1533]/90 rounded-full p-0.5' 
                        : 'bg-gray-800 rounded-full p-0.5'
                    }`}>
                      <div className={`w-8 h-8 rounded-full overflow-hidden ${
                        isDataDestructionPage 
                          ? 'border-2 border-[#0A1533]/70' 
                          : 'border-2 border-gray-700'
                      }`}>
                        {user.profilePicture ? (
                          <Image 
                            src={user.profilePicture}
                            alt={user.name || 'User'}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : user.photoURL ? (
                          <Image 
                            src={user.photoURL}
                            alt={user.name || 'User'}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : user.name ? (
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
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 border-green-200 ${
                      scrolled 
                        ? 'text-white hover:border-green-500' 
                        : 'text-white hover:border-green-500'
                    }`}
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className={`ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 border-green-600 ${
                      scrolled 
                        ? 'bg-green-500 text-white hover:bg-green-400 hover:border-green-500' 
                        : 'bg-green-500 text-white hover:bg-green-400 hover:border-green-500'
                    }`}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {/* Back button for mobile - show on all pages except home and dashboard */}
              {!isHomePage && pathname !== '/dashboard' && (
                <button
                  onClick={handleBackNavigation}
                  className={`mr-3 p-2 rounded-full transition-colors ${
                    isDataDestructionPage 
                      ? 'text-white hover:bg-[#0A1533]/80' 
                      : 'text-white hover:bg-gray-800'
                  }`}
                  aria-label="Go back"
                >
                  <FaArrowLeft className="h-4 w-4" />
                </button>
              )}
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
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {user ? (
                  <>
                    {showSearch && (
                      <div className="relative mb-2" ref={mobileSearchRef}>
                        <form 
                          onSubmit={handleSearch} 
                          className="mb-2"
                        >
                          <div className={`relative flex items-center ${
                            isDataDestructionPage 
                              ? 'bg-[#0A1533]/90 rounded-lg overflow-hidden' 
                              : 'bg-gray-800 rounded-lg overflow-hidden'
                          }`}>
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="flex-grow bg-transparent text-white px-3 py-2 text-sm focus:outline-none"
                            />
                            <button
                              type="submit"
                              className={`p-2 ${
                                isDataDestructionPage 
                                  ? 'bg-[#0A1533] hover:bg-[#0A1533]/80 text-white hover:text-white' 
                                  : 'bg-green-600 hover:bg-green-500 text-white hover:text-white'
                              }`}
                              aria-label="Search"
                            >
                              <FaSearch className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Search Suggestions for Mobile */}
                          {showSuggestions && (
                            <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden z-50">
                              <ul className="divide-y divide-gray-100">
                                {searchSuggestions.map((result, index) => (
                                  <li key={index}>
                                    <Link 
                                      href={result.path}
                                      className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
                                      onClick={() => {
                                        setSearchTerm('');
                                        setShowSuggestions(false);
                                        setIsMenuOpen(false);
                                      }}
                                    >
                                      {result.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </form>
                      </div>
                    )}
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
                    
                    {/* Mobile About submenu - Only shown when not on the home page */}
                    {!isHomePage && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">
                          About
                        </div>
                        <Link
                          href="/about"
                          className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaInfoCircle className="mr-2 h-5 w-5" />
                          Who we are
                        </Link>
                        <Link
                          href="/why-econirvana"
                          className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaLeaf className="mr-2 h-5 w-5" />
                          Why EcoNirvana
                        </Link>
                        <Link
                          href="/blog"
                          className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaBlog className="mr-2 h-5 w-5" />
                          Blog
                        </Link>
                      </div>
                    )}
                    
                    {/* Mobile About links for home page */}
                    {isHomePage && (
                      <>
                        <Link
                          href="/about"
                          className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaInfoCircle className="mr-2 h-5 w-5" />
                          Who We Are
                        </Link>
                        <Link
                          href="/why-econirvana"
                          className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaLeaf className="mr-2 h-5 w-5" />
                          Why EcoNirvana
                        </Link>
                        <Link
                          href="/blog"
                          className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FaBlog className="mr-2 h-5 w-5" />
                          Blog
                        </Link>
                      </>
                    )}
                    
                    {/* Mobile Quiz Link */}
                    <Link
                      href="/quiz"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaQuestionCircle className="mr-2 h-5 w-5" />
                      Quiz
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
                    {showSearch && (
                      <div className="relative mb-2" ref={mobileSearchRef}>
                        <form 
                          onSubmit={handleSearch} 
                          className="mb-2"
                        >
                          <div className={`relative flex items-center ${
                            isDataDestructionPage 
                              ? 'bg-[#0A1533]/90 rounded-lg overflow-hidden' 
                              : 'bg-gray-800 rounded-lg overflow-hidden'
                          }`}>
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="flex-grow bg-transparent text-white px-3 py-2 text-sm focus:outline-none"
                            />
                            <button
                              type="submit"
                              className={`p-2 ${
                                isDataDestructionPage 
                                  ? 'bg-[#0A1533] hover:bg-[#0A1533]/80 text-white hover:text-white' 
                                  : 'bg-green-600 hover:bg-green-500 text-white hover:text-white'
                              }`}
                              aria-label="Search"
                            >
                              <FaSearch className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Search Suggestions for Mobile */}
                          {showSuggestions && (
                            <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden z-50">
                              <ul className="divide-y divide-gray-100">
                                {searchSuggestions.map((result, index) => (
                                  <li key={index}>
                                    <Link 
                                      href={result.path}
                                      className="block px-4 py-2 hover:bg-gray-50 text-gray-800"
                                      onClick={() => {
                                        setSearchTerm('');
                                        setShowSuggestions(false);
                                        setIsMenuOpen(false);
                                      }}
                                    >
                                      {result.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </form>
                      </div>
                    )}
                    <Link
                      href="/about"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaInfoCircle className="mr-2 h-5 w-5" />
                      Who We Are
                    </Link>
                    <Link
                      href="/why-econirvana"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaLeaf className="mr-2 h-5 w-5" />
                      Why EcoNirvana
                    </Link>
                    <Link
                      href="/blog"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaBlog className="mr-2 h-5 w-5" />
                      Blog
                    </Link>
                    <Link
                      href="/quiz"
                      className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaQuestionCircle className="mr-2 h-5 w-5" />
                      Quiz
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center border-2 border-green-200 text-white hover:border-green-500 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser className="mr-2 h-5 w-5" />
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center bg-green-500 text-white hover:bg-green-400 block px-3 py-2 rounded-md text-base font-medium mt-2 border-2 border-green-600 hover:border-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser className="mr-2 h-5 w-5" />
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