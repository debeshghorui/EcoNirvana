"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaClock, FaDirections, FaRecycle, FaShieldAlt, FaCalendarAlt } from 'react-icons/fa';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GoogleMapComponent from '@/components/map/GoogleMapComponent';

// Import location data (same as in locations page)
const allLocations = [
  {
    id: 1,
    name: 'EcoNirvana Main Facility',
    address: '123 Recycling Way, Salt Lake, Kolkata 700091',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM, Sun: Closed',
    distance: 2.3,
    status: 'Open Now',
    services: ['E-Waste', 'Batteries', 'Appliances', 'Data Destruction'],
    description: 'Our flagship recycling center offering comprehensive e-waste recycling services and secure data destruction.',
    image: '/drop-off/EcoNirvana_Main_Facility.jpg',
    position: { lat: 22.5726, lng: 88.3639 }, // Kolkata center
    additionalInfo: {
      acceptedItems: ['Computers', 'Laptops', 'Tablets', 'Phones', 'Printers', 'TVs', 'Batteries', 'Home Appliances'],
      notAcceptedItems: ['Hazardous Waste', 'Non-Electronic Items', 'Medical Devices'],
      processingCapacity: '500 tons/month',
      certifications: ['ISO 14001', 'R2 Certification', 'e-Stewards'],
      facilityFeatures: ['Drive-through drop-off', 'Corporate pickup services', 'Secure data destruction room', 'Electronic waste sorting facility']
    }
  },
  {
    id: 2,
    name: 'Downtown Drop-off Center',
    address: '456 Park Street, Kolkata 700016',
    phone: '(555) 234-5678',
    hours: 'Mon-Sat: 10AM-7PM, Sun: 11AM-4PM',
    distance: 3.7,
    status: 'Open Now',
    services: ['E-Waste', 'Batteries', 'Small Electronics'],
    description: 'Convenient downtown location for dropping off smaller electronic items and batteries.',
    image: '/drop-off/Downtown_Drop-off_Center.png',
    position: { lat: 22.5557, lng: 88.3520 }, // Park Street area
    additionalInfo: {
      acceptedItems: ['Computers', 'Laptops', 'Tablets', 'Phones', 'Batteries', 'Small Appliances'],
      notAcceptedItems: ['TVs', 'Large Appliances', 'Hazardous Waste'],
      processingCapacity: '200 tons/month',
      certifications: ['ISO 14001'],
      facilityFeatures: ['Walk-in drop-off', 'Battery recycling station', 'E-waste collection bins']
    }
  },
  {
    id: 3,
    name: 'Westside Collection Point',
    address: '789 Howrah Bridge Road, Howrah, Kolkata 711101',
    phone: '(555) 345-6789',
    hours: 'Tue-Sat: 9AM-5PM, Sun-Mon: Closed',
    distance: 5.1,
    status: 'Closed Now',
    services: ['E-Waste', 'Appliances'],
    description: 'Specialized in larger electronic items and appliance recycling with easy drive-up access.',
    image: '/drop-off/Westside_Collection_Point.png',
    position: { lat: 22.5853, lng: 88.3425 }, // Howrah area
    additionalInfo: {
      acceptedItems: ['TVs', 'Refrigerators', 'Washing Machines', 'Air Conditioners', 'Computers', 'Large Electronics'],
      notAcceptedItems: ['Batteries', 'Small Electronics', 'Hazardous Waste'],
      processingCapacity: '350 tons/month',
      certifications: ['ISO 14001', 'R2 Certification'],
      facilityFeatures: ['Large appliance recycling center', 'Drive-through drop-off', 'Parts salvage area']
    }
  },
  {
    id: 4,
    name: 'Northside Recycling Hub',
    address: '101 Dum Dum Road, Kolkata 700074',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-6PM',
    distance: 6.8,
    status: 'Open Now',
    services: ['E-Waste', 'Batteries', 'Appliances', 'Data Destruction', 'Corporate Services'],
    description: 'Full-service recycling center with extended hours and special services for business customers.',
    image: '/drop-off/Northside_Recycling_Hub.jpg',
    position: { lat: 22.6420, lng: 88.4312 }, // Dum Dum area
    additionalInfo: {
      acceptedItems: ['All Electronics', 'IT Equipment', 'Office Equipment', 'Batteries', 'Appliances'],
      notAcceptedItems: ['Hazardous Waste', 'Medical Devices'],
      processingCapacity: '450 tons/month',
      certifications: ['ISO 14001', 'R2 Certification', 'e-Stewards', 'NAID AAA'],
      facilityFeatures: ['Corporate pickup programs', 'Secure data center', 'Asset tracking services', 'Recycling reports']
    }
  },
  {
    id: 5,
    name: 'Eastside Collection Center',
    address: '202 EM Bypass, Kolkata 700107',
    phone: '(555) 567-8901',
    hours: 'Wed-Sun: 9AM-6PM, Mon-Tue: Closed',
    distance: 7.2,
    status: 'Closed Now',
    services: ['E-Waste', 'Batteries', 'Small Electronics'],
    description: 'Community-focused collection center serving the eastern neighborhoods.',
    image: '/drop-off/Eastside_Collection_Center.jpg',
    position: { lat: 22.5236, lng: 88.4017 }, // EM Bypass area
    additionalInfo: {
      acceptedItems: ['Computers', 'Phones', 'Tablets', 'Batteries', 'Small Appliances'],
      notAcceptedItems: ['Large Appliances', 'Medical Devices', 'Hazardous Waste'],
      processingCapacity: '150 tons/month',
      certifications: ['ISO 14001'],
      facilityFeatures: ['Community drop-off center', 'E-waste awareness programs', 'Recycling education center']
    }
  },
  {
    id: 6,
    name: 'Southside Drop-off Point',
    address: '303 Garia Main Road, Kolkata 700084',
    phone: '(555) 678-9012',
    hours: 'Mon-Sat: 8AM-5PM, Sun: Closed',
    distance: 8.5,
    status: 'Open Now',
    services: ['E-Waste', 'Batteries', 'Appliances'],
    description: 'Easily accessible location with ample parking for dropping off larger items.',
    image: '/drop-off/Southside_Drop-off_Point.png',
    position: { lat: 22.4615, lng: 88.3922 }, // Garia area
    additionalInfo: {
      acceptedItems: ['Computers', 'TVs', 'Refrigerators', 'Air Conditioners', 'Washing Machines', 'Batteries'],
      notAcceptedItems: ['Hazardous Waste', 'Non-Electronic Items'],
      processingCapacity: '300 tons/month',
      certifications: ['ISO 14001', 'R2 Certification'],
      facilityFeatures: ['Ample parking', 'Drive-through drop-off', 'Large item handling equipment']
    }
  },
];

