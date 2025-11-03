import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [weather, setWeather] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Mock event data - replace with API call
  useEffect(() => {
    fetchEventDetails();
    fetchWeather();
  }, [eventId]);

  const fetchEventDetails = async () => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setEvent({
        id: eventId || 1,
        title: 'Beach Cleanup Mega Drive 2024',
        description: 'Join us for the biggest beach cleanup event of the year! We aim to collect over 500kg of waste and make our beaches pristine again. This event is perfect for families, students, and anyone passionate about environmental conservation.',
        fullDescription: `
          Our annual Beach Cleanup Mega Drive is back! This year, we're targeting Marina Beach, one of the most beautiful yet polluted beaches in Chennai. 
          
          What to Expect:
          • Professional equipment provided (gloves, bags, pickers)
          • Free refreshments and lunch
          • Live music and entertainment
          • Educational workshops on marine conservation
          • Certificate of participation
          • Prizes for top contributors
          
          Environmental Impact:
          Last year, we collected over 400kg of waste, prevented an estimated 300kg of CO₂ emissions, and cleaned a 2km stretch of beach. This year, we aim even higher!
          
          What to Bring:
          • Comfortable clothing and shoes
          • Sun protection (hat, sunscreen)
          • Water bottle (we have refill stations)
          • Positive attitude and enthusiasm!
        `,
        date: '2024-11-25T09:00:00',
        endTime: '2024-11-25T14:00:00',
        location: 'Marina Beach, Chennai',
        coordinates: { lat: 13.0524, lng: 80.2825 },
        organizer: 'Green Warriors Foundation',
        organizerAvatar: 'https://ui-avatars.com/api/?name=Green+Warriors&background=10b981&color=fff',
        heroImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1200',
        wasteType: ['Plastic', 'Metal', 'Paper'],
        targetWaste: 500,
        currentWaste: 0,
        maxParticipants: 200,
        currentParticipants: 87,
        difficulty: 'Easy',
        ageRestriction: 'All ages welcome',
        status: 'upcoming',
        tags: ['Beach', 'Coastal', 'Family-Friendly', 'Educational'],
        participants: [
          { id: 1, name: 'Rajesh Kumar', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=667eea&color=fff' },
          { id: 2, name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=f59e0b&color=fff' },
          { id: 3, name: 'Amit Patel', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff' },
          { id: 4, name: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=ef4444&color=fff' },
          { id: 5, name: 'Mohammed Ali', avatar: 'https://ui-avatars.com/api/?name=Mohammed+Ali&background=8b5cf6&color=fff' }
        ],
        gallery: [
          'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400',
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
          'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400',
          'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400'
        ]
      });

      setComments([
        {
          id: 1,
          user: 'Ananya Reddy',
          avatar: 'https://ui-avatars.com/api/?name=Ananya+Reddy&background=667eea&color=fff',
          comment: 'Super excited for this event! Been to the last 3 cleanups and they were amazing!',
          time: '2 hours ago',
          likes: 12
        },
        {
          id: 2,
          user: 'Vikram Singh',
          avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=f59e0b&color=fff',
          comment: 'Will there be parking available nearby? Planning to bring my family.',
          time: '5 hours ago',
          likes: 8
        },
        {
          id: 3,
          user: 'Meera Krishnan',
          avatar: 'https://ui-avatars.com/api/?name=Meera+Krishnan&background=10b981&color=fff',
          comment: 'First time participating! Any tips for beginners?',
          time: '1 day ago',
          likes: 15
        }
      ]);

      setLoading(false);
    }, 1000);
  };

  const fetchWeather = async () => {
    // Mock weather data - replace with actual weather API
    setWeather({
      temp: 28,
      condition: 'Partly Cloudy',
      icon: '⛅',
      humidity: 75,
      windSpeed: 12,
      forecast: [
        { day: 'Mon', temp: 28, icon: '⛅' },
        { day: 'Tue', temp: 29, icon: '☀️' },
        { day: 'Wed', temp: 27, icon: '🌧️' },
        { day: 'Thu', temp: 26, icon: '⛅' },
        { day: 'Fri', temp: 28, icon: '☀️' }
      ]
    });
  };

  // Countdown Timer
  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const difference = new Date(event.date) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [event]);

  const handleEnroll = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
      return;
    }

    try {
      // API call to enroll
      setIsEnrolled(true);
      alert('Successfully enrolled! See you at the event! 🎉');
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
      return;
    }

    const newComment = {
      id: comments.length + 1,
      user: username,
      avatar: `https://ui-avatars.com/api/?name=${username}&background=667eea&color=fff`,
      comment: comment,
      time: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing cleanup event: ${event?.title}`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-96 rounded-3xl overflow-hidden mb-8"
        >
          <img
            src={event.heroImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent">
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-500/30 backdrop-blur-sm border border-purple-500/50 rounded-full text-sm text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">{event.title}</h1>
              <p className="text-xl text-gray-200">Organized by {event.organizer}</p>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-center mb-4 text-gradient-primary">Event Starts In</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">{timeLeft.days}</div>
              <div className="text-sm text-gray-400">Days</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">{timeLeft.hours}</div>
              <div className="text-sm text-gray-400">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-400">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-400">Seconds</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  📋
                </span>
                About This Event
              </h2>
              <p className="text-gray-300 mb-4">{event.description}</p>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-line">{event.fullDescription}</div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  📍
                </span>
                Location
              </h2>
              <div className="h-64 rounded-lg overflow-hidden mb-4">
                <MapContainer
                  center={[event.coordinates.lat, event.coordinates.lng]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[event.coordinates.lat, event.coordinates.lng]}>
                    <Popup>{event.location}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <p className="text-gray-300 flex items-center gap-2">
                <span className="text-xl">📍</span>
                {event.location}
              </p>
            </motion.div>

            {/* Participants */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                  👥
                </span>
                Participants ({event.currentParticipants}/{event.maxParticipants})
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {event.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-2 bg-slate-800/50 rounded-full pr-4">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-sm text-gray-300">{participant.name}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-full text-white font-bold text-sm">
                  +{event.currentParticipants - event.participants.length}
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all"
                  style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  📸
                </span>
                Past Events Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  💬
                </span>
                Discussion ({comments.length})
              </h2>

              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts or ask questions..."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="3"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={c.avatar}
                        alt={c.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-white">{c.user}</h4>
                          <span className="text-xs text-gray-500">{c.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{c.comment}</p>
                        <button className="text-xs text-gray-400 hover:text-purple-400 transition-colors">
                          ❤️ {c.likes} likes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-white font-semibold">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-white font-semibold">
                      {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-xs text-gray-400">Target</p>
                    <p className="text-white font-semibold">{event.targetWaste}kg waste</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-xs text-gray-400">Difficulty</p>
                    <p className="text-white font-semibold">{event.difficulty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">👶</span>
                  <div>
                    <p className="text-xs text-gray-400">Age Restriction</p>
                    <p className="text-white font-semibold">{event.ageRestriction}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                disabled={isEnrolled}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isEnrolled
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'btn-gradient hover:shadow-lg'
                }`}
              >
                {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
              </button>

              {/* Share Buttons */}
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-3">Share this event:</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all"
                  >
                    <span className="text-xl">📘</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg transition-all"
                  >
                    <span className="text-xl">🐦</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="p-3 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all"
                  >
                    <span className="text-xl">💬</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-3 bg-blue-700/20 hover:bg-blue-700/30 rounded-lg transition-all"
                  >
                    <span className="text-xl">💼</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Weather Widget */}
            {weather && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">{weather.icon}</span>
                  Weather Forecast
                </h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-white">{weather.temp}°C</div>
                  <p className="text-gray-400">{weather.condition}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <p className="text-xs text-gray-400">Humidity</p>
                    <p className="text-white font-semibold">{weather.humidity}%</p>
                  </div>
                  <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                    <p className="text-xs text-gray-400">Wind</p>
                    <p className="text-white font-semibold">{weather.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-gray-400 mb-1">{day.day}</p>
                      <p className="text-2xl mb-1">{day.icon}</p>
                      <p className="text-sm text-white">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Organizer Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Organizer</h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={event.organizerAvatar}
                  alt={event.organizer}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-white">{event.organizer}</h4>
                  <p className="text-xs text-gray-400">Community Leader</p>
                </div>
              </div>
              <button className="w-full py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white hover:bg-slate-700/50 transition-all">
                Contact Organizer
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
