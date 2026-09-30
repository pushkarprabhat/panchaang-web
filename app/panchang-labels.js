export const TITHI = ["","Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima"];
export const TITHI_HI = ["","प्रतिपदा","द्वितीया","तृतीया","चतुर्थी","पंचमी","षष्ठी","सप्तमी","अष्टमी","नवमी","दशमी","एकादशी","द्वादशी","त्रयोदशी","चतुर्दशी","पूर्णिमा"];

export const NAKSHATRA = ["","Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
export const NAKSHATRA_HI = ["","अश्विनी","भरणी","कृत्तिका","रोहिणी","मृगशिरा","आर्द्रा","पुनर्वसु","पुष्य","आश्लेषा","मघा","पूर्वा फाल्गुनी","उत्तरा फाल्गुनी","हस्त","चित्रा","स्वाती","विशाखा","अनुराधा","ज्येष्ठा","मूल","पूर्वाषाढ़ा","उत्तराषाढ़ा","श्रवण","धनिष्ठा","शतभिषा","पूर्वाभाद्रपदा","उत्तराभाद्रपदा","रेवती"];

export const YOGA = ["","Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarman","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyan","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"];
export const KARANA = ["Bava","Balava","Kaulava","Taitila","Gara","Vanija","Vishti"];
const SPECIAL_KARANA = { 57: "Shakuni", 58: "Chatushpada", 59: "Naga", 60: "Kimstughna" };
export const VARA = ["Ravivar","Somvar","Mangalvar","Budhvar","Guruvar","Shukravar","Shanivar"];
export const VARA_HI = ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"];
export const VAHAN = ["Seven horses","Deer","Ram","Lion","Elephant","Horse","Crow"];
export const VAHAN_HI = ["सात अश्व","मृग","मेष","सिंह","हाथी","अश्व","काक"];

export function tithiName(n, paksha, hi) {
  if (n === 15) {
    if (paksha === "Krishna") return hi ? "अमावस्या" : "Amavasya";
    return hi ? "पूर्णिमा" : "Purnima";
  }
  const list = hi ? TITHI_HI : TITHI;
  return list[n] || `Tithi ${n}`;
}
export function nakshatraName(i, hi) {
  const list = hi ? NAKSHATRA_HI : NAKSHATRA;
  return list[i] || list[i + 1] || `#${i}`;
}
export function yogaName(i) { return YOGA[i] || YOGA[i + 1] || `#${i}`; }
export function karanaName(i) {
  if (SPECIAL_KARANA[i]) return SPECIAL_KARANA[i];
  if (i >= 1) return KARANA[(i - 1) % 7];
  return KARANA[i % 7];
}
function weekdayIndex(iso) {
  const day = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", weekday: "short" }).format(new Date(iso || Date.now()));
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[day] ?? 0;
}
export function varaName(iso, hi) { return (hi ? VARA_HI : VARA)[weekdayIndex(iso)]; }
export function vahanName(iso, hi) { return (hi ? VAHAN_HI : VAHAN)[weekdayIndex(iso)]; }
export function ist(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true }).format(d);
}
export function observances(data) {
  const n = data.tithi_number;
  const p = data.paksha;
  const out = [];
  if (n === 11) out.push(p === "Krishna" ? "Krishna Ekadashi" : "Shukla Ekadashi");
  if (n === 13) out.push(p === "Krishna" ? "Krishna Pradosh" : "Shukla Pradosh");
  if (n === 15 && p === "Shukla") out.push("Purnima");
  if (n === 15 && p === "Krishna") out.push("Amavasya");
  if (n === 8) out.push(p === "Krishna" ? "Krishna Ashtami" : "Shukla Ashtami");
  if (n === 4 && p === "Krishna") out.push("Sankashti Chaturthi (Ganesha)");
  return out;
}
export function rahuKalam(sunriseIso, sunsetIso) {
  if (!sunriseIso || !sunsetIso) return "—";
  const a = new Date(sunriseIso).getTime();
  const b = new Date(sunsetIso).getTime();
  if (!(b > a)) return "—";
  const slot = (b - a) / 8;
  const which = [7, 1, 6, 4, 5, 3, 2][weekdayIndex(sunriseIso)];
  const start = new Date(a + which * slot);
  const end = new Date(a + (which + 1) * slot);
  const fmt = (d) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }).format(d);
  return `${fmt(start)} – ${fmt(end)}`;
}
