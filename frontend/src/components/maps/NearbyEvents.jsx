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
    <div style={{ padding: "1rem" }}>
      <h2>Upcoming Events Near You</h2>
      {!userLocation && <p>Detecting your location...</p>}
      {sortedEvents.map((event, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <h3>{event.name}</h3>
          <p>📅 {event.date}</p>
          <p>📍 {event.distance / 1000} km away</p>
        </div>
      ))}
    </div>
  );
};

export default NearbyEvents;
    