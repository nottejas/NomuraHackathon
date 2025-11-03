import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function UserProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // User data state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=200'
  });

  // Statistics state
  const [stats, setStats] = useState({
    eventsAttended: 12,
    wasteCollected: 245.5,
    co2Saved: 187.3,
    hoursVolunteered: 48,
    treesEquivalent: 9
  });

  // Achievements state
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Cleanup', icon: '🌟', earned: true, date: '2024-01-15' },
    { id: 2, name: 'Waste Warrior', icon: '♻️', earned: true, date: '2024-02-20' },
    { id: 3, name: '100kg Milestone', icon: '🏆', earned: true, date: '2024-03-10' },
    { id: 4, name: 'Team Leader', icon: '👑', earned: false, date: null },
    { id: 5, name: 'Eco Champion', icon: '🌍', earned: false, date: null },
    { id: 6, name: 'Month Streak', icon: '🔥', earned: true, date: '2024-03-25' }
  ]);

  // Enrolled events state
  const [enrolledEvents, setEnrolledEvents] = useState([
    {
      id: 1,
      title: 'Beach Cleanup Drive',
      date: '2024-11-15',
      location: 'Marina Beach, Chennai',
      status: 'upcoming',
      waste: 0
    },
    {
      id: 2,
      title: 'Park Cleanup Initiative',
      date: '2024-11-08',
      location: 'Central Park',
      status: 'completed',
      waste: 45.5
    },
    {
      id: 3,
      title: 'River Bank Cleanup',
      date: '2024-10-28',
      location: 'Adyar River',
      status: 'completed',
      waste: 78.2
    }
  ]);

  // Event history for timeline
  const [eventHistory, setEventHistory] = useState([
    {
      id: 1,
      date: '2024-11-08',
      event: 'Park Cleanup Initiative',
      waste: 45.5,
      participants: 23,
      impact: 'High'
    },
    {
      id: 2,
      date: '2024-10-28',
      event: 'River Bank Cleanup',
      waste: 78.2,
      participants: 45,
      impact: 'Very High'
    },
    {
      id: 3,
      date: '2024-10-15',
      event: 'Community Garden Cleanup',
      waste: 34.8,
      participants: 18,
      impact: 'Medium'
    }
  ]);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      navigate('/login');
    } else {
      setUsername(user);
      setUserData(prev => ({
        ...prev,
        name: user,
        email: `${user}@example.com`
      }));
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    if (previewUrl) {
      setUserData(prev => ({ ...prev, avatar: previewUrl }));
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // API call to save profile would go here
    setIsEditMode(false);
    // Mock success notification
    alert('Profile updated successfully!');
  };

  const getStatusColor = (status) => {
    return status === 'upcoming' 
      ? 'bg-blue-100 text-blue-700 border-blue-300' 
      : 'bg-green-100 text-green-700 border-green-300';
  };

  const getImpactColor = (impact) => {
    const colors = {
      'Low': 'text-yellow-600',
      'Medium': 'text-orange-600',
      'High': 'text-green-600',
      'Very High': 'text-purple-600'
    };
    return colors[impact] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-8 shadow"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative">
              <div className="relative">
                <img
                  src={previewUrl || userData.avatar}
                  alt="User Avatar"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-purple-500 shadow-lg object-cover"
                />
                <label className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-2xl">📷</span>
                </label>
              </div>
              {previewUrl && (
                <button
                  onClick={handleAvatarUpload}
                  className="mt-2 px-4 py-1 bg-green-600 text-white border-2 border-gray-900 rounded-lg text-sm hover:bg-green-700 transition-all"
                >
                  Save Avatar
                </button>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditMode ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900 text-2xl font-bold"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={userData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="Location"
                  />
                  <textarea
                    value={userData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="Bio"
                    rows="3"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient-primary">
                    {userData.name || username}
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">{userData.email}</p>
                  {userData.location && (
                    <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                      📍 {userData.location}
                    </p>
                  )}
                  {userData.bio && (
                    <p className="text-gray-700 mt-3 max-w-2xl">{userData.bio}</p>
                  )}
                </>
              )}
            </div>

            {/* Edit Button */}
            <div className="flex gap-3">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-green-600 text-white border-2 border-gray-900 rounded-lg hover:bg-green-700 transition-all"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    ✖ Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-6 py-2 bg-blue-600 text-black
                   border-2 border-gray-900 rounded-lg hover:bg-blue-700 transition-all"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-3xl font-bold text-purple-600">{stats.eventsAttended}</h3>
              <p className="text-sm text-gray-600">Events Attended</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-3xl font-bold text-green-600">{stats.wasteCollected}kg</h3>
              <p className="text-sm text-gray-600">Waste Collected</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-3xl font-bold text-blue-600">{stats.co2Saved}kg</h3>
              <p className="text-sm text-gray-600">CO₂ Saved</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-3xl font-bold text-orange-600">{stats.hoursVolunteered}h</h3>
              <p className="text-sm text-gray-600">Hours Volunteered</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌳</span>
              </div>
              <h3 className="text-3xl font-bold text-emerald-600">{stats.treesEquivalent}</h3>
              <p className="text-sm text-gray-600">Trees Equivalent</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  🏆
                </span>
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                        : 'bg-white border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-gray-600">
                            Earned: {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                        {!achievement.earned && (
                          <p className="text-xs text-gray-500">🔒 Locked</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enrolled Events & Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Enrolled Events */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  📅
                </span>
                My Events
              </h2>
              <div className="space-y-4">
                {enrolledEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          📍 {event.location}
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          📆 {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        {event.status === 'completed' && (
                          <p className="text-green-600 text-sm mt-2 font-semibold">
                            ♻️ Collected: {event.waste}kg
                          </p>
                        )}
                      </div>
                      <button className="bg-blue-600 text-black border-2 border-gray-900 py-2 px-6 rounded-lg hover:bg-blue-700 transition-all">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Event History Timeline */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  📊
                </span>
                Event History
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-green-400"></div>
                
                <div className="space-y-6">
                  {eventHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative pl-20"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-5 w-6 h-6 bg-gradient-primary rounded-full border-4 border-white shadow"></div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{item.event}</h4>
                            <p className="text-sm text-gray-600">
                              📅 {new Date(item.date).toLocaleDateString()}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-2">
                              <span className="text-sm text-gray-700">
                                ♻️ {item.waste}kg collected
                              </span>
                              <span className="text-sm text-gray-700">
                                👥 {item.participants} participants
                              </span>
                              <span className={`text-sm font-semibold ${getImpactColor(item.impact)}`}>
                                ⚡ {item.impact} Impact
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
