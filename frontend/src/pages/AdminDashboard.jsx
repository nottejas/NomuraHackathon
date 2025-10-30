// pages/AdminDashboard.jsx
import React from 'react';

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-8 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2">
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-400">
                Welcome back, <span className="text-gradient-primary font-semibold">{admin?.username || 'Admin'}</span>
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-3xl">👑</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideInLeft">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">1,234</h3>
            <p className="text-gray-400">Total Users</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">89</h3>
            <p className="text-gray-400">Active Events</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">5,678</h3>
            <p className="text-gray-400">Total Registrations</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">4.8</h3>
            <p className="text-gray-400">Average Rating</p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="glass rounded-2xl p-6 mb-8 animate-slideInRight">
          <h2 className="text-2xl font-bold mb-6">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/admin/create-event" className="btn-gradient text-center py-4 rounded-xl hover:scale-105 transition-transform">
              ➕ Create New Event
            </a>
            <a href="/ml-report" className="bg-gradient-secondary text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold">
              📊 View ML Reports
            </a>
            <a href="/charts" className="bg-gradient-success text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold">
              📈 Analytics
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span>✅</span>
                </div>
                <div>
                  <p className="font-semibold">New user registered</p>
                  <p className="text-sm text-gray-400">2 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span>🎉</span>
                </div>
                <div>
                  <p className="font-semibold">Event created successfully</p>
                  <p className="text-sm text-gray-400">15 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span>📊</span>
                </div>
                <div>
                  <p className="font-semibold">ML report generated</p>
                  <p className="text-sm text-gray-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
