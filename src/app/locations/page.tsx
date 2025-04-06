"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { FaArrowLeft, FaMapMarkerAlt, FaSearch, FaPhone, FaClock, FaDirections, FaFilter } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import GoogleMapComponent from '@/components/map/GoogleMapComponent';
import LocationMarker from '@/components/map/LocationMarker';

// Mock data for locations
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
    image: '/images/locations/main-facility.jpg',
    position: { lat: 22.5726, lng: 88.3639 } // Kolkata center
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
    image: '/images/locations/downtown.jpg',
    position: { lat: 22.5557, lng: 88.3520 } // Park Street area
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
    image: '/images/locations/westside.jpg',
    position: { lat: 22.5853, lng: 88.3425 } // Howrah area
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
    image: '/images/locations/northside.jpg',
    position: { lat: 22.6420, lng: 88.4312 } // Dum Dum area
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
    image: '/images/locations/eastside.jpg',
    position: { lat: 22.5236, lng: 88.4017 } // EM Bypass area
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
    image: '/images/locations/southside.jpg',
    position: { lat: 22.4615, lng: 88.3922 } // Garia area
  },
];

// Service filter options
const serviceOptions = [
  'E-Waste',
  'Batteries',
  'Appliances',
  'Data Destruction',
  'Small Electronics',
  'Corporate Services'
];

// Map styles
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Kolkata center
const center = {
  lat: 22.5726,
  lng: 88.3639
};

export default function LocationsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [locations, setLocations] = useState(allLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          // Handle different geolocation errors gracefully
          let errorMessage = "";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied by the user.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Request for location timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          
          // Set error state but don't crash the app
          setLocationError(errorMessage);
          
          // Continue with default location (Kolkata)
          console.log("Geolocation error:", errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);
  
  // Filter locations
  useEffect(() => {
    let filteredLocations = [...allLocations];
    
    // Apply search filter
    if (searchTerm) {
      filteredLocations = filteredLocations.filter(
        location => 
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply service filter
    if (filterService) {
      filteredLocations = filteredLocations.filter(
        location => location.services.includes(filterService)
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      filteredLocations = filteredLocations.filter(
        location => location.status === filterStatus
      );
    }
    
    // Sort by distance
    filteredLocations.sort((a, b) => a.distance - b.distance);
    
    setLocations(filteredLocations);
  }, [searchTerm, filterService, filterStatus]);

  // Map center based on user location or default
  const mapCenter = useMemo(() => {
    return userLocation || center;
  }, [userLocation]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push('/dashboard')}
              className="mr-4 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold">Drop-off Locations</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Find the nearest e-waste recycling drop-off point in your area.
          </p>
        </div>
      </div>
      
      {/* Location Notice (show when there's a location error) */}
      {locationError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {locationError} Showing default locations in Kolkata.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  // Function to retry getting geolocation
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setUserLocation({
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        });
                        setLocationError(null);
                      },
                      (error) => {
                        let errorMessage = "";
                        switch (error.code) {
                          case error.PERMISSION_DENIED:
                            errorMessage = "Location access was denied. Please enable location services in your browser settings.";
                            break;
                          case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information is unavailable.";
                            break;
                          case error.TIMEOUT:
                            errorMessage = "Request for location timed out.";
                            break;
                          default:
                            errorMessage = "An unknown error occurred.";
                        }
                        setLocationError(errorMessage);
                      },
                      {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                      }
                    );
                  }
                }}
                className="ml-4 px-3 py-1.5 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Use my location
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-700"
                placeholder="Search by name or address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative inline-block">
                <div className="flex items-center">
                  <FaFilter className="h-4 w-4 text-gray-500 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-700"
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                  >
                    <option value="">All Services</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="flex items-center">
                  <FaClock className="h-4 w-4 text-gray-500 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-700"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">Any Status</option>
                    <option value="Open Now">Open Now</option>
                    <option value="Closed Now">Closed Now</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Locations List */}
        <div className="mb-12">
          {locations.length > 0 ? (
            <div className="space-y-6">
              {locations.map((location) => (
                <motion.div 
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                          <p className="text-gray-600 mt-1">{location.address}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          location.status === 'Open Now' 
                            ? 'bg-green-50 text-green-800 border border-green-300 shadow-sm' 
                            : 'bg-gray-50 text-gray-800 border border-gray-300 shadow-sm'
                        }`}>
                          {location.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaPhone className="h-4 w-4 text-green-500 mr-2" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-start text-sm text-gray-600">
                          <FaClock className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>{location.hours}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="h-4 w-4 text-green-500 mr-2" />
                          <span>{location.distance} miles away</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">{location.description}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Services Available:</h4>
                        <div className="flex flex-wrap gap-2">
                          {location.services.map((service) => (
                            <span 
                              key={service} 
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-300 shadow-sm"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-4">
                        <Link 
                          href={`/locations/${location.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          View Details
                        </Link>
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaDirections className="mr-2 h-4 w-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 bg-gray-200 h-48 md:h-auto relative">
                      {/* Placeholder for location image */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No locations found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || filterService || filterStatus ? 
                  "Try adjusting your search or filter criteria." : 
                  "We couldn't find any drop-off locations in your area."}
              </p>
              {(searchTerm || filterService || filterStatus) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterService('');
                    setFilterStatus('');
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Pickup Service Promo */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-8 md:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:flex-1 mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold text-white mb-2">Can't Make It to a Drop-off Location?</h2>
                <p className="text-green-100">
                  We offer convenient pickup services for larger items or multiple devices. Schedule a pickup at your home or business.
                </p>
              </div>
              <div>
                <Link 
                  href="/doorstep" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Schedule a Pickup
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Find Locations on Map</h2>
            <p className="text-gray-600 mb-6">
              View all our drop-off locations on an interactive map to find the one most convenient for you.
            </p>
            <div className="bg-gray-100 h-96 rounded-lg">
              <GoogleMapComponent center={mapCenter}>
                {/* User location marker */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 7,
                      fillColor: "#4285F4",
                      fillOpacity: 1,
                      strokeColor: "#ffffff",
                      strokeWeight: 2,
                    }}
                    title="Your location"
                  />
                )}
                
                {/* Location markers */}
                {locations.map((location) => (
                  <LocationMarker
                    key={location.id}
                    id={location.id}
                    position={location.position}
                    isActive={selectedLocation === location.id}
                    onClick={setSelectedLocation}
                  />
                ))}
                
                {/* Info window for selected location */}
                {selectedLocation !== null && (
                  <InfoWindow
                    position={locations.find(loc => loc.id === selectedLocation)?.position}
                    onCloseClick={() => setSelectedLocation(null)}
                  >
                    <div className="p-2 max-w-xs">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">
                        {locations.find(loc => loc.id === selectedLocation)?.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {locations.find(loc => loc.id === selectedLocation)?.address}
                      </p>
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <FaClock className="h-3 w-3 text-green-500 mr-1" />
                        <span>{locations.find(loc => loc.id === selectedLocation)?.status}</span>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          locations.find(loc => loc.id === selectedLocation)?.address || ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:text-green-800 font-medium inline-flex items-center mt-1"
                      >
                        <FaDirections className="mr-1 h-3 w-3" />
                        Get Directions
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMapComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 