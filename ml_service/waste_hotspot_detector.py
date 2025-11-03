# waste_hotspot_detector.py
"""
Waste Hotspot Detection using K-Means Clustering
Identifies areas with high waste accumulation for targeted cleanup
"""

import pandas as pd
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import joblib
import json
import matplotlib.pyplot as plt

def generate_waste_location_data(n_reports=500):
    """
    Generate synthetic waste report location data
    In production, this comes from actual waste reports in database
    """
    np.random.seed(42)
    
    # Simulate multiple hotspot areas in a city
    hotspot_centers = [
        (19.0760, 72.8777),  # Mumbai Central
        (19.1136, 72.8697),  # Dadar
        (19.0596, 72.8295),  # Marine Drive
        (19.2183, 72.9781),  # Thane
    ]
    
    reports = []
    
    for i in range(n_reports):
        # 70% reports near hotspots, 30% random
        if np.random.random() < 0.7:
            center = hotspot_centers[np.random.randint(0, len(hotspot_centers))]
            lat = center[0] + np.random.normal(0, 0.02)
            lng = center[1] + np.random.normal(0, 0.02)
        else:
            lat = 19.0 + np.random.uniform(0, 0.3)
            lng = 72.8 + np.random.uniform(0, 0.3)
        
        reports.append({
            'report_id': f'R{i+1:04d}',
            'latitude': lat,
            'longitude': lng,
            'waste_amount_kg': np.random.uniform(5, 100),
            'severity': np.random.randint(1, 6),  # 1-5 scale
            'report_date': pd.Timestamp.now() - pd.Timedelta(days=np.random.randint(0, 90))
        })
    
    df = pd.DataFrame(reports)
    return df

def find_optimal_clusters(data, max_clusters=10):
    """
    Find optimal number of clusters using elbow method and silhouette score
    """
    inertias = []
    silhouette_scores = []
    
    for k in range(2, max_clusters + 1):
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        kmeans.fit(data)
        inertias.append(kmeans.inertia_)
        silhouette_scores.append(silhouette_score(data, kmeans.labels_))
    
    # Find optimal k (highest silhouette score)
    optimal_k = silhouette_scores.index(max(silhouette_scores)) + 2
    
    return optimal_k, inertias, silhouette_scores

def train_hotspot_detector(df=None):
    """
    Train waste hotspot detection model using K-Means clustering
    """
    if df is None:
        print("Generating sample waste report data...")
        df = generate_waste_location_data(n_reports=500)
    
    # Features for clustering
    feature_columns = ['latitude', 'longitude', 'waste_amount_kg', 'severity']
    X = df[feature_columns].copy()
    
    # Calculate recency weight (recent reports weighted more)
    days_old = (pd.Timestamp.now() - df['report_date']).dt.days
    X['recency_weight'] = 1 / (1 + days_old / 30)  # Decay over 30 days
    
    # Normalize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Find optimal number of clusters
    print("Finding optimal number of clusters...")
    optimal_k, inertias, silhouette_scores = find_optimal_clusters(X_scaled, max_clusters=10)
    print(f"Optimal number of clusters: {optimal_k}")
    
    # Train K-Means with optimal k
    print(f"\nTraining K-Means Clustering Model with {optimal_k} clusters...")
    kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(X_scaled)
    
    # Add cluster labels to dataframe
    df['cluster'] = clusters
    
    # Calculate cluster statistics
    cluster_stats = []
    for cluster_id in range(optimal_k):
        cluster_data = df[df['cluster'] == cluster_id]
        
        stats = {
            'cluster_id': int(cluster_id),
            'num_reports': len(cluster_data),
            'avg_latitude': float(cluster_data['latitude'].mean()),
            'avg_longitude': float(cluster_data['longitude'].mean()),
            'total_waste_kg': float(cluster_data['waste_amount_kg'].sum()),
            'avg_severity': float(cluster_data['severity'].mean()),
            'priority_score': float(
                len(cluster_data) * cluster_data['severity'].mean() * 
                cluster_data['waste_amount_kg'].mean() / 100
            )
        }
        cluster_stats.append(stats)
    
    # Sort by priority score
    cluster_stats = sorted(cluster_stats, key=lambda x: x['priority_score'], reverse=True)
    
    # Assign priority levels
    for i, stats in enumerate(cluster_stats):
        if i < optimal_k // 3:
            stats['priority'] = 'High'
        elif i < 2 * optimal_k // 3:
            stats['priority'] = 'Medium'
        else:
            stats['priority'] = 'Low'
    
    print("\n✓ Hotspot Detection Model Trained!")
    print("\nCluster Statistics (Sorted by Priority):")
    print("="*80)
    for stats in cluster_stats:
        print(f"\nCluster {stats['cluster_id']} - {stats['priority']} Priority:")
        print(f"  Location: ({stats['avg_latitude']:.4f}, {stats['avg_longitude']:.4f})")
        print(f"  Reports: {stats['num_reports']}")
        print(f"  Total Waste: {stats['total_waste_kg']:.1f} kg")
        print(f"  Avg Severity: {stats['avg_severity']:.2f}/5")
        print(f"  Priority Score: {stats['priority_score']:.2f}")
    
    # Silhouette score
    silhouette_avg = silhouette_score(X_scaled, clusters)
    print(f"\nModel Quality (Silhouette Score): {silhouette_avg:.4f}")
    
    # Save model, scaler, and statistics
    joblib.dump(kmeans, 'hotspot_model.pkl')
    joblib.dump(scaler, 'hotspot_scaler.pkl')
    
    with open('hotspot_features.json', 'w') as f:
        json.dump(feature_columns + ['recency_weight'], f)
    
    with open('cluster_statistics.json', 'w') as f:
        json.dump(cluster_stats, f)
    
    print("\n✓ Model, scaler, and statistics saved!")
    
    return kmeans, scaler, cluster_stats, df

