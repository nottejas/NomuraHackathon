# user_engagement_predictor.py
"""
User Engagement Prediction Model
Predicts likelihood of user participating in environmental events
Uses Random Forest Classifier
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import json

def generate_sample_user_data(n_samples=1000):
    """
    Generate synthetic user engagement data for training
    In production, this would come from actual user database
    """
    np.random.seed(42)
    
    data = {
        'user_id': range(n_samples),
        'age': np.random.randint(18, 65, n_samples),
        'points_earned': np.random.randint(0, 500, n_samples),
        'events_attended': np.random.randint(0, 20, n_samples),
        'waste_reports': np.random.randint(0, 30, n_samples),
        'days_since_last_activity': np.random.randint(0, 90, n_samples),
        'badges_earned': np.random.randint(0, 10, n_samples),
        'avg_event_rating': np.random.uniform(1, 5, n_samples),
        'friend_count': np.random.randint(0, 50, n_samples),
        'time_on_platform_mins': np.random.randint(10, 300, n_samples),
        'login_frequency': np.random.randint(1, 30, n_samples),  # logins per month
    }
    
    df = pd.DataFrame(data)
    
    # Create target variable: will_participate (1) or not (0)
    # Logic: Users with more activity, recent engagement, and higher ratings are more likely to participate
    participation_score = (
        (df['events_attended'] * 2) +
        (df['points_earned'] / 50) +
        (df['badges_earned'] * 3) +
        (df['avg_event_rating']) +
        (30 - df['days_since_last_activity']) / 10 +
        (df['login_frequency'] / 5)
    )
    
    # Add some randomness
    participation_score += np.random.normal(0, 5, n_samples)
    
    # Convert to binary classification
    threshold = participation_score.median()
    df['will_participate'] = (participation_score > threshold).astype(int)
    
    return df

def train_engagement_model(df=None):
    """
    Train user engagement prediction model
    """
    if df is None:
        print("Generating sample user data...")
        df = generate_sample_user_data(n_samples=1000)
    
    # Features and target
    feature_columns = [
        'age', 'points_earned', 'events_attended', 'waste_reports',
        'days_since_last_activity', 'badges_earned', 'avg_event_rating',
        'friend_count', 'time_on_platform_mins', 'login_frequency'
    ]
    
    X = df[feature_columns]
    y = df['will_participate']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Feature scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest Classifier
    print("Training User Engagement Prediction Model...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\n✓ Model Training Complete!")
    print(f"Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, 
                                target_names=['Will Not Participate', 'Will Participate']))
    
    # Cross-validation score
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)
    print(f"\nCross-Validation Scores: {cv_scores}")
    print(f"Mean CV Score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': feature_columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    # Save model, scaler, and feature columns
    joblib.dump(model, 'engagement_model.pkl')
    joblib.dump(scaler, 'engagement_scaler.pkl')
    
    with open('engagement_features.json', 'w') as f:
        json.dump(feature_columns, f)
    
    with open('feature_importance.json', 'w') as f:
        json.dump(feature_importance.to_dict('records'), f)
    
    print("\n✓ Model, scaler, and features saved!")
    
    return model, scaler, feature_columns

def predict_user_engagement(user_data):
    """
    Predict if a user will participate in next event
    
    user_data: dict with keys matching feature columns
    Example:
    {
        'age': 28,
        'points_earned': 150,
        'events_attended': 5,
        'waste_reports': 12,
        'days_since_last_activity': 3,
        'badges_earned': 4,
        'avg_event_rating': 4.5,
        'friend_count': 15,
        'time_on_platform_mins': 120,
        'login_frequency': 20
    }
    """
    # Load model, scaler, and features
    model = joblib.load('engagement_model.pkl')
    scaler = joblib.load('engagement_scaler.pkl')
    
    with open('engagement_features.json', 'r') as f:
        feature_columns = json.load(f)
    
    # Create dataframe from user data
    user_df = pd.DataFrame([user_data])[feature_columns]
    
    # Scale features
    user_scaled = scaler.transform(user_df)
    
    # Predict
    prediction = model.predict(user_scaled)[0]
    probability = model.predict_proba(user_scaled)[0]
    
    result = {
        'will_participate': bool(prediction),
        'participation_probability': float(probability[1]),
        'non_participation_probability': float(probability[0]),
        'confidence': float(max(probability)),
        'recommendation': 'High priority for event invitation' if probability[1] > 0.7 
                         else 'Moderate priority' if probability[1] > 0.5 
                         else 'Send reminder with incentives'
    }
    
    return result

def batch_predict_users(users_data):
    """
    Predict engagement for multiple users
    """
    results = []
    for user_data in users_data:
        prediction = predict_user_engagement(user_data)
        prediction['user_id'] = user_data.get('user_id', 'unknown')
        results.append(prediction)
    
    return results

if __name__ == "__main__":
    # Train model
    model, scaler, features = train_engagement_model()
    
    # Test prediction
    print("\n" + "="*60)
    print("Testing Prediction with Sample User:")
    print("="*60)
    
    sample_user = {
        'age': 28,
        'points_earned': 250,
        'events_attended': 8,
        'waste_reports': 15,
        'days_since_last_activity': 2,
        'badges_earned': 5,
        'avg_event_rating': 4.5,
        'friend_count': 20,
        'time_on_platform_mins': 150,
        'login_frequency': 25
    }
    
    prediction = predict_user_engagement(sample_user)
    print(f"\nUser Profile: {sample_user}")
    print(f"\nPrediction Results:")
    print(f"  Will Participate: {prediction['will_participate']}")
    print(f"  Participation Probability: {prediction['participation_probability']:.2%}")
    print(f"  Confidence: {prediction['confidence']:.2%}")
    print(f"  Recommendation: {prediction['recommendation']}")
