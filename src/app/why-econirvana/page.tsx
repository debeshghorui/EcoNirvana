"use client";

import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaHandshake, FaGlobeAmericas, FaShieldAlt, FaTree } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function WhyEcoNirvanaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-3/5">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Why Choose EcoNirvana?
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover the unique benefits that make us the leading choice for e-waste recycling. With EcoNirvana, you're not just recycling - you're contributing to a sustainable future.
              </motion.p>
            </div>
            <motion.div 
              className="md:w-2/5 mt-10 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src="/images/why-econirvana.jpg"
                  alt="EcoNirvana Difference"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Benefits Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Unique Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At EcoNirvana, we've reimagined e-waste recycling to create a seamless experience that benefits you and the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Benefit 1 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaLeaf className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Eco-Conscious Process</h3>
              <p className="text-gray-600">
                Our zero-landfill policy ensures that 100% of materials are properly recycled or repurposed. Every component is carefully processed to minimize environmental impact.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Data Security Guarantee</h3>
              <p className="text-gray-600">
                Your privacy matters. We provide certified data destruction services that exceed industry standards, ensuring your personal information never falls into the wrong hands.
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaHandshake className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Reward Program</h3>
              <p className="text-gray-600">
                Get rewarded for doing good. Our unique points system gives you tangible benefits for every item you recycle, from discounts to exclusive partner offers.
              </p>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaGlobeAmericas className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Transparent Impact Tracking</h3>
              <p className="text-gray-600">
                See the difference you're making. Our dashboard shows you the exact environmental impact of your recycling efforts, from CO₂ saved to resources preserved.
              </p>
            </motion.div>

            {/* Benefit 5 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaRecycle className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comprehensive Solutions</h3>
              <p className="text-gray-600">
                From individuals to large corporations, we offer tailored recycling programs that adapt to your specific needs, with doorstep pickups and business integrations.
              </p>
            </motion.div>

            {/* Benefit 6 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaTree className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Initiatives</h3>
              <p className="text-gray-600">
                We give back through educational programs, community events, and environmental restoration projects, amplifying the positive impact of your recycling.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Compare</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how EcoNirvana stands out from traditional recycling services.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="grid grid-cols-3">
              <div className="col-span-1 bg-gray-50 p-6 border-r border-gray-200">
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-500 mb-6">Features</h3>
                    <ul className="space-y-8">
                      <li className="font-medium text-gray-700">Data Security</li>
                      <li className="font-medium text-gray-700">Reward System</li>
                      <li className="font-medium text-gray-700">Pickup Service</li>
                      <li className="font-medium text-gray-700">Impact Tracking</li>
                      <li className="font-medium text-gray-700">Zero Landfill</li>
                      <li className="font-medium text-gray-700">Certification</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 p-6 border-r border-gray-200">
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-blue-600 mb-6">EcoNirvana</h3>
                    <ul className="space-y-8">
                      <li className="text-green-600 font-medium">Military-grade wiping & destruction</li>
                      <li className="text-green-600 font-medium">Points for every item recycled</li>
                      <li className="text-green-600 font-medium">Convenient doorstep collection</li>
                      <li className="text-green-600 font-medium">Detailed personal dashboard</li>
                      <li className="text-green-600 font-medium">100% commitment</li>
                      <li className="text-green-600 font-medium">Full documentation provided</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 p-6 bg-gray-50">
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-500 mb-6">Traditional Services</h3>
                    <ul className="space-y-8">
                      <li className="text-gray-500">Basic or unavailable</li>
                      <li className="text-gray-500">Usually none</li>
                      <li className="text-gray-500">Limited or extra cost</li>
                      <li className="text-gray-500">Minimal or none</li>
                      <li className="text-gray-500">Not guaranteed</li>
                      <li className="text-gray-500">Often unavailable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex md:items-center md:justify-between p-8 md:p-12">
              <div className="md:w-3/5 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to experience the EcoNirvana difference?
                </h2>
                <p className="text-xl text-blue-100 mb-0">
                  Join thousands of eco-conscious individuals and businesses making a positive impact.
                </p>
              </div>
              <div className="md:w-2/5 md:text-right">
                <Link 
                  href="/signup" 
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 