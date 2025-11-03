import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventFilters from '../components/EventFilters';

function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock events data
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: 'Beach Cleanup Mega Drive 2024',
          description: 'Join us for the biggest beach cleanup event of the year!',
          date: '2024-11-25T09:00:00',
          location: 'Marina Beach, Chennai',
          distance: 5.2,
          wasteType: ['Plastic', 'Metal'],
          participants: 87,
          maxParticipants: 200,
          targetWaste: 500,
          difficulty: 'Easy',
          impact: 'high',
          popularity: 95,
          image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600',
          organizer: 'Green Warriors Foundation',
          status: 'upcoming'
        },
        {
          id: 2,
          title: 'Park Cleanup Initiative',
          description: 'Help us clean up Central Park and make it beautiful again.',
          date: '2024-11-20T08:00:00',
          location: 'Central Park, Mumbai',
          distance: 12.8,
          wasteType: ['Paper', 'Plastic', 'Organic'],
          participants: 45,
          maxParticipants: 100,
          targetWaste: 200,
          difficulty: 'Easy',
          impact: 'medium',
          popularity: 78,
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
          organizer: 'Eco Warriors',
          status: 'upcoming'
        },
        {
          id: 3,
          title: 'River Bank Cleanup',
          description: 'Clean the riverbanks and protect aquatic life.',
          date: '2024-11-22T07:00:00',
          location: 'Adyar River, Chennai',
          distance: 8.5,
          wasteType: ['Plastic', 'Metal', 'Glass'],
          participants: 62,
          maxParticipants: 150,
          targetWaste: 400,
          difficulty: 'Medium',
          impact: 'high',
          popularity: 88,
          image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600',
          organizer: 'River Guardians',
          status: 'upcoming'
        },
        {
          id: 4,
          title: 'Mountain Trail Cleanup',
          description: 'Trek and clean the beautiful mountain trails.',
          date: '2024-11-28T06:00:00',
          location: 'Nandi Hills, Bangalore',
          distance: 45.3,
          wasteType: ['Plastic', 'Paper'],
          participants: 28,
          maxParticipants: 80,
          targetWaste: 150,
          difficulty: 'Hard',
          impact: 'medium',
          popularity: 65,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
          organizer: 'Mountain Cleaners',
          status: 'upcoming'
        },
        {
          id: 5,
          title: 'Coastal Cleanup Campaign',
          description: 'Massive coastal cleanup drive across multiple beaches.',
          date: '2024-11-30T09:00:00',
          location: 'Goa Beaches',
          distance: 125.7,
          wasteType: ['Plastic', 'Metal', 'Glass'],
          participants: 156,
          maxParticipants: 300,
          targetWaste: 800,
          difficulty: 'Easy',
          impact: 'very-high',
          popularity: 98,
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
          organizer: 'Coastal Guardians',
          status: 'upcoming'
        },
        {
          id: 6,
          title: 'Urban Street Cleanup',
          description: 'Clean the city streets and public spaces.',
          date: '2024-11-18T08:30:00',
          location: 'MG Road, Bangalore',
          distance: 18.2,
          wasteType: ['Paper', 'Plastic', 'E-Waste'],
          participants: 34,
          maxParticipants: 75,
          targetWaste: 180,
          difficulty: 'Easy',
          impact: 'medium',
          popularity: 72,
          image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600',
          organizer: 'City Cleaners',
          status: 'upcoming'
        }
      ];
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...events];

    // Apply date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(event => 
        new Date(event.date) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(event => 
        new Date(event.date) <= new Date(filters.dateRange.end)
      );
    }

    // Apply distance filter
    if (filters.location.useMyLocation) {
      filtered = filtered.filter(event => 
        event.distance <= filters.location.maxDistance
      );
    }

    // Apply waste type filter
    if (filters.wasteTypes.length > 0) {
      filtered = filtered.filter(event =>
        event.wasteType.some(type => filters.wasteTypes.includes(type))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'popularity':
          comparison = b.popularity - a.popularity;
          break;
        case 'impact':
          const impactValues = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
          comparison = (impactValues[b.impact] || 0) - (impactValues[a.impact] || 0);
          break;
        case 'distance':
          comparison = a.distance - b.distance;
          break;
        default:
          comparison = 0;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredEvents(filtered);
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const getImpactColor = (impact) => {
    const colors = {
      'low': 'text-yellow-400',
      'medium': 'text-orange-400',
      'high': 'text-green-400',
      'very-high': 'text-purple-400'
    };
    return colors[impact] || 'text-gray-400';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Hard': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[difficulty] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-2 text-gradient-primary">Upcoming Events</h1>
          <p className="text-xl text-gray-400">
            Find and join cleanup events near you
          </p>
        </motion.div>

        {/* Filters */}
        <EventFilters onFilterChange={handleFilterChange} onSearch={handleSearch} />

        {/* View Toggle & Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Found <span className="text-white font-semibold">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-800/50 text-gray-400 border border-slate-600'
              }`}
            >
              <span className="text-xl">⊞</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-800/50 text-gray-400 border border-slate-600'
              }`}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {/* Events Grid/List */}
        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400">Try adjusting your filters or search criteria</p>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01 }}
                onClick={() => navigate(`/event/${event.id}`)}
                className="glass rounded-2xl overflow-hidden cursor-pointer group"
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-sm text-white">
                        📍 {event.distance}km
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </span>
                        <span className={`text-xs font-semibold ${getImpactColor(event.impact)}`}>
                          ⚡ {event.impact.replace('-', ' ')} impact
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300 flex items-center gap-2">
                          <span>📅</span>
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-gray-300 flex items-center gap-2">
                          <span>📍</span>
                          {event.location}
                        </p>
                        <p className="text-gray-300 flex items-center gap-2">
                          <span>👥</span>
                          {event.participants}/{event.maxParticipants} participants
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.wasteType.map((type, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // List View
                  <div className="flex gap-4 p-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{event.description}</p>
                        </div>
                        <span className="text-sm text-gray-400">📍 {event.distance}km</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>📍 {event.location}</span>
                        <span>👥 {event.participants}/{event.maxParticipants}</span>
                        <span className={getDifficultyColor(event.difficulty) + ' px-2 py-1 rounded-full text-xs border'}>
                          {event.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
