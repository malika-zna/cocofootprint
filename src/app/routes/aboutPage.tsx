import { Icon } from "../shared/icon";
import { EMISSION_FACTOR } from "../shared/shared";

export default function AboutPage() {
  return (
    <div className="page-wrap about-page">
      <div className="page-heading"><div><span className="eyebrow">Tentang COCO</span><h1>Estimasi yang mudah dipahami.</h1><p>COCO membantu menghubungkan kebiasaan sehari-hari dengan konsumsi energi, biaya, dan dampak karbonnya.</p></div></div>
      <div className="about-grid">
        <article className="about-card"><span>01</span><Icon name="bolt" size={26} /><h2>Konsumsi energi</h2><p>Energi dihitung dari jumlah perangkat, daya perangkat, durasi penggunaan per hari, dan jumlah hari penggunaan per bulan.</p></article>
        <article className="about-card"><span>02</span><Icon name="leaf" size={26} /><h2>Emisi karbon</h2><p>Estimasi energi dikalikan faktor emisi jaringan sebesar {EMISSION_FACTOR} kg CO₂e untuk setiap kWh.</p></article>
        <article className="about-card"><span>03</span><Icon name="sparkles" size={26} /><h2>Simulasi skenario</h2><p>Durasi alternatif dibandingkan dengan pola awal untuk menunjukkan potensi perubahan, bukan menjamin penghematan sebenarnya.</p></article>
      </div>
      <section className="method-note large-note"><Icon name="info" size={20} /><p><strong>Penting untuk diketahui</strong> COCO tidak terhubung ke meteran listrik, perangkat IoT, atau data PLN. Hasil dapat berbeda karena efisiensi perangkat, siklus kerja, mode siaga, serta perubahan tarif dan faktor emisi.</p></section>
    </div>
  );
}