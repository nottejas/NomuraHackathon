import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";

const events = [
  {
    name: "Juhu Beach Cleanup",
    date: "2025-06-10",
    lat: 19.1001,
    lng: 72.8267,
  },
  { name: "Versova Drive", date: "2025-06-12", lat: 19.1405, lng: 72.823 },
  { name: "Marine Lines Event", date: "2025-06-15", lat: 18.944, lng: 72.8235 },
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
        const eventsWithDistance = events.map((event) => ({
          ...event,
          distance: getDistance(userLoc, {
            latitude: event.lat,
            longitude: event.lng,
          }),
        }));

        // Sort events by ascending distance
        const sorted = eventsWithDistance.sort(
          (a, b) => a.distance - b.distance
        );
        setSortedEvents(sorted);
      },
      (err) => console.error("Location error", err)
    );
  }, []);

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-600">Events</span> Near You
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing events happening around you
          </p>
        </div>

        {/* Loading State */}
        {!userLocation && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center animate-pulse shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📍</span>
            </div>
            <p className="text-xl text-gray-700">Detecting your location...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please allow location access
            </p>
          </div>
        )}

        {/* Events Grid */}
        {userLocation && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer flex flex-col justify-between text-center animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Icon + Distance */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎉</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4 inline-block">
                  {(event.distance / 1000).toFixed(1)} km
                </span>

                {/* Event Details */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h3>

                <div className="space-y-2 text-gray-500 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">📅</span>
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">📍</span>
                    <span>
                      {event.distance < 1000
                        ? `${event.distance} meters away`
                        : `${(event.distance / 1000).toFixed(1)} km away`}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-black font-bold border-2 border-black py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {userLocation && sortedEvents.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center shadow-md">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              No Events Found
            </h2>
            <p className="text-gray-500">
              Check back later for upcoming events in your area
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyEvents;
