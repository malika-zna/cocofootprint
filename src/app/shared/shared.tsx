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
  watts: number;
  hours: number;
  days: number;
  icon: IconName;
};

export const EMISSION_FACTOR = 0.82;
export const ELECTRICITY_TARIFF = 1444.7;