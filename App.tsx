import React, { useState, useCallback } from 'react';
import { Plane } from 'lucide-react';
import { AirportSelector } from './components/AirportSelector';
import { Map } from './components/Map';
import { indianAirports } from './data/indianAirports';
import { Route, Airport } from './types';
import { getFlights } from './services/aviationApi';

function App() {
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findRoute = useCallback(async () => {
    const from = indianAirports.find(a => a.code === fromCode);
    const to = indianAirports.find(a => a.code === toCode);
    
    if (from && to) {
      setLoading(true);
      setError(null);
      
      try {
        // Calculate distance using Haversine formula
        const R = 6371; // Earth's radius in km
        const dLat = (to.lat - from.lat) * Math.PI / 180;
        const dLon = (to.lng - from.lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        // Fetch flight data
        const flightData = await getFlights(fromCode, toCode);
        const flight = flightData.data[0];

        if (!flight) {
          throw new Error('No flights found for this route');
        }

        setRoute({
          from,
          to,
          distance: Math.round(distance),
          flightNumber: flight.flight.number,
          airline: flight.airline.name,
          departureTime: flight.departure.scheduled,
          arrivalTime: flight.arrival.scheduled,
          duration: calculateDuration(
            new Date(flight.departure.scheduled),
            new Date(flight.arrival.scheduled)
          ),
          price: flight.flight.price
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch flight data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  }, [fromCode, toCode]);

  const calculateDuration = (departure: Date, arrival: Date) => {
    const diff = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Plane className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Indian Flight Route Finder</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AirportSelector
              airports={indianAirports}
              value={fromCode}
              onChange={setFromCode}
              label="From"
            />
            <AirportSelector
              airports={indianAirports}
              value={toCode}
              onChange={setToCode}
              label="To"
            />
          </div>
          
          <button
            onClick={findRoute}
            disabled={!fromCode || !toCode || loading}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Find Route'}
          </button>

          {error && (
            <p className="mt-4 text-red-600">{error}</p>
          )}
        </div>

        {route && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Route Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium">{route.from.city} ({route.from.code})</p>
                {route.departureTime && (
                  <p className="text-sm text-gray-600">
                    Departure: {new Date(route.departureTime).toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">To</p>
                <p className="font-medium">{route.to.city} ({route.to.code})</p>
                {route.arrivalTime && (
                  <p className="text-sm text-gray-600">
                    Arrival: {new Date(route.arrivalTime).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Approximate Distance: <span className="font-medium">{route.distance} km</span>
              </p>
              {route.airline && (
                <p className="text-sm text-gray-600">
                  Airline: <span className="font-medium">{route.airline}</span>
                </p>
              )}
              {route.flightNumber && (
                <p className="text-sm text-gray-600">
                  Flight Number: <span className="font-medium">{route.flightNumber}</span>
                </p>
              )}
              {route.duration && (
                <p className="text-sm text-gray-600">
                  Duration: <span className="font-medium">{route.duration}</span>
                </p>
              )}
              {route.price && (
                <p className="text-sm text-gray-600">
                  Estimated Price: <span className="font-medium text-green-600">
                    {formatPrice(route.price.amount, route.price.currency)}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        <Map route={route} airports={indianAirports} />
      </div>
    </div>
  );
}

export default App;