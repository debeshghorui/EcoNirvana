"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import BackButton from '@/components/layout/BackButton';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Environmental Impact of E-Waste",
    excerpt: "Electronic waste is one of the fastest-growing waste streams globally. Learn about its environmental impact and why proper recycling is crucial.",
    date: "May 15, 2023",
    author: "Jane Smith",
    category: "Environmental",
    image: "/blog/blog1.jpg",
    slug: "environmental-impact-of-ewaste"
  },
  {
    id: 2,
    title: "How to Prepare Your Devices for Recycling",
    excerpt: "Before recycling your electronic devices, it's important to properly prepare them. Follow these steps to ensure your data is secure and your devices are ready for recycling.",
    date: "April 22, 2023",
    author: "Michael Johnson",
    category: "Tips & Guides",
    image: "/blog/blog2.jpg",
    slug: "prepare-devices-for-recycling"
  },
  {
    id: 3,
    title: "The Business Benefits of Corporate E-Waste Recycling Programs",
    excerpt: "Implementing a corporate e-waste recycling program isn't just good for the environment—it's good for business too. Discover the many benefits for your company.",
    date: "March 10, 2023",
    author: "Sarah Chen",
    category: "Business",
    image: "/blog/blog3.jpg",
    slug: "business-benefits-of-ewaste-recycling"
  },
  {
    id: 4,
    title: "E-Waste Recycling Laws and Regulations: What You Need to Know",
    excerpt: "Electronic waste disposal is regulated by various laws at the federal, state, and local levels. Learn about the key regulations that affect how you should dispose of your e-waste.",
    date: "February 28, 2023",
    author: "David Wilson",
    category: "Regulations",
    image: "/blog/blog4.jpg",
    slug: "ewaste-recycling-laws-regulations"
  },
  {
    id: 5,
    title: "The Circular Economy: Giving New Life to Old Electronics",
    excerpt: "The circular economy model aims to keep products and materials in use for as long as possible. Discover how e-waste recycling plays a crucial role in this sustainable approach.",
    date: "January 15, 2023",
    author: "Emily Rodriguez",
    category: "Sustainability",
    image: "/blog/blog6.jpg",
    slug: "circular-economy-electronics"
  },
  {
    id: 6,
    title: "Data Security and E-Waste: Protecting Your Information",
    excerpt: "When disposing of electronic devices, data security is a major concern. Learn how professional e-waste recycling services ensure your sensitive information is protected.",
    date: "December 5, 2022",
    author: "Michael Johnson",
    category: "Data Security",
    image: "/blog/blog5.jpg",
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
  const router = useRouter();

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
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="/green-globe.jpg"
            alt="Blog & Resources" 
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="mix-blend-overlay opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10">
          <BackButton 
            destination="/dashboard" 
            label="Back"
            className="mb-4 flex items-center text-white hover:text-green-200 transition-colors"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Resources</h1>
            <p className="text-xl mb-8 text-green-50 max-w-2xl mx-auto">
              Stay informed about e-waste recycling, sustainability practices, and industry news.
            </p>
          </motion.div>
        </div>
        {/* Wave divider */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Search and Filter */}
              <div className="mb-12 bg-gray-50 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog Articles</h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-500 shadow-sm"
                      suppressHydrationWarning
                    />
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="flex-shrink-0">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 bg-white shadow-sm font-medium"
                      suppressHydrationWarning
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
                  <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <p className="text-gray-700 text-lg">No articles found matching your criteria. Try a different search term or category.</p>
                  </div>
                ) : (
                  <p className="text-gray-700 font-medium">Showing {filteredPosts.length} of {blogPosts.length} articles</p>
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
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="h-52 relative">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white shadow-sm">
                          <FaTag className="mr-1 h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <FaCalendarAlt className="mr-2 h-3 w-3" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <FaUser className="mr-2 h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">{post.title}</h2>
                      </Link>
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="text-green-600 hover:text-green-700 font-medium inline-flex items-center mt-2 group"
                      >
                        Read more
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-24 space-y-8">
                {/* About the Blog */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About Our Blog</h3>
                  <p className="text-gray-700 mb-4">
                    Welcome to the EcoNirvana blog, your source for information about e-waste recycling, sustainability practices, and industry news.
                  </p>
                  <p className="text-gray-700">
                    Our team of experts shares insights, tips, and the latest developments to help you make informed decisions about electronic waste management.
                  </p>
                </div>
                
                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          suppressHydrationWarning
                          className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                            selectedCategory === category
                              ? 'bg-green-100 text-green-800 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <FaTag className="mr-2 h-4 w-4" />
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-white mb-4">
                    Stay up-to-date with our latest articles, events, and recycling tips.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 border border-green-500 bg-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-green-200 text-white"
                        suppressHydrationWarning
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-white text-green-700 hover:bg-green-50 px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
                      suppressHydrationWarning
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-gray-50 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Recycle Your E-Waste?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Put the knowledge you've gained into action. Recycle your electronic waste responsibly with EcoNirvana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services" 
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 inline-block shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Our Services
              </Link>
              <Link 
                href="/locations" 
                className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 inline-block shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5"
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