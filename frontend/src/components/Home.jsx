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
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Welcome back,{' '}
                <span className="text-gradient-primary">{username}</span>!
              </h1>
              <p className="text-xl text-gray-400">Ready to explore amazing events?</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideInLeft">
          {/* Events Card */}
          <div className="card group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <span className="text-3xl font-bold text-gradient-primary">12</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
            <p className="text-gray-400">Discover events near you</p>
          </div>

          {/* Chat Card */}
          <div className="card group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <span className="text-3xl font-bold text-gradient-secondary">5</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-gray-400">Chat with AI assistant</p>
          </div>

          {/* Analytics Card */}
          <div className="card group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-3xl font-bold text-gradient-primary">8</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-400">View your statistics</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass rounded-2xl p-6 animate-slideInRight">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/events" className="btn-gradient text-center py-4 rounded-xl hover:scale-105 transition-transform">
              Browse Events
            </a>
            <a href="/chat" className="bg-gradient-secondary text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold">
              Chat Now
            </a>
            <a href="/charts" className="bg-gradient-success text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold">
              View Charts
            </a>
            <a href="/maps" className="bg-slate-800/50 border border-slate-600 text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold hover:bg-slate-700/50">
              Explore Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;