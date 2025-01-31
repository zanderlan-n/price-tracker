'use client';
import React, { useState, useCallback } from 'react';
import ReactMap, { MapMouseEvent, Marker } from 'react-map-gl';

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapProps {
  onLocationSelect: (location: ILocation) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const [marker, setMarker] = useState<ILocation | null>(null);

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      const { lngLat } = event;
      console.log('🚀 ~ Map ~ event:', event);
      setMarker({ longitude: lngLat.lng, latitude: lngLat.lat });
      onLocationSelect({ longitude: lngLat.lng, latitude: lngLat.lat });
    },
    [onLocationSelect]
  );

  return (
    <ReactMap
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={(e) => handleMapClick(e)}
    >
      {marker && (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
        />
      )}
    </ReactMap>
  );
};

export default Map;
