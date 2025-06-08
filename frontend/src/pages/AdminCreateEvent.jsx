// AdminCreateEvent.jsx
import React, { useState } from 'react';

function AdminCreateEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.msg);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input type="time" onChange={e => setForm({ ...form, time: e.target.value })} />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default AdminCreateEvent;
