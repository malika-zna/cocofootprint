import type { Device } from "./shared";

export const quickDevices: Omit<Device, "id" | "hours" | "days">[] = [
  { name: "Lampu LED", watts: 10, icon: "bulb" },
  { name: "Televisi", watts: 80, icon: "tv" },
  { name: "Kulkas", watts: 120, icon: "fridge" },
  { name: "Kipas angin", watts: 45, icon: "fan" },
];