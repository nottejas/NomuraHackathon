// pages/AdminDashboard.jsx
import React from 'react';

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {admin?.username || 'Admin'}!</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}

export default AdminDashboard;
