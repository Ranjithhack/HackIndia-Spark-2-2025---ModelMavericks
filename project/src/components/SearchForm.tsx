import React, { useState } from 'react';
import { Search, Plane } from 'lucide-react';
import { airports } from '../data/airports';

interface SearchFormProps {
  onSearch: (from: string, to: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from, to);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-transform">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            required
          >
            <option value="">Select departure city</option>
            {airports.map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code}) - {airport.state}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <Plane className="text-gray-400 transform -rotate-45" size={24} />
        </div>

        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            required
          >
            <option value="">Select arrival city</option>
            {airports.map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code}) - {airport.state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}