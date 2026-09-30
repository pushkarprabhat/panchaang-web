"use client";

import { useEffect, useState } from "react";
import { LANGS } from "./i18n";

export default function LangToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "en";
    setLang(saved);
    document.documentElement.lang = saved;
    document.documentElement.dataset.lang = saved;
  }, []);

  function onChange(e) {
    const next = e.target.value;
    setLang(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
    document.documentElement.dataset.lang = next;
    window.dispatchEvent(new Event("langchange"));
  }

  return (
    <label className="lang-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
      <span className="sr-only">Language</span>
      <select aria-label="Language" value={lang} onChange={onChange} style={{ border: 0, background: "transparent", font: "inherit" }}>
        {LANGS.map((l) => (
          <option key={l.id} value={l.id}>{l.label}</option>
        ))}
      </select>
    </label>
  );
}
