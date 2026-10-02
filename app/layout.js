import "./globals.css";
import Link from "next/link";
import LangToggle from "./lang-toggle";
import Providers from "./providers";
import AuthBar from "./auth-bar";

export const metadata = {
  title: "Panchaang.in — daily panchang",
  description: "Five limbs, festivals, converters. TheiaOne AI Systems LLP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <div className="topbar">TheiaOne AI Systems LLP · Panchaang.in</div>
          <header className="site-header">
            <Link href="/" className="brand">
              <img src="/logo.svg" width="260" height="44" alt="Panchaang.in" />
            </Link>
            <nav aria-label="Primary">
              <Link href="/">Today</Link>
              <Link href="/calendar">Month</Link>
              <Link href="/festivals">Forthcoming</Link>
              <Link href="/eclipses">Eclipses</Link>
              <Link href="/tools">Tools</Link>
              <Link href="/pricing">Plans</Link>
              <LangToggle />
              <span className="auth-action"><AuthBar /></span>
            </nav>
          </header>
          <main id="main-content" tabIndex={-1}>{children}</main>
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
                <p className="footer-label">Your calendar</p>
                <Link href="/">Today</Link>
                <Link href="/calendar">Month</Link>
                <Link href="/festivals">Forthcoming</Link>
                <Link href="/eclipses">Eclipses</Link>
                <Link href="/tools">Converters</Link>
                <Link href="/widget">Widget</Link>
              </div>
              <div>
                <p className="footer-label">Company</p>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/services">Services</Link>
                <Link href="/pricing">Plans & pricing</Link>
                <Link href="/compare">Compare</Link>
                <Link href="/api-docs">API</Link>
              </div>
              <div>
                <p className="footer-label">Legal</p>
                <Link href="/legal/terms">Terms</Link>
                <Link href="/legal/privacy">Privacy</Link>
                <Link href="/legal/refund">Refund</Link>
                <a href="mailto:legal@panchaang.in">legal@panchaang.in</a>
              </div>
            </div>
            <p className="footer-meta muted">
              © {new Date().getFullYear()} TheiaOne AI Systems LLP · No physical shipping
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
