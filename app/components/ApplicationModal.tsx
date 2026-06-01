"use client";

import { WA_NUMBER } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";

const TRACKS: Record<string, { label: string; emoji: string }> = {
  "chatting":          { label: "Remote Chatting",  emoji: "💬" },
  "ai-training":       { label: "AI Training",      emoji: "🤖" },
  "surveys":           { label: "Surveys",          emoji: "📋" },
  "academic-writing":  { label: "Academic Writing", emoji: "✍️" },
  "forex":             { label: "Forex Trading",    emoji: "📈" },
  "swahili-teaching":  { label: "Teach Swahili",    emoji: "🌍" },
};


interface Props {
  track: string;
  onClose: () => void;
}

export default function ApplicationModal({ track, onClose }: Props) {
  const [name, setName]       = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);

  const t = TRACKS[track] ?? TRACKS["chatting"];

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 10);
    inputRef.current?.focus();
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) {
      setError("Enter your first name");
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    const msg = encodeURIComponent(
  `Hi, my name is ${trimmed}. I'm ready to start earning online with VelloEarn. Please guide me through the next step and activate my account.`
);
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
      setLoading(false);
    }, 600);
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm"
    >
      <div
        className={`w-full max-w-[460px] bg-white rounded-t-[22px] overflow-hidden transition-all duration-[380ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Rose bar */}
        <div className="h-[3px] bg-rose-500 w-full" />

        {/* Drag pill */}
        <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto mt-3" />

        <div className="px-6 pt-5 pb-8 relative">

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-0 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

         {/* Track badge */}
<div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-500 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3.5">
  <span>{t.emoji}</span>
  <span>Remote Income Opportunities</span>
</div>

          {/* Heading */}
<h2 className="font-extrabold text-[27px] text-slate-900 leading-[1.18] tracking-tight mb-2">
  Learn How To Earn Online.<br />
  <span className="text-rose-500">Start Today.</span>
</h2>

          {/* Subheading */}
<p className="text-[13.5px] text-slate-500 leading-relaxed mb-5">
  Enter your name and we&apos;ll guide you through the fastest way to get started with remote income opportunities. No experience, no laptop, and no joining fee required.
</p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {["📱 Phone only", "💸 M-Pesa payouts", "✅ Free to join"].map((pill) => (
              <span
                key={pill}
                className="text-[11.5px] text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1 font-medium"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Input */}
          <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2">
            Your first name
          </label>

          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. Wanjiru"
            autoComplete="given-name"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={`w-full rounded-[13px] px-4 py-3.5 text-[15px] text-slate-900 placeholder-slate-300 outline-none transition-all border-[1.5px] focus:ring-[3px] focus:ring-rose-500/10 focus:border-rose-500 ${
              error
                ? "border-rose-500 bg-rose-50/50"
                : "border-slate-200 bg-slate-50 focus:bg-white"
            }`}
          />

          {error && (
            <p className="flex items-center gap-1 mt-1.5 text-[11.5px] text-rose-500">
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold text-[15px] rounded-[13px] py-4 shadow-[0_4px_18px_rgba(244,63,94,0.3)] hover:shadow-[0_6px_22px_rgba(244,63,94,0.38)] hover:-translate-y-px active:scale-[0.98] disabled:shadow-none disabled:cursor-default transition-all"
          >
            {loading ? (
              <>
                <SpinnerIcon />
                Opening WhatsApp...
              </>
            ) : (
              <>
                <WhatsAppIcon />
                Start My Application
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-500 mt-3">
  Takes less than 2 minutes to get started.
</p>

          {/* WhatsApp handoff note */}
<div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-3.5 py-2.5 mt-3.5">
  <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center shrink-0">
    <WhatsAppIcon size={14} color="white" />
  </div>

  <p className="text-xs text-green-800 leading-relaxed">
    <strong className="font-semibold">
      Our onboarding team is ready.
    </strong>{" "}
    Once you message us, we&apos;ll review your application and guide you to the next available earning opportunities.
  </p>
</div>

          {/* Privacy */}
          <p className="text-center text-[11px] text-slate-300 mt-4">
            No spam. No sharing. Free forever.
          </p>

        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon({ size = 20, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}