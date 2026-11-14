export type IconName =
  | "bolt"
  | "leaf"
  | "wallet"
  | "plus"
  | "sun"
  | "moon"
  | "info"
  | "trash"
  | "chevron"
  | "bulb"
  | "laptop"
  | "fan"
  | "ac"
  | "tv"
  | "fridge"
  | "sparkles"
  | "check";

export type Device = {
  id: number;
  name: string;
  count: number;
  watts: number;
  hours: number;
  days: number;
  icon: IconName;
};

export type EmissionRegion =
  | "Jawa-Madura-Bali"
  | "Sumatera"
  | "Kalimantan"
  | "Sulawesi"
  | "Maluku-Papua";

export type EnergySettings = {
  tariff: number;
  region: EmissionRegion;
  emissionFactor: number;
};

export const EMISSION_FACTORS: Record<EmissionRegion, number> = {
  "Jawa-Madura-Bali": 0.87,
  Sumatera: 0.75,
  Kalimantan: 0.98,
  Sulawesi: 0.71,
  "Maluku-Papua": 0.90,
};

export const DEFAULT_SETTINGS: EnergySettings = {
  tariff: 1445,
  region: "Jawa-Madura-Bali",
  emissionFactor: EMISSION_FACTORS["Jawa-Madura-Bali"],
};