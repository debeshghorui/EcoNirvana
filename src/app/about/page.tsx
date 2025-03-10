"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRecycle, FaAward, FaHandshake, FaLeaf } from 'react-icons/fa';

export const metadata = {
  title: "About Us | EcoRecycle - E-Waste Recycling Solutions",
  description: "Learn about EcoRecycle's mission, values, and commitment to responsible e-waste recycling and environmental sustainability.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image 
            src="/about-hero.jpg" 
            alt="About EcoRecycle" 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoRecycle</h1>
            <p className="text-xl mb-8 text-green-100">
              We're on a mission to create a sustainable future through responsible e-waste recycling.
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
                Founded in 2010, EcoRecycle began with a simple mission: to address the growing problem of electronic waste in our communities. What started as a small operation has grown into a leading e-waste recycling company serving individuals and businesses across the country.
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
                  alt="EcoRecycle facility" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-24 bg-green-50">
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRecycle className="text-green-600 w-8 h-8" />
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaAward className="text-green-600 w-8 h-8" />
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="text-green-600 w-8 h-8" />
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLeaf className="text-green-600 w-8 h-8" />
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
                <p className="text-green-600 mb-4">Founder & CEO</p>
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
                <p className="text-green-600 mb-4">Operations Director</p>
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
                <p className="text-green-600 mb-4">Sustainability Director</p>
                <p className="text-gray-600">
                  Sarah leads our sustainability initiatives and develops partnerships with organizations committed to environmental protection.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We adhere to the highest industry standards and are proud to hold these certifications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="h-24 relative mb-4">
                <Image 
                  src="/certification-1.svg" 
                  alt="R2 Certification" 
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">R2 Certified</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="h-24 relative mb-4">
                <Image 
                  src="/certification-2.svg" 
                  alt="e-Stewards Certification" 
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">e-Stewards Certified</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="h-24 relative mb-4">
                <Image 
                  src="/certification-3.svg" 
                  alt="ISO 14001 Certification" 
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">ISO 14001 Certified</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="h-24 relative mb-4">
                <Image 
                  src="/certification-4.svg" 
                  alt="NAID AAA Certification" 
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">NAID AAA Certified</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us in Our Mission</h2>
              <p className="text-xl text-green-100">
                Partner with EcoRecycle to make a positive impact on our environment through responsible e-waste recycling.
              </p>
            </div>
            <div>
              <Link 
                href="/contact" 
                className="bg-white text-green-700 hover:bg-green-100 px-6 py-3 rounded-md font-medium text-lg transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 