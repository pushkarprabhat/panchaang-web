export const FESTIVALS_2026 = {
  "2026-09-04": [{ name: "Janmashtami", region: "All India" }],
  "2026-09-14": [{ name: "Ganesh Chaturthi", region: "MH" }, { name: "Hartalika Teej", region: "North" }],
  "2026-09-25": [{ name: "Anant Chaturdashi / Visarjan", region: "MH" }],
  "2026-09-27": [{ name: "Pitru Paksha begins", region: "All India" }],
  "2026-10-06": [{ name: "Indira Ekadashi", region: "All India" }],
  "2026-10-10": [{ name: "Mahalaya / Pitru Paksha ends", region: "All India" }],
  "2026-10-11": [{ name: "Navratri / Ghatasthapana", region: "All India" }, { name: "Garba begins", region: "Gujarat" }],
  "2026-10-19": [{ name: "Durga Ashtami", region: "All India" }],
  "2026-10-20": [{ name: "Dussehra / Vijayadashami", region: "All India" }],
  "2026-10-22": [{ name: "Papankusha Ekadashi", region: "All India" }],
  "2026-10-25": [{ name: "Sharad Purnima", region: "All India" }],
  "2026-10-29": [{ name: "Karva Chauth", region: "North" }],
  "2026-11-01": [{ name: "Ahoi Ashtami", region: "North" }],
  "2026-11-05": [{ name: "Govatsa Dwadashi / Vasu Baras", region: "West" }],
  "2026-11-06": [{ name: "Dhanteras", region: "All India" }],
  "2026-11-07": [{ name: "Kali Chaudas", region: "West" }],
  "2026-11-08": [{ name: "Diwali / Lakshmi Puja", region: "All India" }],
  "2026-11-10": [{ name: "Bestu Varas / Gujarati New Year", region: "Gujarat" }, { name: "Govardhan / Annakut", region: "North" }],
  "2026-11-11": [{ name: "Bhai Dooj / Bhai Beej", region: "West / North" }],
  "2026-11-15": [{ name: "Chhath begins", region: "East" }],
  "2026-11-24": [{ name: "Kartik Purnima", region: "All India" }],
};

export function festivalsOn(dateStr) {
  return FESTIVALS_2026[dateStr] || [];
}
