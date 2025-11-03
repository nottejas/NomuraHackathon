import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ResourceLibrary() {
  const [activeTab, setActiveTab] = useState('guides');
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const wasteGuides = [
    { id: 1, title: 'Complete Guide to Plastic Recycling', category: 'Plastic', icon: '♻️', description: 'Learn how to properly sort and recycle different types of plastic waste.', downloads: 1234, pdfUrl: '/resources/plastic-guide.pdf' },
    { id: 2, title: 'Paper & Cardboard Recycling', category: 'Paper', icon: '📄', description: 'Everything you need to know about recycling paper products.', downloads: 987, pdfUrl: '/resources/paper-guide.pdf' },
    { id: 3, title: 'Metal & Aluminum Recycling', category: 'Metal', icon: '⚙️', description: 'How to recycle metal cans, foils, and other metal items.', downloads: 654, pdfUrl: '/resources/metal-guide.pdf' },
    { id: 4, title: 'Glass Recycling Guide', category: 'Glass', icon: '🍾', description: 'Safe and effective glass recycling practices.', downloads: 543, pdfUrl: '/resources/glass-guide.pdf' },
    { id: 5, title: 'Organic Waste Composting', category: 'Organic', icon: '🌿', description: 'Turn your food scraps into nutrient-rich compost.', downloads: 876, pdfUrl: '/resources/composting-guide.pdf' },
    { id: 6, title: 'E-Waste Management', category: 'E-Waste', icon: '💻', description: 'Properly dispose of electronic waste.', downloads: 765, pdfUrl: '/resources/ewaste-guide.pdf' }
  ];

  const videoTutorials = [
    { id: 1, title: 'Waste Sorting 101', duration: '5:30', thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400', category: 'Beginner', views: 12500, description: 'Learn the basics of waste sorting and why it matters.' },
    { id: 2, title: 'DIY Composting at Home', duration: '8:15', thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400', category: 'Composting', views: 8900, description: 'Step-by-step guide to start composting in your backyard.' },
    { id: 3, title: 'Ocean Plastic Crisis Explained', duration: '10:45', thumbnail: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400', category: 'Education', views: 25000, description: 'Understanding the impact of plastic pollution on our oceans.' },
    { id: 4, title: 'Zero Waste Kitchen Tips', duration: '6:20', thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', category: 'Lifestyle', views: 15600, description: 'Practical tips to reduce waste in your kitchen.' },
    { id: 5, title: 'E-Waste Recycling Process', duration: '7:40', thumbnail: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400', category: 'Technology', views: 9200, description: 'See how electronic waste is recycled and recovered.' },
    { id: 6, title: 'Beach Cleanup Best Practices', duration: '4:55', thumbnail: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400', category: 'Events', views: 18700, description: 'Effective techniques for organizing beach cleanup events.' }
  ];

  const articles = [
    { id: 1, title: 'The Hidden Environmental Cost of Fast Fashion', author: 'Dr. Sarah Green', date: '2024-03-15', readTime: '8 min', category: 'Sustainability', image: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8584?w=400', excerpt: 'Fast fashion is one of the most polluting industries. Learn about its impact and how to make sustainable choices.', likes: 234, featured: true },
    { id: 2, title: '10 Simple Ways to Reduce Plastic Use Today', author: 'Rajesh Kumar', date: '2024-03-18', readTime: '5 min', category: 'Tips', image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400', excerpt: 'Small changes can make a big difference. Here are practical steps to reduce your plastic consumption.', likes: 567, featured: false },
    { id: 3, title: 'Success Story: How Mumbai Reduced Waste by 40%', author: 'Priya Sharma', date: '2024-03-20', readTime: '10 min', category: 'Case Study', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400', excerpt: 'A deep dive into Mumbai\'s innovative waste management program.', likes: 890, featured: true }
  ];

  const sustainabilityTips = [
    { id: 1, icon: '🛍️', title: 'Bring Your Own Bag', description: 'Always carry reusable bags for shopping to avoid single-use plastic.', difficulty: 'Easy', impact: 'High' },
    { id: 2, icon: '🍾', title: 'Use Reusable Water Bottles', description: 'Invest in a quality reusable bottle instead of buying bottled water.', difficulty: 'Easy', impact: 'High' },
    { id: 3, icon: '🥤', title: 'Say No to Straws', description: 'Refuse plastic straws or carry your own reusable metal/bamboo straw.', difficulty: 'Easy', impact: 'Medium' },
    { id: 4, icon: '🍱', title: 'Pack Your Lunch', description: 'Use reusable containers instead of disposable packaging for takeout.', difficulty: 'Easy', impact: 'Medium' },
    { id: 5, icon: '🌱', title: 'Start Composting', description: 'Turn food scraps into nutrient-rich compost for your plants.', difficulty: 'Medium', impact: 'High' },
    { id: 6, icon: '💡', title: 'Switch to LED Bulbs', description: 'LED bulbs use 75% less energy and last 25 times longer.', difficulty: 'Easy', impact: 'Medium' },
    { id: 7, icon: '🚿', title: 'Take Shorter Showers', description: 'Reduce water usage by limiting shower time to 5 minutes.', difficulty: 'Medium', impact: 'Medium' },
    { id: 8, icon: '🚲', title: 'Bike or Walk More', description: 'Choose active transport for short trips to reduce carbon emissions.', difficulty: 'Medium', impact: 'High' }
  ];

  const categories = ['all', 'Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-Waste'];

  const filteredGuides = wasteGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || guide.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVideos = videoTutorials.filter(video => video.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const getCategoryColor = (category) => {
    const colors = {
      Plastic: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
      Paper: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
      Metal: 'bg-gray-500/20 border-gray-500/30 text-gray-300',
      Glass: 'bg-green-500/20 border-green-500/30 text-green-300',
      Organic: 'bg-lime-500/20 border-lime-500/30 text-lime-300',
      'E-Waste': 'bg-purple-500/20 border-purple-500/30 text-purple-300'
    };
    return colors[category] || 'bg-slate-700 text-gray-300';
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-white">📚 Resource Library</h1>
          <p className="text-xl text-gray-300">Learn, explore, and make a difference</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 mb-8">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search resources..." className="w-full px-6 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mb-8">
          {[
            { key: 'guides', label: 'Recycling Guides', icon: '📖' },
            { key: 'videos', label: 'Video Tutorials', icon: '🎥' },
            { key: 'articles', label: 'Articles & Blog', icon: '📝' },
            { key: 'tips', label: 'Sustainability Tips', icon: '💡' }
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.key ? 'bg-gradient-primary text-white' : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {activeTab === 'guides' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button key={category} onClick={() => setFilterCategory(category)} className={`px-4 py-2 rounded-full text-sm transition-all ${filterCategory === category ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'}`}>
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
              <motion.div key={guide.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">{guide.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{guide.description}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs border mb-4 ${getCategoryColor(guide.category)}`}>{guide.category}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">📥 {guide.downloads} downloads</span>
                  <button onClick={() => alert(`Downloading: ${guide.title}.pdf`)} className="px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all text-sm">Download PDF</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div key={video.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.03 }} className="glass rounded-2xl overflow-hidden cursor-pointer">
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"><span className="text-3xl text-purple-600">▶</span></div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">{video.duration}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{video.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-400">{video.category}</span>
                    <span className="text-gray-400">👁️ {video.views.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">{article.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-3 mb-2">{article.title}</h3>
                  <p className="text-gray-300 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>By {article.author}</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-red-400">❤️ {article.likes}</span>
                    <span className="text-gray-400">{article.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityTips.map((tip, index) => (
              <motion.div key={tip.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }} className="glass rounded-2xl p-6 text-center">
                <div className="text-5xl mb-3">{tip.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{tip.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full ${tip.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{tip.difficulty}</span>
                  <span className={`px-2 py-1 rounded-full ${tip.impact === 'High' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>{tip.impact} Impact</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceLibrary;
