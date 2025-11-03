import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function NotificationCenter() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    eventReminders: true,
    newEvents: true,
    achievements: true,
    announcements: true,
    emailNotifications: false,
    pushNotifications: true
  });

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'reminder',
        icon: '⏰',
        color: 'blue',
        title: 'Event Starting Soon!',
        message: 'Beach Cleanup Mega Drive starts in 2 hours. Get ready!',
        time: '10 minutes ago',
        read: false,
        actionLink: '/event/1',
        actionText: 'View Event'
      },
      {
        id: 2,
        type: 'achievement',
        icon: '🏆',
        color: 'yellow',
        title: 'Achievement Unlocked!',
        message: 'Congratulations! You earned the "100kg Milestone" badge.',
        time: '1 hour ago',
        read: false,
        actionLink: '/profile',
        actionText: 'View Badge'
      },
      {
        id: 3,
        type: 'new-event',
        icon: '🎉',
        color: 'purple',
        title: 'New Event Near You',
        message: 'Park Cleanup Initiative is happening 5km from your location.',
        time: '2 hours ago',
        read: false,
        actionLink: '/event/2',
        actionText: 'Enroll Now'
      },
      {
        id: 4,
        type: 'announcement',
        icon: '📢',
        color: 'green',
        title: 'Admin Announcement',
        message: 'New recycling guidelines released. Please review before your next event.',
        time: '5 hours ago',
        read: true,
        actionLink: '/resources',
        actionText: 'Read More'
      },
      {
        id: 5,
        type: 'reminder',
        icon: '📅',
        color: 'blue',
        title: 'Event Tomorrow',
        message: 'River Bank Cleanup is scheduled for tomorrow at 7:00 AM.',
        time: '8 hours ago',
        read: true,
        actionLink: '/event/3',
        actionText: 'View Details'
      },
      {
        id: 6,
        type: 'achievement',
        icon: '⭐',
        color: 'yellow',
        title: 'New Rank Achieved',
        message: 'You are now #15 on the monthly leaderboard!',
        time: '1 day ago',
        read: true,
        actionLink: '/leaderboard',
        actionText: 'View Leaderboard'
      },
      {
        id: 7,
        type: 'new-event',
        icon: '🌊',
        color: 'purple',
        title: 'Coastal Cleanup Drive',
        message: 'Massive cleanup event announced in Goa. 300 volunteers needed!',
        time: '1 day ago',
        read: true,
        actionLink: '/event/5',
        actionText: 'Learn More'
      },
      {
        id: 8,
        type: 'announcement',
        icon: '🎯',
        color: 'green',
        title: 'Platform Update',
        message: 'New features added: Enhanced leaderboard and event filters!',
        time: '2 days ago',
        read: true,
        actionLink: null,
        actionText: null
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAsUnread = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: false } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handlePreferenceChange = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-300',
      yellow: 'bg-yellow-100 border-yellow-300',
      purple: 'bg-purple-100 border-purple-300',
      green: 'bg-green-100 border-green-300',
      red: 'bg-red-100 border-red-300'
    };
    return colors[color] || 'bg-gray-100 border-gray-300';
  };

  const getIconBgColor = (color) => {
    const colors = {
      blue: 'bg-blue-200',
      yellow: 'bg-yellow-200',
      purple: 'bg-purple-200',
      green: 'bg-green-200',
      red: 'bg-red-200'
    };
    return colors[color] || 'bg-gray-200';
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-gray-900">
                🔔 Notifications
              </h1>
              <p className="text-xl text-gray-600">
                Stay updated with your events and achievements
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-full">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-900 font-semibold">{unreadCount} new</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 shadow"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {['all', 'unread', 'read'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === filterOption
                      ? 'bg-blue-600 text-black border-2 border-gray-900'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  {filterOption === 'unread' && unreadCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-600 rounded-full text-xs text-black">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                ⚙️ Preferences
              </button>
              {notifications.length > 0 && (
                <>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="px-4 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-all"
                    >
                      ✓ Mark All Read
                    </button>
                  )}
                  <button
                    onClick={handleClearAll}
                    className="px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition-all"
                  >
                    🗑️ Clear All
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6 shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'eventReminders', label: 'Event Reminders', icon: '⏰' },
                  { key: 'newEvents', label: 'New Events Near Me', icon: '🎉' },
                  { key: 'achievements', label: 'Achievement Alerts', icon: '🏆' },
                  { key: 'announcements', label: 'Admin Announcements', icon: '📢' },
                  { key: 'emailNotifications', label: 'Email Notifications', icon: '📧' },
                  { key: 'pushNotifications', label: 'Push Notifications', icon: '🔔' }
                ].map((pref) => (
                  <div
                    key={pref.key}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pref.icon}</span>
                      <span className="text-gray-900 font-medium">{pref.label}</span>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange(pref.key)}
                      className={`relative w-14 h-7 rounded-full transition-all ${
                        preferences[pref.key] ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          preferences[pref.key] ? 'translate-x-7' : ''
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center shadow"
            >
              <div className="text-6xl mb-4">🔕</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white border border-gray-200 rounded-2xl p-6 shadow border-l-4 ${
                    !notification.read ? getColorClasses(notification.color) : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${getIconBgColor(notification.color)} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl">{notification.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {notification.title}
                          </h4>
                          <p className="text-gray-700">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-600">{notification.time}</span>
                        
                        <div className="flex items-center gap-2">
                          {notification.actionLink && (
                            <button
                              onClick={() => navigate(notification.actionLink)}
                              className="px-4 py-1 bg-purple-100 text-purple-700 border border-purple-300 rounded-lg hover:bg-purple-200 transition-all text-sm font-semibold"
                            >
                              {notification.actionText}
                            </button>
                          )}
                          
                          {!notification.read ? (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-all text-sm"
                              title="Mark as read"
                            >
                              ✓
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMarkAsUnread(notification.id)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all text-sm"
                              title="Mark as unread"
                            >
                              ○
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition-all text-sm"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Real-time Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Real-time updates active</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotificationCenter;
