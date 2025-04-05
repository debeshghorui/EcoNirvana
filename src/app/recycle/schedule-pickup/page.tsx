"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaCheck,
  FaRecycle,
  FaBoxOpen,
  FaTruck
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

// Mock data for available dates
const availableDates = [
  { date: 'Monday, July 10', slots: ['9AM-12PM', '1PM-4PM', '5PM-8PM'] },
  { date: 'Tuesday, July 11', slots: ['9AM-12PM', '1PM-4PM'] },
  { date: 'Wednesday, July 12', slots: ['9AM-12PM', '1PM-4PM', '5PM-8PM'] },
  { date: 'Thursday, July 13', slots: ['9AM-12PM', '1PM-4PM', '5PM-8PM'] },
  { date: 'Friday, July 14', slots: ['9AM-12PM', '1PM-4PM'] },
  { date: 'Saturday, July 15', slots: ['10AM-2PM'] },
  { date: 'Monday, July 17', slots: ['9AM-12PM', '1PM-4PM', '5PM-8PM'] },
];

export default function SchedulePickupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [itemCategories, setItemCategories] = useState({
    small: false,
    medium: false,
    large: false
  });
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    instructions: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };
  
  // Check if current step is complete
  const isStepComplete = () => {
    if (currentStep === 1) {
      return selectedDate && selectedTimeSlot;
    } else if (currentStep === 2) {
      return itemCategories.small || itemCategories.medium || itemCategories.large;
    } else if (currentStep === 3) {
      return address.street && address.city && address.state && address.zip;
    }
    return false;
  };
  
  // Go to next step
  const goToNextStep = () => {
    if (currentStep < 3 && isStepComplete()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
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
              <FaCalendarAlt className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading scheduler...</p>
        </div>
      </div>
    );
  }

  // Show completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pickup Scheduled Successfully!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your e-waste pickup has been scheduled for {selectedDate} between {selectedTimeSlot}. You'll receive a confirmation email with all the details.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Pickup Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex">
                    <FaCalendarAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-600">{selectedDate}, {selectedTimeSlot}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <FaMapMarkerAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">
                        {address.street}, {address.city}, {address.state} {address.zip}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <FaRecycle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Items for Pickup</p>
                      <p className="text-sm text-gray-600">
                        {itemCategories.small && 'Small Electronics, '}
                        {itemCategories.medium && 'Medium Electronics, '}
                        {itemCategories.large && 'Large Electronics'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/activity"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View Recycling History
                </Link>
              </div>
            </div>
          </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Schedule Pickup</h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <FaCalendarAlt className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 text-gray-600">Date & Time</span>
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <FaBoxOpen className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 text-gray-600">Items</span>
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 text-gray-600">Address</span>
            </div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Date & Time */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Pickup Date & Time</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Dates</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableDates.map((dateOption, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedDate === dateOption.date
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                          onClick={() => {
                            setSelectedDate(dateOption.date);
                            setSelectedTimeSlot(null);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{dateOption.date}</span>
                            {selectedDate === dateOption.date && (
                              <FaCheck className="text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {availableDates.find(d => d.date === selectedDate)?.slots.map((slot, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-3 cursor-pointer transition-colors flex items-center ${
                              selectedTimeSlot === slot
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                            onClick={() => setSelectedTimeSlot(slot)}
                          >
                            <FaClock className="text-gray-400 mr-2" />
                            <span>{slot}</span>
                            {selectedTimeSlot === slot && (
                              <FaCheck className="text-green-600 ml-auto" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Our pickup team will arrive during the selected time slot. Please ensure someone is available to hand over the items or leave specific instructions for our team.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Items */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">What Items Are You Recycling?</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        itemCategories.small ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setItemCategories({...itemCategories, small: !itemCategories.small})}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                          itemCategories.small ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                          {itemCategories.small && <FaCheck className="text-white text-xs" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Small Electronics</h3>
                          <p className="text-sm text-gray-600">Smartphones, tablets, small gadgets, accessories</p>
                          <p className="text-sm text-green-600 mt-1">+30 points per item</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        itemCategories.medium ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setItemCategories({...itemCategories, medium: !itemCategories.medium})}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                          itemCategories.medium ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                          {itemCategories.medium && <FaCheck className="text-white text-xs" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Medium Electronics</h3>
                          <p className="text-sm text-gray-600">Laptops, monitors, printers, small appliances</p>
                          <p className="text-sm text-green-600 mt-1">+50 points per item</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        itemCategories.large ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setItemCategories({...itemCategories, large: !itemCategories.large})}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                          itemCategories.large ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                          {itemCategories.large && <FaCheck className="text-white text-xs" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Large Electronics</h3>
                          <p className="text-sm text-gray-600">TVs, desktop computers, servers, large appliances</p>
                          <p className="text-sm text-green-600 mt-1">+100 points per item</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 mb-2">
                          Please select all categories that apply. Our team will count the exact number of items during pickup and adjust your points accordingly.
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Note:</span> For data security, we recommend removing personal data from your devices before recycling. We also offer secure data destruction services if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Address */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Pickup Address</h2>
                  
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        id="street"
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          id="city"
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          id="state"
                          value={address.state}
                          onChange={(e) => setAddress({...address, state: e.target.value})}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          id="zip"
                          value={address.zip}
                          onChange={(e) => setAddress({...address, zip: e.target.value})}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                      <textarea
                        id="instructions"
                        rows={3}
                        value={address.instructions}
                        onChange={(e) => setAddress({...address, instructions: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="E.g., Gate code, where to find items, etc."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Our pickup team will arrive at this address during the selected time slot. Please ensure the address is correct and someone is available to hand over the items.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Pickup Summary</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <FaCalendarAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Date & Time</p>
                          <p className="text-sm text-gray-600">{selectedDate}, {selectedTimeSlot}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <FaRecycle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Items for Pickup</p>
                          <p className="text-sm text-gray-600">
                            {itemCategories.small && 'Small Electronics, '}
                            {itemCategories.medium && 'Medium Electronics, '}
                            {itemCategories.large && 'Large Electronics'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={!isStepComplete()}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isStepComplete() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepComplete() || isSubmitting}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isStepComplete() && !isSubmitting ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about scheduling a pickup or need assistance, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contact Support
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 