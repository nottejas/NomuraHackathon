const axios = require("axios");

async function predictEmission(input) {
  const res = await axios.post("http://localhost:5001/predict", input);
  return res.data.predicted_emission_CO2e;
}

module.exports = { predictEmission };
