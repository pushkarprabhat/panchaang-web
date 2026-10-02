"use client";

import { useEffect, useState } from "react";
import { LANGS } from "./i18n";

export default function LangToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const read = () => {
      const saved = localStorage.getItem("lang") || "en";
      setLang(LANGS.some((l) => l.id === saved) ? saved : "en");
    };
    read();
    window.addEventListener("langchange", read);
    return () => window.removeEventListener("langchange", read);
  }, []);

  function onChange(e) {
    const next = e.target.value;
    setLang(next);
    localStorage.setItem("lang", next);
    document.documentElement.dataset.lang = next;
    window.dispatchEvent(new Event("langchange"));
  }

  return (
    <label className="language-control">
      <span>Language</span>
      <select aria-label="Language" value={lang} onChange={onChange}>
        {LANGS.map((l) => (
          <option key={l.id} value={l.id}>{l.label}</option>
        ))}
      </select>
    </label>
  );
}
