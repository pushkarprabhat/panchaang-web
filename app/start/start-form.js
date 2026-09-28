"use client";

import { useState } from "react";

const PLANS = [
  { id: "dainik", label: "Dainik — ₹499 / year" },
  { id: "parivar", label: "Parivar — ₹699 / year" },
  { id: "self", label: "Temple self-serve — ₹2,000 / month" },
  { id: "managed", label: "Temple we-manage — ₹5,000 / month" },
];

export default function StartForm({ initialPlan }) {
  const [sent, setSent] = useState(false);
  const [plan, setPlan] = useState(initialPlan || "dainik");

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card">
        <h2>Noted</h2>
        <p>We have the plan on screen. Live debit starts when Razorpay is connected.</p>
        <p className="muted">Write legal@theiaone-ai.com if you want to pay now by transfer.</p>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <label className="muted">Plan</label>
      <select value={plan} onChange={(e) => setPlan(e.target.value)} style={{ width: "100%", margin: "6px 0 12px" }}>
        {PLANS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
      <label className="muted">Name</label>
      <input required name="name" style={{ width: "100%", margin: "6px 0 12px" }} />
      <label className="muted">Email</label>
      <input required type="email" name="email" style={{ width: "100%", margin: "6px 0 12px" }} />
      <label className="muted">City</label>
      <input name="city" defaultValue="Ahmedabad" style={{ width: "100%", margin: "6px 0 12px" }} />
      <label className="muted">Temple / trust (B2B only)</label>
      <input name="org" style={{ width: "100%", margin: "6px 0 16px" }} />
      <button type="submit" className="btn">
        Continue
      </button>
    </form>
  );
}
