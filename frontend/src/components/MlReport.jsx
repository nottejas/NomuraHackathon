import React, { useState } from "react";
import axios from "axios";

const MlReport = () => {
  const [formData, setFormData] = useState({ 
    Plastic: 0, 
    Metal: 0, 
    Paper: 0, 
    Glass: 0,
    Organic: 0 
  });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wasteCategories = [
    { name: 'Plastic', emoji: '♻️', color: 'from-blue-500 to-cyan-500', icon: '🥤' },
    { name: 'Metal', emoji: '⚙️', color: 'from-gray-500 to-slate-600', icon: '🔩' },
    { name: 'Paper', emoji: '📄', color: 'from-amber-500 to-yellow-600', icon: '📰' },
    { name: 'Glass', emoji: '🍾', color: 'from-emerald-500 to-green-600', icon: '🫙' },
    { name: 'Organic', emoji: '🌿', color: 'from-lime-500 to-green-500', icon: '🥬' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post("http://localhost:5000/api/aimodel/generate-ml-report", {
        litterInput: formData,
      });
      setReport(res.data);
    } catch (error) {
      console.error("Error generating report:", error);
      setError("Failed to generate report. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (category, value) => {
    setFormData({ ...formData, [category]: parseFloat(value) || 0 });
  };

  const totalWaste = Object.values(formData).reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-8 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-gradient-primary">
                🤖 AI Cleanup Report Generator
              </h1>
              <p className="text-xl text-gray-400">
                Track your environmental impact with machine learning predictions
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center animate-float">
              <span className="text-3xl">📊</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass rounded-2xl p-6 animate-slideInLeft">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                📝
              </span>
              Enter Waste Data
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {wasteCategories.map((category) => (
                <div key={category.name} className="card">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.name} (kg)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData[category.name]}
                      onChange={(e) => handleInputChange(category.name, e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="0.0"
                    />
                    <div className={`absolute right-3 top-3 w-8 h-8 bg-gradient-to-r ${category.color} rounded-full opacity-20`}></div>
                  </div>
                </div>
              ))}

              {/* Total Display */}
              <div className="bg-gradient-primary rounded-xl p-4 mt-6">
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold">Total Waste:</span>
                  <span className="text-2xl font-bold">{totalWaste.toFixed(2)} kg</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || totalWaste === 0}
                className="w-full btn-gradient py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </span>
                ) : (
                  '🚀 Generate ML Report'
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-4 animate-fadeIn">
                <p className="text-red-300 flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Report Display */}
          <div className="animate-slideInRight">
            {report ? (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                    ✨
                  </span>
                  Report Results
                </h2>

                {/* Success Message */}
                <div className="bg-gradient-success rounded-xl p-6 mb-6 animate-fadeIn">
                  <p className="text-white text-lg font-medium text-center">
                    {report.message}
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="space-y-4">
                  <div className="card bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">CO₂ Emissions Prevented</p>
                        <p className="text-4xl font-bold text-green-400">
                          {report.emission} kg
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🌍</span>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Environmental Risk Score</p>
                        <p className="text-4xl font-bold text-purple-400">
                          {report.riskScore}
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">⚡</span>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Total Waste Processed</p>
                        <p className="text-4xl font-bold text-blue-400">
                          {totalWaste.toFixed(2)} kg
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">♻️</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Comparison */}
                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-3">💡 Impact Comparison:</p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>🚗 Equivalent to {(report.emission * 4.5).toFixed(1)} km not driven by car</p>
                    <p>🌳 Same impact as planting {(report.emission / 20).toFixed(1)} trees</p>
                    <p>💡 Saves energy equal to {(report.emission * 1.2).toFixed(1)} kWh</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                    <span className="text-6xl">📊</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-400">No Report Generated</h3>
                  <p className="text-gray-500">
                    Enter waste data and click "Generate ML Report" to see your environmental impact
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MlReport;
