export const LANGS = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिन्दी" },
  { id: "gu", label: "ગુજરાતી" },
  { id: "mr", label: "मराठी" },
  { id: "bn", label: "বাংলা" },
  { id: "ta", label: "தமிழ்" },
];

const T = {
  en: {
    today: "Today", month: "Month", forthcoming: "Forthcoming", eclipses: "Eclipses",
    tools: "Tools", plans: "Plans", tithi: "Tithi", vara: "Vara", vahan: "Vahan",
    nakshatra: "Nakshatra", yoga: "Yoga", karana: "Karana",
    surya: "Surya rashi", chandra: "Chandra rashi", sunrise: "Sunrise", sunset: "Sunset",
    moonrise: "Moonrise", moonset: "Moonset", limbs: "Limbs", legend: "Legend",
    sh: "Shukla (waxing)", kr: "Krishna (waning)",
  },
  hi: {
    today: "आज", month: "माह", forthcoming: "आगामी", eclipses: "ग्रहण",
    tools: "उपकरण", plans: "योजना", tithi: "तिथि", vara: "वार", vahan: "वाहन",
    nakshatra: "नक्षत्र", yoga: "योग", karana: "करण",
    surya: "सूर्य राशि", chandra: "चन्द्र राशि", sunrise: "सूर्योदय", sunset: "सूर्यास्त",
    moonrise: "चन्द्रोदय", moonset: "चन्द्रास्त", limbs: "अंग", legend: "संकेत",
    sh: "शुक्ल पक्ष", kr: "कृष्ण पक्ष",
  },
  gu: {
    today: "આજ", month: "મહિનો", forthcoming: "આવતા", eclipses: "ગ્રહણ",
    tools: "સાધન", plans: "યોજના", tithi: "તિથિ", vara: "વાર", vahan: "વાહન",
    nakshatra: "નક્ષત્ર", yoga: "યોગ", karana: "કરણ",
    surya: "સૂર્ય રાશિ", chandra: "ચંદ્ર રાશિ", sunrise: "સૂર્યોદય", sunset: "સૂર્યાસ્ત",
    moonrise: "ચંદ્રોદય", moonset: "ચંદ્રાસ્ત", limbs: "અંગ", legend: "સંકેત",
    sh: "શુક્લ પક્ષ", kr: "કૃષ્ણ પક્ષ",
  },
  mr: {
    today: "आज", month: "महिना", forthcoming: "येणारे", eclipses: "ग्रहण",
    tools: "साधने", plans: "योजना", tithi: "तिथी", vara: "वार", vahan: "वाहन",
    nakshatra: "नक्षत्र", yoga: "योग", karana: "करण",
    surya: "सूर्य राशी", chandra: "चंद्र राशी", sunrise: "सूर्योदय", sunset: "सूर्यास्त",
    moonrise: "चंद्रोदय", moonset: "चंद्रास्त", limbs: "अंग", legend: "संकेत",
    sh: "शुक्ल पक्ष", kr: "कृष्ण पक्ष",
  },
  bn: {
    today: "আজ", month: "মাস", forthcoming: "আগামী", eclipses: "গ্রহণ",
    tools: "সাধন", plans: "পরিকল্পনা", tithi: "তিথি", vara: "বার", vahan: "বাহন",
    nakshatra: "নক্ষত্র", yoga: "যোগ", karana: "করণ",
    surya: "সূর্য রাশি", chandra: "চন্দ্র রাশি", sunrise: "সূর্যোদয", sunset: "সূর্যাস্ত",
    moonrise: "চন্দ্রোদয", moonset: "চন্দ্রাস্ত", limbs: "অঙ্গ", legend: "সংকেত",
    sh: "শুক্ল পক্ষ", kr: "কৃষ্ণ পক্ষ",
  },
  ta: {
    today: "இன்று", month: "மாதம்", forthcoming: "வருகிய", eclipses: "கிரகணம்",
    tools: "கருவிகள்", plans: "திட்டங்கள்", tithi: "திதி", vara: "கிழமை", vahan: "வாகனம்",
    nakshatra: "நக்ஷத்திரம்", yoga: "யோகம்", karana: "கரணம்",
    surya: "சூரிய ராசி", chandra: "சந்திர ராசி", sunrise: "சூரியோதயம்", sunset: "சூரியஸ்தம்",
    moonrise: "சந்திரோதயம்", moonset: "சந்திராஸ்தம்", limbs: "அங்கங்கள்", legend: "விளக்கம்",
    sh: "சுக்ல பக்ஷ", kr: "கிருஷ்ண பக்ஷ",
  },
};

export function t(lang, key) {
  return (T[lang] && T[lang][key]) || T.en[key] || key;
}
