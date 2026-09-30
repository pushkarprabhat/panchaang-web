/** Overlay: civil date + tithi rule + geography. Not an exhaustive pan-India list. */
export const FESTIVALS_2026 = {
  "2026-09-04": [{ name: "Janmashtami", country: "IN", region: "All India", state: "", paksha: "Krishna", tithi: 8 }],
  "2026-09-14": [
    { name: "Ganesh Chaturthi", country: "IN", region: "West", state: "MH", paksha: "Shukla", tithi: 4 },
    { name: "Hartalika Teej", country: "IN", region: "West / North", state: "GJ", paksha: "Shukla", tithi: 3 },
  ],
  "2026-09-25": [{ name: "Anant Chaturdashi", country: "IN", region: "West", state: "MH", paksha: "Shukla", tithi: 14 }],
  "2026-09-27": [{ name: "Pitru Paksha begins", country: "IN", region: "All India", state: "", paksha: "Krishna", tithi: 1 }],
  "2026-10-06": [{ name: "Indira Ekadashi", country: "IN", region: "All India", state: "", paksha: "Krishna", tithi: 11 }],
  "2026-10-10": [{ name: "Mahalaya / Pitru Paksha ends", country: "IN", region: "East / All India", state: "WB", paksha: "Krishna", tithi: 15 }],
  "2026-10-11": [
    { name: "Navratri / Ghatasthapana", country: "IN", region: "All India", state: "", paksha: "Shukla", tithi: 1 },
    { name: "Garba begins", country: "IN", region: "West", state: "GJ", paksha: "Shukla", tithi: 1 },
  ],
  "2026-10-19": [{ name: "Durga Ashtami", country: "IN", region: "East / All India", state: "WB", paksha: "Shukla", tithi: 8 }],
  "2026-10-20": [{ name: "Dussehra / Vijayadashami", country: "IN", region: "All India", state: "", paksha: "Shukla", tithi: 10 }],
  "2026-10-22": [{ name: "Papankusha Ekadashi", country: "IN", region: "All India", state: "", paksha: "Shukla", tithi: 11 }],
  "2026-10-25": [{ name: "Sharad Purnima / Kojagari Purnima / Kumar Purnima", country: "IN", region: "All India", state: "", paksha: "Shukla", tithi: 15 }],
  "2026-10-29": [{ name: "Karva Chauth", country: "IN", region: "North", state: "RJ", paksha: "Krishna", tithi: 4 }],
  "2026-11-01": [{ name: "Ahoi Ashtami", country: "IN", region: "North", state: "UP", paksha: "Krishna", tithi: 8 }],
  "2026-11-05": [{ name: "Vasu Baras", country: "IN", region: "West", state: "GJ", paksha: "Krishna", tithi: 12 }],
  "2026-11-06": [{ name: "Dhanteras", country: "IN", region: "All India", state: "", paksha: "Krishna", tithi: 13 }],
  "2026-11-07": [{ name: "Kali Chaudas", country: "IN", region: "West", state: "GJ", paksha: "Krishna", tithi: 14 }],
  "2026-11-08": [{ name: "Diwali / Lakshmi Puja", country: "IN", region: "All India", state: "", paksha: "Krishna", tithi: 15 }],
  "2026-11-10": [
    { name: "Bestu Varas / Gujarati New Year", country: "IN", region: "West", state: "GJ", paksha: "Shukla", tithi: 1 },
    { name: "Govardhan / Annakut", country: "IN", region: "North / West", state: "", paksha: "Shukla", tithi: 1 },
  ],
  "2026-11-11": [{ name: "Bhai Beej", country: "IN", region: "West / North", state: "GJ", paksha: "Shukla", tithi: 2 }],
  "2026-11-15": [{ name: "Chhath begins", country: "IN", region: "East", state: "BR", paksha: "Shukla", tithi: 6 }],
  "2026-11-24": [{ name: "Kartika Purnima", country: "IN", region: "All India", state: "", paksha: "Shukla", tithi: 15 }],
};

const CITY_STATE = {
  Ahmedabad: "GJ",
  Ujjain: "MP",
  Jaipur: "RJ",
  Mumbai: "MH",
  Delhi: "DL",
  Varanasi: "UP",
  Kolkata: "WB",
  Chennai: "TN",
};

export function festivalsOn(dateStr, city) {
  const all = FESTIVALS_2026[dateStr] || [];
  const st = CITY_STATE[city];
  if (!st) return all;
  return all.filter(
    (f) => !f.state || f.state === st || f.region === "All India" || (f.region || "").includes("All India")
  );
}
