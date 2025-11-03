import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function BottomNav() {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/events', icon: '🎉', label: 'Events' },
    { path: '/ml-report', icon: '🤖', label: 'ML Report' },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/more', icon: '⚙️', label: 'More', isMore: true }
  ];

  const moreItems = [
    { path: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
    { path: '/teams', icon: '👥', label: 'Teams' },
    { path: '/rewards', icon: '🎖️', label: 'Rewards' },
    { path: '/gallery', icon: '📸', label: 'Gallery' },
    { path: '/resources', icon: '📚', label: 'Resources' },
    { path: '/impact', icon: '🌍', label: 'Impact' },
    { path: '/weather', icon: '☀️', label: 'Weather' },
    { path: '/feedback', icon: '⭐', label: 'Feedback' },
    { path: '/notifications', icon: '🔔', label: 'Notifications' },
    { path: '/maps', icon: '🗺️', label: 'Maps' },
    { path: '/sponsors', icon: '🤝', label: 'Sponsors' },
    { path: '/charts', icon: '📊', label: 'Analytics' }
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 z-40 lg:hidden"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.isMore ? '#' : item.path}
              onClick={(e) => {
                if (item.isMore) {
                  e.preventDefault();
                  setShowMore(!showMore);
                }
              }}
              className="flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all ${
                  isActive(item.path) && !item.isMore
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="relative">
                  <span className="text-2xl">{item.icon}</span>
                  {item.path === '/notifications' && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                      3
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive(item.path) && !item.isMore && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500 rounded-t-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* More Menu Modal */}
      <AnimatePresence>
        {showMore && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* More Menu */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-900/98 backdrop-blur-xl rounded-t-3xl z-50 lg:hidden"
            >
              <div className="max-w-lg mx-auto">
                {/* Handle */}
                <div className="flex justify-center pt-4 pb-2">
                  <div className="w-12 h-1.5 bg-slate-600 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3">
                  <h3 className="text-xl font-bold text-white">More Options</h3>
                  <button
                    onClick={() => setShowMore(false)}
                    className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-4 gap-3 px-4 pb-24 pt-2 max-h-[70vh] overflow-y-auto">
                  {moreItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMore(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all ${
                          isActive(item.path)
                            ? 'bg-purple-500/20 border-2 border-purple-500/50'
                            : 'bg-slate-800/50 hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="relative">
                          <span className="text-3xl">{item.icon}</span>
                          {item.path === '/notifications' && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                              3
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] font-medium text-center leading-tight ${
                          isActive(item.path) ? 'text-purple-300' : 'text-gray-300'
                        }`}>
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for content (to prevent content from being hidden behind bottom nav) */}
      <div className="h-16 lg:hidden"></div>
    </>
  );
}

export default BottomNav;
