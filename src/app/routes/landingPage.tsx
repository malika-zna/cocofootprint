import { Link } from "react-router";
import { energyFor } from "../shared/energyFor";
import { Icon } from "../shared/icon";
import { useAppData } from "./routes";
import { formatNumber } from "../shared/formatNumber";

export default function LandingPage() {
  const { devices, totals } = useAppData();
  const highest = [...devices].sort((a, b) => energyFor(b) - energyFor(a))[0];
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-hero-top">
          <span className="landing-label">
            <span className="live-dot"></span>
            Kalkulator energi personal
          </span>
        </div>
        <div className="landing-title">
          <span>Energi yang</span>
          <strong>tak terlihat,</strong>
          <span>kini terbaca.</span>
        </div>
        <div className="landing-hero-bottom">
          <p>
            COCO mengubah daya dan waktu menjadi pemahaman agar setiap
            pemilihan energi punya arah yang jelas.
          </p>
          <Link className="landing-cta" to="/perangkat">
            Mulai mengukur <span><Icon name="chevron" size={19} /></span>
          </Link>
        </div>
        <div className="hero-grid-lines" aria-hidden="true"></div>
      </section>

      <div className="energy-ticker" aria-label="Prinsip COCO">
        <div className="ticker-track" aria-hidden="true">
          <div className="ticker-item">
            <span>Ukur konsumsi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Pahami emisi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Uji kebiasaan</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Kurangi dampak</span><i></i>
          </div>

          <div className="ticker-item">
            <span>Ukur konsumsi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Pahami emisi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Uji kebiasaan</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Kurangi dampak</span><i></i>
          </div>

          <div className="ticker-item">
            <span>Ukur konsumsi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Pahami emisi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Uji kebiasaan</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Kurangi dampak</span><i></i>
          </div>
        </div>

        <div className="ticker-track" aria-hidden="true">
          <div className="ticker-item">
            <span>Ukur konsumsi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Pahami emisi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Uji kebiasaan</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Kurangi dampak</span><i></i>
          </div>

          <div className="ticker-item">
            <span>Ukur konsumsi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Pahami emisi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Uji kebiasaan</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Kurangi dampak</span><i></i>
          </div>

          <div className="ticker-item">
            <span>Ukur konsumsi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Pahami emisi</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Uji kebiasaan</span><i></i>
          </div>
          <div className="ticker-item">
            <span>Kurangi dampak</span><i></i>
          </div>
        </div>
      </div>

      <section className="landing-manifesto">
        <span className="landing-section-number">01 - Mengapa COCO</span>
        <p>
          Kita menggunakan energi setiap hari.
          <strong> Namun, dampaknya sering tidak terlihat.</strong>
          COCO membuat dampak itu terbaca.
        </p>
        <div className="manifesto-foot">
          <span>Dari watt ke keputusan</span>
          <Icon name="leaf" size={32} />
        </div>
      </section>

      <section className="landing-snapshot">
        <div className="snapshot-heading">
          <span className="landing-section-number">02 - Jejakmu saat ini</span>
          <h2>Satu bulan.<br />Tiga angka penting.</h2>
          <p>Estimasi langsung dari {devices.length} perangkat yang tersimpan di browsermu.</p>
        </div>
        <div className="snapshot-metrics">
          <article>
            <span>Energi</span>
            <strong>{formatNumber(totals.energy)}</strong>
            <small>kWh / bulan</small>
            <Icon name="bolt" size={22} />
          </article>
          <article>
            <span>Jejak karbon</span>
            <strong>{formatNumber(totals.emission)}</strong>
            <small>kg CO₂e / bulan</small>
            <Icon name="leaf" size={22} />
          </article>
          <article>
            <span>Perkiraan biaya</span>
            <strong>{formatNumber(totals.cost / 1000)}</strong>
            <small>ribu rupiah / bulan</small>
            <Icon name="wallet" size={22} />
          </article>
        </div>
      </section>

      <section className="landing-flow">
        <div className="flow-intro">
          <span className="landing-section-number">03 - Cara kerja</span>
          <h2>Dari kebiasaan<br />menjadi tindakan.</h2>
        </div>
        <div className="flow-steps">
          <article>
            <span>01</span>
            <div className="flow-icon"><Icon name="plus" size={24} /></div>
            <h3>Catat</h3>
            <p>Masukkan perangkat, daya, dan durasi pemakaian harian.</p>
            <Link to="/perangkat">Kelola perangkat <Icon name="chevron" size={15} /></Link>
          </article>
          <article>
            <span>02</span>
            <div className="flow-icon"><Icon name="bolt" size={24} /></div>
            <h3>Pahami</h3>
            <p>Lihat konsumsi, biaya, serta emisi dalam satu gambaran.</p>
            <Link to="/dashboard">Lihat Ringkasan <Icon name="chevron" size={15} /></Link>
          </article>
          <article>
            <span>03</span>
            <div className="flow-icon"><Icon name="sparkles" size={24} /></div>
            <h3>Ubah</h3>
            <p>Sesuaikan pemakaian tiap perangkat dan bandingkan hasilnya.</p>
            <Link to="/simulasi">Buka simulasi <Icon name="chevron" size={15} /></Link>
          </article>
        </div>
      </section>

      <section className="landing-focus">
        <div className="focus-copy">
          <span className="landing-section-number">04 - Peluang terbesar</span>
          <h2>{highest?.name ?? "Mulai dari satu perangkat."}</h2>
          <p>
            {highest
              ? `Saat ini menyumbang ${formatNumber((energyFor(highest) / totals.energy) * 100)}% dari estimasi energimu. Coba kurangi jumlah atau durasinya dan lihat perubahan yang mungkin terjadi.`
              : "Tambahkan perangkat pertamamu untuk menemukan sumber konsumsi terbesar."}
          </p>
          <Link className="landing-cta dark" to={highest ? "/simulasi" : "/perangkat?baru=1"}>
            {highest ? "Uji skenario" : "Tambah perangkat"} <span><Icon name="chevron" size={19} /></span>
          </Link>
        </div>
        <div className="focus-visual" aria-hidden="true">
          <span className="focus-value">{highest ? formatNumber(energyFor(highest)) : "0"}</span>
          <span className="focus-unit">kWh<br />per bulan</span>
          <div className="focus-wave wave-one"></div>
          <div className="focus-wave wave-two"></div>
          <div className="focus-wave wave-three"></div>
        </div>
      </section>

      <section className="green-principles">
        <span className="landing-section-number">Didesain dengan prinsip keberlanjutan</span>
        <div>
          <p>Tanpa aset berat.</p>
          <p>Data tersimpan di perangkatmu.</p>
          <p>Tema default gelap.</p>
        </div>
      </section>
    </div>
  );
}