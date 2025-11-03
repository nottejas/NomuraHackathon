import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function WeatherWidget({ location = 'Chennai, India', compact = false }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullForecast, setShowFullForecast] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = () => {
    // Mock weather data - replace with actual API call
    setTimeout(() => {
      setCurrentWeather({
        temp: 28,
        feelsLike: 32,
        condition: 'Partly Cloudy',
        icon: '⛅',
        humidity: 75,
        windSpeed: 12,
        windDirection: 'NE',
        uvIndex: 7,
        visibility: 10,
        pressure: 1013,
        sunrise: '06:15 AM',
        sunset: '06:45 PM',
        airQuality: 'Moderate'
      });

      setForecast([
        { day: 'Mon', date: 'Nov 4', high: 30, low: 24, condition: 'Sunny', icon: '☀️', rain: 0, wind: 10, ideal: true },
        { day: 'Tue', date: 'Nov 5', high: 29, low: 23, condition: 'Partly Cloudy', icon: '⛅', rain: 10, wind: 12, ideal: true },
        { day: 'Wed', date: 'Nov 6', high: 27, low: 22, condition: 'Cloudy', icon: '☁️', rain: 20, wind: 15, ideal: false },
        { day: 'Thu', date: 'Nov 7', high: 26, low: 21, condition: 'Rainy', icon: '🌧️', rain: 80, wind: 20, ideal: false },
        { day: 'Fri', date: 'Nov 8', high: 28, low: 22, condition: 'Partly Cloudy', icon: '⛅', rain: 15, wind: 11, ideal: true },
        { day: 'Sat', date: 'Nov 9', high: 31, low: 25, condition: 'Sunny', icon: '☀️', rain: 0, wind: 8, ideal: true },
        { day: 'Sun', date: 'Nov 10', high: 32, low: 26, condition: 'Sunny', icon: '☀️', rain: 0, wind: 9, ideal: true }
      ]);

      setAlerts([
        { id: 1, type: 'warning', severity: 'moderate', title: 'High UV Index', message: 'UV index will reach 8 between 11 AM - 3 PM. Use sun protection.', icon: '☀️' },
        { id: 2, type: 'info', severity: 'low', title: 'Air Quality Alert', message: 'Moderate air quality expected. Consider masks for sensitive individuals.', icon: '💨' }
      ]);

      setLoading(false);
    }, 1000);
  };

  const getBestCleanupDays = () => {
    return forecast.filter(day => day.ideal).slice(0, 3);
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-700';
      case 'moderate': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentWeather.icon}</span>
            <div>
              <div className="text-2xl font-bold text-gray-900">{currentWeather.temp}°C</div>
              <div className="text-sm text-gray-600">{currentWeather.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">📍 {location}</div>
            <div className="text-xs text-gray-600">💧 {currentWeather.humidity}%</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Current Weather</h2>
            <p className="text-gray-600">📍 {location}</p>
          </div>
          <button
            onClick={fetchWeatherData}
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
            title="Refresh"
          >
            <span className="text-xl">🔄</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Weather Display */}
          <div className="flex items-center gap-4">
            <span className="text-8xl">{currentWeather.icon}</span>
            <div>
              <div className="text-5xl font-bold text-gray-900 mb-1">{currentWeather.temp}°C</div>
              <div className="text-xl text-gray-700 mb-2">{currentWeather.condition}</div>
              <div className="text-sm text-gray-600">Feels like {currentWeather.feelsLike}°C</div>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">💧 Humidity</div>
              <div className="text-xl font-bold text-blue-600">{currentWeather.humidity}%</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">💨 Wind</div>
              <div className="text-xl font-bold text-green-600">{currentWeather.windSpeed} km/h</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">☀️ UV Index</div>
              <div className="text-xl font-bold text-orange-600">{currentWeather.uvIndex}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">👁️ Visibility</div>
              <div className="text-xl font-bold text-purple-600">{currentWeather.visibility} km</div>
            </div>
          </div>
        </div>

        {/* Sun Times */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌅</span>
            <div>
              <div className="text-xs text-gray-600">Sunrise</div>
              <div className="text-sm font-semibold text-gray-900">{currentWeather.sunrise}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌇</span>
            <div>
              <div className="text-xs text-gray-600">Sunset</div>
              <div className="text-sm font-semibold text-gray-900">{currentWeather.sunset}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💨</span>
            <div>
              <div className="text-xs text-gray-600">Air Quality</div>
              <div className="text-sm font-semibold text-gray-900">{currentWeather.airQuality}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚠️</span>
            Weather Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{alert.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{alert.title}</h4>
                    <p className="text-sm opacity-90">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Best Days for Cleanup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>✨</span>
          Best Days for Cleanup
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getBestCleanupDays().map((day, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-100 to-blue-100 border border-green-300 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{day.day}</div>
                  <div className="text-xs text-gray-600">{day.date}</div>
                </div>
                <span className="text-3xl">{day.icon}</span>
              </div>
              <div className="text-sm text-gray-700 mb-2">{day.condition}</div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>H: {day.high}° L: {day.low}°</span>
                <span>💧 {day.rain}%</span>
              </div>
              <div className="mt-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded text-center font-semibold">
                ✓ Ideal Conditions
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">7-Day Forecast</h3>
          {forecast.length > 3 && !showFullForecast && (
            <button
              onClick={() => setShowFullForecast(true)}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              Show All →
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {(showFullForecast ? forecast : forecast.slice(0, 4)).map((day, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${
                day.ideal
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">{day.day}</div>
              <div className="text-xs text-gray-600 mb-2">{day.date}</div>
              <span className="text-4xl mb-2 block">{day.icon}</span>
              <div className="text-xs text-gray-700 mb-2">{day.condition}</div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-600">{day.high}°</span>
                <span className="text-blue-600">{day.low}°</span>
              </div>
              <div className="text-xs text-gray-600">💧 {day.rain}%</div>
              <div className="text-xs text-gray-600">💨 {day.wind} km/h</div>
            </div>
          ))}
        </div>

        {showFullForecast && forecast.length > 4 && (
          <button
            onClick={() => setShowFullForecast(false)}
            className="mt-4 w-full py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-semibold"
          >
            Show Less ↑
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default WeatherWidget;
