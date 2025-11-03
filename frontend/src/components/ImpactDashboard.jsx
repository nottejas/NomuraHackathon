import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ImpactDashboard() {
  const [stats, setStats] = useState({
    totalWaste: 12450,
    co2Saved: 8967,
    eventsCompleted: 234,
    volunteersActive: 1543,
    treesEquivalent: 448,
    kmsNotDriven: 40350
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalWaste: 0,
    co2Saved: 0,
    eventsCompleted: 0,
    volunteersActive: 0
  });

  const timeSeriesChartRef = useRef(null);
  const wasteTypeChartRef = useRef(null);
  const impactComparisonRef = useRef(null);

  // Cleanup locations for heatmap
  const cleanupLocations = [
    { city: 'Chennai', coords: [13.0827, 80.2707], waste: 2450, events: 45 },
    { city: 'Mumbai', coords: [19.0760, 72.8777], waste: 3200, events: 67 },
    { city: 'Bangalore', coords: [12.9716, 77.5946], waste: 1890, events: 38 },
    { city: 'Delhi', coords: [28.7041, 77.1025], waste: 2100, events: 42 },
    { city: 'Hyderabad', coords: [17.3850, 78.4867], waste: 1450, events: 28 },
    { city: 'Pune', coords: [18.5204, 73.8567], waste: 980, events: 19 },
    { city: 'Kolkata', coords: [22.5726, 88.3639], waste: 1320, events: 25 },
    { city: 'Ahmedabad', coords: [23.0225, 72.5714], waste: 760, events: 15 }
  ];

  // Time series data
  const timeSeriesData = [
    { month: 'Jan', waste: 850, co2: 650 },
    { month: 'Feb', waste: 920, co2: 710 },
    { month: 'Mar', waste: 1050, co2: 820 },
    { month: 'Apr', waste: 1180, co2: 900 },
    { month: 'May', waste: 1320, co2: 1020 },
    { month: 'Jun', waste: 1450, co2: 1150 },
    { month: 'Jul', waste: 1380, co2: 1080 },
    { month: 'Aug', waste: 1520, co2: 1190 },
    { month: 'Sep', waste: 1680, co2: 1310 },
    { month: 'Oct', waste: 1850, co2: 1450 },
    { month: 'Nov', waste: 2050, co2: 1600 },
    { month: 'Dec', waste: 2250, co2: 1767 }
  ];

  // Waste type distribution
  const wasteTypeData = [
    { type: 'Plastic', value: 45, color: '#3b82f6' },
    { type: 'Paper', value: 20, color: '#f59e0b' },
    { type: 'Metal', value: 15, color: '#6b7280' },
    { type: 'Glass', value: 12, color: '#10b981' },
    { type: 'Organic', value: 8, color: '#84cc16' }
  ];

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        totalWaste: Math.floor(stats.totalWaste * progress),
        co2Saved: Math.floor(stats.co2Saved * progress),
        eventsCompleted: Math.floor(stats.eventsCompleted * progress),
        volunteersActive: Math.floor(stats.volunteersActive * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [stats]);

  // Time Series Chart
  useEffect(() => {
    if (!timeSeriesChartRef.current) return;

    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const width = timeSeriesChartRef.current.offsetWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(timeSeriesChartRef.current).selectAll('*').remove();

    const svg = d3.select(timeSeriesChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(timeSeriesData.map(d => d.month))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(timeSeriesData, d => Math.max(d.waste, d.co2))])
      .range([height, 0]);

    // Grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(''))
      .style('stroke', '#334155')
      .style('stroke-opacity', 0.3);

    // X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style('color', '#94a3b8')
      .selectAll('text')
      .style('fill', '#6b7280');

    // Y axis
    svg.append('g')
      .call(d3.axisLeft(y))
      .style('color', '#94a3b8')
      .selectAll('text')
      .style('fill', '#6b7280');

    // Waste line
    const wasteLine = d3.line()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y(d => y(d.waste))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(timeSeriesData)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3)
      .attr('d', wasteLine);

    // CO2 line
    const co2Line = d3.line()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y(d => y(d.co2))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(timeSeriesData)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('d', co2Line);

    // Waste dots
    svg.selectAll('.waste-dot')
      .data(timeSeriesData)
      .enter()
      .append('circle')
      .attr('class', 'waste-dot')
      .attr('cx', d => x(d.month) + x.bandwidth() / 2)
      .attr('cy', d => y(d.waste))
      .attr('r', 4)
      .attr('fill', '#10b981');

    // CO2 dots
    svg.selectAll('.co2-dot')
      .data(timeSeriesData)
      .enter()
      .append('circle')
      .attr('class', 'co2-dot')
      .attr('cx', d => x(d.month) + x.bandwidth() / 2)
      .attr('cy', d => y(d.co2))
      .attr('r', 4)
      .attr('fill', '#3b82f6');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, 0)`);

    legend.append('line')
      .attr('x1', 0).attr('x2', 30)
      .attr('y1', 0).attr('y2', 0)
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3);

    legend.append('text')
      .attr('x', 35).attr('y', 5)
      .text('Waste (kg)')
      .style('fill', '#374151')
      .style('font-size', '12px');

    legend.append('line')
      .attr('x1', 0).attr('x2', 30)
      .attr('y1', 20).attr('y2', 20)
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3);

    legend.append('text')
      .attr('x', 35).attr('y', 25)
      .text('CO₂ Saved (kg)')
      .style('fill', '#374151')
      .style('font-size', '12px');

  }, [timeSeriesData]);

  // Waste Type Pie Chart
  useEffect(() => {
    if (!wasteTypeChartRef.current) return;

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    d3.select(wasteTypeChartRef.current).selectAll('*').remove();

    const svg = d3.select(wasteTypeChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius * 0.9);
    const outerArc = d3.arc().innerRadius(radius * 0.95).outerRadius(radius * 0.95);

    const arcs = svg.selectAll('arc')
      .data(pie(wasteTypeData))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 2)
      .on('mouseenter', function() {
        d3.select(this).transition().duration(200)
          .attr('d', d3.arc().innerRadius(radius * 0.6).outerRadius(radius * 0.95));
      })
      .on('mouseleave', function() {
        d3.select(this).transition().duration(200).attr('d', arc);
      });

    // Labels
    arcs.append('text')
      .attr('transform', d => `translate(${outerArc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('fill', '#374151')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => `${d.data.value}%`);

    // Center text
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('fill', '#374151')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Waste Types');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .style('fill', '#6b7280')
      .style('font-size', '14px')
      .text('Distribution');

  }, [wasteTypeData]);

  // Impact Comparison Bar Chart
  useEffect(() => {
    if (!impactComparisonRef.current) return;

    const impactData = [
      { label: 'Km Not Driven', value: 40350, icon: '🚗', color: '#3b82f6' },
      { label: 'Trees Planted', value: 448, icon: '🌳', color: '#10b981' },
      { label: 'Energy Saved (kWh)', value: 10764, icon: '⚡', color: '#f59e0b' },
      { label: 'Bottles Recycled', value: 89400, icon: '♻️', color: '#8b5cf6' }
    ];

    const margin = { top: 20, right: 30, bottom: 60, left: 120 };
    const width = impactComparisonRef.current.offsetWidth - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;

    d3.select(impactComparisonRef.current).selectAll('*').remove();

    const svg = d3.select(impactComparisonRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(impactData, d => d.value)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(impactData.map(d => d.label))
      .range([0, height])
      .padding(0.2);

    // Bars
    svg.selectAll('.bar')
      .data(impactData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => y(d.label))
      .attr('width', d => x(d.value))
      .attr('height', y.bandwidth())
      .attr('fill', d => d.color)
      .attr('rx', 8);

    // Values
    svg.selectAll('.value')
      .data(impactData)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.value) + 10)
      .attr('y', d => y(d.label) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .style('fill', '#374151')
      .style('font-weight', 'bold')
      .text(d => d.value.toLocaleString());

    // Icons and labels
    svg.selectAll('.icon')
      .data(impactData)
      .enter()
      .append('text')
      .attr('class', 'icon')
      .attr('x', -10)
      .attr('y', d => y(d.label) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('font-size', '24px')
      .text(d => d.icon);

    svg.selectAll('.label')
      .data(impactData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', -40)
      .attr('y', d => y(d.label) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('fill', '#374151')
      .style('font-size', '12px')
      .text(d => d.label);

  }, []);

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-2 text-gray-900">
            🌍 Global Impact Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Real-time environmental impact visualization
          </p>
        </motion.div>

        {/* Real-time Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl">♻️</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-green-600 text-3xl font-bold mb-1">
                {animatedStats.totalWaste.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">kg Waste Collected</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl">🌍</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-blue-600 text-3xl font-bold mb-1">
                {animatedStats.co2Saved.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">kg CO₂ Prevented</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl">🎉</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-purple-600 text-3xl font-bold mb-1">
                {animatedStats.eventsCompleted.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Events Completed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl">👥</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-yellow-600 text-3xl font-bold mb-1">
                {animatedStats.volunteersActive.toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Active Volunteers</p>
            </div>
          </motion.div>
        </div>

        {/* Map and Pie Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                🗺️
              </span>
              Cleanup Locations Heatmap
            </h2>
            <div className="h-96 rounded-lg overflow-hidden">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {cleanupLocations.map((location, index) => (
                  <CircleMarker
                    key={index}
                    center={location.coords}
                    radius={Math.sqrt(location.waste) / 3}
                    fillColor="#10b981"
                    fillOpacity={0.6}
                    color="#ffffff"
                    weight={2}
                  >
                    <Popup>
                      <div className="text-center">
                        <h4 className="font-bold text-lg">{location.city}</h4>
                        <p className="text-sm">Waste: {location.waste}kg</p>
                        <p className="text-sm">Events: {location.events}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </motion.div>

          {/* Waste Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                📊
              </span>
              Waste Types
            </h2>
            <div ref={wasteTypeChartRef} className="flex justify-center"></div>
            <div className="mt-4 space-y-2">
              {wasteTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700 text-sm">{item.type}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Time Series Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              📈
            </span>
            Monthly Progress
          </h2>
          <div ref={timeSeriesChartRef}></div>
        </motion.div>

        {/* Impact Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              ⚡
            </span>
            Environmental Impact Comparison
          </h2>
          <div ref={impactComparisonRef}></div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🌳 Trees Equivalent</h3>
            <p className="text-4xl font-bold text-green-600 mb-2">{stats.treesEquivalent}</p>
            <p className="text-gray-600">
              Your CO₂ savings equal planting {stats.treesEquivalent} trees!
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🚗 Kilometers Not Driven</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {stats.kmsNotDriven.toLocaleString()}
            </p>
            <p className="text-gray-600">
              Equivalent to not driving a car for {stats.kmsNotDriven.toLocaleString()} km!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ImpactDashboard;
