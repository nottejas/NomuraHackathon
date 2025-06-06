import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating user session check (e.g., from localStorage or context)
    const user = localStorage.getItem('username');
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login');
    } else {
      setUsername(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {username || 'Guest'}!</h1>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
}

export default Home;
