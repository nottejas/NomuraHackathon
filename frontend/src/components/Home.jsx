import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gray-100 rounded-3xl p-8 md:p-12 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
                Welcome back, <span className="text-blue-600">{username}</span>!
              </h1>
              <p className="text-xl text-gray-600">
                Ready to explore amazing events?
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-cyan-700 text-red-600! font-bold border-2 border-cyan-700 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 "
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Events Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center gap-4">
            {/* Top Number */}
            <div className="text-7xl font-bold text-blue-600">12</div>

            {/* Icon + Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Upcoming Events
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-500 mt-1">Discover events near you</p>
          </div>

          {/* Chat Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center gap-4">
            <div className="text-7xl font-bold text-purple-600">5</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Messages</h3>
            </div>
            <p className="text-gray-500 mt-1">Chat with AI assistant</p>
          </div>

          {/* Analytics Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center gap-4">
            <div className="text-7xl font-bold text-green-600">8</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Analytics</h3>
            </div>
            <p className="text-gray-500 mt-1">View your statistics</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/events"
              className="bg-blue-600 border-4 border-gray-900 text-black text-center py-4 rounded-xl hover:bg-blue-700 transition-transform hover:scale-105"
            >
              Browse Events
            </a>
            <a
              href="/chat"
              className="bg-purple-600 border-4 border-gray-900 text-black text-center py-4 rounded-xl hover:bg-purple-700 transition-transform hover:scale-105"
            >
              Chat Now
            </a>
            <a
              href="/charts"
              className="bg-green-600 border-4 border-gray-900 text-black text-center py-4 rounded-xl hover:bg-green-700 transition-transform hover:scale-105"
            >
              View Charts
            </a>
            <a
              href="/maps"
              className="bg-gray-300 border-4 border-gray-900 text-gray-900 text-center py-4 rounded-xl hover:bg-gray-100 transition-transform hover:scale-105"
            >
              Explore Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
