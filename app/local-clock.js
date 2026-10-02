"use client";

import { useEffect, useState } from "react";

function line(timeZone) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export default function LocalClock() {
  const [text, setText] = useState("");

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
    const tick = () => {
      const local = line(zone);
      const ist = zone === "Asia/Kolkata" ? "" : ` | IST ${line("Asia/Kolkata")}`;
      setText(`${local} (${zone})${ist}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  if (!text) return null;
  return <span className="local-clock">{text}</span>;
}
