export const NAMED_2026 = {
  "2026-10-06": { ekadashi: "Indira Ekadashi" },
  "2026-10-10": { purnima: "Mahalaya Amavasya" },
  "2026-10-22": { ekadashi: "Papankusha Ekadashi (Ashwina Shukla)" },
  "2026-10-25": { purnima: "Sharad Purnima / Kojagari Purnima / Kumar Purnima (Ashwina)" },
  "2026-11-05": { ekadashi: "Rama Ekadashi" },
  "2026-11-08": { purnima: "Diwali Amavasya (Ashwina / Kartika Krishna)" },
  "2026-11-21": { ekadashi: "Devutthana / Prabodhini Ekadashi (Kartika Shukla)" },
  "2026-11-24": { purnima: "Kartika Purnima" },
  "2026-12-05": { ekadashi: "Utpanna Ekadashi" },
  "2026-12-20": { ekadashi: "Mokshada Ekadashi" },
  "2026-12-23": { purnima: "Margashirsha Purnima" },
};

export function namedOn(iso) {
  const key = new Date(iso || Date.now()).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  return NAMED_2026[key] || {};
}