def predict_waste_hotspots(new_reports):
    """
    Predict which hotspot cluster new waste reports belong to
    
    new_reports: list of dicts with keys ['latitude', 'longitude', 'waste_amount_kg', 'severity', 'report_date']
    """
    # Load model, scaler, and features
    kmeans = joblib.load('hotspot_model.pkl')
    scaler = joblib.load('hotspot_scaler.pkl')
    
    with open('hotspot_features.json', 'r') as f:
        features = json.load(f)
    
    with open('cluster_statistics.json', 'r') as f:
        cluster_stats = json.load(f)
    
    # Prepare data
    df = pd.DataFrame(new_reports)
    
    # Calculate recency weight
    days_old = (pd.Timestamp.now() - pd.to_datetime(df['report_date'])).dt.days
    df['recency_weight'] = 1 / (1 + days_old / 30)
    
    X = df[features]
    X_scaled = scaler.transform(X)
    
    # Predict clusters
    predictions = kmeans.predict(X_scaled)
    
    results = []
    for i, cluster_id in enumerate(predictions):
        # Find cluster stats
        stats = next((s for s in cluster_stats if s['cluster_id'] == cluster_id), None)
        
        result = {
            'report_index': i,
            'cluster_id': int(cluster_id),
            'priority': stats['priority'] if stats else 'Unknown',
            'hotspot_location': (stats['avg_latitude'], stats['avg_longitude']) if stats else None,
            'distance_to_center_km': None  # Calculate if needed
        }
        results.append(result)
    
    return results

def get_top_priority_hotspots(top_n=5):
    """
    Get top N priority hotspots for cleanup planning
    """
    with open('cluster_statistics.json', 'r') as f:
        cluster_stats = json.load(f)
    
    # Already sorted by priority score
    top_hotspots = cluster_stats[:top_n]
    
    recommendations = []
    for i, hotspot in enumerate(top_hotspots, 1):
        recommendations.append({
            'rank': i,
            'cluster_id': hotspot['cluster_id'],
            'location': (hotspot['avg_latitude'], hotspot['avg_longitude']),
            'priority': hotspot['priority'],
            'num_reports': hotspot['num_reports'],
            'total_waste_kg': hotspot['total_waste_kg'],
            'priority_score': hotspot['priority_score'],
            'recommendation': f"Schedule cleanup event at ({hotspot['avg_latitude']:.4f}, {hotspot['avg_longitude']:.4f})"
        })
    
    return recommendations

def visualize_hotspots(df):
    """
    Create visualization of waste hotspots
    """
    plt.figure(figsize=(12, 8))
    
    # Scatter plot colored by cluster
    scatter = plt.scatter(
        df['longitude'], 
        df['latitude'], 
        c=df['cluster'],
        s=df['waste_amount_kg'] * 2,  # Size by waste amount
        alpha=0.6,
        cmap='viridis'
    )
    
    plt.colorbar(scatter, label='Cluster ID')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Waste Hotspot Clusters')
    plt.grid(True, alpha=0.3)
    
    # Add cluster centers
    with open('cluster_statistics.json', 'r') as f:
        cluster_stats = json.load(f)
    
    for stats in cluster_stats:
        plt.plot(
            stats['avg_longitude'], 
            stats['avg_latitude'], 
            'r*', 
            markersize=20,
            markeredgecolor='black',
            markeredgewidth=2
        )
        plt.text(
            stats['avg_longitude'], 
            stats['avg_latitude'] + 0.005,
            f"C{stats['cluster_id']}\n{stats['priority']}", 
            fontsize=8,
            ha='center',
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.7)
        )
    
    plt.savefig('waste_hotspots_map.png', dpi=300, bbox_inches='tight')
    print("\n✓ Hotspot visualization saved as 'waste_hotspots_map.png'")
    plt.close()

if __name__ == "__main__":
    # Train model
    kmeans, scaler, stats, df = train_hotspot_detector()
    
    # Visualize
    visualize_hotspots(df)
    
    # Get top priority hotspots
    print("\n" + "="*80)
    print("TOP PRIORITY HOTSPOTS FOR CLEANUP:")
    print("="*80)
    
    top_hotspots = get_top_priority_hotspots(top_n=5)
    for hotspot in top_hotspots:
        print(f"\n{hotspot['rank']}. Cluster {hotspot['cluster_id']} - {hotspot['priority']} Priority")
        print(f"   Location: {hotspot['location']}")
        print(f"   Reports: {hotspot['num_reports']}")
        print(f"   Total Waste: {hotspot['total_waste_kg']:.1f} kg")
        print(f"   Recommendation: {hotspot['recommendation']}")
    
    # Test prediction with new report
    print("\n" + "="*80)
    print("Testing with New Waste Report:")
    print("="*80)
    
    new_report = [{
        'latitude': 19.0760,
        'longitude': 72.8777,
        'waste_amount_kg': 50,
        'severity': 4,
        'report_date': pd.Timestamp.now()
    }]
    
    prediction = predict_waste_hotspots(new_report)
    print(f"\nNew Report Location: (19.0760, 72.8777)")
    print(f"Assigned to Cluster: {prediction[0]['cluster_id']}")
    print(f"Priority Level: {prediction[0]['priority']}")
    print(f"Nearest Hotspot Center: {prediction[0]['hotspot_location']}")
