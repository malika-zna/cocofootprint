import { useState } from "react";
import { useAppData } from "./routes";
import type { Device } from "../shared/shared";
import SummaryCards from "./summaryCards";
import { Link } from "react-router";
import { Icon } from "../shared/icon";
import { energyFor } from "../shared/energyFor";
import { formatNumber } from "../shared/formatNumber";
import { quickDevices } from "../shared/quickDevices";

export default function DevicesPage() {
  const { devices, setDevices, totals } = useAppData();
  const [showForm, setShowForm] = useState(
    () => new URLSearchParams(window.location.search).has("baru"),
  );
  const [form, setForm] = useState({ name: "", count: "1", watts: "60", hours: "4", days: "30" });

  function addDevice(device?: Omit<Device, "id" | "hours" | "days">) {
    if (device) {
      setDevices((current) => [...current, { ...device, id: Date.now(), hours: 4, days: 30 }]);
      return;
    }
    const count = Number(form.count);
    const watts = Number(form.watts);
    const hours = Number(form.hours);
    const days = Number(form.days);
    if (!form.name.trim() || watts <= 0 || hours <= 0 || days <= 0) return;
    setDevices((current) => [...current, { id: Date.now(), name: form.name.trim(), count: count, watts, hours, days, icon: "bolt" }]);
    setForm({ name: "", count: "1", watts: "60", hours: "4", days: "30" });
    setShowForm(false);
  }

  function updateDevice(id: number, key: "count" | "watts" | "hours" | "days", value: number) {
    setDevices((current) => current.map((device) => device.id === id ? { ...device, [key]: Math.max(0, value) } : device));
  }

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <div><span className="eyebrow">Inventaris energi</span><h1>Perangkat elektronik</h1><p>Kelola daya dan pola penggunaan perangkat yang ingin kamu hitung.</p></div>
        <button className="primary-button" onClick={() => setShowForm(true)}><Icon name="plus" size={17} /> Tambah perangkat</button>
      </div>
      <SummaryCards />
      <section className="devices-panel full-panel">
        <div className="section-heading">
          <div><span className="section-kicker">Konsumsi saya</span><h2>{devices.length} perangkat tersimpan</h2></div>
          <Link className="text-button" to="/simulasi">Simulasikan pemakaian <Icon name="chevron" size={16} /></Link>
        </div>
        {showForm && (
          <div className="add-form">
            <label className="wide-field">Nama perangkat<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Contoh: Rice cooker" autoFocus /></label>
            <label>Jumlah (Unit)<input type="number" min="1" value={form.count} onChange={(event) => setForm({ ...form, count: event.target.value })} /></label>
            <label>Daya (W)<input type="number" min="1" value={form.watts} onChange={(event) => setForm({ ...form, watts: event.target.value })} /></label>
            <label>Jam/hari<input type="number" min="0.1" max="24" step="0.5" value={form.hours} onChange={(event) => setForm({ ...form, hours: event.target.value })} /></label>
            <label>Hari/bulan<input type="number" min="1" max="31" value={form.days} onChange={(event) => setForm({ ...form, days: event.target.value })} /></label>
            <div className="form-actions"><button className="ghost-button" onClick={() => setShowForm(false)}>Batal</button><button className="primary-button" onClick={() => addDevice()}>Simpan</button></div>
          </div>
        )}
        <div className="device-list">
          {devices.map((device) => {
            const energy = energyFor(device);
            const share = totals.energy ? (energy / totals.energy) * 100 : 0;
            return (
              <article className="device-card" key={device.id}>
                <div className="device-main">
                  <span className="device-icon"><Icon name={device.icon} /></span>
                  <div className="device-name"><strong>{device.name}</strong><span>{device.watts} watt · {device.hours} jam/hari</span></div>
                  <div className="device-energy"><strong>{formatNumber(energy)}</strong><span>kWh/bulan</span></div>
                  <button className="delete-button" onClick={() => setDevices((current) => current.filter((item) => item.id !== device.id))} aria-label={`Hapus ${device.name}`}><Icon name="trash" size={17} /></button>
                </div>
                <div className="usage-track"><span style={{ width: `${share}%` }}></span></div>
                <div className="device-controls">
                  <label>Jumlah <span><input aria-label={`Jumlah ${device.name}`} type="number" value={device.count} onChange={(e) => updateDevice(device.id, "count", Number(e.target.value))} /> Unit</span></label>
                  <label>Daya <span><input aria-label={`Daya ${device.name}`} type="number" value={device.watts} onChange={(e) => updateDevice(device.id, "watts", Number(e.target.value))} /> W</span></label>
                  <label>Durasi <span><input aria-label={`Durasi ${device.name}`} type="number" step="0.5" value={device.hours} onChange={(e) => updateDevice(device.id, "hours", Number(e.target.value))} /> jam/hari</span></label>
                  <label>Frekuensi <span><input aria-label={`Frekuensi ${device.name}`} type="number" value={device.days} onChange={(e) => updateDevice(device.id, "days", Number(e.target.value))} /> hari</span></label>
                </div>
              </article>
            );
          })}
          {devices.length === 0 && <div className="empty-state"><Icon name="bulb" size={28} /><strong>Belum ada perangkat</strong><span>Tambahkan perangkat untuk mulai menghitung.</span></div>}
        </div>
        <div className="quick-add">
          <span>Tambah cepat</span>
          <div>{quickDevices.map((device) => <button key={device.name} onClick={() => addDevice(device)}><Icon name={device.icon} size={16} /> {device.name} <Icon name="plus" size={14} /></button>)}</div>
        </div>
      </section>
    </div>
  );
}