const KEY = "panchaang-usage";

function blank() {
  return { plan: "free", addons: [], cities: [], tithiLocks: 0, monthViews: 0 };
}

export function readUsage() {
  if (typeof window === "undefined") return blank();
  try {
    return { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return blank();
  }
}

export function writeUsage(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function setPlan(plan, addons = []) {
  const cur = readUsage();
  return writeUsage({ ...cur, plan, addons });
}

export function canUse(limits, key) {
  const used = readUsage();
  if (key === "tithiLocks") return used.tithiLocks < limits.tithiLocks;
  if (key === "monthViews") return used.monthViews < limits.monthViews;
  if (key === "cities") return used.cities.length < limits.cities;
  return Boolean(limits[key]);
}

export function noteCity(name, limits) {
  const used = readUsage();
  if (used.cities.includes(name)) return { ok: true, usage: used };
  if (used.cities.length >= limits.cities) return { ok: false, usage: used };
  used.cities.push(name);
  return { ok: true, usage: writeUsage(used) };
}

export function noteLock(limits) {
  const used = readUsage();
  if (used.tithiLocks >= limits.tithiLocks) return { ok: false, usage: used };
  used.tithiLocks += 1;
  return { ok: true, usage: writeUsage(used) };
}
