"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaGraduationCap, 
  FaBook, 
  FaVideo, 
  FaFileAlt,
  FaDownload,
  FaChalkboardTeacher,
  FaRecycle,
  FaLeaf,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaSearch
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

// Mock data for educational resources
const educationalResources = [
  {
    id: 'guide-1',
    title: 'E-Waste 101: Understanding Electronic Waste',
    type: 'guide',
    description: "Learn about what constitutes e-waste, why it's harmful, and the basics of responsible disposal.",
    icon: FaBook,
    downloadable: true,
    length: '12 pages'
  },
  {
    id: 'guide-2',
    title: 'The Environmental Impact of E-Waste',
    type: 'guide',
    description: 'Discover how improper e-waste disposal affects our environment and what we can do to minimize harm.',
    icon: FaLeaf,
    downloadable: true,
    length: '15 pages'
  },
  {
    id: 'video-1',
    title: 'Inside an E-Waste Recycling Facility',
    type: 'video',
    description: 'Take a virtual tour of our state-of-the-art recycling facility and see how we process e-waste.',
    icon: FaVideo,
    duration: '8:24'
  },
  {
    id: 'video-2',
    title: 'How to Prepare Your Devices for Recycling',
    type: 'video',
    description: 'Step-by-step instructions on backing up and wiping your data before recycling electronic devices.',
    icon: FaVideo,
    duration: '5:47'
  },
  {
    id: 'infographic-1',
    title: 'E-Waste by the Numbers',
    type: 'infographic',
    description: 'Visual representation of global e-waste statistics and the positive impact of recycling.',
    icon: FaFileAlt,
    downloadable: true
  },
  {
    id: 'toolkit-1',
    title: 'Community E-Waste Drive Toolkit',
    type: 'toolkit',
    description: 'Everything you need to organize an e-waste collection event in your community or workplace.',
    icon: FaChalkboardTeacher,
    downloadable: true,
    length: '28 pages'
  }
];

// Mock data for FAQs
const faqs = [
  {
    question: 'What is considered e-waste?',
    answer: 'Electronic waste, or e-waste, includes discarded electronic devices and components such as computers, smartphones, tablets, TVs, printers, keyboards, mice, cables, batteries, and other electronic equipment that has reached the end of its useful life.'
  },
  {
    question: 'Why is e-waste harmful to the environment?',
    answer: "E-waste contains toxic materials like lead, mercury, cadmium, and flame retardants that can leach into soil and water when improperly disposed of in landfills. Additionally, valuable resources like gold, silver, copper, and rare earth elements are lost when e-waste isn't recycled properly."
  },
  {
    question: 'How should I prepare my devices for recycling?',
    answer: 'Before recycling electronic devices, you should: 1) Back up any important data, 2) Sign out of all accounts, 3) Perform a factory reset to wipe personal data, 4) Remove any removable batteries (they may need to be recycled separately), and 5) Remove any memory cards or SIM cards if applicable.'
  },
  {
    question: 'What happens to my device after I recycle it?',
    answer: 'After collection, devices are sorted and evaluated for potential reuse. Devices that can be refurbished are repaired and resold. Those that cannot be reused are disassembled, with hazardous components safely removed and valuable materials like metals recovered through specialized processes. The remaining materials are responsibly recycled.'
  },
  {
    question: 'Can I get a tax deduction for donating electronics?',
    answer: 'In many countries, including the United States, you may be eligible for a tax deduction when donating working electronic devices to qualified charitable organizations. Be sure to get a receipt for your donation and consult with a tax professional about deduction eligibility.'
  }
];

export default function EducationPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Filter resources based on search term and selected type
  const filteredResources = educationalResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  // Handle resource download
  const handleDownload = (resourceId: string) => {
    // In a real app, this would trigger a download
    console.log(`Downloading resource: ${resourceId}`);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaGraduationCap className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading educational resources...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Educational Resources</h1>
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
          className="mb-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="p-6 md:p-8 md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Learn About E-Waste Recycling</h2>
              <p className="text-green-100 text-lg mb-6">
                Explore our collection of educational resources to learn about the importance of e-waste recycling, how to prepare your devices, and the positive impact you can make on the environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaBook className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Guides & Articles</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaVideo className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Videos</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaFileAlt className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Infographics</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-white/10 flex items-center justify-center p-6">
              <div className="text-center">
                <FaGraduationCap className="h-20 w-20 text-white mx-auto mb-4" />
                <p className="text-white font-medium">Knowledge is the first step to sustainable action</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedType === 'all' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedType('guide')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedType === 'guide' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Guides
                  </button>
                  <button
                    onClick={() => setSelectedType('video')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedType === 'video' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Videos
                  </button>
                  <button
                    onClick={() => setSelectedType('infographic')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedType === 'infographic' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Infographics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resources Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Educational Resources</h2>
          
          {filteredResources.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <FaSearch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mr-4">
                        <resource.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-1">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {'duration' in resource ? (
                          <span className="flex items-center">
                            <FaVideo className="mr-1 h-3 w-3" />
                            {resource.duration}
                          </span>
                        ) : 'length' in resource ? (
                          <span className="flex items-center">
                            <FaFileAlt className="mr-1 h-3 w-3" />
                            {resource.length}
                          </span>
                        ) : null}
                      </div>
                      
                      {'downloadable' in resource && resource.downloadable ? (
                        <button
                          onClick={() => handleDownload(resource.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaDownload className="mr-1 h-3 w-3" />
                          Download
                        </button>
                      ) : resource.type === 'video' ? (
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaVideo className="mr-1 h-3 w-3" />
                          Watch
                        </button>
                      ) : (
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaExternalLinkAlt className="mr-1 h-3 w-3" />
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                  >
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                    <span className={`ml-6 flex-shrink-0 flex items-center text-gray-400 transition-transform duration-200 ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`}>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-green-50 rounded-xl shadow-sm overflow-hidden border border-green-100">
          <div className="p-6 md:p-8 text-center">
            <FaRecycle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Start Recycling?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Now that you've learned about e-waste recycling, take the next step and start recycling your electronic devices today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/recycle/drop-off"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Find Drop-off Locations
              </Link>
              <Link
                href="/recycle/schedule-pickup"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Schedule a Pickup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 