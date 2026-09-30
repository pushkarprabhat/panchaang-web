import Link from "next/link";

export default function CalendarCard({ href, className, children }) {
  return (
    <Link href={href} className={className} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  );
}
