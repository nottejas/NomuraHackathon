import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function EventFeedback() {
  const [activeTab, setActiveTab] = useState('submit'); // submit, reviews, issues
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [issueType, setIssueType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [attendedEvents] = useState([
    { id: 1, name: 'Beach Cleanup Drive', date: '2024-03-15', location: 'Marina Beach', hasReview: false },
    { id: 2, name: 'Park Cleanup Initiative', date: '2024-03-10', location: 'Central Park', hasReview: true },
    { id: 3, name: 'River Bank Cleanup', date: '2024-03-05', location: 'Adyar River', hasReview: false }
  ]);

  const [reviews] = useState([
    {
      id: 1,
      eventName: 'Beach Cleanup Mega Drive',
      eventDate: '2024-03-15',
      userName: 'Rajesh Kumar',
      userAvatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff',
      rating: 5,
      review: 'Absolutely amazing event! Well organized, plenty of equipment provided, and great team spirit. Collected over 200kg of waste!',
      photos: ['https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400', 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400'],
      date: '2024-03-16',
      helpful: 24,
      qualityScores: { organization: 5, equipment: 5, communication: 4, impact: 5 }
    },
    {
      id: 2,
      eventName: 'Park Cleanup Initiative',
      eventDate: '2024-03-10',
      userName: 'Priya Sharma',
      userAvatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff',
      rating: 4,
      review: 'Great event overall. Could use better signage for meeting points, but the volunteers were enthusiastic and made a real difference.',
      photos: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'],
      date: '2024-03-11',
      helpful: 18,
      qualityScores: { organization: 4, equipment: 4, communication: 3, impact: 4 }
    },
    {
      id: 3,
      eventName: 'River Bank Cleanup',
      eventDate: '2024-03-05',
      userName: 'Amit Patel',
      userAvatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff',
      rating: 5,
      review: 'Excellent initiative! The organizers were professional and the impact was visible immediately. Looking forward to more events like this.',
      photos: [],
      date: '2024-03-06',
      helpful: 31,
      qualityScores: { organization: 5, equipment: 5, communication: 5, impact: 5 }
    }
  ]);

  const [reportedIssues] = useState([
    { id: 1, event: 'Beach Cleanup Drive', type: 'Safety', description: 'Need more first aid kits', status: 'Resolved', date: '2024-03-14' },
    { id: 2, event: 'Park Cleanup', type: 'Equipment', description: 'Insufficient gloves for all participants', status: 'In Progress', date: '2024-03-09' },
    { id: 3, event: 'River Cleanup', type: 'Communication', description: 'Late start time notification', status: 'Under Review', date: '2024-03-04' }
  ]);

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedPhotos([...selectedPhotos, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }
    if (!reviewText.trim()) {
      alert('Please write a review');
      return;
    }

    alert('Thank you for your feedback! Your review has been submitted. ⭐');
    setShowSubmitModal(false);
    setRating(0);
    setReviewText('');
    setSelectedPhotos([]);
    setPhotoPreviews([]);
  };

  const handleSubmitIssue = () => {
    if (!issueType || !issueDescription.trim()) {
      alert('Please fill in all fields');
      return;
    }

    alert('Issue reported successfully. We\'ll look into this. 📝');
    setIssueType('');
    setIssueDescription('');
  };

  const handleSubmitSuggestion = () => {
    if (!suggestion.trim()) {
      alert('Please enter your suggestion');
      return;
    }

    alert('Thank you for your suggestion! We appreciate your input. 💡');
    setSuggestion('');
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      dist[review.rating]++;
    });
    return dist;
  };

  const distribution = getRatingDistribution();

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h1 className="text-5xl font-bold mb-2 text-gray-900">Event Feedback & Reviews</h1>
            <p className="text-xl text-gray-600">Share your experience and help us improve</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-8">
          {[
            { key: 'submit', label: 'Submit Review', icon: '✍️' },
            { key: 'reviews', label: 'All Reviews', icon: '📋' },
            { key: 'issues', label: 'Report Issue', icon: '⚠️' }
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.key ? 'bg-gradient-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Submit Review Tab */}
        {activeTab === 'submit' && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📝</div>
                <h2 className="text-2xl font-bold text-gray-900">Rate Your Recent Events</h2>
              </div>
              <div className="space-y-3">
                {attendedEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h3 className="font-bold text-gray-900">{event.name}</h3>
                      <p className="text-sm text-gray-600">{event.location} • {event.date}</p>
                    </div>
                    {event.hasReview ? (
                      <span className="px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg text-sm">✓ Reviewed</span>
                    ) : (
                      <button onClick={() => { setSelectedEvent(event); setShowSubmitModal(true); }} className="px-4 py-2 bg-purple-100 text-purple-700 border border-purple-300 rounded-lg hover:bg-purple-200 transition-all">Write Review</button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💡</div>
                <h2 className="text-2xl font-bold text-gray-900">Suggest Improvements</h2>
              </div>
              <textarea value={suggestion} onChange={(e) => setSuggestion(e.target.value)} placeholder="How can we make events better?" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-4" rows="4" />
              <button onClick={handleSubmitSuggestion} className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">Submit Suggestion</button>
            </motion.div>
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">📊</div>
                <h2 className="text-2xl font-bold text-gray-900">Overall Ratings</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-yellow-400 mb-2">{getAverageRating()}</div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-2xl ${star <= Math.round(getAverageRating()) ? 'text-yellow-400' : 'text-gray-600'}`}>⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600">{reviews.length} reviews</p>
                </div>
                <div className="lg:col-span-2 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-gray-900 w-12">{star} ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${reviews.length > 0 ? (distribution[star] / reviews.length) * 100 : 0}%` }}></div>
                      </div>
                      <span className="text-gray-600 w-12 text-right">{distribution[star]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {reviews.map((review, index) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <img src={review.userAvatar} alt={review.userName} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{review.userName}</h3>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`text-xl ${star <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <h4 className="font-semibold text-purple-600 mb-2">{review.eventName}</h4>
                    <p className="text-gray-700 mb-4">{review.review}</p>

                    {review.photos.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.photos.map((photo, i) => (
                          <img key={i} src={photo} alt="Event" className="w-24 h-24 object-cover rounded-lg" />
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {Object.entries(review.qualityScores).map(([key, score]) => (
                        <div key={key} className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-sm text-gray-900 font-semibold">{score}/5</div>
                          <div className="text-xs text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <button className="text-sm text-gray-600 hover:text-purple-600 transition-colors">👍 Helpful ({review.helpful})</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Report Issue Tab */}
        {activeTab === 'issues' && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900">Report an Issue</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Issue Type</label>
                  <select value={issueType} onChange={(e) => setIssueType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select issue type...</option>
                    <option value="Safety">Safety Concern</option>
                    <option value="Equipment">Equipment Issue</option>
                    <option value="Communication">Communication Problem</option>
                    <option value="Organization">Poor Organization</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Description</label>
                  <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} placeholder="Describe the issue..." className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" rows="4" />
                </div>
                <button onClick={handleSubmitIssue} className="px-6 py-3 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition-all font-semibold">Submit Issue Report</button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📋</div>
                <h2 className="text-2xl font-bold text-gray-900">Reported Issues</h2>
              </div>
              <div className="space-y-3">
                {reportedIssues.map((issue) => (
                  <div key={issue.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs ${issue.type === 'Safety' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{issue.type}</span>
                        <h4 className="font-semibold text-gray-900 mt-2">{issue.event}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${issue.status === 'Resolved' ? 'bg-green-100 text-green-700' : issue.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{issue.status}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{issue.description}</p>
                    <p className="text-xs text-gray-600">{issue.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Submit Review Modal */}
        <AnimatePresence>
          {showSubmitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSubmitModal(false)} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">✍️</div>
                  <h2 className="text-2xl font-bold text-gray-900">Review: {selectedEvent?.name}</h2>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)} className="text-4xl transition-transform hover:scale-110">
                        {star <= (hoverRating || rating) ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Your Review</label>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your experience..." className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" rows="4" />
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Upload Photos (Optional)</label>
                  <input type="file" accept="image/*" multiple onChange={handlePhotoSelect} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  {photoPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {photoPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                          <button onClick={() => handleRemovePhoto(index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setShowSubmitModal(false)} className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">Cancel</button>
                  <button onClick={handleSubmitReview} className="flex-1 px-4 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all font-semibold">Submit Review</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EventFeedback;
