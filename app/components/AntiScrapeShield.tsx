"use client";

import { useEffect } from "react";

export default function AntiScrapeShield() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // Block Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // Block Key Combos (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        ((e.ctrlKey || e.metaKey) && e.key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}