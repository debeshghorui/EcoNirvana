"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaShieldAlt, FaCheck, FaInfoCircle, FaLock, FaRecycle, FaFileAlt, FaTools } from 'react-icons/fa';

export default function DataDestructionPage() {
  const router = useRouter();
  const [showFaq, setShowFaq] = useState<number | null>(null);
  
  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    if (showFaq === index) {
      setShowFaq(null);
    } else {
      setShowFaq(index);
    }
  };
  
  // FAQ data
  const faqs = [
    {
      question: "Why is data destruction important?",
      answer: "When you dispose of electronic devices, your personal data can remain on storage media even after deletion. This data can be recovered using specialized tools, potentially leading to identity theft, financial fraud, or privacy breaches. Proper data destruction ensures your sensitive information is permanently and irretrievably removed."
    },
    {
      question: "What methods do you use for data destruction?",
      answer: "We employ multiple industry-standard methods including secure data wiping that meets DoD 5220.22-M standards, degaussing for magnetic media, and physical destruction for devices that cannot be wiped. All processes are documented and certified to ensure compliance with privacy regulations."
    },
    {
      question: "Is your data destruction service certified?",
      answer: "Yes, our data destruction services are certified and comply with NIST 800-88 guidelines, GDPR, HIPAA, and other relevant data protection standards. We provide a Certificate of Data Destruction for each device processed, giving you documented proof that your data has been properly destroyed."
    },
    {
      question: "What types of devices can you process?",
      answer: "We can securely destroy data from virtually any electronic storage device including hard drives, SSDs, smartphones, tablets, laptops, servers, USB drives, memory cards, and more. Our specialized equipment can handle both consumer and enterprise-grade storage media."
    },
    {
      question: "How can I prepare my devices for data destruction?",
      answer: "Before bringing in your devices, we recommend backing up any data you wish to keep, signing out of accounts, and removing any passwords or security features if possible. However, if you're unable to do this, our technicians can assist you with the process."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push('/dashboard')}
              className="mr-4 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold">Secure Data Destruction Services</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Protect your privacy and prevent identity theft with our professional data destruction services.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:flex-1 p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <FaShieldAlt className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Why Data Security Matters</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                When recycling electronic devices, your personal data can remain on storage media even after standard deletion. 
                This data can be recovered using specialized tools, potentially leading to identity theft, financial fraud, or privacy breaches.
              </p>
              
              <p className="text-gray-600 mb-6">
                At EcoRecycle, we take your data security seriously. Our certified data destruction services ensure that all personal 
                information is permanently and irretrievably removed from your devices before recycling.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 font-medium">Certified data wiping to DoD standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 font-medium">Physical destruction for non-erasable media</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 font-medium">Certificate of destruction provided</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 font-medium">Compliant with privacy regulations</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Schedule Data Destruction
                </Link>
              </div>
            </div>
            
            <div className="md:flex-1 bg-blue-50 p-6 md:p-8 flex items-center justify-center">
              <div className="max-w-md">
                <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <FaInfoCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Did You Know?</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Simply deleting files or formatting a drive doesn't actually remove your data. It only removes the reference to the file location, 
                    leaving the actual data intact and recoverable with the right tools.
                  </p>
                  <p className="text-gray-600">
                    A 2019 study found that over 40% of second-hand devices still contained personally identifiable information from their previous owners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Process */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Data Destruction Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a rigorous, multi-step process to ensure your data is completely and permanently destroyed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500"
            >
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <FaLock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Secure Collection</h3>
              <p className="text-gray-600">
                Your devices are collected and transported in secure, locked containers. Chain of custody is maintained throughout the process.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500"
            >
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <FaTools className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Data Destruction</h3>
              <p className="text-gray-600">
                Depending on the device type, we use secure wiping, degaussing, or physical destruction to permanently remove all data.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500"
            >
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <FaFileAlt className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Certification</h3>
              <p className="text-gray-600">
                You receive a Certificate of Data Destruction with details of the devices processed and methods used.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 text-blue-700">
              <FaRecycle className="h-5 w-5 mr-2" />
              <span className="font-medium">After data destruction, devices are responsibly recycled</span>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg
                      className={`h-5 w-5 text-gray-500 transform ${showFaq === index ? 'rotate-180' : ''} transition-transform duration-200`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showFaq === index && (
                    <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Protect Your Data?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Schedule a data destruction service today or drop off your devices at any of our locations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Schedule Service
              </Link>
              <Link 
                href="/locations" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Find Drop-off Locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 