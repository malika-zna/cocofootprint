import type { Device } from "./shared";

export function energyFor(device: Device, hours = device.hours, count = device.count) {
  return (device.watts * count * hours * device.days) / 1000;
}