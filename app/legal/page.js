import Link from "next/link";

export const metadata = { title: "Legal — Panchaang.in" };

export default function LegalIndex() {
  return (
    <>
      <p className="eyebrow">Legal</p>
      <h1>Legal</h1>
      <p className="lead">TheiaOne AI Systems LLP. These pages are the contract for panchaang.in.</p>
      <ul>
        <li><Link href="/legal/terms">Terms of service</Link></li>
        <li><Link href="/legal/privacy">Privacy policy</Link></li>
        <li><Link href="/legal/refund">Refund and cancellation</Link></li>
      </ul>
      <p>Questions: <a href="mailto:legal@panchaang.in">legal@panchaang.in</a></p>
    </>
  );
}
