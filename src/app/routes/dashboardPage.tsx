import { Link } from "react-router";
import { energyFor } from "../shared/energyFor";
import { Icon } from "../shared/icon";
import { useAppData } from "./routes";
import { formatNumber } from "../shared/formatNumber";
import SummaryCards from "./summaryCards";

export default function DashboardPage() {
  const { devices, totals } = useAppData();
  const highest = [...devices].sort((a, b) => energyFor(b) - energyFor(a))[0];

  return (
    <div className="dashboard-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Icon name="leaf" size={14} /> Energi lebih bijak, bumi lebih baik
          </span>
          <h1>
            Kenali jejak energi
            <br />
            dari kebiasaanmu.
          </h1>
          <p>
            Hitung konsumsi listrik, pahami emisi karbon, dan temukan cara
            sederhana untuk berhemat, semua dalam satu tempat.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/perangkat">
              Kelola perangkat <Icon name="chevron" size={16} />
            </Link>
            <Link className="ghost-button" to="/simulasi">
              Mulai simulasi
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="glow"></div>
          <div className="hero-logo">
            <img src="/logo_inverted.svg" alt="Logo COCO"></img>
          </div>
          <div className="floating-leaf leaf-one">
            <Icon name="leaf" size={24} />
          </div>
          <div className="floating-leaf leaf-two">
            <Icon name="leaf" size={19} />
          </div>
          <div className="mini-stat">
            <span className="stat-dot"></span>
            <div>
              <strong>{formatNumber(totals.energy)} kWh</strong>
              <small>bulan ini</small>
            </div>
          </div>
        </div>
      </section>

      <SummaryCards />

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <span className="section-kicker">Perangkat dominan</span>
          <h2>{highest?.name ?? "Belum ada perangkat"}</h2>
          {highest ? (
            <>
              <p>
                Menyumbang{" "}
                {formatNumber((energyFor(highest) / totals.energy) * 100)}% dari
                estimasi konsumsi bulananmu.
              </p>
              <div className="big-metric">
                {formatNumber(energyFor(highest))}{" "}
                <small>kWh/bulan</small>
              </div>
            </>
          ) : (
            <p>Tambahkan perangkat untuk melihat sumber konsumsi terbesar.</p>
          )}
          <Link className="card-link" to="/perangkat">
            Lihat semua perangkat <Icon name="chevron" size={15} />
          </Link>
        </article>

        <article className="dashboard-card accent-card">
          <span className="section-kicker">Langkah berikutnya</span>
          <h2>Temukan potensi hematmu</h2>
          <p>
            Pilih perangkat tertentu dan sesuaikan jam pemakaiannya untuk
            melihat perubahan energi secara rinci.
          </p>
          <Link className="primary-button" to="/simulasi">
            <Icon name="sparkles" size={17} /> Buat simulasi
          </Link>
        </article>
      </section>
    </div>
  );
}