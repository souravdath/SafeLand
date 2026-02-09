import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import joblib
import os

# Paths
DATA_PATH = os.path.join("data", "flood_data.csv")
MODEL_PATH = os.path.join("ml", "flood_risk_model.pkl")

# Load dataset
df = pd.read_csv(DATA_PATH)

# Separate features and target
X = df.drop("risk", axis=1)
y = df["risk"]

# Encode labels (Low, Medium, High → 0,1,2)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save model and encoder
joblib.dump(model, MODEL_PATH)
joblib.dump(label_encoder, os.path.join("ml", "label_encoder.pkl"))

print("Model and label encoder saved successfully.")
