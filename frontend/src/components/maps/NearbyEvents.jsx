import React, { useEffect, useState } from 'react';
import { getDistance } from 'geolib';

const events = [
  { name: "Juhu Beach Cleanup", date: "2025-06-10", lat: 19.1001, lng: 72.8267 },
  { name: "Versova Drive", date: "2025-06-12", lat: 19.1405, lng: 72.8230 },
  { name: "Marine Lines Event", date: "2025-06-15", lat: 18.9440, lng: 72.8235 },
  { name: "Dadar Beach Event", date: "2025-06-09", lat: 19.0176, lng: 72.8562 },
];

const NearbyEvents = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLoc = { latitude, longitude };
        setUserLocation(userLoc);

        // Add distance to each event
        const eventsWithDistance = events.map(event => ({
          ...event,
          distance: getDistance(
            userLoc,
            { latitude: event.lat, longitude: event.lng }
          )
        }));

        // Sort events by ascending distance
        const sorted = eventsWithDistance.sort((a, b) => a.distance - b.distance);
        setSortedEvents(sorted);
      },
      (err) => console.error("Location error", err)
    );
  }, []);

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Events</span> Near You
          </h1>
          <p className="text-xl text-gray-400">
            Discover amazing events happening around you
          </p>
        </div>

        {/* Loading State */}
        {!userLocation && (
          <div className="glass rounded-2xl p-8 text-center animate-pulse">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📍</span>
            </div>
            <p className="text-xl text-gray-300">Detecting your location...</p>
            <p className="text-sm text-gray-400 mt-2">Please allow location access</p>
          </div>
        )}

        {/* Events Grid */}
        {userLocation && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event, index) => (
              <div
                key={index}
                className="card group cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                    {(event.distance / 1000).toFixed(1)} km
                  </span>
                </div>

                {/* Event Details */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient-primary transition-all">
                  {event.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-lg">📅</span>
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-lg">📍</span>
                    <span>{event.distance < 1000 
                      ? `${event.distance} meters away` 
                      : `${(event.distance / 1000).toFixed(1)} km away`}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 btn-gradient py-3 rounded-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {userLocation && sortedEvents.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Events Found</h2>
            <p className="text-gray-400">Check back later for upcoming events in your area</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyEvents;