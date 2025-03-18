"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRecycle, FaAward, FaHandshake, FaLeaf } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image 
            src="/about-hero.jpg" 
            alt="About EcoNirvana" 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h1>
            <p className="text-xl mb-8 text-blue-100">
              We're on a mission to create a sustainable future through responsible e-waste recycling and innovative environmental solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, EcoNirvana began with a simple mission: to address the growing problem of electronic waste in our communities. What started as a small operation has grown into a leading e-waste recycling company serving individuals and businesses across the country.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our founder, Jane Smith, recognized the environmental impact of improperly disposed electronics and set out to create a solution that would not only protect our planet but also recover valuable resources from discarded devices.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to have recycled over 5 million pounds of e-waste, diverting harmful materials from landfills and recovering precious metals and components for reuse in new products.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/our-story.jpg" 
                  alt="EcoNirvana facility" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're guided by a commitment to environmental sustainability, ethical business practices, and community service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRecycle className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Environmental Stewardship</h3>
              <p className="text-gray-600">
                We're committed to protecting our planet through responsible recycling practices and zero landfill policies.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaAward className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Excellence & Integrity</h3>
              <p className="text-gray-600">
                We hold ourselves to the highest standards in all aspects of our operations, from customer service to recycling processes.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Partnership</h3>
              <p className="text-gray-600">
                We believe in working together with communities, businesses, and individuals to create a more sustainable future.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLeaf className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek new and better ways to recycle e-waste, recover resources, and reduce environmental impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals leading our mission to transform e-waste recycling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-64 relative">
                <Image 
                  src="/team-member-1.jpg" 
                  alt="Jane Smith - Founder & CEO" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">Jane Smith</h3>
                <p className="text-blue-600 mb-4">Founder & CEO</p>
                <p className="text-gray-600">
                  With over 20 years of experience in environmental sustainability, Jane leads our company's vision and strategy.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-64 relative">
                <Image 
                  src="/team-member-2.jpg" 
                  alt="Michael Johnson - Operations Director" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">Michael Johnson</h3>
                <p className="text-blue-600 mb-4">Operations Director</p>
                <p className="text-gray-600">
                  Michael oversees our recycling facilities and ensures all processes meet the highest environmental standards.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-64 relative">
                <Image 
                  src="/team-member-3.jpg" 
                  alt="Sarah Chen - Sustainability Director" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">Sarah Chen</h3>
                <p className="text-blue-600 mb-4">Sustainability Director</p>
                <p className="text-gray-600">
                  Sarah leads our sustainability initiatives and develops partnerships with organizations committed to environmental protection.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Impact Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-8 md:mb-0 order-2 md:order-1"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/impact.jpg" 
                  alt="EcoNirvana Impact" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
              <p className="text-lg text-gray-600 mb-6">
                At EcoNirvana, we measure our success not just in business growth, but in our positive impact on the environment and communities we serve.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="text-3xl font-bold text-blue-600">5M+</h3>
                  <p className="text-gray-600">Pounds of e-waste recycled</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
                  <p className="text-gray-600">Trees planted</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
                  <p className="text-gray-600">Customers served</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <h3 className="text-3xl font-bold text-blue-600">100%</h3>
                  <p className="text-gray-600">Landfill diversion</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex md:items-center p-8 md:p-12">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Join us in our mission
                </h2>
                <p className="text-blue-100">
                  Ready to make a difference? Discover how you can contribute to a more sustainable future with EcoNirvana.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
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