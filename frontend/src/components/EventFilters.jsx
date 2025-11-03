import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function EventFilters({ onFilterChange, onSearch }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    dateRange: {
      start: '',
      end: ''
    },
    location: {
      maxDistance: 50, // in km
      useMyLocation: false
    },
    wasteTypes: [],
    sortBy: 'date', // date, popularity, impact
    sortOrder: 'asc' // asc, desc
  });

  // Mock suggestions data
  const allSuggestions = [
    'Beach Cleanup Drive',
    'Park Cleanup Initiative',
    'River Bank Cleanup',
    'Mountain Trail Cleanup',
    'Community Garden Cleanup',
    'Coastal Cleanup',
    'Forest Conservation',
    'Lake Cleanup',
    'Urban Cleanup Drive'
  ];

  const wasteTypeOptions = [
    { name: 'Plastic', icon: '♻️', color: 'blue' },
    { name: 'Metal', icon: '⚙️', color: 'gray' },
    { name: 'Paper', icon: '📄', color: 'yellow' },
    { name: 'Glass', icon: '🍾', color: 'green' },
    { name: 'Organic', icon: '🌿', color: 'lime' },
    { name: 'E-Waste', icon: '💻', color: 'purple' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date', icon: '📅' },
    { value: 'popularity', label: 'Popularity', icon: '🔥' },
    { value: 'impact', label: 'Environmental Impact', icon: '🌍' },
    { value: 'distance', label: 'Distance', icon: '📍' }
  ];

  // Handle search with autocomplete
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allSuggestions.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleDateChange = (field, value) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleDistanceChange = (value) => {
    const newFilters = {
      ...filters,
      location: {
        ...filters.location,
        maxDistance: value
      }
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const toggleWasteType = (wasteType) => {
    const newWasteTypes = filters.wasteTypes.includes(wasteType)
      ? filters.wasteTypes.filter(w => w !== wasteType)
      : [...filters.wasteTypes, wasteType];

    const newFilters = {
      ...filters,
      wasteTypes: newWasteTypes
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSortChange = (sortBy) => {
    const newFilters = {
      ...filters,
      sortBy: sortBy
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const toggleSortOrder = () => {
    const newFilters = {
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleUseMyLocation = () => {
    const newFilters = {
      ...filters,
      location: {
        ...filters.location,
        useMyLocation: !filters.location.useMyLocation
      }
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }

    // Request geolocation if enabled
    if (!filters.location.useMyLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check permissions.');
        }
      );
    }
  };

  const clearAllFilters = () => {
    const resetFilters = {
      dateRange: { start: '', end: '' },
      location: { maxDistance: 50, useMyLocation: false },
      wasteTypes: [],
      sortBy: 'date',
      sortOrder: 'asc'
    };
    setFilters(resetFilters);
    setSearchQuery('');
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      gray: 'bg-gray-500/20 border-gray-500/50 text-gray-400',
      yellow: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
      green: 'bg-green-500/20 border-green-500/50 text-green-400',
      lime: 'bg-lime-500/20 border-lime-500/50 text-lime-400',
      purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400'
    };
    return colors[color] || 'bg-gray-500/20 border-gray-500/50 text-gray-400';
  };

  const activeFiltersCount = 
    (filters.dateRange.start ? 1 : 0) +
    (filters.dateRange.end ? 1 : 0) +
    (filters.location.useMyLocation ? 1 : 0) +
    filters.wasteTypes.length +
    (filters.sortBy !== 'date' ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            🔍
          </span>
          <div>
            <h2 className="text-2xl font-bold text-white">Search & Filters</h2>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-gray-400">{activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all text-sm"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all"
          >
            <span className="text-xl">{isExpanded ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar with Autocomplete */}
      <div className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search events by name, location, or keyword..."
            className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔎</span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                if (onSearch) onSearch('');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <span className="text-purple-400">🔍</span>
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filters Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-6"
          >
            {/* Date Range Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-xl">📅</span>
                Date Range
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">End Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-xl">📍</span>
                Location & Distance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleUseMyLocation}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      filters.location.useMyLocation
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-slate-800/50 border-slate-600 text-gray-400'
                    }`}
                  >
                    {filters.location.useMyLocation ? '✓ Using My Location' : '📍 Use My Location'}
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Maximum Distance</label>
                    <span className="text-white font-semibold">{filters.location.maxDistance} km</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={filters.location.maxDistance}
                    onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #667eea 0%, #667eea ${(filters.location.maxDistance / 200) * 100}%, #334155 ${(filters.location.maxDistance / 200) * 100}%, #334155 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5 km</span>
                    <span>100 km</span>
                    <span>200 km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Waste Type Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-xl">♻️</span>
                Waste Type Focus
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {wasteTypeOptions.map((type) => (
                  <motion.button
                    key={type.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleWasteType(type.name)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      filters.wasteTypes.includes(type.name)
                        ? getColorClass(type.color)
                        : 'bg-slate-800/50 border-slate-600 text-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-semibold">{type.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Sort By
              </h3>
              <div className="flex flex-wrap gap-3">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                      filters.sortBy === option.value
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-slate-800/50 border-slate-600 text-gray-400 hover:border-slate-500'
                    }`}
                  >
                    <span>{option.icon}</span>
                    <span className="font-semibold">{option.label}</span>
                  </button>
                ))}
                <button
                  onClick={toggleSortOrder}
                  className="px-4 py-2 rounded-lg border bg-slate-800/50 border-slate-600 text-gray-400 hover:border-slate-500 transition-all"
                  title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {filters.sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc'}
                </button>
              </div>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-primary/10 border border-purple-500/30 rounded-lg"
              >
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.dateRange.start && (
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300">
                      From: {new Date(filters.dateRange.start).toLocaleDateString()}
                    </span>
                  )}
                  {filters.dateRange.end && (
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300">
                      To: {new Date(filters.dateRange.end).toLocaleDateString()}
                    </span>
                  )}
                  {filters.location.useMyLocation && (
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300">
                      📍 Near Me ({filters.location.maxDistance}km)
                    </span>
                  )}
                  {filters.wasteTypes.map((type) => (
                    <span key={type} className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300">
                      {type}
                    </span>
                  ))}
                  {filters.sortBy !== 'date' && (
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-gray-300">
                      Sort: {filters.sortBy}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default EventFilters;
