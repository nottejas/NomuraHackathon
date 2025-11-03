import React from 'react';
import WeatherWidget from '../components/WeatherWidget';

function WeatherPage() {
  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <WeatherWidget location="Chennai, India" />
      </div>
    </div>
  );
}

export default WeatherPage;
