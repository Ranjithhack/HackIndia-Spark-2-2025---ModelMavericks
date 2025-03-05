import React, { useState } from 'react';
import { Plane, MapPin } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { RouteCard } from './components/RouteCard';
import { findRoutes } from './utils/routeFinder';
import { routes, airports } from './data/airports';
import type { FlightPath } from './utils/routeFinder';

function App() {
  const [searchResults, setSearchResults] = useState<FlightPath[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (from: string, to: string) => {
    const foundRoutes = findRoutes(from, to, routes);
    setSearchResults(foundRoutes);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Plane className="transform -rotate-45" size={32} />
            <h1 className="text-3xl font-bold">Indian Flight Routes</h1>
          </div>
          <SearchForm onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!hasSearched && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {airports.slice(0, 6).map(airport => (
                  <div key={airport.code} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="text-orange-600" size={20} />
                      <h3 className="font-semibold text-lg">{airport.city}</h3>
                    </div>
                    <p className="text-gray-600">{airport.name}</p>
                    <p className="text-sm text-gray-500 mt-2">{airport.state}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasSearched && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {searchResults.length > 0 
                  ? `Found ${searchResults.length} route${searchResults.length === 1 ? '' : 's'}`
                  : 'No routes found'}
              </h2>
              <button
                onClick={() => setHasSearched(false)}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Back to destinations
              </button>
            </div>
            {searchResults.map((path, index) => (
              <RouteCard key={index} path={path} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Indian Flight Routes. All major Indian airports and routes.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;