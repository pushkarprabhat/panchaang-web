import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Panchaang.in",
  description: "Tithi calendar, alerts, and temple widgets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Panchaang.in</Link>
          <nav>
            <Link href="/calendar">Calendar</Link>
            <Link href="/widget">Widget</Link>
            <Link href="/temples">Temples</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="muted">Owned engine. Amanta default. Sunrise tithi. Not Drik.</footer>
      </body>
    </html>
  );
}
