"use client";

import { useState, type ReactNode } from "react";

export function ObjAccordion({
  q,
  a,
  accent = "#5b4bdb",
}: {
  q: string;
  a: string | ReactNode;
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="pr-4 text-sm font-semibold text-gray-900 sm:text-base">
          {q}
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: open ? accent : "#f3f4f6",
            color: open ? "#fff" : "#6b7280",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="animate-in fade-in slide-in-from-top-1 px-5 pb-5 duration-200">
          <div className="text-sm leading-relaxed text-gray-500">{a}</div>
        </div>
      )}
    </div>
  );
}