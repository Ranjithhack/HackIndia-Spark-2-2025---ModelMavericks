import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { airports } from '../data/airports';
import 'leaflet/dist/leaflet.css';

interface RouteMapProps {
  fromCode: string;
  toCode: string;
  stops?: string[];
}

export function RouteMap({ fromCode, toCode, stops = [] }: RouteMapProps) {
  const fromAirport = airports.find(a => a.code === fromCode);
  const toAirport = airports.find(a => a.code === toCode);
  const stopAirports = stops.map(code => airports.find(a => a.code === code)).filter(Boolean);

  if (!fromAirport || !toAirport) return null;

  const positions = [
    [fromAirport.coordinates.lat, fromAirport.coordinates.lng],
    ...stopAirports.map(airport => [airport!.coordinates.lat, airport!.coordinates.lng]),
    [toAirport.coordinates.lat, toAirport.coordinates.lng]
  ];

  const customIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const bounds = positions.map(pos => [pos[0], pos[1]]);
  
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        bounds={bounds}
        style={{ height: '100%', width: '100%' }}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((position, idx) => (
          <Marker
            key={idx}
            position={position as [number, number]}
            icon={customIcon}
          >
            <Popup>
              {idx === 0 ? fromAirport.city :
               idx === positions.length - 1 ? toAirport.city :
               stopAirports[idx - 1]?.city}
            </Popup>
          </Marker>
        ))}
        <Polyline
          positions={positions as [number, number][]}
          color="#f97316"
          weight={3}
          dashArray="5,10"
        />
      </MapContainer>
    </div>
  );
}