"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaArrowRight, FaMapMarkerAlt, FaRecycle, FaCalendarAlt, FaQuestionCircle, FaLeaf, FaChartLine, FaBook, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Define search categories with their pages and keywords
const searchCategories = [
  {
    title: 'Recycling',
    icon: <FaRecycle className="h-6 w-6 text-green-500" />,
    pages: [
      { title: 'Recycle Your E-Waste', path: '/recycle', keywords: ['recycle', 'recycling', 'waste', 'ewaste', 'e-waste', 'electronics'] },
      { title: 'Find Drop-off Locations', path: '/locations', keywords: ['locations', 'centers', 'drop', 'dropoff', 'drop-off', 'collection', 'nearby'] },
      { title: 'Doorstep Collection', path: '/doorstep', keywords: ['doorstep', 'pickup', 'home collection', 'collect', 'door'] },
      { title: 'Schedule a Pickup', path: '/recycle', keywords: ['schedule', 'pickup', 'collection'] }
    ]
  },
  {
    title: 'Community',
    icon: <FaCalendarAlt className="h-6 w-6 text-green-500" />,
    pages: [
      { title: 'Upcoming Events', path: '/events', keywords: ['events', 'upcoming', 'community', 'drives', 'collection'] },
      { title: 'E-Waste Quiz', path: '/quiz', keywords: ['quiz', 'test', 'knowledge', 'learn', 'education'] },
      { title: 'Blog & Resources', path: '/blog', keywords: ['blog', 'articles', 'news', 'posts', 'read'] }
    ]
  },
  {
    title: 'Account',
    icon: <FaChartLine className="h-6 w-6 text-green-500" />,
    pages: [
      { title: 'Dashboard', path: '/dashboard', keywords: ['dashboard', 'home', 'main', 'profile'] },
      { title: 'Your Rewards', path: '/rewards', keywords: ['rewards', 'points', 'earn', 'redeem', 'benefit'] },
      { title: 'Account Settings', path: '/settings', keywords: ['settings', 'account', 'profile', 'preferences'] },
      { title: 'Activity History', path: '/activity', keywords: ['activity', 'history', 'recent', 'actions'] }
    ]
  },
  {
    title: 'Services',
    icon: <FaTools className="h-6 w-6 text-green-500" />,
    pages: [
      { title: 'Our Services', path: '/services', keywords: ['services', 'offerings', 'solutions', 'business'] },
      { title: 'Environmental Impact', path: '/impact', keywords: ['impact', 'environment', 'stats', 'statistics', 'contribution'] },
      { title: 'Data Destruction', path: '/services/data-destruction', keywords: ['data', 'destruction', 'security', 'privacy', 'wipe'] }
    ]
  }
];

// Flatten all pages for searching
const allPages = searchCategories.flatMap(category => category.pages);

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const [isSearching, setIsSearching] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [query]);

  const performSearch = (searchQuery: string) => {
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const results = findMatches(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Find matches based on the search query
  const findMatches = (searchQuery: string) => {
    const query = searchQuery.toLowerCase().trim();
    
    // Score each page based on how well it matches the query
    const scoredPages = allPages.map(page => {
      let score = 0;
      
      // Check title match
      if (page.title.toLowerCase().includes(query)) {
        score += 10;
      }
      
      // Check keyword matches
      page.keywords.forEach(keyword => {
        if (keyword === query) {
          score += 15; // Exact match
        } else if (keyword.includes(query)) {
          score += 8; // Keyword contains query
        } else if (query.includes(keyword)) {
          score += 5; // Query contains keyword
        }
      });
      
      return { ...page, score };
    });
    
    // Filter out pages with no match and sort by score
    return scoredPages
      .filter(page => page.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  // Group results by category for display
  const groupResultsByCategory = () => {
    const groupedResults: Record<string, any[]> = {};
    
    searchResults.forEach(result => {
      // Find which category this result belongs to
      for (const category of searchCategories) {
        const pageInCategory = category.pages.find(page => page.path === result.path);
        if (pageInCategory) {
          if (!groupedResults[category.title]) {
            groupedResults[category.title] = [];
          }
          groupedResults[category.title].push(result);
          break;
        }
      }
    });
    
    return groupedResults;
  };

  const groupedResults = groupResultsByCategory();

  return (
    <div className="min-h-screen pt-16">
      {/* Search Header */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Search Results</h1>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
                <input
                  type="text"
                  placeholder="Search for recycling, events, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-3 text-gray-800 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-green-500 text-white p-3 hover:bg-green-600 transition-colors"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <FaSearch className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No results found</h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                We couldn't find any matches for "{query}". Try different keywords or browse our popular sections below.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
                <Link href="/recycle" className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FaRecycle className="mr-2 text-green-600" />
                  <span className="font-medium">Recycle</span>
                </Link>
                <Link href="/locations" className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FaMapMarkerAlt className="mr-2 text-green-600" />
                  <span className="font-medium">Locations</span>
                </Link>
                <Link href="/events" className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FaCalendarAlt className="mr-2 text-green-600" />
                  <span className="font-medium">Events</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Found {searchResults.length} results for "{query}"
                </h2>
              </div>
              
              {Object.entries(groupedResults).map(([category, results]) => (
                <div key={category} className="mb-10">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    {searchCategories.find(c => c.title === category)?.icon}
                    <span className="ml-2">{category}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link 
                          href={result.path}
                          className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                        >
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {result.keywords.slice(0, 3).join(', ')}...
                          </p>
                          <div className="flex items-center text-green-600 font-medium">
                            Visit page <FaArrowRight className="ml-2 h-3 w-3" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Browse All Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse All Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {category.pages.map((page, pageIndex) => (
                    <li key={pageIndex}>
                      <Link 
                        href={page.path}
                        className="text-gray-700 hover:text-green-600 flex items-center"
                      >
                        <span className="mr-2">•</span>
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 