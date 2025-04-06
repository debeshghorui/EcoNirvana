"use client";

import { useState, useCallback, ReactNode } from 'react';
import { GoogleMap, useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';

interface GoogleMapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  children?: ReactNode;
  mapContainerClassName?: string;
  mapContainerStyle?: React.CSSProperties;
  onMapLoad?: (map: google.maps.Map) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

const GoogleMapComponent = ({
  center,
  zoom = 11,
  children,
  mapContainerClassName = '',
  mapContainerStyle = containerStyle,
  onMapLoad,
}: GoogleMapComponentProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (onMapLoad) onMapLoad(map);
  }, [onMapLoad]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-700 font-medium">Failed to load Google Maps</p>
          <p className="text-gray-500 text-sm mt-1">Please check your API key and internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName={mapContainerClassName}
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
    >
      {children}
    </GoogleMap>
  );
};

export default GoogleMapComponent; 