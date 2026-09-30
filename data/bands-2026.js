/** Inclusive civil-date bands. City can shift a day. Panchak from Drik 2026 Mumbai list. */
export const BANDS_2026 = [
  { id: "pitru", label: "Pitru Paksha / Shradh", from: "2026-09-27", to: "2026-10-10" },
  { id: "navratri", label: "Sharad Navratri / Garba", from: "2026-10-11", to: "2026-10-20" },
  { id: "panchak", label: "Panchak", from: "2026-09-23", to: "2026-09-28" },
  { id: "panchak", label: "Panchak", from: "2026-10-21", to: "2026-10-25" },
  { id: "panchak", label: "Panchak", from: "2026-11-17", to: "2026-11-22" },
  { id: "panchak", label: "Panchak", from: "2026-12-14", to: "2026-12-19" },
  { id: "diwali", label: "Diwali week", from: "2026-11-06", to: "2026-11-11" },
];

export const PANCHAK_MARKS_2026 = [
  { date: "2026-09-23", label: "Panchak begins" },
  { date: "2026-09-28", label: "Panchak ends" },
  { date: "2026-10-21", label: "Panchak begins" },
  { date: "2026-10-25", label: "Panchak ends" },
  { date: "2026-11-17", label: "Panchak begins" },
  { date: "2026-11-22", label: "Panchak ends" },
  { date: "2026-12-14", label: "Panchak begins" },
  { date: "2026-12-19", label: "Panchak ends" },
];

export function bandsOn(dateStr) {
  return BANDS_2026.filter((b) => dateStr >= b.from && dateStr <= b.to);
}

export function panchakMarksOn(dateStr) {
  return PANCHAK_MARKS_2026.filter((p) => p.date === dateStr);
}
