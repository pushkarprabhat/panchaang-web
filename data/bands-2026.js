/** Inclusive civil-date bands. City can shift a day. */
export const BANDS_2026 = [
  { id: "pitru", label: "Pitru Paksha / Shradh", from: "2026-09-27", to: "2026-10-10" },
  { id: "navratri", label: "Sharad Navratri / Garba", from: "2026-10-11", to: "2026-10-20" },
  { id: "diwali", label: "Diwali week", from: "2026-11-06", to: "2026-11-11" },
];

export function bandsOn(dateStr) {
  return BANDS_2026.filter((b) => dateStr >= b.from && dateStr <= b.to);
}
