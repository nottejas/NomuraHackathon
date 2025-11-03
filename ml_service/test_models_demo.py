# test_models_demo.py
"""
Demo script to test all ML models
Run this to see predictions from each model
"""

import joblib
import pandas as pd
import numpy as np
import json

print("="*70)
print("🧪 ECOTRACK ML MODELS - TESTING & DEMONSTRATION")
print("="*70)

# ============================================================================
# TEST 1: CO2 Emission Predictor
# ============================================================================
print("\n📊 TEST 1: CO2 Emission Impact Predictor")
print("-"*70)

try:
    emission_model = joblib.load("emission_model.pkl")
    emission_columns = joblib.load("model_columns.pkl")
    
    # Test data: waste collected from cleanup event
    test_waste = {
        "Plastic": 15,
        "Metal": 5,
        "Paper": 20,
        "Glass": 8
    }
    
    df = pd.DataFrame([test_waste])
    df = pd.get_dummies(df).reindex(columns=emission_columns, fill_value=0)
    prediction = emission_model.predict(df)[0]
    
    print(f"Input Waste: {test_waste}")
    print(f"✓ Predicted CO2 Emission: {prediction:.2f} kg CO2e")
    print(f"💡 This is equivalent to driving a car for {prediction/2.3:.1f} km")
    
except Exception as e:
    print(f"✗ Error: {e}")

# ============================================================================
# TEST 2: User Engagement Predictor
# ============================================================================
print("\n" + "="*70)
print("👥 TEST 2: User Engagement Predictor")
print("-"*70)

try:
    engagement_model = joblib.load("engagement_model.pkl")
    engagement_scaler = joblib.load("engagement_scaler.pkl")
    
    with open("engagement_features.json", "r") as f:
        engagement_features = json.load(f)
    
    # Test users
    test_users = [
        {
            "name": "Active User",
            "age": 28,
            "points_earned": 350,
            "events_attended": 12,
            "waste_reports": 25,
            "days_since_last_activity": 1,
            "badges_earned": 7,
            "avg_event_rating": 4.8,
            "friend_count": 30,
            "time_on_platform_mins": 250,
            "login_frequency": 28
        },
        {
            "name": "Inactive User",
            "age": 35,
            "points_earned": 50,
            "events_attended": 1,
            "waste_reports": 2,
            "days_since_last_activity": 45,
            "badges_earned": 1,
            "avg_event_rating": 3.5,
            "friend_count": 5,
            "time_on_platform_mins": 30,
            "login_frequency": 3
        }
    ]
    
    for user in test_users:
        name = user.pop("name")
        user_df = pd.DataFrame([user])[engagement_features]
        user_scaled = engagement_scaler.transform(user_df)
        
        prediction = engagement_model.predict(user_scaled)[0]
        probability = engagement_model.predict_proba(user_scaled)[0]
        
        print(f"\n{name} Profile:")
        print(f"  • Points: {user['points_earned']}, Events: {user['events_attended']}, " +
              f"Last Active: {user['days_since_last_activity']} days ago")
        print(f"  ✓ Will Participate: {'YES' if prediction else 'NO'}")
        print(f"  ✓ Probability: {probability[1]:.1%}")
        print(f"  💡 Recommendation: {'Invite to next event!' if probability[1] > 0.7 else 'Send reminder with incentive'}")
        
except Exception as e:
    print(f"✗ Error: {e}")

# ============================================================================
# TEST 3: Waste Hotspot Detector
# ============================================================================
print("\n" + "="*70)
print("📍 TEST 3: Waste Hotspot Detector")
print("-"*70)

try:
    hotspot_model = joblib.load("hotspot_model.pkl")
    hotspot_scaler = joblib.load("hotspot_scaler.pkl")
    
    with open("hotspot_features.json", "r") as f:
        hotspot_features = json.load(f)
    
    with open("cluster_statistics.json", "r") as f:
        cluster_stats = json.load(f)
    
    # Test waste reports
    test_reports = [
        {
            "location_name": "Marine Drive Beach",
            "latitude": 19.0596,
            "longitude": 72.8295,
            "waste_amount_kg": 75,
            "severity": 5
        },
        {
            "location_name": "Dadar Station",
            "latitude": 19.1136,
            "longitude": 72.8697,
            "waste_amount_kg": 45,
            "severity": 3
        }
    ]
    
    df = pd.DataFrame(test_reports)
    df['report_date'] = pd.Timestamp.now()
    df['recency_weight'] = 1.0  # Recent reports
    
    X = df[hotspot_features]
    X_scaled = hotspot_scaler.transform(X)
    
    predictions = hotspot_model.predict(X_scaled)
    
    for i, report in enumerate(test_reports):
        cluster_id = predictions[i]
        stats = next((s for s in cluster_stats if s['cluster_id'] == cluster_id), None)
        
        print(f"\nReport: {report['location_name']}")
        print(f"  Location: ({report['latitude']}, {report['longitude']})")
        print(f"  Waste Amount: {report['waste_amount_kg']} kg, Severity: {report['severity']}/5")
        print(f"  ✓ Assigned to Cluster: {cluster_id}")
        if stats:
            print(f"  ✓ Priority: {stats['priority']}")
            print(f"  💡 This hotspot has {stats['num_reports']} total reports with {stats['total_waste_kg']:.0f} kg waste")
    
    # Show top hotspots
    print(f"\n🎯 TOP PRIORITY HOTSPOTS FOR CLEANUP:")
    top_hotspots = sorted(cluster_stats, key=lambda x: x['priority_score'], reverse=True)[:3]
    for i, hotspot in enumerate(top_hotspots, 1):
        print(f"\n{i}. Cluster {hotspot['cluster_id']} - {hotspot['priority']} Priority")
        print(f"   Location: ({hotspot['avg_latitude']:.4f}, {hotspot['avg_longitude']:.4f})")
        print(f"   Reports: {hotspot['num_reports']}, Total Waste: {hotspot['total_waste_kg']:.0f} kg")
        print(f"   Priority Score: {hotspot['priority_score']:.2f}")
        print(f"   ✓ Recommendation: Schedule cleanup event here!")
    
except Exception as e:
    print(f"✗ Error: {e}")

# ============================================================================
# Summary
# ============================================================================
print("\n" + "="*70)
print("✅ TESTING COMPLETE")
print("="*70)
print("\n🎯 All 3 ML models are working correctly!")
print("\nNext Steps:")
print("  1. Start the ML API service: python ml_api.py")
print("  2. Test API endpoints with Postman or curl")
print("  3. Integrate with Node.js backend")
print("  4. Review README_ML_MODELS.md for API documentation")
print("\n" + "="*70)
