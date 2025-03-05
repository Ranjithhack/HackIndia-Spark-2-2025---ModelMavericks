import React from 'react';
import { format } from 'date-fns';
import { Clock, Calendar } from 'lucide-react';
import { Route } from '../data/airports';

interface FlightScheduleProps {
  route: Route;
}

export function FlightSchedule({ route }: FlightScheduleProps) {
  return (
    <div className="mt-4 bg-orange-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Calendar size={20} className="text-orange-600" />
        Flight Schedule
      </h3>
      <div className="space-y-3">
        {route.schedule.map((timing, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gray-500" />
              <div>
                <span className="font-medium">{timing.departure}</span>
                <span className="text-gray-400 mx-2">→</span>
                <span className="font-medium">{timing.arrival}</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {timing.frequency.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}