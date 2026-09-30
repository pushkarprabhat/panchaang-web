export function SunUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="9" r="3.2" fill="#b45309" />
      <path d="M8 2v2M8 12v2M2 9h2M12 9h2M3.8 4.8l1.4 1.4M10.8 11.8l1.4 1.4M3.8 13.2l1.4-1.4M10.8 6.2l1.4-1.4" stroke="#b45309" strokeWidth="1.2" />
    </svg>
  );
}

export function SunDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 12h12" stroke="#7c2d12" strokeWidth="1.4" />
      <path d="M4 12a4 4 0 0 1 8 0" fill="#c2410c" />
    </svg>
  );
}

export function MoonUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M10 3a5 5 0 1 0 3 9 4.2 4.2 0 1 1-3-9z" fill="#44403c" />
    </svg>
  );
}

export function MoonDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 13h12" stroke="#44403c" strokeWidth="1.4" />
      <path d="M10 6a4 4 0 1 0 2.5 7 3.4 3.4 0 1 1-2.5-7z" fill="#57534e" />
    </svg>
  );
}

/** Phase disc for a tithi. 1=thin waxing … 15=full/new. */
export function TithiMoon({ tithi = 1, paksha = "Shukla" }) {
  const n = Math.min(15, Math.max(1, Number(tithi) || 1));
  const wax = paksha !== "Krishna";
  const phase = wax ? n / 15 : (15 - n) / 15;
  const cx = 8 + (0.5 - phase) * 10;
  const label = n === 15 ? (wax ? "Purnima" : "Amavasya") : `${paksha} ${n}`;
  return (
    <svg width="28" height="28" viewBox="0 0 16 16" aria-label={label}>
      <circle cx="8" cy="8" r="6" fill={n === 15 && !wax ? "#1c1917" : "#f5e6c8"} stroke="#44403c" />
      {!(n === 15 && wax) && (
        <circle cx={wax ? 3 + phase * 10 : 13 - phase * 10} cy="8" r="6" fill={wax ? "#1c1917" : "#f5e6c8"} />
      )}
    </svg>
  );
}
