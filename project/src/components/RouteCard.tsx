import React from 'react';
import { Plane, Clock, IndianRupee, MapPin, Building } from 'lucide-react';
import { FlightPath } from '../utils/routeFinder';
import { airports, routes } from '../data/airports';
import { RouteMap } from './RouteMap';
import { FlightSchedule } from './FlightSchedule';

interface RouteCardProps {
  path: FlightPath;
}

export function RouteCard({ path }: RouteCardProps) {
  const getAirportInfo = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? `${airport.city}, ${airport.state} (${airport.code})` : code;
  };

  const getAirport = (code: string) => airports.find(a => a.code === code);
  const getRoute = (from: string, to: string) => routes.find(r => r.from === from && r.to === to);

  const fromAirport = getAirport(path.segments[0].route.from);
  const toAirport = getAirport(path.segments[path.segments.length - 1].route.to);
  const directRoute = getRoute(fromAirport?.code || '', toAirport?.code || '');

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-full">
            <Plane className="text-orange-600 transform -rotate-45" size={24} />
          </div>
          <span className="text-xl font-semibold text-gray-800">
            {getAirportInfo(path.segments[0].route.from)} → {getAirportInfo(path.segments[path.segments.length - 1].route.to)}
          </span>
        </div>
        <div className="text-2xl font-bold text-orange-600 flex items-center gap-1">
          <IndianRupee size={20} />
          {path.totalPrice}
        </div>
      </div>

      {/* Map View */}
      <RouteMap
        fromCode={path.segments[0].route.from}
        toCode={path.segments[path.segments.length - 1].route.to}
        stops={path.segments.length > 1 ? path.segments.slice(1, -1).map(s => s.route.from) : []}
      />

      {/* Airport Details */}
      <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <Building size={18} className="text-orange-600" />
            Departure Airport
          </h3>
          <p className="text-sm text-gray-600">{fromAirport?.name}</p>
          <p className="text-sm text-gray-500 mt-1">Terminals: {fromAirport?.terminals}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <Building size={18} className="text-orange-600" />
            Arrival Airport
          </h3>
          <p className="text-sm text-gray-600">{toAirport?.name}</p>
          <p className="text-sm text-gray-500 mt-1">Terminals: {toAirport?.terminals}</p>
        </div>
      </div>

      {/* Route Segments */}
      <div className="space-y-6">
        {path.segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="font-medium">{getAirportInfo(segment.route.from)}</span>
              </div>
              <div className="h-8 border-l-2 border-dashed border-orange-200 ml-2"></div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="font-medium">{getAirportInfo(segment.route.to)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Clock size={16} />
                <span>{segment.route.duration}h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <IndianRupee size={16} />
                <span>{segment.route.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flight Schedule */}
      {directRoute && <FlightSchedule route={directRoute} />}

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span>Total duration: {path.totalDuration}h</span>
        </div>
        <div>
          {path.totalStops === 0 ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Direct flight</span>
          ) : (
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">{path.totalStops} stop</span>
          )}
        </div>
      </div>
    </div>
  );
}