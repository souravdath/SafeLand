import joblib
import pandas as pd
import os

MODEL_PATH = os.path.join("ml", "flood_risk_model.pkl")
ENCODER_PATH = os.path.join("ml", "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)

def predict_risk(rainfall, water_level, elevation, soil_moisture, river_distance):
    data = pd.DataFrame([{
        "rainfall": rainfall,
        "water_level": water_level,
        "elevation": elevation,
        "soil_moisture": soil_moisture,
        "river_distance": river_distance
    }])

    prediction = model.predict(data)
    risk_label = encoder.inverse_transform(prediction)

    return risk_label[0]


if __name__ == "__main__":
    result = predict_risk(
        rainfall=110,
        water_level=3.8,
        elevation=40,
        soil_moisture=70,
        river_distance=1.2
    )
    print("Predicted Flood Risk:", result)
