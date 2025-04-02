"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaCheck, 
  FaDirections, 
  FaRecycle, 
  FaQrcode, 
  FaClock, 
  FaPhone, 
  FaExclamationTriangle,
  FaMobileAlt,
  FaLaptop,
  FaDesktop
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { addPoints } from '@/lib/firebase';

// Mock data for collection centers
const collectionCenters = [
  {
    id: 1,
    name: 'Downtown Recycling Center',
    address: '123 Green Street, Downtown, City',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
    distance: '1.2 miles',
    services: ['All electronics', 'Data destruction', 'Business drop-offs'],
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 2,
    name: 'Westside E-Waste Collection',
    address: '456 Recycle Avenue, Westside, City',
    phone: '(555) 987-6543',
    hours: 'Mon-Sat: 8AM-7PM, Sun: 10AM-4PM',
    distance: '3.5 miles',
    services: ['All electronics', 'Battery recycling', 'Free parking'],
    coordinates: { lat: 40.7138, lng: -74.0160 }
  },
  {
    id: 3,
    name: 'Northside Tech Recyclers',
    address: '789 Circuit Lane, Northside, City',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri: 10AM-8PM, Sat-Sun: 11AM-5PM',
    distance: '5.8 miles',
    services: ['All electronics', 'Corporate services', 'Pickup available'],
    coordinates: { lat: 40.7228, lng: -74.0260 }
  },
  {
    id: 4,
    name: 'Eastside Green Solutions',
    address: '321 Eco Drive, Eastside, City',
    phone: '(555) 789-0123',
    hours: 'Mon-Thu: 9AM-7PM, Fri-Sat: 9AM-9PM',
    distance: '4.3 miles',
    services: ['All electronics', 'Educational programs', 'Rewards bonus'],
    coordinates: { lat: 40.7328, lng: -73.9960 }
  }
];

export default function DropOffPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [processingRecycle, setProcessingRecycle] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    small: 0,
    medium: 0,
    large: 0
  });
  
  // Point values for each category
  const pointValues = {
    small: 30,
    medium: 50,
    large: 100
  };
  
  // Calculate total points
  const totalPoints = 
    (selectedItems.small * pointValues.small) + 
    (selectedItems.medium * pointValues.medium) + 
    (selectedItems.large * pointValues.large);
  
  // Handle changing the number of items
  const updateItemCount = (category: 'small' | 'medium' | 'large', change: number) => {
    const newCount = Math.max(0, selectedItems[category] + change);
    setSelectedItems({
      ...selectedItems,
      [category]: newCount
    });
  };
  
  // Handle completion of recycling
  const handleCompleteRecycling = async () => {
    if (!user?.id || !selectedLocation || totalPoints === 0) return;
    
    setProcessingRecycle(true);
    
    try {
      // Track each type of item separately in Firestore
      const promises = [];
      
      if (selectedItems.small > 0) {
        promises.push(
          addPoints(
            user.id, 
            selectedItems.small * pointValues.small, 
            `${selectedItems.small} Small Electronics`, 
            'Electronics'
          )
        );
      }
      
      if (selectedItems.medium > 0) {
        promises.push(
          addPoints(
            user.id, 
            selectedItems.medium * pointValues.medium, 
            `${selectedItems.medium} Medium Electronics`, 
            'Electronics'
          )
        );
      }
      
      if (selectedItems.large > 0) {
        promises.push(
          addPoints(
            user.id, 
            selectedItems.large * pointValues.large, 
            `${selectedItems.large} Large Electronics`, 
            'Electronics'
          )
        );
      }
      
      await Promise.all(promises);
      
      // Show success message after points are added
      setShowSuccessMessage(true);
      
      // Reset selected items
      setSelectedItems({ small: 0, medium: 0, large: 0 });
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error recording recycling activity:', error);
      alert('There was an error recording your recycling. Please try again.');
    } finally {
      setProcessingRecycle(false);
    }
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
              <FaMapMarkerAlt className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading collection centers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/recycle')}
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Drop-Off Locations</h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Find a Collection Center Near You</h2>
            <p className="text-gray-600 mb-4">
              Drop off your e-waste at any of our convenient collection centers. Our trained staff will help you recycle your electronics properly and credit your account with reward points.
            </p>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start">
                <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">What to bring:</span> Your electronic devices, any accessories, and your ID or the EcoNirvana app to scan your QR code for points.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Note:</span> Please remove personal data from devices before dropping them off. We also offer secure data destruction services if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Map Placeholder */}
        <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Interactive Map</p>
              <p className="text-gray-500 text-sm">(Map integration would be implemented here)</p>
            </div>
          </div>
        </div>
        
        {/* Collection Centers List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Collection Centers</h2>
          
          <div className="space-y-4">
            {collectionCenters.map((center) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border-2 ${
                  selectedLocation === center.id ? 'border-green-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedLocation(center.id.toString())}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="text-green-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
                        <span className="ml-3 text-sm text-gray-500">{center.distance}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{center.address}</p>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href={`tel:${center.phone.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FaPhone className="mr-1.5 h-4 w-4 text-gray-500" />
                        Call
                      </a>
                      <a 
                        href={`https://maps.google.com/?q=${center.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        <FaDirections className="mr-1.5 h-4 w-4" />
                        Directions
                      </a>
                    </div>
                  </div>
                  
                  {selectedLocation === center.id.toString() && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-start">
                            <FaClock className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Hours</p>
                              <p className="text-sm text-gray-600">{center.hours}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Services</p>
                          <div className="flex flex-wrap gap-2">
                            {center.services.map((service, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Ready to Drop Off Your E-Waste?</h2>
            <p className="text-green-100 mb-6 max-w-3xl mx-auto">
              Visit any of our collection centers during operating hours. No appointment necessary!
            </p>
            <Link
              href="/recycle"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Back to Recycling Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 