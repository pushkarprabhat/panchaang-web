"use client";

import { useEffect, useState } from "react";
import { listRemembered, matchesDay } from "./tithi-memory";

export default function PersonalMarks({ row }) {
  const [hits, setHits] = useState([]);
  useEffect(() => {
    if (!row) {
      setHits([]);
      return;
    }
    setHits(listRemembered().filter((item) => matchesDay(item, row)));
  }, [row]);
  if (!hits.length) return null;
  return (
    <>
      {hits.map((item) => (
        <em className="mine" key={item.id}>{item.label}</em>
      ))}
    </>
  );
}
