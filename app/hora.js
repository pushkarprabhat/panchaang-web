/** Twelve day horas. Lord order: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars. */
const LORDS = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"];
const START = [0, 3, 6, 2, 5, 1, 4];

function weekdayIndex(iso) {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(new Date(iso || Date.now()));
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[day] ?? 0;
}

export function dayHoras(sunriseIso, sunsetIso) {
  if (!sunriseIso || !sunsetIso) return [];
  const a = new Date(sunriseIso).getTime();
  const b = new Date(sunsetIso).getTime();
  if (!(b > a)) return [];
  const slot = (b - a) / 12;
  const start = START[weekdayIndex(sunriseIso)];
  const fmt = (t) =>
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(t));
  return Array.from({ length: 12 }, (_, n) => ({
    n: n + 1,
    lord: LORDS[(start + n) % 7],
    start: fmt(a + n * slot),
    end: fmt(a + (n + 1) * slot),
  }));
}
