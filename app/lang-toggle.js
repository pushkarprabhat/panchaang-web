"use client";

import { useEffect, useState } from "react";

export default function LangToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "en";
    setLang(saved);
    document.documentElement.lang = saved === "hi" ? "hi" : "en";
    document.documentElement.dataset.lang = saved;
  }, []);

  function flip() {
    const next = lang === "hi" ? "en" : "hi";
    setLang(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next === "hi" ? "hi" : "en";
    document.documentElement.dataset.lang = next;
    window.dispatchEvent(new Event("langchange"));
  }

  return (
    <button type="button" className="lang-btn" onClick={flip}>
      {lang === "hi" ? "English" : "हिन्दी"}
    </button>
  );
}
