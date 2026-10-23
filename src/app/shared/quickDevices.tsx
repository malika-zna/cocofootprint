import type { Device } from "./shared";

export const quickDevices: Omit<Device, "id" | "hours" | "days">[] = [
  { name: "Lampu LED", count: 1, watts: 10, icon: "bulb" },
  { name: "Televisi", count: 1, watts: 80, icon: "tv" },
  { name: "Kulkas", count: 1, watts: 120, icon: "fridge" },
  { name: "Kipas angin", count: 1, watts: 45, icon: "fan" },
];