export interface Airport {
  code: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
}

export interface Route {
  from: Airport;
  to: Airport;
  distance: number;
  flightNumber?: string;
  airline?: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  price?: {
    amount: number;
    currency: string;
  };
}

export interface AviationStackResponse {
  data: {
    flight_date: string;
    flight_status: string;
    departure: {
      airport: string;
      timezone: string;
      iata: string;
      scheduled: string;
    };
    arrival: {
      airport: string;
      timezone: string;
      iata: string;
      scheduled: string;
    };
    airline: {
      name: string;
    };
    flight: {
      number: string;
      price?: {
        amount: number;
        currency: string;
      };
    };
  }[];
}