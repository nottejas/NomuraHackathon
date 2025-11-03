import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function RewardsSystem() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('achievements'); // achievements, shop, milestones
  const [userPoints, setUserPoints] = useState(2450);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Achievements data
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: 'First Cleanup',
      description: 'Participate in your first cleanup event',
      icon: '🌟',
      points: 100,
      unlocked: true,
      unlockedDate: '2024-01-15',
      rarity: 'common',
      category: 'Beginner'
    },
    {
      id: 2,
      name: 'Waste Warrior',
      description: 'Collect 100kg of waste',
      icon: '♻️',
      points: 200,
      unlocked: true,
      unlockedDate: '2024-02-20',
      rarity: 'uncommon',
      category: 'Collection'
    },
    {
      id: 3,
      name: '100kg Milestone',
      description: 'Reach 100kg total waste collected',
      icon: '🏆',
      points: 300,
      unlocked: true,
      unlockedDate: '2024-03-10',
      rarity: 'rare',
      category: 'Milestone'
    },
    {
      id: 4,
      name: 'Team Leader',
      description: 'Lead 5 cleanup events',
      icon: '👑',
      points: 500,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'epic',
      category: 'Leadership'
    },
    {
      id: 5,
      name: 'Eco Champion',
      description: 'Save 500kg of CO₂ emissions',
      icon: '🌍',
      points: 400,
      unlocked: false,
      progress: 187,
      maxProgress: 500,
      rarity: 'epic',
      category: 'Impact'
    },
    {
      id: 6,
      name: 'Month Streak',
      description: 'Participate in events for 30 consecutive days',
      icon: '🔥',
      points: 350,
      unlocked: false,
      progress: 15,
      maxProgress: 30,
      rarity: 'rare',
      category: 'Consistency'
    },
    {
      id: 7,
      name: 'Beach Guardian',
      description: 'Complete 10 beach cleanup events',
      icon: '🏖️',
      points: 250,
      unlocked: true,
      unlockedDate: '2024-03-25',
      rarity: 'uncommon',
      category: 'Specialty'
    },
    {
      id: 8,
      name: 'Legendary',
      description: 'Collect 1000kg of waste',
      icon: '💎',
      points: 1000,
      unlocked: false,
      progress: 245,
      maxProgress: 1000,
      rarity: 'legendary',
      category: 'Milestone'
    }
  ]);

  // Reward Shop Items
  const shopItems = [
    {
      id: 1,
      name: 'Eco T-Shirt',
      description: 'Premium organic cotton t-shirt with environmental message',
      image: '👕',
      points: 500,
      stock: 15,
      category: 'Merchandise'
    },
    {
      id: 2,
      name: 'Reusable Water Bottle',
      description: 'Stainless steel insulated water bottle',
      image: '🍾',
      points: 300,
      stock: 25,
      category: 'Essentials'
    },
    {
      id: 3,
      name: 'Tree Planting Certificate',
      description: 'Plant a tree in your name',
      image: '🌳',
      points: 400,
      stock: 100,
      category: 'Impact'
    },
    {
      id: 4,
      name: 'Bamboo Cutlery Set',
      description: 'Eco-friendly portable cutlery set',
      image: '🥄',
      points: 250,
      stock: 30,
      category: 'Essentials'
    },
    {
      id: 5,
      name: 'Event VIP Pass',
      description: 'VIP access to premium cleanup events',
      image: '🎫',
      points: 600,
      stock: 10,
      category: 'Premium'
    },
    {
      id: 6,
      name: 'Eco Tote Bag',
      description: 'Reusable canvas tote bag',
      image: '👜',
      points: 200,
      stock: 50,
      category: 'Merchandise'
    },
    {
      id: 7,
      name: 'Solar Power Bank',
      description: 'Portable solar charger',
      image: '🔋',
      points: 800,
      stock: 8,
      category: 'Premium'
    },
    {
      id: 8,
      name: 'Wildflower Seeds Pack',
      description: 'Native wildflower seeds for pollinators',
      image: '🌻',
      points: 150,
      stock: 75,
      category: 'Impact'
    }
  ];

  // Milestones
  const milestones = [
    {
      id: 1,
      name: 'Bronze Contributor',
      description: 'Earn 1000 points',
      icon: '🥉',
      points: 1000,
      achieved: true,
      reward: 'Bronze Badge + 100 Bonus Points'
    },
    {
      id: 2,
      name: 'Silver Contributor',
      description: 'Earn 2500 points',
      icon: '🥈',
      points: 2500,
      achieved: false,
      progress: userPoints,
      reward: 'Silver Badge + 250 Bonus Points'
    },
    {
      id: 3,
      name: 'Gold Contributor',
      description: 'Earn 5000 points',
      icon: '🥇',
      points: 5000,
      achieved: false,
      progress: userPoints,
      reward: 'Gold Badge + 500 Bonus Points'
    },
    {
      id: 4,
      name: 'Platinum Legend',
      description: 'Earn 10000 points',
      icon: '💫',
      points: 10000,
      achieved: false,
      progress: userPoints,
      reward: 'Platinum Badge + 1000 Bonus Points'
    }
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'from-gray-500 to-gray-600',
      uncommon: 'from-green-500 to-green-600',
      rare: 'from-blue-500 to-blue-600',
      epic: 'from-purple-500 to-purple-600',
      legendary: 'from-yellow-500 to-orange-500'
    };
    return colors[rarity] || colors.common;
  };

  const getRarityBorder = (rarity) => {
    const colors = {
      common: 'border-gray-500/50',
      uncommon: 'border-green-500/50',
      rare: 'border-blue-500/50',
      epic: 'border-purple-500/50',
      legendary: 'border-yellow-500/50'
    };
    return colors[rarity] || colors.common;
  };

  const handleRedeemItem = (item) => {
    if (userPoints >= item.points) {
      setSelectedItem(item);
      // Show confirmation modal
      if (window.confirm(`Redeem ${item.name} for ${item.points} points?`)) {
        setUserPoints(userPoints - item.points);
        setCelebrationData({
          type: 'redeem',
          item: item.name,
          icon: item.image
        });
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } else {
      alert(`You need ${item.points - userPoints} more points to redeem this item!`);
    }
  };

  const handleShareAchievement = (achievement) => {
    const text = `I just unlocked the "${achievement.name}" achievement! 🎉 Join me in making a difference for the environment!`;
    const url = window.location.href;

    // Share options
    const shareOptions = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    // Show share modal (simplified - in production use a proper modal)
    const platform = prompt('Share on: 1-Twitter, 2-Facebook, 3-LinkedIn, 4-WhatsApp');
    const platforms = ['twitter', 'facebook', 'linkedin', 'whatsapp'];
    
    if (platform && platform >= 1 && platform <= 4) {
      window.open(shareOptions[platforms[platform - 1]], '_blank', 'width=600,height=400');
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Celebration Modal */}
        <AnimatePresence>
          {showCelebration && celebrationData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
              onClick={() => setShowCelebration(false)}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 text-center relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-9xl mb-4"
                >
                  {celebrationData.icon}
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {celebrationData.type === 'redeem' ? 'Redeemed!' : 'Congratulations!'}
                </h2>
                <p className="text-xl text-white">
                  {celebrationData.type === 'redeem' 
                    ? `You got ${celebrationData.item}!`
                    : `You unlocked ${celebrationData.item}!`
                  }
                </p>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, x: 0, opacity: 1 }}
                      animate={{ 
                        y: Math.random() * 300 - 150,
                        x: Math.random() * 300 - 150,
                        opacity: 0
                      }}
                      transition={{ duration: 2, delay: i * 0.1 }}
                      className="absolute top-1/2 left-1/2 text-4xl"
                    >
                      🎉
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-gray-900">
                🎖️ Rewards & Achievements
              </h1>
              <p className="text-xl text-gray-600">
                Earn points, unlock badges, and redeem rewards
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center shadow">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-3xl font-bold text-yellow-600">{userPoints.toLocaleString()}</div>
              <div className="text-sm text-gray-700">Your Points</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          {[
            { key: 'achievements', label: 'Achievements', icon: '🏆' },
            { key: 'shop', label: 'Reward Shop', icon: '🛍️' },
            { key: 'milestones', label: 'Milestones', icon: '🎯' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-black border-2 border-gray-900 shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-8">
            {/* Unlocked Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Unlocked ({unlockedAchievements.length}/{achievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {unlockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white border-2 ${getRarityBorder(achievement.rarity)} rounded-2xl p-6 shadow relative overflow-hidden`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}></div>
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-yellow-600 font-semibold">+{achievement.points} pts</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleShareAchievement(achievement)}
                      className="w-full py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-all text-sm font-semibold"
                    >
                      📤 Share
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Locked Achievements with Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                In Progress ({lockedAchievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow relative"
                  >
                    <div className="text-5xl mb-3 opacity-50">{achievement.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.name}</h3>
                    <p className="text-sm text-gray-700 mb-4">{achievement.description}</p>
                    
                    {/* Progress Bar */}
                    {achievement.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Progress</span>
                          <span className="text-xs text-gray-700">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full`}
                          ></motion.div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {Math.round((achievement.progress / achievement.maxProgress) * 100)}% Complete
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-yellow-600 font-semibold">+{achievement.points} pts</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Reward Shop Tab */}
        {activeTab === 'shop' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Spend your points on eco-friendly rewards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shopItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow cursor-pointer"
                >
                  <div className="text-6xl mb-4 text-center">{item.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-700 mb-4 h-12">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-yellow-600">{item.points}</span>
                      <span className="text-sm text-gray-600">pts</span>
                    </div>
                    <span className="text-xs text-gray-600">Stock: {item.stock}</span>
                  </div>

                  <button
                    onClick={() => handleRedeemItem(item)}
                    disabled={userPoints < item.points}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      userPoints >= item.points
                        ? 'bg-blue-600 text-black border-2 border-gray-900 hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= item.points ? '🎁 Redeem' : '🔒 Need More Points'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Major Milestones - Level Up Your Impact
            </h2>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border border-gray-200 rounded-2xl p-6 shadow ${
                  milestone.achieved ? 'border-2 border-green-500' : ''
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`text-7xl ${milestone.achieved ? '' : 'opacity-50'}`}>
                    {milestone.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{milestone.name}</h3>
                      {milestone.achieved && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-sm font-semibold">
                          ✓ Achieved
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{milestone.description}</p>
                    
                    {!milestone.achieved && milestone.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress to {milestone.points} points</span>
                          <span className="text-sm text-gray-900 font-semibold">
                            {milestone.progress}/{milestone.points}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(milestone.progress / milestone.points) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                          ></motion.div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {(milestone.points - milestone.progress).toLocaleString()} points to go
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                        <span className="text-yellow-700 font-semibold">Reward: {milestone.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RewardsSystem;
