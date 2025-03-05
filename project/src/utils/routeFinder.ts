import { Route, airports } from '../data/airports';

export interface PathSegment {
  route: Route;
  isConnection: boolean;
}

export interface FlightPath {
  segments: PathSegment[];
  totalDuration: number;
  totalPrice: number;
  totalStops: number;
}

export function findRoutes(fromCode: string, toCode: string, routes: Route[]): FlightPath[] {
  const paths: FlightPath[] = [];
  
  // Direct flights
  const directRoute = routes.find(r => r.from === fromCode && r.to === toCode);
  if (directRoute) {
    paths.push({
      segments: [{ route: directRoute, isConnection: false }],
      totalDuration: directRoute.duration,
      totalPrice: directRoute.price,
      totalStops: directRoute.stops
    });
  }

  // One-stop flights
  routes.forEach(first => {
    if (first.from === fromCode) {
      routes.forEach(second => {
        if (second.from === first.to && second.to === toCode) {
          paths.push({
            segments: [
              { route: first, isConnection: false },
              { route: second, isConnection: true }
            ],
            totalDuration: first.duration + second.duration + 2, // Adding 2 hours connection time
            totalPrice: first.price + second.price,
            totalStops: 1
          });
        }
      });
    }
  });

  return paths.sort((a, b) => a.totalDuration - b.totalDuration);
}