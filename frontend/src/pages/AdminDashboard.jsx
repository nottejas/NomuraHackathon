// pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEvents: 0,
    totalRegistrations: 0,
    totalWasteCollected: 0,
    co2Saved: 0,
    newUsersToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin-login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    // Fetch dashboard data
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls - replace with real endpoints
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API calls
      setStats({
        totalUsers: 1234,
        activeEvents: 89,
        totalRegistrations: 5678,
        totalWasteCollected: 12450,
        co2Saved: 8967,
        newUsersToday: 47
      });

      setRecentActivity([
        {
          id: 1,
          type: 'user',
          icon: '✅',
          color: 'green',
          message: 'New user registered',
          detail: 'john_doe joined the platform',
          time: '2 minutes ago'
        },
        {
          id: 2,
          type: 'event',
          icon: '🎉',
          color: 'blue',
          message: 'Event created successfully',
          detail: 'Beach Cleanup Drive 2024',
          time: '15 minutes ago'
        },
        {
          id: 3,
          type: 'report',
          icon: '📊',
          color: 'purple',
          message: 'ML report generated',
          detail: '450kg waste processed',
          time: '1 hour ago'
        },
        {
          id: 4,
          type: 'registration',
          icon: '📝',
          color: 'cyan',
          message: '25 new event registrations',
          detail: 'Park Cleanup Event',
          time: '2 hours ago'
        },
        {
          id: 5,
          type: 'achievement',
          icon: '🏆',
          color: 'yellow',
          message: 'Milestone achieved',
          detail: '10,000kg total waste collected',
          time: '3 hours ago'
        }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin-login');
  };

  const getColorClass = (color) => {
    const colors = {
      green: 'bg-green-500/20',
      blue: 'bg-blue-500/20',
      purple: 'bg-purple-500/20',
      cyan: 'bg-cyan-500/20',
      yellow: 'bg-yellow-500/20'
    };
    return colors[color] || 'bg-gray-500/20';
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-8 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-gradient-primary">
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-400">
                Welcome back, <span className="text-gradient-primary font-semibold">{admin?.username || 'Admin'}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
              >
                🚪 Logout
              </button>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-float">
                <span className="text-3xl">👑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-slideInLeft">
          {/* Total Users */}
          <div className="card hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-xs text-green-400 flex items-center gap-1">
                ↑ {stats.newUsersToday} today
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-2">{stats.totalUsers.toLocaleString()}</h3>
            <p className="text-gray-400">Total Users</p>
            <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary w-3/4"></div>
            </div>
          </div>

          {/* Active Events */}
          <div className="card hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <span className="text-xs text-blue-400 flex items-center gap-1">
                Live
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-2">{stats.activeEvents}</h3>
            <p className="text-gray-400">Active Events</p>
            <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-secondary w-2/3"></div>
            </div>
          </div>

          {/* Total Registrations */}
          <div className="card hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                ↑ 12%
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-2">{stats.totalRegistrations.toLocaleString()}</h3>
            <p className="text-gray-400">Total Registrations</p>
            <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-success w-5/6"></div>
            </div>
          </div>
        </div>

        {/* Environmental Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slideInRight">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                ♻️
              </span>
              Environmental Impact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <div>
                  <p className="text-gray-400 text-sm">Total Waste Collected</p>
                  <p className="text-3xl font-bold text-green-400">{stats.totalWasteCollected.toLocaleString()} kg</p>
                </div>
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🗑️</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                <div>
                  <p className="text-gray-400 text-sm">CO₂ Emissions Prevented</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.co2Saved.toLocaleString()} kg</p>
                </div>
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                💻
              </span>
              System Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Database</span>
                </div>
                <span className="text-green-400 font-semibold">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">API Server</span>
                </div>
                <span className="text-green-400 font-semibold">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">ML Service</span>
                </div>
                <span className="text-green-400 font-semibold">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Cache</span>
                </div>
                <span className="text-yellow-400 font-semibold">89% Full</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="glass rounded-2xl p-6 mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              ⚡
            </span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/admin/create-event" className="btn-gradient text-center py-4 rounded-xl hover:scale-105 transition-transform shadow-lg">
              ➕ Create Event
            </a>
            <a href="/ml-report" className="bg-gradient-secondary text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold shadow-lg">
              📊 ML Reports
            </a>
            <a href="/charts" className="bg-gradient-success text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold shadow-lg">
              📈 Analytics
            </a>
            <button 
              onClick={fetchDashboardData}
              className="bg-slate-700 text-center py-4 rounded-xl hover:scale-105 transition-transform text-white font-semibold shadow-lg hover:bg-slate-600"
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                📋
              </span>
              Recent Activity
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${getColorClass(activity.color)} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span>{activity.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{activity.message}</p>
                    <p className="text-sm text-gray-400">{activity.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
