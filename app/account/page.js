"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ADDONS, PLANS, limitsFor } from "../../data/entitlements";
import { readUsage, setPlan } from "../usage";

export default function AccountPage() {
  const [usage, setUsage] = useState(null);
  const [plan, setPlanId] = useState("free");
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    const u = readUsage();
    setUsage(u);
    setPlanId(u.plan || "free");
    setAddons(u.addons || []);
  }, []);

  function toggle(id) {
    setAddons((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  function save(e) {
    e.preventDefault();
    setUsage(setPlan(plan, addons));
  }

  if (!usage) return <p>Loading your plan...</p>;
  const limits = limitsFor(plan, addons);

  return (
    <>
      <p className="eyebrow">Account</p>
      <h1>Your plan and what is still free.</h1>
      <p className="lead">
        Today is free up to a count. A paid plan and add-ons raise that count.
        Cards are not taken yet, so this choice stays in this browser until we confirm it by email.
      </p>
      <form onSubmit={save} className="card" style={{ display: "grid", gap: "0.8rem", maxWidth: "36rem" }}>
        <label>Plan
          <select value={plan} onChange={(e) => setPlanId(e.target.value)}>
            {Object.values(PLANS).map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.price}{p.period})</option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend>Add-ons</legend>
          {ADDONS.map((a) => (
            <label key={a.id} style={{ display: "block" }}>
              <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggle(a.id)} /> {a.name} ({a.price})
            </label>
          ))}
        </fieldset>
        <button type="submit">Save on this browser</button>
      </form>
      <h2>Counts</h2>
      <table>
        <thead><tr><th>Item</th><th>Used</th><th>Allowed</th></tr></thead>
        <tbody>
          <tr><td>Cities</td><td>{usage.cities.length}</td><td>{limits.cities}</td></tr>
          <tr><td>Tithi locks</td><td>{usage.tithiLocks}</td><td>{limits.tithiLocks}</td></tr>
          <tr><td>Month views</td><td>{usage.monthViews}</td><td>{limits.monthViews}</td></tr>
          <tr><td>Hora table</td><td></td><td>{limits.hora ? "Yes" : "Paid"}</td></tr>
          <tr><td>Print file</td><td></td><td>{limits.printPdf ? "Yes" : "Add-on"}</td></tr>
          <tr><td>Widget</td><td></td><td>{limits.widget ? "Yes" : "Temple plan"}</td></tr>
        </tbody>
      </table>
      <p><Link href="/pricing">Prices</Link> · <Link href="/contact">Ask us to switch a plan on</Link> · <Link href="/hold">Hold list</Link></p>
    </>
  );
}
