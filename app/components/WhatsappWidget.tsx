"use client";

/**
 * WhatsAppWidget
 *
 * A chat-bubble UI that:
 *  1. Greets the user with a contextual opener based on current page
 *  2. Walks through 3 quick qualification questions (inline chat bubbles)
 *  3. Rate-limits to prevent spam (max 3 sessions per hour per browser)
 *  4. Builds a rich prefilled WhatsApp message from their answers
 *  5. Opens WhatsApp in a new tab
 *
 * Add once to LayoutClient — remove all FABs from page clients.
 *
 * Props:
 *  whatsappNumber  — digits only, e.g. "254712345678"
 *  pageTrack       — optional track name from the current page (passed from parent)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

// ── Rate limiting (client-side, localStorage) ─────────────────────────────────
// Stores timestamps of widget opens. Blocks after MAX_SESSIONS in WINDOW_MS.
const RATE_KEY     = "ve_wa_sessions";
const MAX_SESSIONS = 3;
const WINDOW_MS    = 60 * 60 * 1000; // 1 hour

function checkRateLimit(): { allowed: boolean; remainingMs: number } {
  try {
    const raw      = localStorage.getItem(RATE_KEY);
    const sessions = raw ? (JSON.parse(raw) as number[]) : [];
    const now      = Date.now();
    const recent   = sessions.filter((t) => now - t < WINDOW_MS);

    if (recent.length >= MAX_SESSIONS) {
      const oldest       = Math.min(...recent);
      const remainingMs  = WINDOW_MS - (now - oldest);
      return { allowed: false, remainingMs };
    }

    // Record this session
    localStorage.setItem(RATE_KEY, JSON.stringify([...recent, now]));
    return { allowed: true, remainingMs: 0 };
  } catch {
    // Incognito / storage blocked — allow through
    return { allowed: true, remainingMs: 0 };
  }
}

// ── Track detection from URL ──────────────────────────────────────────────────
const PATH_TRACK: Record<string, string> = {
  "/earn/chatting":        "Remote Chatting",
  "/earn/surveys":         "Surveys & Research",
  "/earn/ai-training":     "AI Training",
  "/earn/academic-writing":"Academic Writing",
  "/earn/forex":           "Forex Trading",
};

function getTrackFromPath(path: string): string {
  return PATH_TRACK[path] ?? "General";
}

// ── Conversation flow ─────────────────────────────────────────────────────────

type Step = {
  id: string;
  botMsg: string;
  options?: string[];          // quick-reply chips
  freeText?: boolean;          // allow typed input instead
  placeholder?: string;
};

const STEPS: Step[] = [
  {
    id: "interest",
    botMsg: "Which earning track are you most interested in?",
    options: [
      "Remote Chatting 💬",
      "Surveys & Research 📋",
      "AI Training 🤖",
      "Academic Writing ✍️",
      "Forex Trading 📈",
      "Not sure yet",
    ],
  },
  {
    id: "availability",
    botMsg: "How many hours a day can you dedicate?",
    options: ["Less than 2 hrs", "2–4 hrs", "4–6 hrs", "6+ hrs"],
  },
  {
    id: "name",
    botMsg: "Last one — what's your first name so our team can greet you properly?",
    freeText: true,
    placeholder: "e.g. Wanjiru",
  },
];

type Answer = { stepId: string; value: string };

interface Message {
  from: "bot" | "user";
  text: string;
  key: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WhatsAppWidget({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const pathname = usePathname();
  const track    = getTrackFromPath(pathname);

  const [open, setOpen]             = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [blocked, setBlocked]       = useState(false);
  const [blockedMsg, setBlockedMsg] = useState("");
  const [messages, setMessages]     = useState<Message[]>([]);
  const [stepIdx, setStepIdx]       = useState(0);
  const [answers, setAnswers]       = useState<Answer[]>([]);
  const [freeInput, setFreeInput]   = useState("");
  const [done, setDone]             = useState(false);
  const [fabPulse, setFabPulse]     = useState(true);
  const [fabLabel, setFabLabel]     = useState(true); // show label tooltip

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Stop pulse after 6s
  useEffect(() => {
    const t1 = setTimeout(() => setFabPulse(false), 6000);
    const t2 = setTimeout(() => setFabLabel(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [messages]);

  // Focus input when a free-text step appears
  useEffect(() => {
    if (open && !done && STEPS[stepIdx]?.freeText) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [stepIdx, open, done]);

  // Mount animation
  useEffect(() => {
    if (open) setTimeout(() => setMounted(true), 10);
    else setMounted(false);
  }, [open]);

  // ── Open handler ──────────────────────────────────────────────────────────
  const handleOpen = useCallback(() => {
    if (open) { setOpen(false); return; }

    const { allowed, remainingMs } = checkRateLimit();
    if (!allowed) {
      const mins = Math.ceil(remainingMs / 60000);
      setBlocked(true);
      setBlockedMsg(
        `You've sent several messages recently. Please try again in ${mins} minute${mins !== 1 ? "s" : ""}.`,
      );
      setOpen(true);
      return;
    }

    // Build opening bot message contextual to page
    const greeting =
      track !== "General"
        ? `Hey! 👋 I see you're checking out **${track}**. I can help answer questions and connect you with our team on WhatsApp.`
        : `Hey! 👋 Thinking about earning with VelloEarn? I'll connect you with our team on WhatsApp in about 30 seconds.`;

    setMessages([{ from: "bot", text: greeting, key: "greeting" }]);
    setStepIdx(0);
    setAnswers([]);
    setDone(false);
    setBlocked(false);

    // Small delay then first question
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: STEPS[0].botMsg, key: "step-0" },
      ]);
    }, 700);

    setOpen(true);
  }, [open, track]);

  // ── Answer handler ────────────────────────────────────────────────────────
  const handleAnswer = useCallback(
    (value: string) => {
      if (done || blocked) return;

      const step         = STEPS[stepIdx];
      const newAnswers   = [...answers, { stepId: step.id, value }];

      setMessages((prev) => [
        ...prev,
        { from: "user", text: value, key: `user-${stepIdx}` },
      ]);
      setAnswers(newAnswers);
      setFreeInput("");

      const nextIdx = stepIdx + 1;

      if (nextIdx < STEPS.length) {
        setStepIdx(nextIdx);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { from: "bot", text: STEPS[nextIdx].botMsg, key: `step-${nextIdx}` },
          ]);
        }, 500);
      } else {
        // Conversation complete
        setDone(true);
        const name = newAnswers.find((a) => a.stepId === "name")?.value ?? "there";
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              from: "bot",
              text: `Perfect, ${name}! 🎉 Tapping the button below will open WhatsApp with your details pre-filled. Our team will respond within a few hours.`,
              key: "done",
            },
          ]);
        }, 500);
      }
    },
    [stepIdx, answers, done, blocked],
  );

  // ── Build WhatsApp URL ─────────────────────────────────────────────────────
  const buildWaUrl = useCallback(() => {
    const interest    = answers.find((a) => a.stepId === "interest")?.value ?? "Not specified";
    const availability = answers.find((a) => a.stepId === "availability")?.value ?? "Not specified";
    const name        = answers.find((a) => a.stepId === "name")?.value ?? "there";
    const pageTrack   = track !== "General" ? track : interest;

    const msg = [
      `Hi VelloEarn! 👋`,
      ``,
      `My name is ${name}.`,
      `I'm interested in: ${interest}`,
      `Available: ${availability} per day`,
      `Page I was on: ${pageTrack}`,
      ``,
      `I'd like to apply and learn more.`,
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, [answers, track, whatsappNumber]);

  // ── Render ────────────────────────────────────────────────────────────────
  const currentStep   = STEPS[stepIdx];
  const showOptions   = open && !done && !blocked && currentStep && !currentStep.freeText;
  const showFreeInput = open && !done && !blocked && currentStep?.freeText;

  return (
    <>
      {/* ── Chat panel ── */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "#0f1117",
            border: "1px solid rgba(255,255,255,0.08)",
            transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
            opacity: mounted ? 1 : 0,
            transition: "transform 0.3s cubic-bezier(0.34,1.4,0.64,1), opacity 0.2s ease",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{
              background: "linear-gradient(135deg, #25D366, #1eaf55)",
              borderBottom: "1px solid rgba(0,0,0,0.15)",
            }}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                VE
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-[#25D366]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">VelloEarn Team</p>
              <p className="text-white/70 text-xs mt-0.5">Typically replies within hours</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{
              background: "#111318",
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(37,211,102,0.03), transparent 50%)",
            }}
          >
            {blocked ? (
              <div
                className="rounded-xl p-4 text-sm"
                style={{
                  background: "rgba(244,63,94,0.08)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {blockedMsg}
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.key}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.from === "bot"
                        ? {
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.85)",
                            borderBottomLeftRadius: "4px",
                          }
                        : {
                            background: "#25D366",
                            color: "#fff",
                            borderBottomRightRadius: "4px",
                          }
                    }
                  >
                    {/* Render **bold** in bot messages */}
                    {msg.from === "bot"
                      ? msg.text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="text-white">
                              {part}
                            </strong>
                          ) : (
                            part
                          ),
                        )
                      : msg.text}
                  </div>
                </div>
              ))
            )}

            {/* Done state — WhatsApp CTA */}
            {done && (
              <a
                href={buildWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.02] active:scale-95 mt-2"
                style={{ background: "linear-gradient(135deg, #25D366, #1eaf55)" }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continue on WhatsApp →
              </a>
            )}
          </div>

          {/* Quick-reply chips */}
          {showOptions && (
            <div
              className="shrink-0 px-4 py-3 flex flex-wrap gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {currentStep.options!.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(37,211,102,0.1)",
                    border: "1px solid rgba(37,211,102,0.25)",
                    color: "#25D366",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Free-text input */}
          {showFreeInput && (
            <div
              className="shrink-0 flex items-center gap-2 px-3 py-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={freeInput}
                onChange={(e) => setFreeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && freeInput.trim().length >= 2)
                    handleAnswer(freeInput.trim());
                }}
                placeholder={currentStep.placeholder ?? "Type your answer…"}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                maxLength={60}
              />
              <button
                onClick={() => {
                  if (freeInput.trim().length >= 2) handleAnswer(freeInput.trim());
                }}
                disabled={freeInput.trim().length < 2}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "#25D366" }}
                aria-label="Send"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── FAB ── */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-end gap-3">
        {/* Tooltip label — fades out after 5s */}
        {fabLabel && !open && (
          <div
            className="mb-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap shadow-lg"
            style={{
              background: "rgba(15,17,23,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              animation: "fadeInUp 0.3s ease both",
            }}
          >
            Chat with us 👋
          </div>
        )}

        <button
          onClick={handleOpen}
          aria-label={open ? "Close chat" : "Chat on WhatsApp"}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{
            background: open
              ? "rgba(37,211,102,0.85)"
              : "linear-gradient(135deg, #25D366, #1eaf55)",
            boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
          }}
        >
          {/* Pulse ring — stops after 6s */}
          {fabPulse && !open && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(37,211,102,0.35)",
                animation: "waPulse 1.6s ease-out infinite",
              }}
            />
          )}

          {/* Icon — toggles between WA and X */}
          <div
            style={{
              transition: "transform 0.25s ease, opacity 0.2s ease",
              transform: open ? "rotate(90deg) scale(0.85)" : "rotate(0) scale(1)",
            }}
          >
            {open ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2);   opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}