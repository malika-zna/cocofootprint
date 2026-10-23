import { Link } from "react-router";

export default function NotFound() {
  return <div className="empty-page page-wrap"><span className="eyebrow">404</span><h1>Halaman tidak ditemukan</h1><p>Kembali ke dashboard untuk melanjutkan.</p><Link className="primary-button" to="/">Ke dashboard</Link></div>;
}