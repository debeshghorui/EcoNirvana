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
      animation={isActive ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};

export default LocationMarker; 