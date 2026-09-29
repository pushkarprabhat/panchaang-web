export const TITHI = [
  "",
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",
];

export const NAKSHATRA = [
  "",
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

export const YOGA = [
  "",
  "Vishkambha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarman",
  "Dhriti",
  "Shula",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyan",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
];

export const KARANA = [
  "Bava",
  "Balava",
  "Kaulava",
  "Taitila",
  "Gara",
  "Vanija",
  "Vishti",
];

const SPECIAL_KARANA = {
  57: "Shakuni",
  58: "Chatushpada",
  59: "Naga",
  60: "Kimstughna",
};

export const VARA = [
  "Ravivar",
  "Somvar",
  "Mangalvar",
  "Budhvar",
  "Guruvar",
  "Shukravar",
  "Shanivar",
];

export function tithiName(n, paksha) {
  if (n === 15) return paksha === "Krishna" ? "Amavasya" : "Purnima";
  return TITHI[n] || `Tithi ${n}`;
}

export function nakshatraName(i) {
  return NAKSHATRA[i] || NAKSHATRA[i + 1] || `#${i}`;
}

export function yogaName(i) {
  return YOGA[i] || YOGA[i + 1] || `#${i}`;
}

export function karanaName(i) {
  if (SPECIAL_KARANA[i]) return SPECIAL_KARANA[i];
  if (i >= 1) return KARANA[(i - 1) % 7];
  return KARANA[i % 7];
}

export function varaName(iso) {
  const d = new Date(iso || Date.now());
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(d);
  const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return VARA[map[day]] || day;
}

export function ist(iso) {
  if (!iso) return "\u2014";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "\u2014";
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}
