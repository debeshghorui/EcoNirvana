"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaRecycle, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBox, 
  FaTruck, 
  FaLeaf, 
  FaMobileAlt, 
  FaLaptop, 
  FaDesktop, 
  FaQuestion,
  FaCheckCircle,
  FaInfoCircle,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

// Mock data for recycling options
const recyclingOptions = [
  {
    id: 'drop-off',
    title: 'Drop Off',
    description: 'Bring your e-waste to one of our collection centers',
    icon: FaMapMarkerAlt,
    steps: [
      'Find a collection center near you',
      'Bring your e-waste to the center during operating hours',
      'Receive points instantly upon drop-off'
    ]
  },
  {
    id: 'schedule-pickup',
    title: 'Schedule Pickup',
    description: 'We\'ll come to your location to collect your e-waste',
    icon: FaCalendarAlt,
    steps: [
      'Schedule a convenient pickup time',
      'Prepare your e-waste for collection',
      'Our team will pick up your items and credit your points'
    ]
  },
  {
    id: 'mail-in',
    title: 'Mail In',
    description: 'Request a shipping label and send your e-waste to us',
    icon: FaBox,
    steps: [
      'Request a free shipping label',
      'Package your e-waste securely',
      'Drop off at any shipping location',
      'Receive points once we process your items'
    ]
  },
  {
    id: 'business',
    title: 'Business Collection',
    description: 'Special service for businesses with large volumes',
    icon: FaTruck,
    steps: [
      'Contact our business services team',
      'Schedule a bulk collection',
      'We\'ll handle the logistics and provide documentation',
      'Earn points or receive tax deduction documentation'
    ]
  },
  {
    id: 'education',
    title: 'Educational Resources',
    description: 'Learn about e-waste recycling and its impact',
    icon: FaGraduationCap,
    steps: [
      'Access guides, videos, and infographics',
      'Learn about the environmental impact of e-waste',
      'Discover how to prepare your devices for recycling',
      'Share resources with friends and family'
    ]
  }
];

// Accepted items with point values
const acceptedItems = [
  {
    category: 'Small Electronics',
    points: 30,
    examples: 'Smartphones, tablets, e-readers, small gadgets',
    icon: FaMobileAlt
  },
  {
    category: 'Medium Electronics',
    points: 50,
    examples: 'Laptops, monitors, printers, small appliances',
    icon: FaLaptop
  },
  {
    category: 'Large Electronics',
    points: 100,
    examples: 'Desktop computers, TVs, servers, large appliances',
    icon: FaDesktop
  }
];

// FAQ data
const faqs = [
  {
    question: 'What items do you accept for recycling?',
    answer: 'We accept most electronic devices including computers, laptops, monitors, smartphones, tablets, printers, TVs, and small household electronics. We also accept accessories like keyboards, mice, cables, and chargers.'
  },
  {
    question: 'How do I earn points for recycling?',
    answer: 'You earn points based on the type and size of electronics you recycle. Small electronics like smartphones earn 30 points, medium items like laptops earn 50 points, and large items like TVs earn 100 points. Points are credited to your account after we receive and process your items.'
  },
  {
    question: 'What happens to my personal data?',
    answer: 'We take data security seriously. We recommend removing personal data from your devices before recycling. We also offer secure data destruction services to ensure your information is permanently erased before recycling.'
  },
  {
    question: 'How long does it take to receive my points?',
    answer: 'For drop-offs, points are credited instantly. For pickups, points are usually credited within 24 hours. For mail-in recycling, points are credited within 3-5 business days after we receive your package.'
  },
  {
    question: 'Can I track my recycling history?',
    answer: 'Yes, you can view your complete recycling history in the Activity section of your account. This shows all items you\'ve recycled, points earned, and environmental impact.'
  }
];

