const KEY = "panchaang-remembered-tithis";

export const KINDS = [
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Wedding anniversary" },
  { id: "shraddh", label: "Death anniversary / shraddh" },
  { id: "naamkaran", label: "Naamkaran / mundan" },
  { id: "other", label: "Other tithi" },
];

export function listRemembered() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveRemembered(item) {
  const all = listRemembered();
  const row = {
    id: item.id || `${Date.now()}`,
    label: item.label || "Tithi",
    relation: item.relation || "",
    kind: item.kind || "other",
    city: item.city || "Ahmedabad",
    paksha: item.paksha,
    tithi: Number(item.tithi),
    nakshatra: item.nakshatra || "",
    gregorian: item.gregorian || item.date || "",
    follow: item.follow || "tithi",
    note: item.note || "",
  };
  const next = all.filter((x) => x.id !== row.id);
  next.push(row);
  localStorage.setItem(KEY, JSON.stringify(next));
  return row;
}

export function removeRemembered(id) {
  localStorage.setItem(KEY, JSON.stringify(listRemembered().filter((x) => x.id !== id)));
}

export function matchesDay(item, row) {
  if (!item || !row) return false;
  if (item.follow === "gregorian" && item.gregorian && row.date) {
    return item.gregorian.slice(5) === row.date.slice(5);
  }
  return Number(item.tithi) === Number(row.tithi_number) && item.paksha === row.paksha;
}
