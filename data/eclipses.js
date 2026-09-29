/** Civil dates of eclipses. Times are greatest eclipse UTC. Not a local visibility engine. */
export const ECLIPSES = [
  { date: "2026-02-17", kind: "Solar", type: "Annular", note: "Antarctica path", utc: "12:13" },
  { date: "2026-03-03", kind: "Lunar", type: "Total", note: "Asia, Australia, Pacific, Americas", utc: "11:34" },
  { date: "2026-08-12", kind: "Solar", type: "Total", note: "Iceland, Spain path; Europe partial", utc: "17:47" },
  { date: "2026-08-28", kind: "Lunar", type: "Partial", note: "Americas, Europe, Africa, West Asia", utc: "04:14" },
  { date: "2027-02-06", kind: "Solar", type: "Annular", note: "Chile / Argentina path", utc: "15:59" },
  { date: "2027-02-20", kind: "Lunar", type: "Penumbral", note: "Americas, Europe, Africa, Asia", utc: "23:14" },
  { date: "2027-07-18", kind: "Lunar", type: "Penumbral", note: "Africa, Asia, Australia", utc: "16:04" },
  { date: "2027-08-02", kind: "Solar", type: "Total", note: "Spain, North Africa, Egypt", utc: "10:06" },
  { date: "2027-08-17", kind: "Lunar", type: "Penumbral", note: "Pacific, Americas", utc: "07:15" },
  { date: "2028-01-12", kind: "Lunar", type: "Partial", note: "Americas, Europe, Africa", utc: "04:14" },
  { date: "2028-01-26", kind: "Solar", type: "Annular", note: "S. America / Iberia path", utc: "15:08" },
  { date: "2028-07-06", kind: "Lunar", type: "Partial", note: "Europe, Africa, Asia, Australia", utc: "18:20" },
  { date: "2028-07-22", kind: "Solar", type: "Total", note: "Australia / New Zealand path", utc: "02:56" },
  { date: "2028-12-31", kind: "Lunar", type: "Total", note: "Europe, Africa, Asia, Australia", utc: "16:53" },
];

export function eclipsesOn(dateStr) {
  return ECLIPSES.filter((e) => e.date === dateStr);
}

export function upcomingEclipses(fromDate = new Date(), n = 8) {
  const key = fromDate.toISOString().slice(0, 10);
  return ECLIPSES.filter((e) => e.date >= key).slice(0, n);
}
