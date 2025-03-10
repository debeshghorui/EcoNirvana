"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

// Location data
const locations = [
  {
    id: 1,
    name: "EcoRecycle Main Facility",
    address: "123 Recycling Way, Green City, EC 12345",
    phone: "(555) 123-4567",
    email: "mainfacility@ecorecycle.com",
    hours: {
      weekdays: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    services: ["Residential Drop-off", "Business Services", "Data Destruction", "Electronics Repair"],
    image: "/location-main.jpg"
  },
  {
    id: 2,
    name: "EcoRecycle Downtown",
    address: "456 Urban Street, Green City, EC 12346",
    phone: "(555) 234-5678",
    email: "downtown@ecorecycle.com",
    hours: {
      weekdays: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    services: ["Residential Drop-off", "Small Business Services", "Electronics Repair"],
    image: "/location-downtown.jpg"
  },
  {
    id: 3,
    name: "EcoRecycle Westside",
    address: "789 West Avenue, Green City, EC 12347",
    phone: "(555) 345-6789",
    email: "westside@ecorecycle.com",
    hours: {
      weekdays: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Closed"
    },
    services: ["Residential Drop-off", "Business Services", "Data Destruction"],
    image: "/location-westside.jpg"
  },
  {
    id: 4,
    name: "EcoRecycle Eastside",
    address: "321 East Boulevard, Green City, EC 12348",
    phone: "(555) 456-7890",
    email: "eastside@ecorecycle.com",
    hours: {
      weekdays: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    services: ["Residential Drop-off", "Small Business Services"],
    image: "/location-eastside.jpg"
  }
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image 
            src="/locations-hero.jpg" 
            alt="EcoRecycle Locations" 
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h1>
            <p className="text-xl mb-8 text-green-100">
              Find an EcoRecycle drop-off location near you. We have multiple facilities to serve you better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Drop-off Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit any of our convenient locations to drop off your e-waste for responsible recycling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div 
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 relative">
                  <Image 
                    src={location.image} 
                    alt={location.name} 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{location.name}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{location.address}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaPhone className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{location.phone}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <FaEnvelope className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <a href={`mailto:${location.email}`} className="text-green-600 hover:text-green-700">
                        {location.email}
                      </a>
                    </div>
                    
                    <div className="flex items-start">
                      <FaClock className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600">Monday - Friday: {location.hours.weekdays}</p>
                        <p className="text-gray-600">Saturday: {location.hours.saturday}</p>
                        <p className="text-gray-600">Sunday: {location.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Services Available:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {location.services.map((service, i) => (
                        <li key={i}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      Get Directions
                    </a>
                    <Link 
                      href="/contact" 
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find a Location Near You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive map to find the closest EcoRecycle drop-off location.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md h-96 relative">
            {/* Replace with an actual map component in a real application */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-lg">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Collection Events */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Community Collection Events</h2>
              <p className="text-lg text-gray-600 mb-6">
                Can't make it to one of our permanent locations? We regularly host e-waste collection events throughout the community.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our mobile collection events make it easy for residents and businesses to responsibly recycle their electronic waste without having to travel far.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Check our upcoming events calendar to find a collection event near you, or contact us to request an event in your area.
              </p>
              <Link 
                href="/services/events" 
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-medium text-lg transition-colors inline-block"
              >
                View Upcoming Events
              </Link>
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
                  src="/community-event.jpg" 
                  alt="EcoRecycle Community Collection Event" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Pickup Instead?</h2>
              <p className="text-xl text-green-100">
                For larger quantities of e-waste or for businesses, we offer convenient pickup services.
              </p>
            </div>
            <div>
              <Link 
                href="/services/pickup" 
                className="bg-white text-green-700 hover:bg-green-100 px-6 py-3 rounded-md font-medium text-lg transition-colors inline-block"
              >
                Schedule a Pickup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 