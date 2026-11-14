import { useEffect, useState } from "react";
import { starterDevices } from "../shared/starterDevices";
import { DEFAULT_SETTINGS, EMISSION_FACTORS, type Device, type EnergySettings } from "../shared/shared";
import { energyFor } from "../shared/energyFor";
import { Link, NavLink, Outlet } from "react-router";
import { Icon } from "../shared/icon";
import type { AppContext } from "./routes";

function isDevice(value: unknown): value is Device {
  if (!value || typeof value !== "object") {
    return false;
  }

  const device = value as Record<string, unknown>;
  return (
    typeof device.id === "number" &&
    typeof device.name === "string" &&
    typeof device.count === "number" &&
    typeof device.watts === "number" &&
    typeof device.hours === "number" &&
    typeof device.days === "number" &&
    typeof device.icon === "string"
  );
}

function isEnergySettings(value: unknown): value is EnergySettings {
  if (!value || typeof value !== "object") {
    return false;
  }

  const settings = value as Record<string, unknown>;

  return (
    typeof settings.tariff === "number" &&
    Number.isFinite(settings.tariff) &&
    settings.tariff >= 0 &&
    typeof settings.region === "string" &&
    settings.region in EMISSION_FACTORS &&
    typeof settings.emissionFactor === "number" &&
    Number.isFinite(settings.emissionFactor) &&
    settings.emissionFactor >= 0
  );
}

export default function Root() {
  const [devices, setDevices] = useState<Device[]>(() => {
    try {
      const saved = localStorage.getItem("COCO-devices");
      if (!saved) {
        return starterDevices;
      }

      const parsed: unknown = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.every(isDevice)
        ? parsed
        : starterDevices;
    } catch {
      return starterDevices;
    }
  });

  const [settings, setSettings] = useState<EnergySettings>(() => {
    try {
      const saved = localStorage.getItem("COCO-settings");

      if (!saved) {
        return DEFAULT_SETTINGS;
      }

      const parsed: unknown = JSON.parse(saved);

      return isEnergySettings(parsed) ? parsed : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    localStorage.setItem("COCO-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("COCO-devices", JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("COCO-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const energy = devices.reduce((sum, item) => sum + energyFor(item), 0);
  const totals = {
    energy,
    emission: energy * settings.emissionFactor,
    cost: energy * settings.tariff,
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="COCO beranda">
          <span className="brand-mark">
            <img src="/logo_inverted.svg" alt="Logo COCO"></img>
          </span>
          <span>COCO</span>
        </Link>
        <nav className="nav-links" aria-label="Navigasi utama">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/perangkat">Perangkat</NavLink>
          <NavLink to="/simulasi">Simulasi</NavLink>
          <NavLink to="/tentang">Tentang</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setIsDark((value) => !value)} aria-label={isDark ? "Gunakan mode terang" : "Gunakan mode gelap"}>
            <Icon name={isDark ? "sun" : "moon"} size={18} />
          </button>
          <Link className="primary-button compact" to="/perangkat?baru=1">
            <Icon name="plus" size={17} /> Tambah perangkat
          </Link>
        </div>
      </header>

      <main>
        <Outlet
          context={{
            devices,
            setDevices,
            settings,
            setSettings,
            totals,
          } satisfies AppContext}
        />
      </main>

      <footer className="site-footer">
        <div className="footer-wordmark" aria-hidden="true">
          <img src="/logo_landscape.svg" alt="COCO Wordmark"></img>
        </div>
        <div className="footer-info">
          <Link className="footer-brand" to="/">
            <span className="brand-mark">
              <img src="/logo_inverted.svg" alt="Logo COCO"></img>
            </span>
            <strong>COCO</strong>
          </Link>
          <div className="footer-copy">
            <p>Dibuat untuk membantu keputusan energi yang lebih bijak.</p>
            <span>Data tersimpan lokal di perangkatmu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}