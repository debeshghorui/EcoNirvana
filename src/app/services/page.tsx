"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRecycle, FaBuilding, FaShieldAlt, FaTruck, FaUsers, FaLeaf } from 'react-icons/fa';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image 
            src="/services-hero.jpg" 
            alt="E-waste recycling services" 
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our E-Waste Recycling Services</h1>
            <p className="text-xl mb-8 text-green-100">
              We offer comprehensive e-waste recycling solutions for individuals, businesses, and organizations of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive E-Waste Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From individual electronics to large-scale corporate IT asset disposition, we have the expertise and facilities to handle all your e-waste recycling needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src="/residential-recycling.jpg" 
                  alt="Residential E-Waste Recycling" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaRecycle className="text-green-600 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Residential Recycling</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Convenient recycling solutions for households. Safely dispose of computers, phones, TVs, and other electronic devices.
                </p>
                <Link 
                  href="/services/residential" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src="/business-recycling.jpg" 
                  alt="Business E-Waste Solutions" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaBuilding className="text-green-600 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Business Solutions</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Tailored recycling programs for businesses of all sizes. Includes IT asset disposition, compliance reporting, and more.
                </p>
                <Link 
                  href="/services/business" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src="/data-destruction.jpg" 
                  alt="Secure Data Destruction" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaShieldAlt className="text-green-600 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Data Destruction</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Secure data wiping and physical destruction services for hard drives and storage media, with certification.
                </p>
                <Link 
                  href="/services/data-destruction" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src="/pickup-services.jpg" 
                  alt="E-Waste Pickup Services" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaTruck className="text-green-600 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Pickup Services</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Convenient pickup services for both residential and commercial clients. Schedule a pickup at your convenience.
                </p>
                <Link 
                  href="/services/pickup" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src="/community-events.jpg" 
                  alt="Community E-Waste Events" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaUsers className="text-green-600 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Community Events</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We organize regular e-waste collection events in communities, making recycling accessible to everyone.
                </p>
                <Link 
                  href="/services/events" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Service 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <Image 
                  src="/zero-landfill.jpg" 
                  alt="Zero Landfill Policy" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaLeaf className="text-green-600 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Zero Landfill Policy</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our commitment to ensuring none of your e-waste ends up in landfills, with a focus on reuse and proper recycling.
                </p>
                <Link 
                  href="/services/zero-landfill" 
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Recycling Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a rigorous process to ensure all e-waste is handled responsibly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Collection</h3>
              <p className="text-gray-600">
                We collect e-waste through drop-offs, pickups, or community events. All items are logged and tracked throughout the process.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Processing</h3>
              <p className="text-gray-600">
                Items are sorted, data is securely destroyed, and devices are disassembled to separate valuable materials for recycling.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Recycling</h3>
              <p className="text-gray-600">
                Materials are sent to specialized facilities for recycling. We provide documentation and certificates for business clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Recycle Your E-Waste?</h2>
              <p className="text-xl text-green-100">
                Contact us today to schedule a pickup or drop-off, or learn more about our services.
              </p>
            </div>
            <div>
              <Link 
                href="/contact" 
                className="bg-white text-green-700 hover:bg-green-100 px-6 py-3 rounded-md font-medium text-lg transition-colors inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 