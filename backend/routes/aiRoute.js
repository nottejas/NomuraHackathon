const express = require("express");
const router = express.Router();
const { predictEmission } = require("../models/aiModel");

router.post("/generate-ml-report", async (req, res) => {
  try {
    const input = req.body.litterInput;
    const emission = await predictEmission(input);

    const riskScore = Object.entries(input).reduce(
      (sum, [key, kg]) => sum + kg * (key === "Plastic" ? 4 : key === "Metal" ? 3 : 2),
      0
    );

    const message = `You cleaned ${Object.values(input).reduce((a, b) => a + b, 0)}kg, prevented ${emission}kg CO2e! 🎉`;

    res.json({ emission, riskScore, message });
  } catch (error) {
    console.error("Error generating ML report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
