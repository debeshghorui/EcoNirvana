"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaShieldAlt, FaCheck, FaInfoCircle, FaLock, FaRecycle, FaFileAlt, FaTools, FaTrash, FaArrowRight } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Secure Data Destruction Services
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Protect your privacy and prevent identity theft with our professional data destruction services.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link 
                  href="/schedule-service"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-lg inline-flex items-center shadow-lg transition-all duration-300"
                >
                  Schedule Service
                  <FaArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="bg-blue-500 rounded-full p-8 shadow-xl">
                  <FaShieldAlt className="h-32 w-32 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3">
                  <FaCheck className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FaLock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Wiping</h3>
              <p className="text-gray-600">
                Military-grade data wiping that exceeds industry standards, making data recovery impossible.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FaTrash className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Physical Destruction</h3>
              <p className="text-gray-600">
                Complete physical destruction of storage devices for absolute data security.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <FaFileAlt className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Certification</h3>
              <p className="text-gray-600">
                Detailed certificates of destruction for your records and compliance requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Process</h2>
            <p className="text-xl text-gray-600 mt-4">
              We follow a rigorous process to ensure your data is completely and securely destroyed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Collection",
                description: "Secure pickup of your devices from your location"
              },
              {
                step: "2",
                title: "Inventory",
                description: "Detailed logging of all devices and storage media"
              },
              {
                step: "3",
                title: "Destruction",
                description: "Complete data wiping or physical destruction"
              },
              {
                step: "4",
                title: "Certification",
                description: "Documentation of the destruction process"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="absolute -top-4 -left-4 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Secure Your Data?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Schedule a pickup or drop-off for your secure data destruction needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/schedule-service"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
                >
                  Schedule Now
                </Link>
                <Link
                  href="/contact"
                  className="bg-blue-500 text-white hover:bg-blue-400 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 