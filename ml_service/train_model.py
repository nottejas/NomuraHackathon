# train_model.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv("beachclean_dataset.csv")
# Prepare features and target (e.g., Emission_Impact)
X = pd.get_dummies(df.drop(columns=["Emission_Impact_CO2e", "Item_ID", "Item_Name"]))
y = df["Emission_Impact_CO2e"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and columns
joblib.dump(model, "emission_model.pkl")
joblib.dump(X_train.columns.tolist(), "model_columns.pkl")

print("Model trained and saved.")
