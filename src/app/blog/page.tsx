"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Environmental Impact of E-Waste",
    excerpt: "Electronic waste is one of the fastest-growing waste streams globally. Learn about its environmental impact and why proper recycling is crucial.",
    date: "May 15, 2023",
    author: "Jane Smith",
    category: "Environmental",
    image: "/blog-ewaste-impact.jpg",
    slug: "environmental-impact-of-ewaste"
  },
  {
    id: 2,
    title: "How to Prepare Your Devices for Recycling",
    excerpt: "Before recycling your electronic devices, it's important to properly prepare them. Follow these steps to ensure your data is secure and your devices are ready for recycling.",
    date: "April 22, 2023",
    author: "Michael Johnson",
    category: "Tips & Guides",
    image: "/blog-prepare-devices.jpg",
    slug: "prepare-devices-for-recycling"
  },
  {
    id: 3,
    title: "The Business Benefits of Corporate E-Waste Recycling Programs",
    excerpt: "Implementing a corporate e-waste recycling program isn't just good for the environment—it's good for business too. Discover the many benefits for your company.",
    date: "March 10, 2023",
    author: "Sarah Chen",
    category: "Business",
    image: "/blog-business-benefits.jpg",
    slug: "business-benefits-of-ewaste-recycling"
  },
  {
    id: 4,
    title: "E-Waste Recycling Laws and Regulations: What You Need to Know",
    excerpt: "Electronic waste disposal is regulated by various laws at the federal, state, and local levels. Learn about the key regulations that affect how you should dispose of your e-waste.",
    date: "February 28, 2023",
    author: "David Wilson",
    category: "Regulations",
    image: "/blog-ewaste-laws.jpg",
    slug: "ewaste-recycling-laws-regulations"
  },
  {
    id: 5,
    title: "The Circular Economy: Giving New Life to Old Electronics",
    excerpt: "The circular economy model aims to keep products and materials in use for as long as possible. Discover how e-waste recycling plays a crucial role in this sustainable approach.",
    date: "January 15, 2023",
    author: "Emily Rodriguez",
    category: "Sustainability",
    image: "/blog-circular-economy.jpg",
    slug: "circular-economy-electronics"
  },
  {
    id: 6,
    title: "Data Security and E-Waste: Protecting Your Information",
    excerpt: "When disposing of electronic devices, data security is a major concern. Learn how professional e-waste recycling services ensure your sensitive information is protected.",
    date: "December 5, 2022",
    author: "Michael Johnson",
    category: "Data Security",
    image: "/blog-data-security.jpg",
    slug: "data-security-and-ewaste"
  }
];

// Categories
const categories = [
  "All",
  "Environmental",
  "Tips & Guides",
  "Business",
  "Regulations",
  "Sustainability",
  "Data Security"
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image 
            src="/blog-hero.jpg" 
            alt="EcoRecycle Blog" 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Resources</h1>
            <p className="text-xl mb-8 text-green-100">
              Stay informed about e-waste recycling, sustainability practices, and industry news.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Search and Filter */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  <div className="flex-shrink-0">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No articles found matching your criteria. Try a different search term or category.</p>
                  </div>
                ) : (
                  <p className="text-gray-600">Showing {filteredPosts.length} of {blogPosts.length} articles</p>
                )}
              </div>
              
              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-48 relative">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <FaUser className="mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-green-600 transition-colors">{post.title}</h2>
                      </Link>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <FaTag className="mr-1" />
                          {post.category}
                        </span>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                        >
                          Read more
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-24">
                {/* About the Blog */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About Our Blog</h3>
                  <p className="text-gray-600 mb-4">
                    Welcome to the EcoRecycle blog, your source for information about e-waste recycling, sustainability practices, and industry news.
                  </p>
                  <p className="text-gray-600">
                    Our team of experts shares insights, tips, and the latest developments to help you make informed decisions about electronic waste management.
                  </p>
                </div>
                
                {/* Categories */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === category
                              ? 'bg-green-100 text-green-800'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <FaTag className="mr-2" />
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Newsletter Signup */}
                <div className="bg-green-700 text-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-green-100 mb-4">
                    Stay up-to-date with our latest articles, events, and recycling tips.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 border border-green-600 bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-green-200 text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-white text-green-700 hover:bg-green-100 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Recycle Your E-Waste?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Put the knowledge you've gained into action. Recycle your electronic waste responsibly with EcoRecycle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services" 
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium text-lg transition-colors inline-block"
              >
                Our Services
              </Link>
              <Link 
                href="/locations" 
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-md font-medium text-lg transition-colors inline-block"
              >
                Find a Location
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 