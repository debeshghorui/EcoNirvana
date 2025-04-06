"use client";

import { Marker } from '@react-google-maps/api';

interface LocationMarkerProps {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  isActive?: boolean;
  onClick: (id: number) => void;
}

const LocationMarker = ({ id, position, isActive = false, onClick }: LocationMarkerProps) => {
  return (
    <Marker
      position={position}
      onClick={() => onClick(id)}
      icon={{
        url: isActive 
          ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new window.google.maps.Size(isActive ? 42 : 38, isActive ? 42 : 38),
      }}
      animation={isActive ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};

export default LocationMarker; 