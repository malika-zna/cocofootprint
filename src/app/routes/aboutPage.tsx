import type { CSSProperties } from "react";
import { Icon } from "../shared/icon";
import {
  DEFAULT_SETTINGS,
  EMISSION_FACTORS,
  type EmissionRegion,
} from "../shared/shared";
import { useAppData } from "./routes";
import { formatCurrency } from "../shared/formatCurrency";
import { formatNumber } from "../shared/formatNumber";

export default function AboutPage() {
  const { settings, setSettings } = useAppData();

  function updateRegion(region: EmissionRegion) {
    setSettings((current) => ({
      ...current,
      region,
      emissionFactor: EMISSION_FACTORS[region],
    }));
  }

  return (
    <div className="page-wrap about-page">
      <div className="page-heading">
        <div>
          <h1>Estimasi yang mudah dipahami.</h1>
          <p>
            COCO membantu menghubungkan kebiasaan sehari-hari dengan konsumsi
            energi, biaya, dan dampak karbonnya.
          </p>
        </div>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <span>01</span>
          <Icon name="bolt" size={26} />
          <h2>Konsumsi energi</h2>
          <p>
            Energi dihitung dari jumlah perangkat, daya perangkat, durasi
            penggunaan per hari, dan jumlah hari penggunaan per bulan.
          </p>
        </article>

        <article className="about-card">
          <span>02</span>
          <Icon name="leaf" size={26} />
          <h2>Emisi karbon</h2>
          <p>
            Estimasi energi dikalikan faktor emisi jaringan sebesar{" "}
            {settings.emissionFactor} kg CO₂e untuk setiap kWh.
          </p>
        </article>

        <article className="about-card">
          <span>03</span>
          <Icon name="sparkles" size={26} />
          <h2>Simulasi skenario</h2>
          <p>
            Durasi alternatif dibandingkan dengan pola awal untuk menunjukkan
            potensi perubahan, bukan menjamin penghematan sebenarnya.
          </p>
        </article>
      </div>

      <section className="calculation-settings">
        <div className="settings-heading">
          <div>
            <span className="section-kicker">Personalisasi estimasi</span>
            <h2>Sesuaikan dengan tempat tinggalmu.</h2>
          </div>
          <p>Nilai ini dipakai di seluruh perhitungan COCOfootprint dan tersimpan hanya di perangkatmu.</p>
        </div>

        <div className="settings-grid">
          <div className="tariff-setting">
            <div className="setting-title">
              <span className="setting-icon"><Icon name="wallet" size={19} /></span>
              <div><strong>Tarif listrik</strong><small>Biaya untuk setiap energi yang digunakan</small></div>
            </div>
            <label className="tariff-input">
              <span>Rp</span>
              <input
                aria-label="Tarif listrik per kWh"
                type="number"
                min="0"
                step="1"
                value={settings.tariff}
                onChange={(event) => {
                  const tariff = Number(event.target.value);

                  setSettings((current) => ({
                    ...current,
                    tariff: Number.isFinite(tariff) ? Math.max(0, tariff) : 0,
                  }));
                }}
              />
              <small>/ kWh</small>
            </label>
            <input
              className="tariff-range"
              aria-label="Sesuaikan tarif listrik"
              type="range"
              min="0"
              max="2000"
              step="1"
              value={Math.min(2000, Math.max(0, settings.tariff))}
              onChange={(event) => {
                const tariff = Number(event.target.value);

                setSettings((current) => ({
                  ...current,
                  tariff: Number.isFinite(tariff) ? Math.max(0, tariff) : 0,
                }));
              }}
              style={{ "--progress": `${((Math.min(2000, Math.max(0, settings.tariff))) / 2000) * 100}%` } as CSSProperties}
            />
            <div className="tariff-scale"><span>Rp1.000</span><span>Rp2.500</span></div>
          </div>

          <div className="region-setting">
            <div className="setting-title">
              <span className="setting-icon"><Icon name="leaf" size={19} /></span>
              <div><strong>Wilayah sistem listrik</strong><small>Pilih faktor emisi jaringan terdekat</small></div>
            </div>
            <div className="region-options" role="radiogroup" aria-label="Wilayah sistem listrik">
              {(Object.keys(EMISSION_FACTORS) as EmissionRegion[]).map((region) => {
                const isActive = region === settings.region;

                return (
                  <button
                    type="button"
                    className={isActive ? "active" : ""}
                    key={region}
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => updateRegion(region)}
                  >
                    <span>{region}</span>
                    <small>{EMISSION_FACTORS[region]} kg CO₂e/kWh</small>
                    <i>{isActive && <Icon name="check" size={13} />}</i>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="settings-preview">
          <div><span>Untuk setiap 1 kWh</span><strong>{formatCurrency(settings.tariff)}</strong><small>estimasi biaya</small></div>
          <div><span>Faktor emisi {settings.region}</span><strong>{formatNumber(settings.emissionFactor, 2)} kg</strong><small>estimasi CO₂e</small></div>
          <button onClick={() => { setSettings(DEFAULT_SETTINGS) }}>Kembalikan nilai awal</button>
        </div>
      </section>

      <section className="method-note large-note">
        <Icon name="info" size={20} />
        <p>
          <strong>Penting untuk diketahui</strong> COCO tidak terhubung ke
          meteran listrik, perangkat IoT, atau data PLN. Hasil dapat berbeda
          karena efisiensi perangkat, siklus kerja, mode siaga, serta perubahan
          tarif dan faktor emisi.
        </p>
      </section>
    </div>
  );
}