const KEY = "panchaang-remembered-tithis";

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
    id: `${Date.now()}`,
    label: item.label || "Tithi reminder",
    city: item.city || "",
    paksha: item.paksha,
    tithi: item.tithi,
    date: item.date || "",
  };
  all.push(row);
  localStorage.setItem(KEY, JSON.stringify(all));
  return row;
}

export function removeRemembered(id) {
  localStorage.setItem(KEY, JSON.stringify(listRemembered().filter((x) => x.id !== id)));
}
