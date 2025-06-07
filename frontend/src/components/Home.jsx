import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
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
    <div style={{ padding: '6rem 2rem' }}>
      <h1>Welcome, {username}!</h1>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
}

export default Home;
