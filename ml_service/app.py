# app.py
from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)
model = joblib.load("emission_model.pkl")
columns = joblib.load("model_columns.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # e.g., {"Plastic":2, "Metal":1}
    # Convert to DataFrame
    df = pd.DataFrame([data])
    df = pd.get_dummies(df).reindex(columns=columns, fill_value=0)
    pred = model.predict(df)[0]
    return jsonify({"predicted_emission_CO2e": round(pred, 2)})

@app.route("/train", methods=["POST"])
def retrain():
    # Optional: support retraining with updated dataset
    return jsonify({"msg": "retraining not implemented"})

if __name__ == "__main__":
    app.run(port=5001)
