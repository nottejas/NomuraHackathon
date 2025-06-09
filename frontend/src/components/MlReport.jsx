import React, { useState } from "react";
import axios from "axios";

const MlReport = () => {
  const [formData, setFormData] = useState({ plastic: 2, metal: 1 }); // user input
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/aimodel/generate-ml-report", {
        litterInput: formData,
      });
      setReport(res.data);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">AI Cleanup Report Generator</h2>

      {/* Simple Input Example */}
      <div className="mb-4">
        <label>Plastic (kg): </label>
        <input
          type="number"
          value={formData.plastic}
          onChange={(e) => setFormData({ ...formData, plastic: parseFloat(e.target.value) })}
        />
        <br />
        <label>Metal (kg): </label>
        <input
          type="number"
          value={formData.metal}
          onChange={(e) => setFormData({ ...formData, metal: parseFloat(e.target.value) })}
        />
      </div>

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Report
      </button>

      {loading && <p>Loading...</p>}

      {report && (
        <div className="mt-6 bg-green-100 p-4 rounded shadow">
          <p>📉 <strong>ML Predicted CO₂ Saved:</strong> {report.emission} kg</p>
          <p>💡 <strong>Risk Score Estimate:</strong> {report.riskScore}</p>
          <p className="italic text-green-700 mt-2">{report.message}</p>
        </div>
      )}
    </div>
  );
};

export default MlReport;
