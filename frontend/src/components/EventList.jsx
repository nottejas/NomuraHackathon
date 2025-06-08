// components/EventsList.jsx
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events') // Ensure this endpoint exists
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Upcoming Beach Cleanups</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map(event => <EventCard key={event._id} event={event} />)
      )}
    </div>
  );
}
