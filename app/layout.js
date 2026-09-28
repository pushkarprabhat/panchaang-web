import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Panchaang.in — tithi, calendar, temple widgets",
  description: "Family tithi alerts and temple widgets. Own engine. India first.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/" className="brand">Panchaang.in</Link>
          <nav>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/temples">Temples</Link>
            <Link href="/widget">Widget</Link>
            <Link href="/start" className="btn nav-cta">Start</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <div>
            <Link href="/pricing">Pricing</Link>
            {" · "}
            <Link href="/alerts">Alerts</Link>
            {" · "}
            <Link href="/legal/terms">Terms</Link>
            {" · "}
            <Link href="/legal/privacy">Privacy</Link>
          </div>
          <p className="muted">
            Families and temples. Not SanatanSevaSetu. legal@theiaone-ai.com
          </p>
        </footer>
      </body>
    </html>
  );
}
