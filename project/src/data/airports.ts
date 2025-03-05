export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  terminals: number;
  schedule: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  };
}

export interface Route {
  from: string;
  to: string;
  duration: number;
  price: number;
  stops: number;
  schedule: {
    departure: string;
    arrival: string;
    frequency: string[];
  }[];
}

export const airports: Airport[] = [
  {
    id: "1",
    name: "Indira Gandhi International Airport",
    code: "DEL",
    city: "New Delhi",
    state: "Delhi",
    coordinates: { lat: 28.5565, lng: 77.1000 },
    terminals: 3,
    schedule: {
      morning: ["06:00", "07:30", "09:00"],
      afternoon: ["12:00", "14:30"],
      evening: ["17:00", "18:30"],
      night: ["21:00", "23:00"]
    }
  },
  {
    id: "2",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    code: "BOM",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0896, lng: 72.8656 },
    terminals: 2,
    schedule: {
      morning: ["05:30", "07:00", "08:30"],
      afternoon: ["11:30", "13:30"],
      evening: ["16:30", "18:00"],
      night: ["20:30", "22:30"]
    }
  },
  {
    id: "3",
    name: "Kempegowda International Airport",
    code: "BLR",
    city: "Bengaluru",
    state: "Karnataka",
    coordinates: { lat: 13.1986, lng: 77.7066 },
    terminals: 2,
    schedule: {
      morning: ["06:30", "08:00", "09:30"],
      afternoon: ["12:30", "14:00"],
      evening: ["17:30", "19:00"],
      night: ["21:30", "23:30"]
    }
  },
  {
    id: "4",
    name: "Chennai International Airport",
    code: "MAA",
    city: "Chennai",
    state: "Tamil Nadu",
    coordinates: { lat: 12.9941, lng: 80.1709 },
    terminals: 2,
    schedule: {
      morning: ["05:00", "07:30", "09:00"],
      afternoon: ["11:00", "13:30"],
      evening: ["16:00", "18:30"],
      night: ["20:00", "22:00"]
    }
  },
  {
    id: "5",
    name: "Netaji Subhas Chandra Bose International Airport",
    code: "CCU",
    city: "Kolkata",
    state: "West Bengal",
    coordinates: { lat: 22.6520, lng: 88.4463 },
    terminals: 2,
    schedule: {
      morning: ["06:00", "08:00", "09:30"],
      afternoon: ["12:00", "14:00"],
      evening: ["17:00", "19:00"],
      night: ["21:00", "23:00"]
    }
  },
  {
    id: "6",
    name: "Rajiv Gandhi International Airport",
    code: "HYD",
    city: "Hyderabad",
    state: "Telangana",
    coordinates: { lat: 17.2403, lng: 78.4294 },
    terminals: 1,
    schedule: {
      morning: ["05:30", "07:30", "09:00"],
      afternoon: ["11:30", "13:30"],
      evening: ["16:30", "18:30"],
      night: ["20:30", "22:30"]
    }
  },
  {
    id: "7",
    name: "Sardar Vallabhbhai Patel International Airport",
    code: "AMD",
    city: "Ahmedabad",
    state: "Gujarat",
    coordinates: { lat: 23.0775, lng: 72.6347 },
    terminals: 2,
    schedule: {
      morning: ["06:30", "08:30"],
      afternoon: ["12:30", "14:30"],
      evening: ["17:30", "19:00"],
      night: ["21:30", "23:00"]
    }
  },
  {
    id: "8",
    name: "Cochin International Airport",
    code: "COK",
    city: "Kochi",
    state: "Kerala",
    coordinates: { lat: 10.1520, lng: 76.3919 },
    terminals: 1,
    schedule: {
      morning: ["06:00", "08:00"],
      afternoon: ["12:00", "14:00"],
      evening: ["17:00", "19:00"],
      night: ["21:00", "22:30"]
    }
  },
  {
    id: "9",
    name: "Goa International Airport",
    code: "GOI",
    city: "Dabolim",
    state: "Goa",
    coordinates: { lat: 15.3808, lng: 73.8314 },
    terminals: 1,
    schedule: {
      morning: ["07:00", "09:00"],
      afternoon: ["13:00", "15:00"],
      evening: ["17:30", "19:30"],
      night: ["21:30", "23:00"]
    }
  },
  {
    id: "10",
    name: "Sri Guru Ram Dass Jee International Airport",
    code: "ATQ",
    city: "Amritsar",
    state: "Punjab",
    coordinates: { lat: 31.7070, lng: 74.7973 },
    terminals: 1,
    schedule: {
      morning: ["06:30", "08:30"],
      afternoon: ["12:30", "14:30"],
      evening: ["17:30", "19:30"],
      night: ["21:30", "23:00"]
    }
  }
];

export const routes: Route[] = [
  // Delhi Routes
  {
    from: "DEL",
    to: "BOM",
    duration: 2.1,
    price: 5500,
    stops: 0,
    schedule: [
      { departure: "06:00", arrival: "08:06", frequency: ["Daily"] },
      { departure: "14:30", arrival: "16:36", frequency: ["Mon", "Wed", "Fri", "Sun"] },
      { departure: "21:00", arrival: "23:06", frequency: ["Daily"] }
    ]
  },
  {
    from: "DEL",
    to: "BLR",
    duration: 2.5,
    price: 6000,
    stops: 0,
    schedule: [
      { departure: "07:30", arrival: "10:00", frequency: ["Daily"] },
      { departure: "17:00", arrival: "19:30", frequency: ["Daily"] }
    ]
  },
  // Add similar detailed schedules for all other routes...
  // Mumbai Routes
  {
    from: "BOM",
    to: "DEL",
    duration: 2.1,
    price: 5500,
    stops: 0,
    schedule: [
      { departure: "05:30", arrival: "07:36", frequency: ["Daily"] },
      { departure: "13:30", arrival: "15:36", frequency: ["Daily"] },
      { departure: "20:30", arrival: "22:36", frequency: ["Daily"] }
    ]
  },
  // Continue with all other routes...
];