export default function RecyclePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
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
              <FaRecycle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading recycling options...</p>
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
              onClick={() => router.back()}
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Start Recycling</h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="p-6 md:p-8 md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Recycle Your E-Waste and Earn Rewards</h2>
              <p className="text-green-100 text-lg mb-6">
                Turn your old electronics into rewards while helping the environment. Choose how you want to recycle and start earning points today!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaLeaf className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Reduce landfill waste</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaRecycle className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Conserve resources</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaCheckCircle className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Earn reward points</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-white/10 flex items-center justify-center p-6">
              <div className="text-center">
                <FaRecycle className="h-20 w-20 text-white mx-auto mb-4" />
                <p className="text-white font-medium">Join thousands of others making a difference</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Recycling Options */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose How to Recycle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recyclingOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer border-2 ${
                  selectedOption === option.id ? 'border-green-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedOption(option.id === selectedOption ? null : option.id)}
              >
                <div className="p-6">
                  <div className="bg-green-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                    <option.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  
                  <button
                    className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-sm"
                  >
                    {selectedOption === option.id ? 'Hide details' : 'View details'}
                    {selectedOption === option.id ? (
                      <FaChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <FaChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Expanded details */}
                {selectedOption === option.id && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">How it works:</h4>
                      <ol className="space-y-2">
                        {option.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                      
                      <div className="mt-4">
                        <Link
                          href={`/recycle/${option.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {option.id === 'drop-off' ? 'Find locations' : 
                           option.id === 'schedule-pickup' ? 'Schedule now' :
                           option.id === 'mail-in' ? 'Request label' : 
                           option.id === 'business' ? 'Contact us' :
                           'View resources'}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Accepted Items & Points */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">What You Can Recycle & Points You'll Earn</h2>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {acceptedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-5"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full p-3 mr-3">
                        <item.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
                    </div>
                    <div className="text-green-600 font-bold text-xl mb-2">+{item.points} points</div>
                    <p className="text-gray-600 text-sm">{item.examples}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-start">
                  <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Not sure if your item qualifies? No problem! Bring it in anyway, and we'll help you determine if it can be recycled. We accept most electronic devices and accessories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">The Recycling Process</h2>
          
          <div className="relative">
            {/* Process line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-200 transform -translate-x-1/2 z-0"></div>
            
            <div className="space-y-12 relative z-10">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Choose Your Recycling Method</h3>
                  <p className="text-gray-600">
                    Select the most convenient way to recycle your e-waste: drop off at a collection center, schedule a pickup, mail in your items, or arrange a business collection.
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="bg-green-600 rounded-full p-4 w-12 h-12 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-center">
                      <FaRecycle className="h-16 w-16 text-green-500 opacity-50" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 md:pr-12 hidden md:block">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-center">
                      <FaLeaf className="h-16 w-16 text-green-500 opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="bg-green-600 rounded-full p-4 w-12 h-12 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Prepare Your Devices</h3>
                  <p className="text-gray-600">
                    Back up your data and perform a factory reset on your devices. Remove batteries if possible and gather any accessories you want to recycle.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Complete the Recycling</h3>
                  <p className="text-gray-600">
                    Drop off, have your items picked up, or mail them in. We'll take care of the rest, ensuring your e-waste is properly recycled.
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="bg-green-600 rounded-full p-4 w-12 h-12 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-center">
                      <FaBox className="h-16 w-16 text-green-500 opacity-50" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/2 md:pr-12 hidden md:block">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-center">
                      <FaCheckCircle className="h-16 w-16 text-green-500 opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="bg-green-600 rounded-full p-4 w-12 h-12 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Earn Your Rewards</h3>
                  <p className="text-gray-600">
                    Receive points based on the items you recycle. Points will be credited to your account and can be redeemed for eco-friendly products and other rewards.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="ml-2">
                        {expandedFaq === index ? (
                          <FaChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FaChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </span>
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">Still have questions about recycling with us?</p>
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
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Recycling?</h2>
            <p className="text-green-100 text-lg mb-6 max-w-3xl mx-auto">
              Choose your preferred recycling method above and take the first step toward a more sustainable future while earning rewards.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 