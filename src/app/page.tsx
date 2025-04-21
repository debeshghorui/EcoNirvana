"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaRecycle, FaLeaf, FaShieldAlt, FaTruck, FaBuilding, FaUsers, FaArrowRight, FaMapMarkerAlt, FaCalendarAlt, FaQuestionCircle, FaHome, FaCertificate } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaRecycle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Only show landing page if user is not logged in
  return (
    <div className="min-h-screen">
      {/* Hero Section with Recycling Impact integration */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/green-globe.jpg"
            alt="Digital globe with green plant sprouts"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent"></div>

        {/* Content - Made longer with extra bottom padding (approximately 2cm more) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-28 md:pb-32 relative z-10 mt-16">
          <div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transforming <span className="text-green-400">Electronic Waste</span> Into a Sustainable Future
            </motion.h1>

            <motion.p
              className="text-xl mb-6 text-gray-300 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join our mission to reduce e-waste impact through responsible recycling.
              We ensure your devices are recycled ethically with zero landfill commitment.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/signup"
                className="bg-green-500 text-white hover:bg-green-400 px-6 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5"
              >
                Get Started <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 border-2 border-gray-700 hover:border-gray-600 px-6 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-0.5"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Find Drop-off Locations</h3>
              </div>
              <p className="text-gray-600 mb-4">Locate the nearest e-waste collection points in your area for convenient recycling.</p>
              <Link href="/locations" className="text-green-600 font-medium inline-flex items-center hover:text-green-700">
                Find locations <FaArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>

            <div className="bg-green-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaHome className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Doorstep Collection</h3>
              </div>
              <p className="text-gray-600 mb-4">Get your e-waste collected directly from your doorstep with our convenient collection service.</p>
              <Link href="/doorstep" className="text-green-600 font-medium inline-flex items-center hover:text-green-700">
                Book collection <FaArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>

            <div className="bg-green-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaCalendarAlt className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
              </div>
              <p className="text-gray-600 mb-4">Join our community e-waste collection events and help make a difference together.</p>
              <Link href="/events" className="text-green-600 font-medium inline-flex items-center hover:text-green-700">
                View events <FaArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>

            <div className="bg-green-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaQuestionCircle className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Take Our E-Waste Quiz</h3>
              </div>
              <p className="text-gray-600 mb-4">Test your knowledge about e-waste recycling and learn how to dispose of electronics properly.</p>
              <Link href="/quiz" className="text-green-600 font-medium inline-flex items-center hover:text-green-700">
                Start quiz <FaArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>

            <div className="bg-green-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaCertificate className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Recycling Certificates</h3>
              </div>
              <p className="text-gray-600 mb-4">Earn prestigious certificates by reaching recycling milestones. Get recognized for your environmental impact.</p>
              <Link href="/certificates" className="text-green-600 font-medium inline-flex items-center hover:text-green-700">
                View certificates <FaArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our E-Waste Solution?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive e-waste recycling solutions with a focus on environmental responsibility and data security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaRecycle className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Environmentally Responsible</h3>
              <p className="text-gray-600">
                Our recycling processes adhere to the highest environmental standards, ensuring minimal impact on our planet.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Data Destruction</h3>
              <p className="text-gray-600">
                We ensure complete and secure destruction of all data on your devices before recycling, protecting your privacy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaTruck className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Convenient Pickup</h3>
              <p className="text-gray-600">
                We offer pickup services for both residential and commercial clients, making recycling easy and hassle-free.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaBuilding className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Corporate Solutions</h3>
              <p className="text-gray-600">
                Tailored recycling programs for businesses of all sizes, including IT asset disposition and compliance reporting.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaLeaf className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Zero Landfill Policy</h3>
              <p className="text-gray-600">
                We're committed to ensuring none of your e-waste ends up in landfills, with a focus on reuse and proper recycling.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Events</h3>
              <p className="text-gray-600">
                We organize regular e-waste collection events in communities, making recycling accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud of our contribution to environmental sustainability through responsible e-waste recycling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">5M+</div>
              <p className="text-gray-700 font-medium">Pounds of E-Waste Recycled</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">10K+</div>
              <p className="text-gray-700 font-medium">Happy Customers</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-700 font-medium">Corporate Partners</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-700 font-medium">Zero Landfill Commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from individuals and businesses who have made a positive impact through our e-waste recycling services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"The pickup service was incredibly convenient. I had several old computers and phones that I didn't know what to do with, and they made the process so easy."</p>
              <div className="font-medium">
                <p className="text-gray-900">Sarah Johnson</p>
                <p className="text-gray-500 text-sm">Homeowner</p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"As a business, we needed a reliable partner for our IT asset disposition. Their corporate program has been excellent, with detailed reporting and secure data destruction."</p>
              <div className="font-medium">
                <p className="text-gray-900">Michael Chen</p>
                <p className="text-gray-500 text-sm">IT Director, TechCorp</p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"I organized an e-waste collection event for our community with their help. The team was professional, and it was amazing to see how much electronic waste we diverted from landfills."</p>
              <div className="font-medium">
                <p className="text-gray-900">Lisa Rodriguez</p>
                <p className="text-gray-500 text-sm">Community Organizer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Ready to Make a Difference?</h2>
              <p className="text-xl text-gray-600">
                Join our community of eco-conscious individuals and businesses. Start tracking your recycling impact today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-green-500 text-white hover:bg-green-400 px-6 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center shadow-lg shadow-green-500/20"
              >
                Sign Up Now <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="bg-white text-green-700 hover:bg-gray-100 border-2 border-green-500 px-6 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
