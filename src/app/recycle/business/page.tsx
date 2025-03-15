"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaTruck, 
  FaBuilding, 
  FaInfoCircle, 
  FaCheck,
  FaRecycle,
  FaFileAlt,
  FaShieldAlt,
  FaUsers,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

// Mock data for business services
const businessServices = [
  {
    id: 'bulk-pickup',
    title: 'Bulk Pickup',
    description: "We'll come to your location and collect all your e-waste at once",
    icon: FaTruck,
    benefits: [
      'Convenient on-site collection',
      'Flexible scheduling options',
      'No heavy lifting required',
      'Available for any volume of e-waste'
    ]
  },
  {
    id: 'data-destruction',
    title: 'Secure Data Destruction',
    description: 'Certified data wiping and physical destruction services for sensitive data',
    icon: FaShieldAlt,
    benefits: [
      'DoD-compliant data wiping',
      'Physical destruction available',
      'Certificate of destruction provided',
      'Chain of custody documentation'
    ]
  },
  {
    id: 'documentation',
    title: 'Compliance Documentation',
    description: 'Comprehensive documentation for regulatory compliance',
    icon: FaFileAlt,
    benefits: [
      'Environmental compliance reports',
      'Asset disposition records',
      'Recycling certificates',
      'Tax deduction documentation'
    ]
  },
  {
    id: 'employee-program',
    title: 'Employee Recycling Program',
    description: "Set up a recycling program for your employees' personal e-waste",
    icon: FaUsers,
    benefits: [
      'Boost employee engagement',
      'Enhance corporate sustainability',
      'Easy implementation',
      'Educational resources provided'
    ]
  }
];

export default function BusinessPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: '',
    message: '',
    services: {
      bulkPickup: false,
      dataDestruction: false,
      documentation: false,
      employeeProgram: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (service: string) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [service]: !formData.services[service as keyof typeof formData.services]
      }
    });
  };
  
  // Show loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaBuilding className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading business services...</p>
        </div>
      </div>
    );
  }

  // Show completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for your interest in our business recycling services. One of our business solutions specialists will contact you within 1-2 business days to discuss your needs.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-6">
                <h3 className="font-medium text-gray-900 mb-4">What Happens Next?</h3>
                <ol className="space-y-3 text-left">
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-600">A business specialist will contact you to discuss your needs</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-600">We'll create a customized recycling plan for your business</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-600">Schedule your first pickup or service</p>
                  </li>
                  <li className="flex">
                    <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-600">Start earning rewards and making a positive environmental impact</p>
                  </li>
                </ol>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/services/data-destruction"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Learn About Data Security
                </Link>
              </div>
            </div>
          </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Business Recycling Solutions</h1>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sustainable E-Waste Solutions for Businesses</h2>
              <p className="text-green-100 text-lg mb-6">
                We offer comprehensive e-waste recycling services tailored to businesses of all sizes. From bulk pickups to secure data destruction, we make corporate sustainability easy and rewarding.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaRecycle className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Responsible recycling</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaShieldAlt className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Secure data handling</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <FaFileAlt className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Compliance documentation</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-white/10 flex items-center justify-center p-6">
              <div className="text-center">
                <FaBuilding className="h-20 w-20 text-white mx-auto mb-4" />
                <p className="text-white font-medium">Join hundreds of businesses making a difference</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Services Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Our Business Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mr-4">
                      <service.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Business Recycling Services</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mb-8">
                {/* Company Information */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                    <select
                      id="employeeCount"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501+">501+</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                {/* Services Needed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Services Needed (Select all that apply)</label>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="bulkPickup"
                          name="bulkPickup"
                          type="checkbox"
                          checked={formData.services.bulkPickup}
                          onChange={() => handleCheckboxChange('bulkPickup')}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="bulkPickup" className="font-medium text-gray-700">Bulk Pickup</label>
                        <p className="text-gray-500">On-site collection of multiple devices</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="dataDestruction"
                          name="dataDestruction"
                          type="checkbox"
                          checked={formData.services.dataDestruction}
                          onChange={() => handleCheckboxChange('dataDestruction')}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="dataDestruction" className="font-medium text-gray-700">Secure Data Destruction</label>
                        <p className="text-gray-500">Certified data wiping and physical destruction</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="documentation"
                          name="documentation"
                          type="checkbox"
                          checked={formData.services.documentation}
                          onChange={() => handleCheckboxChange('documentation')}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="documentation" className="font-medium text-gray-700">Compliance Documentation</label>
                        <p className="text-gray-500">Certificates and reports for regulatory compliance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="employeeProgram"
                          name="employeeProgram"
                          type="checkbox"
                          checked={formData.services.employeeProgram}
                          onChange={() => handleCheckboxChange('employeeProgram')}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="employeeProgram" className="font-medium text-gray-700">Employee Recycling Program</label>
                        <p className="text-gray-500">Set up a recycling program for employee personal e-waste</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Tell us about your e-waste recycling needs, volume of devices, timeline, etc."
                  />
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                <div className="flex items-start">
                  <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    After submitting this form, one of our business solutions specialists will contact you within 1-2 business days to discuss your needs and create a customized recycling plan for your organization.
                  </p>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Contact Directly Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Us Directly</h2>
            <p className="text-gray-600 mb-6">
              Prefer to speak with someone directly? Our business solutions team is available to answer your questions and discuss your e-waste recycling needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaPhone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9AM-5PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaEnvelope className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">business@ecorecycle.com</p>
                  <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}