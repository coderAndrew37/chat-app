"use client";

import { useState, useEffect, useRef } from "react";
import { fireApplicationSubmit } from "@/lib/conversionEvents";
import { ApplicationFormData } from "@/types";

// Track-specific accent colours so the modal feels native to each page
const TRACK_ACCENT: Record<string, { from: string; to: string; badge: string }> = {
  "Remote Chatting":    { from: "#f43f5e", to: "#fb923c", badge: "💬" },
  "Surveys & Research": { from: "#f59e0b", to: "#f97316", badge: "📋" },
  "AI Training":        { from: "#8b5cf6", to: "#6366f1", badge: "🤖" },
  "Academic Writing":   { from: "#10b981", to: "#0d9488", badge: "✍️" },
  "Forex Trading":      { from: "#3b82f6", to: "#06b6d4", badge: "📈" },
  "General Application":{ from: "#f43f5e", to: "#fb923c", badge: "🚀" },
};

function getAccent(track: string) {
  return TRACK_ACCENT[track] ?? TRACK_ACCENT["General Application"];
}

// Social proof cycling under the CTA
const PROOF_LINES = [
  "Zawadi from Embakasi made KES 22,500 last month.",
  "Kelvin from Kisumu earns KES 41,000 / month.",
  "Faith from South B made KES 38,000 writing.",
  "James from Westlands earns KES 52,000 trading.",
  "Over 60% of our team earns through chatting.",
];

export default function ApplicationModal({
  onClose,
  track,
  onSuccess,
}: {
  onClose: () => void;
  track: string;
  onSuccess: (data: ApplicationFormData) => void;
}) {
  const [form, setForm]           = useState<ApplicationFormData>({ name: "", whatsapp: "" });
  const [errors, setErrors]       = useState<Partial<ApplicationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofIdx, setProofIdx]   = useState(0);
  const [mounted, setMounted]     = useState(false);
  const nameRef                   = useRef<HTMLInputElement>(null);
  const accent                    = getAccent(track);

  // Slide-in animation on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    nameRef.current?.focus();
    return () => clearTimeout(t);
  }, []);

  // Cycle social proof every 3.5 s
  useEffect(() => {
    const id = setInterval(
      () => setProofIdx((i) => (i + 1) % PROOF_LINES.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const errs: Partial<ApplicationFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Enter your full name";
    const cleaned = form.whatsapp.replace(/\s/g, "");
    if (!cleaned || !/^(07|01|\+254|254)\d{8,9}$/.test(cleaned))
      errs.whatsapp = "Enter a valid Kenyan number (e.g. 0712 345 678)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    // Fire all pixel conversion events before the fake delay
    fireApplicationSubmit({ track, name: form.name });

    await new Promise((r) => setTimeout(r, 1100));
    setIsSubmitting(false);
    onSuccess(form);
  };

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* ── Sheet / Card ── */}
      <div
        className="relative w-full sm:max-w-md overflow-hidden
                   rounded-t-[28px] sm:rounded-[28px]
                   shadow-2xl"
        style={{
          background: "#0f1117",
          border: "1px solid rgba(255,255,255,0.07)",
          transform: mounted ? "translateY(0)" : "translateY(40px)",
          opacity: mounted ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
        }}
      >
        {/* ── Gradient accent bar ── */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
        />

        {/* ── Glow behind the bar ── */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60px at 50% 0, ${accent.from}22, transparent)`,
          }}
        />

        {/* ── Header ── */}
        <div className="relative px-7 pt-7 pb-0">
          <div className="flex items-start justify-between">
            <div>
              {/* Track badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{
                  background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}22)`,
                  border: `1px solid ${accent.from}44`,
                  color: accent.from,
                }}
              >
                <span>{accent.badge}</span>
                <span>{track}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white leading-tight tracking-tight">
                Apply in 30 seconds.
              </h2>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                We&apos;ll reach out on WhatsApp within 24 hrs.
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)")
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="px-7 pt-6 pb-7 space-y-4">

          {/* Name field */}
          <div>
            <label
              className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Full name
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="e.g. Wanjiru Muthoni"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
              style={{
                background: errors.name
                  ? "rgba(244,63,94,0.08)"
                  : "rgba(255,255,255,0.05)",
                border: errors.name
                  ? "1px solid rgba(244,63,94,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
                caretColor: accent.from,
              }}
              onFocus={(e) => {
                if (!errors.name)
                  (e.target as HTMLInputElement).style.border = `1px solid ${accent.from}88`;
              }}
              onBlur={(e) => {
                if (!errors.name)
                  (e.target as HTMLInputElement).style.border = "1px solid rgba(255,255,255,0.08)";
              }}
            />
            {errors.name && (
              <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }}>
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* WhatsApp field */}
          <div>
            <label
              className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              WhatsApp number
            </label>
            <div className="relative">
              {/* Flag prefix */}
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                🇰🇪
                <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              </div>
              <input
                type="tel"
                placeholder="0712 345 678"
                value={form.whatsapp}
                onChange={(e) => {
                  setForm({ ...form, whatsapp: e.target.value });
                  if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                }}
                className="w-full pl-14 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                style={{
                  background: errors.whatsapp
                    ? "rgba(244,63,94,0.08)"
                    : "rgba(255,255,255,0.05)",
                  border: errors.whatsapp
                    ? "1px solid rgba(244,63,94,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  caretColor: accent.from,
                }}
                onFocus={(e) => {
                  if (!errors.whatsapp)
                    (e.target as HTMLInputElement).style.border = `1px solid ${accent.from}88`;
                }}
                onBlur={(e) => {
                  if (!errors.whatsapp)
                    (e.target as HTMLInputElement).style.border = "1px solid rgba(255,255,255,0.08)";
                }}
              />
            </div>
            {errors.whatsapp ? (
              <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }}>
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.whatsapp}
              </p>
            ) : (
              <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                Activation instructions come here.
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full relative overflow-hidden py-4 rounded-xl font-extrabold text-base text-white transition-all mt-2"
            style={{
              background: isSubmitting
                ? `linear-gradient(135deg, ${accent.from}99, ${accent.to}99)`
                : `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              boxShadow: isSubmitting
                ? "none"
                : `0 8px 32px ${accent.from}55`,
              transform: isSubmitting ? "scale(0.98)" : "scale(1)",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Submit My Application
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}

            {/* Shimmer sweep on hover */}
            {!isSubmitting && (
              <span
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.4s infinite",
                }}
              />
            )}
          </button>

          {/* ── Social proof ticker ── */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="shrink-0 w-2 h-2 rounded-full animate-pulse"
              style={{ background: accent.from }}
            />
            <p
              className="text-xs leading-relaxed transition-all duration-500"
              style={{ color: "rgba(255,255,255,0.4)" }}
              key={proofIdx}
            >
              {PROOF_LINES[proofIdx]}
            </p>
          </div>

          {/* Privacy note */}
          <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            No spam. No third-party sharing. Ever.
          </p>
        </div>
      </div>

      {/* Shimmer keyframe — injected inline so no globals.css edit needed */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}