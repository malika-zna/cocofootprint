import type { Device } from "./shared";

export function energyFor(device: Device, hours = device.hours) {
  return (device.watts * hours * device.days) / 1000;
}