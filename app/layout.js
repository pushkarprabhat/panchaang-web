import "./globals.css";
import Link from "next/link";
import LangToggle from "./lang-toggle";

export const metadata = {
  title: "Panchaang.in — tithi, calendar, temple widgets",
  description: "Own panchang engine. Five limbs for any city. Families and temples.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="topbar">A product of TheiaOne AI Systems LLP · Digital service</div>
        <header className="site-header">
          <Link href="/" className="brand">
            Panchaang<span>.in</span>
          </Link>
          <nav aria-label="Primary">
            <Link href="/services">Services</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/festivals">Festivals</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/widget">Widget</Link>
            <Link href="/pricing">Pricing</Link>
            <LangToggle />
            <Link href="/start" className="btn nav-cta">Start</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <p className="brand">Panchaang.in</p>
              <p className="muted">
                TheiaOne AI Systems LLP (ADA-3003)
                <br />
                308, City Center - 2, Science City Road, Sola, Ahmedabad 380060
              </p>
            </div>
            <div>
              <p className="footer-label">Product</p>
              <Link href="/services">All services</Link>
              <Link href="/tools">Converters</Link>
              <Link href="/festivals">Forthcoming</Link>
              <Link href="/compare">Two cities</Link>
              <Link href="/widget">Widget</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div>
              <p className="footer-label">Company</p>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/start">Start</Link>
              <Link href="/api-docs">API</Link>
            </div>
            <div>
              <p className="footer-label">Legal</p>
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/legal/refund">Refund & cancellation</Link>
              <a href="mailto:legal@panchaang.in">legal@panchaang.in</a>
            </div>
          </div>
          <p className="footer-meta muted">
            © {new Date().getFullYear()} TheiaOne AI Systems LLP · Panchaang.in · No physical shipping
          </p>
        </footer>
      </body>
    </html>
  );
}
