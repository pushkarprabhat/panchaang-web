/** Daylight split into 8. Segment numbers are 1-based, Sunday-first.
 *  South Indian household chart. The three never share a segment on the same day.
 */
const SLOTS = {
  rahu: [8, 2, 7, 5, 6, 4, 3],
  yamagandam: [5, 4, 3, 2, 1, 7, 6],
  gulika: [7, 6, 5, 4, 3, 2, 1],
};

function weekdayIndex(iso) {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(new Date(iso || Date.now()));
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[day] ?? 0;
}

function fmt(t) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(t));
}

function windowFor(sunriseIso, sunsetIso, slot) {
  const a = new Date(sunriseIso).getTime();
  const b = new Date(sunsetIso).getTime();
  if (!(b > a) || slot < 1 || slot > 8) return null;
  const part = (b - a) / 8;
  const start = a + (slot - 1) * part;
  return { start: fmt(start), end: fmt(start + part), slot };
}

export function dayKalams(sunriseIso, sunsetIso) {
  if (!sunriseIso || !sunsetIso) return null;
  const wd = weekdayIndex(sunriseIso);
  return {
    rahu: windowFor(sunriseIso, sunsetIso, SLOTS.rahu[wd]),
    yamagandam: windowFor(sunriseIso, sunsetIso, SLOTS.yamagandam[wd]),
    gulika: windowFor(sunriseIso, sunsetIso, SLOTS.gulika[wd]),
  };
}
