import { useEffect, useState, type CSSProperties } from "react";
import { useAppData } from "./routes";
import { ELECTRICITY_TARIFF, EMISSION_FACTOR } from "../shared/shared";
import { Link } from "react-router";
import { Icon } from "../shared/icon";
import { energyFor } from "../shared/energyFor";
import { formatNumber } from "../shared/formatNumber";
import { formatCurrency } from "../shared/formatCurrency";

export default function SimulationPage() {
  const { devices, totals } = useAppData();
  const [selected, setSelected] = useState<number[]>(() => devices.map((device) => device.id));
  const [hours, setHours] = useState<Record<number, number>>(() =>
    Object.fromEntries(devices.map((device) => [device.id, Math.max(0, device.hours - 1)])),
  );

  useEffect(() => {
    setHours((current) => ({
      ...Object.fromEntries(devices.map((device) => [device.id, Math.max(0, device.hours - 1)])),
      ...current,
    }));
  }, [devices]);

  const changes = devices.map((device) => {
    const isSelected = selected.includes(device.id);
    const nextHours = isSelected ? (hours[device.id] ?? device.hours) : device.hours;
    const currentEnergy = energyFor(device);
    const nextEnergy = energyFor(device, nextHours);
    return { device, isSelected, nextHours, currentEnergy, nextEnergy, saving: currentEnergy - nextEnergy };
  });
  const projectedEnergy = changes.reduce((sum, item) => sum + item.nextEnergy, 0);
  const savedEnergy = totals.energy - projectedEnergy;
  const savingPercent = totals.energy ? (savedEnergy / totals.energy) * 100 : 0;

  function toggleDevice(id: number) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="page-wrap simulation-page">
      <div className="page-heading">
        <div><span className="eyebrow"><Icon name="sparkles" size={14} /> Skenario personal</span><h1>Simulasi hemat energi</h1><p>Pilih perangkat yang ingin disesuaikan, lalu tentukan durasi baru untuk masing-masing perangkat.</p></div>
      </div>
      {devices.length === 0 ? (
        <section className="empty-page"><Icon name="bulb" size={32} /><h2>Belum ada perangkat untuk disimulasikan</h2><p>Tambahkan minimal satu perangkat terlebih dahulu.</p><Link className="primary-button" to="/perangkat?baru=1">Tambah perangkat</Link></section>
      ) : (
        <div className="simulation-layout">
          <section className="scenario-devices">
            <div className="section-heading">
              <div><span className="section-kicker">Langkah 1</span><h2>Pilih & sesuaikan perangkat</h2></div>
              <button className="text-button" onClick={() => setSelected(selected.length === devices.length ? [] : devices.map((device) => device.id))}>{selected.length === devices.length ? "Batalkan semua" : "Pilih semua"}</button>
            </div>
            <div className="scenario-list">
              {changes.map(({ device, isSelected, nextHours, currentEnergy, nextEnergy, saving }) => (
                <article className={`scenario-card ${isSelected ? "selected" : ""}`} key={device.id}>
                  <button className="device-selector" onClick={() => toggleDevice(device.id)} aria-label={`${isSelected ? "Batalkan pilihan" : "Pilih"} ${device.name}`}>
                    <span className="custom-check">{isSelected && <Icon name="check" size={14} />}</span>
                    <span className="device-icon"><Icon name={device.icon} /></span>
                    <span className="device-name"><strong>{device.name}</strong><small>{device.watts} watt · {device.days} hari/bulan</small></span>
                  </button>
                  <div className="scenario-control">
                    <div className="hours-heading"><span>Durasi harian</span><strong>{device.hours} jam <Icon name="chevron" size={13} /> {formatNumber(nextHours)} jam</strong></div>
                    <input disabled={!isSelected} aria-label={`Durasi baru ${device.name}`} type="range" min="0" max="24" step="0.5" value={nextHours} onChange={(event) => setHours({ ...hours, [device.id]: Number(event.target.value) })} style={{ "--progress": `${(nextHours / 24) * 100}%` } as CSSProperties} />
                    <div className="device-change">
                      <span>{formatNumber(currentEnergy)} kWh</span>
                      <span className={saving >= 0 ? "saving-positive" : "saving-negative"}>{saving >= 0 ? "Hemat" : "Tambah"} {formatNumber(Math.abs(saving))} kWh</span>
                      <strong>{formatNumber(nextEnergy)} kWh</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="simulation-panel result-panel">
            <div className="simulation-title"><span className="simulation-icon"><Icon name="sparkles" /></span><div><span className="section-kicker">Hasil skenario</span><h2>Ringkasan perubahan</h2></div></div>
            <div className="result-count"><span>{selected.length}</span> dari {devices.length} perangkat disesuaikan</div>
            <div className="comparison">
              <div className="comparison-labels"><span>Saat ini</span><span>Setelah disesuaikan</span></div>
              <div className="bar-row"><div className="bar current" style={{ width: "100%" }}></div><strong>{formatNumber(totals.energy)} kWh</strong></div>
              <div className="bar-row"><div className="bar projected" style={{ width: `${Math.min(100, totals.energy ? (projectedEnergy / totals.energy) * 100 : 0)}%` }}></div><strong>{formatNumber(projectedEnergy)} kWh</strong></div>
            </div>
            <div className={`saving-result ${savedEnergy < 0 ? "increase" : ""}`}>
              <span>{savedEnergy >= 0 ? "Potensi penghematan per bulan" : "Perkiraan tambahan per bulan"}</span>
              <strong>{formatNumber(Math.abs(savedEnergy))} kWh</strong>
              <div className="saving-meta">
                <span><Icon name="wallet" size={16} /> {formatCurrency(Math.abs(savedEnergy) * ELECTRICITY_TARIFF)}</span>
                <span><Icon name="leaf" size={16} /> {formatNumber(Math.abs(savedEnergy) * EMISSION_FACTOR)} kg CO₂e</span>
              </div>
            </div>
            <div className="scenario-score"><span>Perubahan konsumsi</span><strong>{savingPercent > 0 ? "−" : savingPercent < 0 ? "+" : ""}{formatNumber(Math.abs(savingPercent))}%</strong></div>
            <div className="tip"><span><Icon name="info" size={18} /></span><p>Perangkat yang tidak dipilih tetap menggunakan pola pemakaian awal dan tetap diperhitungkan dalam total.</p></div>
          </aside>
        </div>
      )}
    </div>
  );
}