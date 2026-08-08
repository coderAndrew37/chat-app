"use client";

// app/components/ApplyButton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client island button component that redirects directly to the external registration URL.
//
// Usage:
//   <ApplyButton label="Apply for Chatting Jobs →" />
//   <ApplyButton label="Start AI Training" className="..." />

interface ApplyButtonProps {
  label:      string;
  className?: string;
  targetUrl?: string;
}

const DEFAULT_REGISTER_URL = "https://mulaearn.com/register.php?ref=velloearn";

export default function ApplyButton({ 
  label, 
  className, 
  targetUrl = DEFAULT_REGISTER_URL 
}: ApplyButtonProps) {
  const defaultClass =
    "inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 text-center cursor-pointer";

  return (
    <a
      href={targetUrl}
      className={className ?? defaultClass}
    >
      {label}
    </a>
  );
}