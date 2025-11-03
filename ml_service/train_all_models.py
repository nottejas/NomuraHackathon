# train_all_models.py
"""
Train all EcoTrack ML models at once
"""

import sys
import time

print("="*70)
print("🚀 ECOTRACK ML MODELS - TRAINING ALL MODELS")
print("="*70)
print()

# Model 1: CO2 Emission Predictor
print("📊 MODEL 1: CO2 Emission Impact Predictor")
print("-"*70)
try:
    import train_model
    print("✓ CO2 Emission model trained successfully!\n")
except Exception as e:
    print(f"✗ Error training CO2 model: {e}\n")

time.sleep(1)

# Model 2: User Engagement Predictor
print("\n" + "="*70)
print("👥 MODEL 2: User Engagement Predictor")
print("-"*70)
try:
    import user_engagement_predictor as uep
    model, scaler, features = uep.train_engagement_model()
    print("\n✓ User Engagement model trained successfully!\n")
except Exception as e:
    print(f"✗ Error training Engagement model: {e}\n")

time.sleep(1)

# Model 3: Waste Hotspot Detector
print("\n" + "="*70)
print("📍 MODEL 3: Waste Hotspot Detector")
print("-"*70)
try:
    import waste_hotspot_detector as whd
    kmeans, scaler, stats, df = whd.train_hotspot_detector()
    whd.visualize_hotspots(df)
    print("\n✓ Waste Hotspot model trained successfully!\n")
except Exception as e:
    print(f"✗ Error training Hotspot model: {e}\n")

time.sleep(1)

# Model 4: Waste Image Classifier (Demo mode)
print("\n" + "="*70)
print("🖼️  MODEL 4: Waste Image Classifier (Demo Mode)")
print("-"*70)
print("Note: Full training requires actual image dataset")
try:
    import waste_classifier as wc
    wc.create_demo_model()
    print("\n✓ Waste Classifier demo model created!\n")
except Exception as e:
    print(f"✗ Error creating Waste Classifier: {e}\n")

# Summary
print("\n" + "="*70)
print("📋 TRAINING SUMMARY")
print("="*70)

import os

models_status = []

# Check which models were created
if os.path.exists("emission_model.pkl"):
    models_status.append("✓ CO2 Emission Predictor - Ready")
else:
    models_status.append("✗ CO2 Emission Predictor - Failed")

if os.path.exists("engagement_model.pkl"):
    models_status.append("✓ User Engagement Predictor - Ready")
else:
    models_status.append("✗ User Engagement Predictor - Failed")

if os.path.exists("hotspot_model.pkl"):
    models_status.append("✓ Waste Hotspot Detector - Ready")
else:
    models_status.append("✗ Waste Hotspot Detector - Failed")

if os.path.exists("waste_classifier_model.h5"):
    models_status.append("✓ Waste Image Classifier - Ready (Demo)")
else:
    models_status.append("✗ Waste Image Classifier - Not Created")

for status in models_status:
    print(f"  {status}")

print("\n" + "="*70)
print("🎯 NEXT STEPS:")
print("="*70)
print("1. Review model training outputs above")
print("2. Check generated files (*.pkl, *.h5, *.json)")
print("3. Start the ML API service:")
print("   > python ml_api.py")
print("4. Test API endpoints:")
print("   > http://localhost:5001/api/health")
print("   > http://localhost:5001/api/models/info")
print("\n" + "="*70)
print("🎓 For Tejas: Review README_ML_MODELS.md for detailed documentation")
print("="*70)
