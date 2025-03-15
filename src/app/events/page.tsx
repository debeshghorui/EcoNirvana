"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaFilter, FaSearch } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

// Mock data for events
const allEvents = [
  { 
    id: 1, 
    title: 'Community Recycling Day', 
    date: 'June 5, 2023', 
    time: '10:00 AM - 2:00 PM',
    location: 'Downtown Green City',
    description: 'Bring your electronic waste for free recycling. All community members welcome!',
    category: 'Collection Event',
    image: '/images/events/community-day.jpg'
  },
  { 
    id: 2, 
    title: 'Electronics Collection Drive', 
    date: 'July 15, 2023', 
    time: '9:00 AM - 3:00 PM',
    location: 'Westside Community Center',
    description: 'Special collection event for computers, TVs, and other electronic devices.',
    category: 'Collection Event',
    image: '/images/events/electronics-drive.jpg'
  },
  { 
    id: 3, 
    title: 'E-Waste Recycling Workshop', 
    date: 'August 10, 2023', 
    time: '6:00 PM - 8:00 PM',
    location: 'EcoRecycle Education Center',
    description: 'Learn about the importance of e-waste recycling and how to properly dispose of electronic devices.',
    category: 'Workshop',
    image: '/images/events/workshop.jpg'
  },
  { 
    id: 4, 
    title: 'Corporate Recycling Program Launch', 
    date: 'September 20, 2023', 
    time: '1:00 PM - 3:00 PM',
    location: 'Green Business Hub',
    description: 'Introduction to our new corporate recycling program for businesses of all sizes.',
    category: 'Business Event',
    image: '/images/events/corporate.jpg'
  },
  { 
    id: 5, 
    title: 'School Recycling Competition Kickoff', 
    date: 'October 5, 2023', 
    time: '10:00 AM - 12:00 PM',
    location: 'Central High School',
    description: 'Launching our annual school recycling competition with prizes for the schools that collect the most e-waste.',
    category: 'School Event',
    image: '/images/events/school.jpg'
  },
  { 
    id: 6, 
    title: 'Holiday Device Trade-In Event', 
    date: 'November 25, 2023', 
    time: '9:00 AM - 5:00 PM',
    location: 'EcoRecycle Main Facility',
    description: 'Trade in your old devices for recycling and receive special holiday discounts on eco-friendly products.',
    category: 'Special Event',
    image: '/images/events/holiday.jpg'
  },
];

export default function EventsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [events, setEvents] = useState(allEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Filter events
  useEffect(() => {
    let filteredEvents = [...allEvents];
    
    // Apply search filter
    if (searchTerm) {
      filteredEvents = filteredEvents.filter(
        event => 
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterCategory) {
      filteredEvents = filteredEvents.filter(
        event => event.category === filterCategory
      );
    }
    
    // Sort by date (assuming the events are already in chronological order)
    setEvents(filteredEvents);
  }, [searchTerm, filterCategory]);
  
  // Get unique categories
  const categories = [...new Set(allEvents.map(event => event.category))];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push('/dashboard')}
              className="mr-4 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold">Upcoming Events</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Join us at our upcoming recycling events and help make a difference in your community.
          </p>
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
                placeholder="Search events by title, description, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative inline-block">
              <div className="flex items-center">
                <FaFilter className="h-4 w-4 text-gray-500 mr-2" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-700"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="mb-12">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {/* Placeholder for event image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full mb-2 shadow-sm">
                          {event.category}
                        </span>
                        <h3 className="text-lg font-bold">{event.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="h-4 w-4 text-green-500 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="h-4 w-4 text-green-500 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="h-4 w-4 text-green-500 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaCalendarAlt className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || filterCategory ? 
                  "Try adjusting your search or filter criteria." : 
                  "Check back soon for upcoming events in your area."}
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
        
        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-8 md:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:flex-1 mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
                <p className="text-green-100">
                  Subscribe to our newsletter to receive updates about upcoming recycling events in your area.
                </p>
              </div>
              <div className="md:flex-1">
                <form className="sm:flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white rounded-md"
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-3 text-sm text-green-100">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Host Your Own Event */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-1 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Host Your Own Recycling Event</h2>
              <p className="text-gray-600 mb-6">
                Are you interested in organizing a recycling event for your community, school, or business? 
                We provide support and resources to help make your event a success.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Collection equipment and supplies</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Promotional materials and guidance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">On-site staff assistance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Transportation and processing of collected materials</span>
                </li>
              </ul>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contact Us to Learn More
              </Link>
            </div>
            <div className="md:flex-1 bg-green-50 p-6 md:p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FaCalendarAlt className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Impact</h3>
                <p className="text-gray-600">
                  Hosting a recycling event is a great way to make a positive impact on your community and the environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 