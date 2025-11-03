import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monthly'); // monthly, yearly, all-time
  const [activeCategory, setActiveCategory] = useState('waste'); // waste, co2, events
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data for different categories and time periods
  const mockData = {
    waste: {
      monthly: [
        { id: 1, rank: 1, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 245.5, change: 0, city: 'Chennai' },
        { id: 2, rank: 2, name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', value: 189.2, change: 1, city: 'Mumbai' },
        { id: 3, rank: 3, name: 'Amit Patel', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff', value: 167.8, change: -1, city: 'Bangalore' },
        { id: 4, rank: 4, name: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=ef4444&color=fff', value: 145.3, change: 2, city: 'Delhi' },
        { id: 5, rank: 5, name: 'Mohammed Ali', avatar: 'https://ui-avatars.com/api/?name=Mohammed+Ali&background=8b5cf6&color=fff', value: 132.7, change: 0, city: 'Hyderabad' },
        { id: 6, rank: 6, name: 'Ananya Reddy', avatar: 'https://ui-avatars.com/api/?name=Ananya+Reddy&background=ec4899&color=fff', value: 128.4, change: -2, city: 'Pune' },
        { id: 7, rank: 7, name: 'Vikram Singh', avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=14b8a6&color=fff', value: 115.9, change: 1, city: 'Kolkata' },
        { id: 8, rank: 8, name: 'Meera Krishnan', avatar: 'https://ui-avatars.com/api/?name=Meera+Krishnan&background=f97316&color=fff', value: 98.5, change: 0, city: 'Chennai' },
        { id: 9, rank: 9, name: 'Arjun Malhotra', avatar: 'https://ui-avatars.com/api/?name=Arjun+Malhotra&background=3b82f6&color=fff', value: 87.2, change: 3, city: 'Mumbai' },
        { id: 10, rank: 10, name: 'Neha Gupta', avatar: 'https://ui-avatars.com/api/?name=Neha+Gupta&background=a855f7&color=fff', value: 76.8, change: -1, city: 'Jaipur' }
      ],
      yearly: [
        { id: 1, rank: 1, name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', value: 2145.8, change: 0, city: 'Mumbai' },
        { id: 2, rank: 2, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 1987.3, change: 1, city: 'Chennai' },
        { id: 3, rank: 3, name: 'Amit Patel', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff', value: 1756.2, change: -1, city: 'Bangalore' }
      ],
      allTime: [
        { id: 1, rank: 1, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 5432.1, change: 0, city: 'Chennai' },
        { id: 2, rank: 2, name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', value: 4987.6, change: 0, city: 'Mumbai' },
        { id: 3, rank: 3, name: 'Amit Patel', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff', value: 4321.8, change: 0, city: 'Bangalore' }
      ]
    },
    co2: {
      monthly: [
        { id: 1, rank: 1, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 187.3, change: 0, city: 'Chennai' },
        { id: 2, rank: 2, name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', value: 145.6, change: 1, city: 'Mumbai' },
        { id: 3, rank: 3, name: 'Amit Patel', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff', value: 128.9, change: -1, city: 'Bangalore' }
      ],
      yearly: [
        { id: 1, rank: 1, name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', value: 1643.2, change: 0, city: 'Mumbai' }
      ],
      allTime: [
        { id: 1, rank: 1, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 4156.8, change: 0, city: 'Chennai' }
      ]
    },
    events: {
      monthly: [
        { id: 1, rank: 1, name: 'Ananya Reddy', avatar: 'https://ui-avatars.com/api/?name=Ananya+Reddy&background=ec4899&color=fff', value: 12, change: 0, city: 'Pune' },
        { id: 2, rank: 2, name: 'Vikram Singh', avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=14b8a6&color=fff', value: 10, change: 2, city: 'Kolkata' },
        { id: 3, rank: 3, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 9, change: -1, city: 'Chennai' }
      ],
      yearly: [
        { id: 1, rank: 1, name: 'Ananya Reddy', avatar: 'https://ui-avatars.com/api/?name=Ananya+Reddy&background=ec4899&color=fff', value: 87, change: 0, city: 'Pune' }
      ],
      allTime: [
        { id: 1, rank: 1, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', value: 234, change: 0, city: 'Chennai' }
      ]
    }
  };

  useEffect(() => {
    loadLeaderboardData();
    const username = localStorage.getItem('username');
    if (username) {
      setCurrentUser({
        name: username,
        rank: 15,
        value: 65.4,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=667eea&color=fff`
      });
    }
  }, [activeCategory, activeTab]);

  const loadLeaderboardData = () => {
    const tabMap = { monthly: 'monthly', yearly: 'yearly', 'all-time': 'allTime' };
    const data = mockData[activeCategory][tabMap[activeTab]] || [];
    setLeaderboardData(data);
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <span className="text-green-600">↑{change}</span>;
    if (change < 0) return <span className="text-red-600">↓{Math.abs(change)}</span>;
    return <span className="text-gray-400">-</span>;
  };

  const getCategoryLabel = () => {
    if (activeCategory === 'waste') return 'kg';
    if (activeCategory === 'co2') return 'kg CO₂';
    return 'events';
  };

  const getCategoryIcon = () => {
    if (activeCategory === 'waste') return '♻️';
    if (activeCategory === 'co2') return '🌍';
    return '🎉';
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-gradient-primary">🏆 Leaderboard</h1>
          <p className="text-xl text-gray-600">Compete with others and track your environmental impact</p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'waste', label: 'Waste Collected', icon: '♻️' },
              { key: 'co2', label: 'CO₂ Impact', icon: '🌍' },
              { key: 'events', label: 'Events Attended', icon: '🎉' }
            ].map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(cat.key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  activeCategory === cat.key
                    ? 'bg-gradient-primary border-purple-500/50 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-sm">{cat.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Time Period Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center gap-4 mb-8">
          {['monthly', 'yearly', 'all-time'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* 2nd Place */}
            {leaderboardData[1] && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                <div className="text-5xl mb-2">🥈</div>
                <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-gray-400" />
                <h3 className="font-bold text-gray-900 mb-1">{leaderboardData[1].name}</h3>
                <p className="text-sm text-gray-600 mb-2">{leaderboardData[1].city}</p>
                <div className="text-2xl font-bold text-gradient-secondary">{leaderboardData[1].value} {getCategoryLabel()}</div>
              </motion.div>
            )}

            {/* 1st Place */}
            {leaderboardData[0] && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 text-center relative shadow-xl border border-gray-200">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-2xl">👑</span>
                </div>
                <div className="text-6xl mb-2">🥇</div>
                <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-yellow-400 shadow-lg" />
                <h3 className="font-bold text-gray-900 text-lg mb-1">{leaderboardData[0].name}</h3>
                <p className="text-sm text-gray-600 mb-2">{leaderboardData[0].city}</p>
                <div className="text-3xl font-bold text-gradient-primary">{leaderboardData[0].value} {getCategoryLabel()}</div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {leaderboardData[2] && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                <div className="text-5xl mb-2">🥉</div>
                <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-orange-600" />
                <h3 className="font-bold text-gray-900 mb-1">{leaderboardData[2].name}</h3>
                <p className="text-sm text-gray-600 mb-2">{leaderboardData[2].city}</p>
                <div className="text-2xl font-bold text-gradient-success">{leaderboardData[2].value} {getCategoryLabel()}</div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
            <span className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">{getCategoryIcon()}</span>
            Rankings
          </h2>
          <div className="space-y-3">
            <AnimatePresence>
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    user.rank <= 3
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-300'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl font-bold w-12 text-center">{getMedalEmoji(user.rank)}</div>
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-gray-300" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{user.name}</h4>
                      <p className="text-xs text-gray-600">📍 {user.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{user.value}</div>
                      <div className="text-xs text-gray-600">{getCategoryLabel()}</div>
                    </div>
                    <div className="w-12 text-sm font-semibold">{getChangeIcon(user.change)}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Current User Position */}
          {currentUser && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-600 mb-3">Your Position:</p>
              <div className="flex items-center justify-between p-4 rounded-lg bg-purple-50 border-2 border-purple-300">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold text-purple-400">#{currentUser.rank}</div>
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full border-2 border-purple-500" />
                  <h4 className="font-semibold text-gray-900">{currentUser.name} (You)</h4>
                </div>
                <div className="text-xl font-bold text-gray-900">{currentUser.value} {getCategoryLabel()}</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Leaderboard;
