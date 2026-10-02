/** Rules only. No card charge. Counts live in the browser until a database exists. */
export const PLANS = {
  free: {
    id: "free",
    name: "Today",
    price: "Rs 0",
    period: "",
    limits: { cities: 1, tithiLocks: 1, monthViews: 3, hora: false, printPdf: false, widget: false },
  },
  dainik: {
    id: "dainik",
    name: "Dainik",
    price: "Rs 499",
    period: " a year",
    limits: { cities: 1, tithiLocks: 3, monthViews: 999, hora: true, printPdf: false, widget: false },
  },
  parivar: {
    id: "parivar",
    name: "Parivar",
    price: "Rs 699",
    period: " a year",
    limits: { cities: 2, tithiLocks: 8, monthViews: 999, hora: true, printPdf: true, widget: false },
  },
  temple: {
    id: "temple",
    name: "Temple page",
    price: "Rs 18,000",
    period: " a year",
    limits: { cities: 1, tithiLocks: 0, monthViews: 999, hora: true, printPdf: true, widget: true },
  },
};

export const ADDONS = [
  { id: "city", name: "Extra city", price: "Rs 149 a year", adds: { cities: 1 } },
  { id: "tithis", name: "Extra tithi locks", price: "Rs 99 a year", adds: { tithiLocks: 5 } },
  { id: "print", name: "Print calendar file", price: "Rs 199 a year", adds: { printPdf: true } },
  { id: "widget-city", name: "Temple extra city", price: "Rs 3,000 a year", adds: { cities: 1 } },
];

export function limitsFor(planId, addonIds = []) {
  const base = PLANS[planId] || PLANS.free;
  const limits = { ...base.limits };
  for (const id of addonIds) {
    const add = ADDONS.find((a) => a.id === id);
    if (!add) continue;
    for (const [k, v] of Object.entries(add.adds)) {
      if (typeof v === "number") limits[k] = (limits[k] || 0) + v;
      if (v === true) limits[k] = true;
    }
  }
  return limits;
}
