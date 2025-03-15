"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaRecycle, FaLeaf, FaHome, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
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

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : `bg-gradient-to-r from-${themeColor}-700 to-${themeColor}-600 py-3`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 relative mr-2">
                <Image 
                  src="/logo.svg" 
                  alt="EcoRecycle Logo" 
                  width={40}
                  height={40}
                  priority
                  className={scrolled ? '' : 'filter brightness-0 invert'}
                />
              </div>
              <span className={`text-xl font-bold ${scrolled ? `text-${themeColor}-700` : 'text-white'}`}>
                EcoRecycle
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled 
                      ? `text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50` 
                      : `text-white hover:bg-${themeColor}-600`
                  }`}
                >
                  <FaHome className="mr-1.5 h-4 w-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/recycle" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled 
                      ? `text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50` 
                      : `text-white hover:bg-${themeColor}-600`
                  }`}
                >
                  <FaRecycle className="mr-1.5 h-4 w-4" />
                  Recycle
                </Link>
                <Link 
                  href="/rewards" 
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled 
                      ? `text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50` 
                      : `text-white hover:bg-${themeColor}-600`
                  }`}
                >
                  <FaChartLine className="mr-1.5 h-4 w-4" />
                  Rewards
                </Link>
              </>
            )}
            
            {user ? (
              <div className="relative ml-3" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className={`flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    scrolled 
                      ? `focus:ring-${themeColor}-500 text-gray-700 hover:text-${themeColor}-600` 
                      : 'focus:ring-white text-white'
                  }`}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className={`flex items-center ${scrolled ? `bg-${themeColor}-100` : `bg-${themeColor}-600`} rounded-full p-0.5`}>
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      {user.name ? (
                        <div className={`w-full h-full flex items-center justify-center text-lg font-medium ${
                          scrolled ? `bg-${themeColor}-200 text-${themeColor}-800` : `bg-${themeColor}-500 text-white`
                        }`}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <FaUser className={`w-full h-full p-1 ${scrolled ? `text-${themeColor}-600` : 'text-white'}`} />
                      )}
                    </div>
                    <span className={`ml-2 mr-1 text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                      {user.name.split(' ')[0]}
                    </span>
                    <svg 
                      className={`h-4 w-4 ${scrolled ? 'text-gray-500' : `text-${themeColor}-200`}`} 
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
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaHome className={`mr-3 text-${themeColor}-600`} />
                        Dashboard
                      </Link>
                      <Link 
                        href="/recycle" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaRecycle className={`mr-3 text-${themeColor}-600`} />
                        Recycle Now
                      </Link>
                      <Link 
                        href="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaCog className={`mr-3 text-${themeColor}-600`} />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaSignOutAlt className={`mr-3 text-${themeColor}-600`} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    scrolled 
                      ? `text-${themeColor}-600 border border-${themeColor}-600 hover:bg-${themeColor}-50` 
                      : 'text-white border border-white hover:bg-${themeColor}-600'
                  }`}
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    scrolled 
                      ? `bg-${themeColor}-600 text-white hover:bg-${themeColor}-700` 
                      : `bg-white text-${themeColor}-700 hover:bg-${themeColor}-50`
                  }`}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                scrolled 
                  ? `text-gray-700 hover:text-${themeColor}-600 hover:bg-gray-100` 
                  : `text-white hover:bg-${themeColor}-600`
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {user ? (
                <>
                  <div className="px-3 py-3 border-b border-gray-200 mb-2">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 bg-${themeColor}-100 rounded-full flex items-center justify-center mr-3`}>
                        <span className={`text-${themeColor}-700 font-semibold text-lg`}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard" 
                    className={`flex items-center text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50 block px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaHome className={`mr-3 text-${themeColor}-600`} />
                    Dashboard
                  </Link>
                  <Link 
                    href="/recycle" 
                    className={`flex items-center text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50 block px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaRecycle className={`mr-3 text-${themeColor}-600`} />
                    Recycle Now
                  </Link>
                  <Link 
                    href="/rewards" 
                    className={`flex items-center text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50 block px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaChartLine className={`mr-3 text-${themeColor}-600`} />
                    Rewards
                  </Link>
                  <Link 
                    href="/settings" 
                    className={`flex items-center text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50 block px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaCog className={`mr-3 text-${themeColor}-600`} />
                    Settings
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button 
                    onClick={handleLogout}
                    className={`flex items-center w-full text-left text-gray-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50 px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaSignOutAlt className={`mr-3 text-${themeColor}-600`} />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <Link 
                      href="/login" 
                      className={`flex justify-center items-center text-${themeColor}-600 border border-${themeColor}-600 hover:bg-${themeColor}-50 px-3 py-2 rounded-md text-base font-medium`}
                    >
                      Log in
                    </Link>
                    <Link 
                      href="/signup" 
                      className={`flex justify-center items-center bg-${themeColor}-600 text-white hover:bg-${themeColor}-700 px-3 py-2 rounded-md text-base font-medium`}
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 