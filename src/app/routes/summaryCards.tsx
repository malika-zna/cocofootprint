import { formatCurrency } from "../shared/formatCurrency";
import { formatNumber } from "../shared/formatNumber";
import { Icon } from "../shared/icon";
import { ELECTRICITY_TARIFF } from "../shared/shared";
import { useAppData } from "./routes";

export default function SummaryCards() {
  const { devices, totals } = useAppData();
  return (
    <section className="summary-grid" aria-label="Ringkasan konsumsi">
      <article className="summary-card energy">
        <div className="summary-icon"><Icon name="bolt" /></div>
        <div><span>Estimasi konsumsi</span><strong>{formatNumber(totals.energy)} <small>kWh/bulan</small></strong></div>
        <span className="trend neutral">Data {devices.length} perangkat</span>
      </article>
      <article className="summary-card carbon">
        <div className="summary-icon"><Icon name="leaf" /></div>
        <div><span>Jejak karbon</span><strong>{formatNumber(totals.emission)} <small>kg CO₂e</small></strong></div>
        <span className="trend">≈ {formatNumber(totals.emission * 12)} kg/tahun</span>
      </article>
      <article className="summary-card cost">
        <div className="summary-icon"><Icon name="wallet" /></div>
        <div><span>Estimasi biaya</span><strong>{formatCurrency(totals.cost)}</strong></div>
        <span className="trend">Tarif {formatCurrency(ELECTRICITY_TARIFF)}/kWh</span>
      </article>
    </section>
  );
}