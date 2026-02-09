// SafeLand Type Definitions

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface EnvironmentalData {
  rainfall: number;
  elevation: number;
  soil_moisture: number;
  water_level: number;
  river_distance: number;
}

export type FloodRiskLevel = 'Low' | 'Medium' | 'High';

export interface PredictionResponse {
  location: {
    latitude: number;
    longitude: number;
  };
  environmental_data: EnvironmentalData;
  flood_risk: FloodRiskLevel;
}

export interface MapClickEvent {
  latlng: {
    lat: number;
    lng: number;
  };
}

export interface RiskConfig {
  color: string;
  bgColor: string;
  glowColor: string;
  icon: string;
  description: string;
}
