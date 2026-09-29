import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Panchaang.in — tithi, calendar, temple widgets",
  description: "Own panchang engine. Five limbs for any city. Families and temples.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="topbar">Own engine · Lahiri · Amanta default · api.panchaang.in</div>
        <header className="site-header">
          <Link href="/" className="brand">
            Panchaang<span>.in</span>
          </Link>
          <nav aria-label="Primary">
            <Link href="/tools">Tools</Link>
            <Link href="/festivals">Festivals</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/widget">Widget</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/account">Account</Link>
            <Link href="/start" className="btn nav-cta">Start</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <p className="brand">Panchaang.in</p>
              <p className="muted">
                Five limbs for a place and a time. Calculated here. Not a skin on another panchang.
              </p>
            </div>
            <div>
              <p className="footer-label">Product</p>
              <Link href="/">Today</Link>
              <Link href="/tools">Converters</Link>
              <Link href="/festivals">Ekadashi list</Link>
              <Link href="/compare">Two cities</Link>
              <Link href="/calendar">Month</Link>
              <Link href="/widget">Widget</Link>
            </div>
            <div>
              <p className="footer-label">Temples</p>
              <Link href="/temples">Onboarding</Link>
              <Link href="/pricing">Plans</Link>
              <Link href="/start">Start</Link>
              <Link href="/features">What’s included</Link>
              <Link href="/api-docs">API</Link>
            </div>
            <div>
              <p className="footer-label">Legal</p>
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/account">Account</Link>
              <a href="mailto:legal@theiaone-ai.com">legal@theiaone-ai.com</a>
            </div>
          </div>
          <p className="footer-meta muted">
            © {new Date().getFullYear()} Panchaang.in · Families and temples · Not SanatanSevaSetu
          </p>
        </footer>
      </body>
    </html>
  );
}
