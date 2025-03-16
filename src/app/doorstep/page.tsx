"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTruck, FaCalendarAlt, FaMapMarkerAlt, FaRecycle, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function DoorstepCollectionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    date: '',
    timeSlot: '',
    items: [],
    specialInstructions: '',
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemOptions = [
    { id: 'laptop', name: 'Laptop', icon: '💻' },
    { id: 'desktop', name: 'Desktop Computer', icon: '🖥️' },
    { id: 'monitor', name: 'Monitor', icon: '🖥️' },
    { id: 'printer', name: 'Printer', icon: '🖨️' },
    { id: 'phone', name: 'Mobile Phone', icon: '📱' },
    { id: 'tablet', name: 'Tablet', icon: '📱' },
    { id: 'tv', name: 'Television', icon: '📺' },
    { id: 'appliance', name: 'Small Appliance', icon: '🔌' },
    { id: 'battery', name: 'Batteries', icon: '🔋' },
    { id: 'other', name: 'Other Electronics', icon: '🔌' },
  ];

  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemToggle = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && selectedItems.length === 0) {
      alert('Please select at least one item for collection');
      return;
    }
    
    if (step === 2) {
      // Validate date and time slot
      if (!formData.date || !formData.timeSlot) {
        alert('Please select a date and time slot');
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        date: '',
        timeSlot: '',
        items: [],
        specialInstructions: '',
      });
      setSelectedItems([]);
      
      // Scroll to top
      window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-white/80 hover:text-white transition-colors"
              aria-label="Go back"
            >
              <FaArrowLeft className="h-6 w-6" />
            </button>
            <div className="bg-green-600 rounded-full p-3 mr-4">
              <FaTruck className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Doorstep Collection</h1>
              <p className="mt-2 text-green-100">
                Schedule a convenient pickup for your e-waste items directly from your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                <FaRecycle className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Select Items</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                <FaCalendarAlt className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Schedule</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Details</span>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaCheck className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pickup Scheduled Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for scheduling a doorstep collection. We'll send you a confirmation email with all the details.
              Our team will arrive at your location on the scheduled date and time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="bg-green-600 text-white hover:bg-green-500 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Return to Dashboard
              </Link>
              <Link
                href="/activity"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View My Activity
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Select Items */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Items for Collection</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {itemOptions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleItemToggle(item.id)}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedItems.includes(item.id)
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{item.icon}</div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              {selectedItems.includes(item.id) && (
                                <div className="text-xs text-green-600 mt-1">Selected</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mb-6">
                      <p>
                        <strong>Note:</strong> For large items or bulk collections, please specify in the special instructions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Schedule */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule Your Pickup</h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date*
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time Slot*
                        </label>
                        <select
                          id="timeSlot"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                          Special Instructions (Optional)
                        </label>
                        <textarea
                          id="specialInstructions"
                          name="specialInstructions"
                          value={formData.specialInstructions}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Any specific instructions for our collection team..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact & Address Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address*
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                      <h3 className="font-medium text-gray-900 mb-2">Collection Summary</h3>
                      <div className="text-sm text-gray-600">
                        <p><strong>Items:</strong> {selectedItems.map(id => itemOptions.find(item => item.id === id)?.name).join(', ')}</p>
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Time:</strong> {formData.timeSlot}</p>
                        {formData.specialInstructions && (
                          <p><strong>Special Instructions:</strong> {formData.specialInstructions}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaArrowLeft className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-green-600 text-white rounded-lg transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-500'
                      }`}
                    >
                      {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Information Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">How Doorstep Collection Works</h2>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
              Our doorstep collection service makes recycling e-waste convenient and hassle-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule a Pickup</h3>
              <p className="text-gray-600">
                Select your items, choose a convenient date and time, and provide your address details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Your Items</h3>
              <p className="text-gray-600">
                Gather your e-waste items and keep them ready for collection. Ensure they are accessible for our team.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Collect & Recycle</h3>
              <p className="text-gray-600">
                Our team will arrive at your doorstep, collect your e-waste, and ensure it's recycled responsibly.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              For bulk collections or business pickups, please contact our customer service.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Contact Us
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 