// Mock events data for this location
const upcomingEvents = [
  {
    id: 1,
    title: 'Community Recycling Day',
    date: '2023-11-15',
    time: '9:00 AM - 2:00 PM',
    description: 'Bring your electronic waste for free recycling. Educational demonstrations and refreshments provided.'
  },
  {
    id: 2,
    title: 'Corporate E-Waste Collection',
    date: '2023-11-28',
    time: '10:00 AM - 4:00 PM',
    description: 'Special event for businesses to dispose of office equipment. Pre-registration required.'
  }
];

export default function LocationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'events', 'directions'

  useEffect(() => {
    const id = Number(params.id);
    const foundLocation = allLocations.find(loc => loc.id === id);
    
    if (foundLocation) {
      setLocation(foundLocation);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-3 text-green-800">Loading location details...</p>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="h-8 w-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Not Found</h2>
          <p className="text-gray-600 mb-6">The recycling location you're looking for doesn't exist or has been removed.</p>
          <Link href="/locations" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Location Details</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{location.name}</h1>
              <p className="text-green-100 flex items-center">
                <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                {location.address}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex">
              <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${
                location.status === 'Open Now' 
                  ? 'bg-green-400 text-green-900' 
                  : 'bg-gray-400 text-gray-900'
              }`}>
                {location.status}
              </span>
            </div>
          </div>
          
          {/* Location Image */}
          <div className="mt-6 rounded-xl overflow-hidden shadow-lg h-64">
            <img 
              src={location.image} 
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:space-x-8">
          {/* Left Column - Details */}
          <div className="md:w-2/3">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'about' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'events' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Events
                </button>
                <button
                  onClick={() => setActiveTab('directions')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'directions' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Directions
                </button>
              </nav>
            </div>
            
            {/* About Tab Content */}
            {activeTab === 'about' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Location Information</h2>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <FaPhone className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                          <p className="text-gray-600">{location.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaClock className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Hours</h3>
                          <p className="text-gray-600">{location.hours}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Distance</h3>
                          <p className="text-gray-600">{location.distance} miles away</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaRecycle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Processing Capacity</h3>
                          <p className="text-gray-600">{location.additionalInfo.processingCapacity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <p className="text-gray-700">{location.description}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Services Available</h2>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {location.services.map((service: string) => (
                        <span 
                          key={service} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-800 border border-green-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Accepted Items</h3>
                        <ul className="space-y-2">
                          {location.additionalInfo.acceptedItems.map((item: string) => (
                            <li key={item} className="flex items-center text-gray-600">
                              <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Not Accepted</h3>
                        <ul className="space-y-2">
                          {location.additionalInfo.notAcceptedItems.map((item: string) => (
                            <li key={item} className="flex items-center text-gray-600">
                              <svg className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Facility Features</h2>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {location.additionalInfo.facilityFeatures.map((feature: string) => (
                        <li key={feature} className="flex items-center text-gray-600 py-1">
                          <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Certifications</h2>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      {location.additionalInfo.certifications.map((cert: string) => (
                        <div key={cert} className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
                          <FaShieldAlt className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-gray-800 font-medium">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Events Tab Content */}
            {activeTab === 'events' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 rounded-lg p-3 hidden sm:block">
                            <FaCalendarAlt className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                            <div className="mt-2 text-sm text-gray-600">
                              <p className="mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              <p className="mb-1"><strong>Time:</strong> {event.time}</p>
                              <p className="mt-3">{event.description}</p>
                            </div>
                            <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                              Register for Event
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCalendarAlt className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Upcoming Events</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      There are currently no scheduled events at this location. Please check back later for updates.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Directions Tab Content */}
            {activeTab === 'directions' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Get Directions</h2>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
                  <p className="text-gray-700 mb-4">
                    {location.name} is located at {location.address}, approximately {location.distance} miles from city center.
                  </p>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Getting Here:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 font-bold mr-2">•</span>
                        <span><strong>By Car:</strong> Accessible via main roads with ample parking space available.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 font-bold mr-2">•</span>
                        <span><strong>By Public Transport:</strong> Nearby bus stops and metro stations within walking distance.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 font-bold mr-2">•</span>
                        <span><strong>Landmark:</strong> Look for the green EcoNirvana signage at the entrance.</span>
                      </li>
                    </ul>
                  </div>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    <FaDirections className="mr-2 h-5 w-5" />
                    Open in Google Maps
                  </a>
                </div>
                
                <div className="bg-gray-100 h-80 rounded-lg overflow-hidden">
                  <GoogleMapComponent center={location.position} zoom={15}>
                    <Marker position={location.position} title={location.name} />
                  </GoogleMapComponent>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Contact Info & Action Buttons */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaPhone className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">{location.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Hours</h3>
                    <p className="text-gray-600">{location.hours}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">{location.address}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <a 
                  href={`tel:${location.phone.replace(/\D/g,'')}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  <FaPhone className="mr-2 h-4 w-4" />
                  Call Location
                </a>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaDirections className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg shadow-sm p-6 border border-green-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-200 text-green-800 font-bold text-sm mr-3">
                    1
                  </div>
                  <p className="text-gray-700">Check if your items are accepted at this location</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-200 text-green-800 font-bold text-sm mr-3">
                    2
                  </div>
                  <p className="text-gray-700">Visit during operating hours or schedule a pickup</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-200 text-green-800 font-bold text-sm mr-3">
                    3
                  </div>
                  <p className="text-gray-700">Earn points for your recycling contribution</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Link 
                  href="/doorstep"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Schedule a Pickup
                </Link>
                <Link 
                  href="/recycle"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  Learn How to Recycle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 