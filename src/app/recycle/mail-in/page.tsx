"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaBox, 
  FaPrint, 
  FaInfoCircle, 
  FaCheck,
  FaRecycle,
  FaEnvelope,
  FaTruck,
  FaDownload
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function MailInPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [itemCategories, setItemCategories] = useState({
    small: false,
    medium: false,
    large: false
  });
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [labelGenerated, setLabelGenerated] = useState(false);
  
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
  
  // Generate shipping label
  const generateLabel = () => {
    setLabelGenerated(true);
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
              <FaBox className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading mail-in recycling...</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Label Generated!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your shipping label has been generated and sent to your email. You can also download it below.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Next Steps</h3>
                <ol className="space-y-3 text-left">
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-600">Print the shipping label and attach it to your package</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-600">Package your e-waste securely in a box</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-600">Drop off at any shipping location or schedule a pickup</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-600">Receive points once we process your items (typically 3-5 business days after receipt)</p>
                  </li>
                </ol>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={generateLabel}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FaDownload className="mr-2" />
                  Download Shipping Label
                </button>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Go to Dashboard
                </Link>
              </div>
              
              {labelGenerated && (
                <div className="mt-6 text-sm text-green-600">
                  Shipping label downloaded successfully!
                </div>
              )}
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
            <h1 className="text-2xl font-bold text-gray-900">Mail-In Recycling</h1>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mail-In Recycling Program</h2>
            <p className="text-gray-600 mb-4">
              Our mail-in recycling program makes it easy to recycle your e-waste from anywhere. Simply request a free shipping label, package your items, and send them to us. We'll take care of the rest and credit your account with reward points.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <FaBox className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Free Shipping</h3>
                </div>
                <p className="text-sm text-gray-600">
                  We cover all shipping costs. Just print the label and drop off your package.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <FaRecycle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Earn Points</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Earn the same points as drop-off or pickup recycling methods.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <FaTruck className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Convenient</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Perfect for those who live far from our collection centers.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start">
                <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">What to send:</span> We accept most electronic devices including smartphones, tablets, laptops, computer accessories, and small electronics.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Size limits:</span> Items must fit in a standard shipping box. For larger items like TVs or large appliances, please use our pickup service instead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Request Shipping Label Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Request a Free Shipping Label</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Items Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">What Items Are You Sending?</h3>
                
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
                        <p className="text-sm text-gray-600">Laptops, small printers, small appliances</p>
                        <p className="text-sm text-green-600 mt-1">+50 points per item</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-4">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Note:</span> Large electronics (TVs, desktop computers, large appliances) cannot be sent through our mail-in program due to shipping restrictions. Please use our pickup service for these items.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Address Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={address.name}
                      onChange={(e) => setAddress({...address, name: e.target.value})}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={address.email}
                      onChange={(e) => setAddress({...address, email: e.target.value})}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">We'll send the shipping label to this email address.</p>
                  </div>
                  
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
                </div>
              </div>
              
              {/* Submission */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">How It Works</h3>
                <ol className="space-y-2">
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-600">Request a free shipping label (what you're doing now)</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-600">Print the label and attach it to your package</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-600">Drop off at any shipping location</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <p className="text-sm text-gray-600">Receive points once we process your items (3-5 business days)</p>
                  </li>
                </ol>
              </div>
              
              <button
                type="submit"
                disabled={!itemCategories.small && !itemCategories.medium || isSubmitting}
                className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  (!itemCategories.small && !itemCategories.medium) || isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaPrint className="mr-2" />
                    Generate Shipping Label
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What should I use to package my items?</h3>
                <p className="text-gray-600 text-sm">
                  Use a sturdy cardboard box and wrap each item individually with bubble wrap or newspaper. Make sure items don't move around inside the box to prevent damage during shipping.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">How long does it take to receive points?</h3>
                <p className="text-gray-600 text-sm">
                  Points are typically credited to your account within 3-5 business days after we receive and process your package. You'll receive an email notification when points are added.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What if I don't have a printer?</h3>
                <p className="text-gray-600 text-sm">
                  If you don't have access to a printer, you can have the label printed at most shipping locations, office supply stores, or local libraries for a small fee.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Is my data secure?</h3>
                <p className="text-gray-600 text-sm">
                  We recommend removing all personal data from your devices before sending them. While we perform secure data wiping on all devices we receive, it's best to protect your information by performing a factory reset first.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">Still have questions about our mail-in recycling program?</p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 