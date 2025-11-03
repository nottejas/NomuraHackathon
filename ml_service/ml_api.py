# ml_api.py
"""
Unified ML API Service for EcoTrack Platform
Serves all 4 ML models:
1. CO2 Emission Impact Prediction
2. Waste Image Classification
3. User Engagement Prediction
4. Waste Hotspot Detection
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# ============================================================================
# MODEL 1: CO2 EMISSION IMPACT PREDICTION
# ============================================================================

try:
    emission_model = joblib.load("emission_model.pkl")
    emission_columns = joblib.load("model_columns.pkl")
    print("✓ Emission model loaded")
except:
    print("⚠ Emission model not found")
    emission_model = None

@app.route("/api/predict-emission", methods=["POST"])
def predict_emission():
    """
    Predict CO2 emission impact from waste items
    
    Request body:
    {
        "Plastic": 2,
        "Metal": 1,
        "Paper": 3,
        "Glass": 1
    }
    
    Response:
    {
        "predicted_emission_CO2e": 45.23,
        "status": "success"
    }
    """
    try:
        if emission_model is None:
            return jsonify({"error": "Emission model not loaded"}), 500
        
        data = request.json
        df = pd.DataFrame([data])
        df = pd.get_dummies(df).reindex(columns=emission_columns, fill_value=0)
        pred = emission_model.predict(df)[0]
        
        return jsonify({
            "predicted_emission_CO2e": round(float(pred), 2),
            "status": "success",
            "message": f"This waste will produce approximately {round(pred, 2)} kg of CO2 equivalent"
        })
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

# ============================================================================
# MODEL 2: WASTE IMAGE CLASSIFICATION
# ============================================================================

@app.route("/api/classify-waste", methods=["POST"])
def classify_waste():
    """
    Classify waste from image
    
    Request: multipart/form-data with 'image' file
    
    Response:
    {
        "category": "Plastic",
        "confidence": 0.87,
        "all_probabilities": {...},
        "status": "success"
    }
    """
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        
        # For demo purposes, return mock prediction
        # In production, this would use the trained CNN model
        categories = ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-waste']
        mock_probs = np.random.dirichlet(np.ones(6))
        predicted_idx = np.argmax(mock_probs)
        
        result = {
            "category": categories[predicted_idx],
            "confidence": float(mock_probs[predicted_idx]),
            "all_probabilities": {
                cat: float(prob) for cat, prob in zip(categories, mock_probs)
            },
            "status": "success",
            "message": f"Detected waste type: {categories[predicted_idx]}"
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

# ============================================================================
# MODEL 3: USER ENGAGEMENT PREDICTION
# ============================================================================

try:
    engagement_model = joblib.load("engagement_model.pkl")
    engagement_scaler = joblib.load("engagement_scaler.pkl")
    with open("engagement_features.json", "r") as f:
        engagement_features = json.load(f)
    print("✓ Engagement model loaded")
except:
    print("⚠ Engagement model not found")
    engagement_model = None

@app.route("/api/predict-engagement", methods=["POST"])
def predict_engagement():
    """
    Predict user engagement likelihood
    
    Request body:
    {
        "age": 28,
        "points_earned": 150,
        "events_attended": 5,
        "waste_reports": 12,
        "days_since_last_activity": 3,
        "badges_earned": 4,
        "avg_event_rating": 4.5,
        "friend_count": 15,
        "time_on_platform_mins": 120,
        "login_frequency": 20
    }
    
    Response:
    {
        "will_participate": true,
        "participation_probability": 0.85,
        "confidence": 0.85,
        "recommendation": "High priority for event invitation",
        "status": "success"
    }
    """
    try:
        if engagement_model is None:
            return jsonify({"error": "Engagement model not loaded"}), 500
        
        user_data = request.json
        user_df = pd.DataFrame([user_data])[engagement_features]
        user_scaled = engagement_scaler.transform(user_df)
        
        prediction = engagement_model.predict(user_scaled)[0]
        probability = engagement_model.predict_proba(user_scaled)[0]
        
        result = {
            "will_participate": bool(prediction),
            "participation_probability": float(probability[1]),
            "non_participation_probability": float(probability[0]),
            "confidence": float(max(probability)),
            "recommendation": (
                "High priority for event invitation" if probability[1] > 0.7 
                else "Moderate priority" if probability[1] > 0.5 
                else "Send reminder with incentives"
            ),
            "status": "success"
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

@app.route("/api/predict-engagement-batch", methods=["POST"])
def predict_engagement_batch():
    """
    Predict engagement for multiple users
    
    Request body:
    {
        "users": [
            {...user1_data...},
            {...user2_data...}
        ]
    }
    """
    try:
        if engagement_model is None:
            return jsonify({"error": "Engagement model not loaded"}), 500
        
        users_data = request.json.get("users", [])
        results = []
        
        for user_data in users_data:
            user_df = pd.DataFrame([user_data])[engagement_features]
            user_scaled = engagement_scaler.transform(user_df)
            
            prediction = engagement_model.predict(user_scaled)[0]
            probability = engagement_model.predict_proba(user_scaled)[0]
            
            result = {
                "user_id": user_data.get("user_id", "unknown"),
                "will_participate": bool(prediction),
                "participation_probability": float(probability[1]),
                "confidence": float(max(probability))
            }
            results.append(result)
        
        return jsonify({
            "predictions": results,
            "total_users": len(results),
            "high_probability_count": sum(1 for r in results if r["participation_probability"] > 0.7),
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

# ============================================================================
# MODEL 4: WASTE HOTSPOT DETECTION
# ============================================================================

try:
    hotspot_model = joblib.load("hotspot_model.pkl")
    hotspot_scaler = joblib.load("hotspot_scaler.pkl")
    with open("hotspot_features.json", "r") as f:
        hotspot_features = json.load(f)
    with open("cluster_statistics.json", "r") as f:
        cluster_statistics = json.load(f)
    print("✓ Hotspot model loaded")
except:
    print("⚠ Hotspot model not found")
    hotspot_model = None

@app.route("/api/detect-hotspots", methods=["POST"])
def detect_hotspots():
    """
    Predict hotspot cluster for new waste reports
    
    Request body:
    {
        "reports": [
            {
                "latitude": 19.0760,
                "longitude": 72.8777,
                "waste_amount_kg": 50,
                "severity": 4,
                "report_date": "2024-11-03"
            }
        ]
    }
    
    Response:
    {
        "predictions": [...],
        "status": "success"
    }
    """
    try:
        if hotspot_model is None:
            return jsonify({"error": "Hotspot model not loaded"}), 500
        
        reports = request.json.get("reports", [])
        df = pd.DataFrame(reports)
        
        # Calculate recency weight
        df['report_date'] = pd.to_datetime(df['report_date'])
        days_old = (pd.Timestamp.now() - df['report_date']).dt.days
        df['recency_weight'] = 1 / (1 + days_old / 30)
        
        X = df[hotspot_features]
        X_scaled = hotspot_scaler.transform(X)
        
        predictions = hotspot_model.predict(X_scaled)
        
        results = []
        for i, cluster_id in enumerate(predictions):
            stats = next((s for s in cluster_statistics if s['cluster_id'] == cluster_id), None)
            
            result = {
                "report_index": i,
                "cluster_id": int(cluster_id),
                "priority": stats['priority'] if stats else 'Unknown',
                "hotspot_location": {
                    "latitude": stats['avg_latitude'],
                    "longitude": stats['avg_longitude']
                } if stats else None,
                "cluster_info": {
                    "num_reports": stats['num_reports'],
                    "total_waste_kg": stats['total_waste_kg'],
                    "avg_severity": stats['avg_severity']
                } if stats else None
            }
            results.append(result)
        
        return jsonify({
            "predictions": results,
            "total_reports": len(results),
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

@app.route("/api/hotspots/top-priority", methods=["GET"])
def get_top_hotspots():
    """
    Get top priority hotspots for cleanup planning
    
    Query params: ?top_n=5
    
    Response:
    {
        "hotspots": [...],
        "status": "success"
    }
    """
    try:
        if hotspot_model is None:
            return jsonify({"error": "Hotspot model not loaded"}), 500
        
        top_n = int(request.args.get('top_n', 5))
        top_hotspots = cluster_statistics[:top_n]
        
        recommendations = []
        for i, hotspot in enumerate(top_hotspots, 1):
            recommendations.append({
                "rank": i,
                "cluster_id": hotspot['cluster_id'],
                "location": {
                    "latitude": hotspot['avg_latitude'],
                    "longitude": hotspot['avg_longitude']
                },
                "priority": hotspot['priority'],
                "num_reports": hotspot['num_reports'],
                "total_waste_kg": hotspot['total_waste_kg'],
                "avg_severity": hotspot['avg_severity'],
                "priority_score": hotspot['priority_score'],
                "recommendation": f"Schedule cleanup event near this location"
            })
        
        return jsonify({
            "hotspots": recommendations,
            "total_clusters": len(cluster_statistics),
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

# ============================================================================
# HEALTH CHECK & INFO ENDPOINTS
# ============================================================================

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    models_status = {
        "emission_model": emission_model is not None,
        "engagement_model": engagement_model is not None,
        "hotspot_model": hotspot_model is not None,
        "waste_classifier": False  # Image model requires TensorFlow
    }
    
    return jsonify({
        "status": "healthy",
        "service": "EcoTrack ML API",
        "models": models_status,
        "timestamp": datetime.now().isoformat()
    })

@app.route("/api/models/info", methods=["GET"])
def models_info():
    """Get information about available models"""
    models = [
        {
            "name": "CO2 Emission Predictor",
            "endpoint": "/api/predict-emission",
            "method": "POST",
            "description": "Predicts CO2 emissions from waste items",
            "status": "active" if emission_model else "not loaded"
        },
        {
            "name": "Waste Image Classifier",
            "endpoint": "/api/classify-waste",
            "method": "POST",
            "description": "Classifies waste type from images",
            "status": "demo mode"
        },
        {
            "name": "User Engagement Predictor",
            "endpoint": "/api/predict-engagement",
            "method": "POST",
            "description": "Predicts user participation likelihood",
            "status": "active" if engagement_model else "not loaded"
        },
        {
            "name": "Waste Hotspot Detector",
            "endpoint": "/api/detect-hotspots",
            "method": "POST",
            "description": "Identifies waste accumulation hotspots",
            "status": "active" if hotspot_model else "not loaded"
        }
    ]
    
    return jsonify({
        "models": models,
        "total_models": len(models),
        "active_models": sum(1 for m in models if m["status"] == "active")
    })

# ============================================================================
# RUN SERVER
# ============================================================================

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 EcoTrack ML API Service Starting...")
    print("="*60)
    print("\nAvailable Endpoints:")
    print("  • POST /api/predict-emission")
    print("  • POST /api/classify-waste")
    print("  • POST /api/predict-engagement")
    print("  • POST /api/predict-engagement-batch")
    print("  • POST /api/detect-hotspots")
    print("  • GET  /api/hotspots/top-priority")
    print("  • GET  /api/health")
    print("  • GET  /api/models/info")
    print("\n" + "="*60)
    
    app.run(host='0.0.0.0', port=5001, debug=True)
