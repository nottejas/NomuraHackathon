import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function EventGallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // all, before-after, contest, my-uploads
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadTags, setUploadTags] = useState([]);
  const [filterTag, setFilterTag] = useState(null);

  // Mock photo gallery data
  const [photos, setPhotos] = useState([
    {
      id: 1,
      type: 'before-after',
      before: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
      after: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800',
      location: 'Marina Beach, Chennai',
      date: '2024-03-15',
      eventName: 'Beach Cleanup Drive',
      caption: 'Amazing transformation! 500kg of waste removed.',
      tags: ['Beach', 'Plastic', 'Community'],
      uploadedBy: 'Rajesh Kumar',
      likes: 234,
      views: 1543
    },
    {
      id: 2,
      type: 'regular',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      location: 'Central Park, Mumbai',
      date: '2024-03-20',
      eventName: 'Park Cleanup Initiative',
      caption: 'Team work makes the dream work! 🌳',
      tags: ['Park', 'Teamwork', 'Nature'],
      uploadedBy: 'Priya Sharma',
      likes: 189,
      views: 876,
      contest: false
    },
    {
      id: 3,
      type: 'contest',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
      location: 'Adyar River, Chennai',
      date: '2024-03-22',
      eventName: 'River Cleanup Campaign',
      caption: 'The impact we can make together is incredible!',
      tags: ['River', 'Water', 'Impact'],
      uploadedBy: 'Amit Patel',
      votes: 412,
      views: 2134,
      contest: true,
      contestRank: 1
    },
    {
      id: 4,
      type: 'before-after',
      before: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800',
      after: 'https://images.unsplash.com/photo-1563772660-8a7fc2e7f29f?w=800',
      location: 'City Park, Bangalore',
      date: '2024-03-18',
      eventName: 'Urban Green Initiative',
      caption: 'From trash to treasure - what a difference!',
      tags: ['Urban', 'Transformation', 'Green'],
      uploadedBy: 'Sarah Johnson',
      likes: 298,
      views: 1205
    },
    {
      id: 5,
      type: 'contest',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
      location: 'Street Cleanup, Delhi',
      date: '2024-03-25',
      eventName: 'City Streets Revival',
      caption: 'Every small action counts towards a cleaner city',
      tags: ['Street', 'Urban', 'Community'],
      uploadedBy: 'Mohammed Ali',
      votes: 378,
      views: 1876,
      contest: true,
      contestRank: 2
    },
    {
      id: 6,
      type: 'regular',
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800',
      location: 'Coastal Area, Goa',
      date: '2024-03-28',
      eventName: 'Coastal Cleanup Drive',
      caption: 'Protecting our oceans, one beach at a time 🌊',
      tags: ['Coast', 'Ocean', 'Beach'],
      uploadedBy: 'Ananya Reddy',
      likes: 445,
      views: 2341,
      contest: false
    },
    {
      id: 7,
      type: 'contest',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      location: 'Nandi Hills, Bangalore',
      date: '2024-03-30',
      eventName: 'Mountain Trail Cleanup',
      caption: 'Keeping our mountains pristine for future generations',
      tags: ['Mountain', 'Trail', 'Nature'],
      uploadedBy: 'Vikram Singh',
      votes: 356,
      views: 1654,
      contest: true,
      contestRank: 3
    },
    {
      id: 8,
      type: 'regular',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      location: 'Beach Resort, Kerala',
      date: '2024-04-02',
      eventName: 'Beach Conservation Project',
      caption: 'Beautiful beaches deserve our protection 🏝️',
      tags: ['Beach', 'Conservation', 'Kerala'],
      uploadedBy: 'Meera Krishnan',
      likes: 521,
      views: 2876,
      contest: false
    }
  ]);

  const allTags = [...new Set(photos.flatMap(photo => photo.tags))];

  const filteredPhotos = photos.filter(photo => {
    if (activeTab === 'before-after') return photo.type === 'before-after';
    if (activeTab === 'contest') return photo.contest === true;
    if (activeTab === 'my-uploads') return photo.uploadedBy === 'You'; // Mock user check
    if (filterTag) return photo.tags.includes(filterTag);
    return true;
  });

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleLike = (photoId) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: (photo.likes || 0) + 1 }
        : photo
    ));
  };

  const handleVote = (photoId) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, votes: (photo.votes || 0) + 1 }
        : photo
    ));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (tag) => {
    if (tag && !uploadTags.includes(tag)) {
      setUploadTags([...uploadTags, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setUploadTags(uploadTags.filter(t => t !== tag));
  };

  const handleUploadSubmit = () => {
    if (!uploadFile || !uploadCaption) {
      alert('Please select a photo and add a caption');
      return;
    }

    const newPhoto = {
      id: photos.length + 1,
      type: 'regular',
      image: uploadPreview,
      location: 'Your Location',
      date: new Date().toISOString().split('T')[0],
      eventName: 'Recent Event',
      caption: uploadCaption,
      tags: uploadTags,
      uploadedBy: 'You',
      likes: 0,
      views: 0,
      contest: false
    };

    setPhotos([newPhoto, ...photos]);
    setShowUploadModal(false);
    setUploadFile(null);
    setUploadPreview(null);
    setUploadCaption('');
    setUploadTags([]);
    alert('Photo uploaded successfully! 📸');
  };

  const contestPhotos = photos.filter(p => p.contest).sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-gray-900">
                📸 Event Gallery
              </h1>
              <p className="text-xl text-gray-600">
                Share and celebrate our environmental impact
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-blue-600 text-black border-2 border-gray-900 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              📤 Upload Photo
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {[
            { key: 'all', label: 'All Photos', icon: '🖼️' },
            { key: 'before-after', label: 'Before & After', icon: '🔄' },
            { key: 'contest', label: 'Photo Contest', icon: '🏆' },
            { key: 'my-uploads', label: 'My Uploads', icon: '👤' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setFilterTag(null); }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-black border-2 border-gray-900'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tag Filter */}
        {activeTab === 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-sm text-gray-600 mb-2">Filter by tag:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTag(null)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  !filterTag
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    filterTag === tag
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contest Leaderboard */}
        {activeTab === 'contest' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🏆 Contest Leaderboard</h2>
            <div className="space-y-3">
              {contestPhotos.slice(0, 3).map((photo, index) => (
                <div
                  key={photo.id}
                  className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="text-3xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{photo.eventName}</h4>
                    <p className="text-sm text-gray-600">by {photo.uploadedBy}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{photo.votes}</div>
                    <div className="text-xs text-gray-600">votes</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Instagram-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handlePhotoClick(photo)}
              className="relative aspect-square cursor-pointer rounded-lg overflow-hidden group"
            >
              {/* Before/After Layout */}
              {photo.type === 'before-after' ? (
                <div className="grid grid-cols-2 gap-0.5 h-full">
                  <div className="relative">
                    <img
                      src={photo.before}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-500/80 rounded text-white text-xs font-bold">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={photo.after}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/80 rounded text-white text-xs font-bold">
                      AFTER
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Contest Badge */}
              {photo.contest && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1">
                  🏆 {photo.contestRank && `#${photo.contestRank}`}
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold mb-2 line-clamp-2">{photo.caption}</p>
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>❤️ {photo.likes || photo.votes || 0}</span>
                    <span>👁️ {photo.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center shadow"
          >
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share your cleanup photos!</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-blue-600 text-black border-2 border-gray-900 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Upload Your First Photo
            </button>
          </motion.div>
        )}

        {/* Lightbox Viewer */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div className="lg:col-span-2 bg-black flex items-center justify-center p-4">
                    {selectedPhoto.type === 'before-after' ? (
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <div>
                          <div className="text-red-400 font-bold mb-2 text-center">BEFORE</div>
                          <img
                            src={selectedPhoto.before}
                            alt="Before"
                            className="w-full rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="text-green-400 font-bold mb-2 text-center">AFTER</div>
                          <img
                            src={selectedPhoto.after}
                            alt="After"
                            className="w-full rounded-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={selectedPhoto.image}
                        alt={selectedPhoto.caption}
                        className="max-w-full max-h-[70vh] object-contain rounded-lg"
                      />
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{selectedPhoto.eventName}</h3>
                      <button
                        onClick={() => setSelectedPhoto(null)}
                        className="text-gray-400 hover:text-white text-2xl"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold">
                          {selectedPhoto.uploadedBy[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{selectedPhoto.uploadedBy}</p>
                        <p className="text-xs text-gray-600">{selectedPhoto.date}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{selectedPhoto.caption}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedPhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-gray-700">
                      <span>📍 {selectedPhoto.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      {selectedPhoto.contest ? (
                        <button
                          onClick={() => handleVote(selectedPhoto.id)}
                          className="flex-1 py-3 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-all font-semibold"
                        >
                          🏆 Vote ({selectedPhoto.votes})
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLike(selectedPhoto.id)}
                          className="flex-1 py-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all font-semibold"
                        >
                          ❤️ Like ({selectedPhoto.likes || 0})
                        </button>
                      )}
                      <button className="px-4 py-3 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all">
                        📤
                      </button>
                    </div>

                    <div className="text-sm text-gray-400">
                      <p>👁️ {selectedPhoto.views} views</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">📤 Upload Photo</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">Select Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {uploadPreview && (
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="mt-4 w-full rounded-lg max-h-64 object-cover"
                    />
                  )}
                </div>

                {/* Caption */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">Caption</label>
                  <textarea
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="Share the story behind this photo..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows="3"
                  />
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {uploadTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm flex items-center gap-2"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-purple-400 hover:text-purple-200"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.filter(t => !uploadTags.includes(t)).slice(0, 6).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="px-3 py-1 bg-slate-700 text-gray-300 text-sm rounded-full hover:bg-slate-600"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleUploadSubmit}
                  disabled={!uploadFile || !uploadCaption}
                  className="w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📸 Upload Photo
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EventGallery;
