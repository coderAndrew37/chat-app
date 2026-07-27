"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { fbq } from "@/app/components/pixels/MetaPixel";
import { X } from "lucide-react";

// ─── Constants ──────────────────────────────────────────────────────────────
const ACTIVATION_AMOUNT = 200;
const POCHI_PHONE_NUMBER = "0746577838";

// ─── Validation ─────────────────────────────────────────────────────────────
const mpesaCodeSchema = z.object({
  mpesaCode: z
    .string()
    .trim()
    .toUpperCase()
    .length(10, "M-Pesa transaction code must be exactly 10 characters")
    .regex(/^[A-Z0-9]{10}$/, "Invalid M-Pesa transaction code format"),
});

// ─── Types ─────────────────────────────────────────────────────────────────
interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  is_activated: boolean;
}

// ─── Floating M‑Pesa Ping Component ──────────────────────────────────────
const MpesaPing = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const sampleMessages = [
    "NG Ifeoma from Nigeria withdrew $215 via M-Pesa",
    "KE Brian from Kenya withdrew KES 12,500 via M-Pesa",
    "GH Ama from Ghana withdrew GHS 450 via M-Pesa",
    "UG Sarah from Uganda withdrew UGX 120,000 via M-Pesa",
    "TZ John from Tanzania withdrew TZS 85,000 via M-Pesa",
    "ZA Thabo from South Africa withdrew ZAR 3,200 via M-Pesa",
    "ZM Mutale from Zambia withdrew ZMW 2,100 via M-Pesa",
    "BW Tshepo from Botswana withdrew BWP 1,800 via M-Pesa",
    "KE Wanjiru from Kenya withdrew KES 8,200 via M-Pesa",
    "NG Chidi from Nigeria withdrew $310 via M-Pesa",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const showNext = () => {
      const randomIndex = Math.floor(Math.random() * sampleMessages.length);
      setMessage(sampleMessages[randomIndex]);
      setVisible(true);

      // Hide after 5 seconds
      timeout = setTimeout(() => {
        setVisible(false);
        // Schedule next after 3-8 seconds
        const nextDelay = 3000 + Math.random() * 5000;
        setTimeout(showNext, nextDelay);
      }, 5000);
    };

    // Start first ping after 2 seconds
    const initialDelay = setTimeout(showNext, 2000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

return (
  /* Positioned top-right and kept compact with max-w-xs */
  <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 max-w-xs animate-in slide-in-from-top-5 fade-in duration-300">
    <div className="bg-white rounded-xl shadow-xl border border-emerald-100 p-3 flex items-center gap-2.5">
      
      {/* M-Pesa Icon Badge */}
      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
        <span className="text-emerald-600 text-sm font-extrabold">M</span>
      </div>

      {/* Message with Highlighted Amount */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-900 leading-snug">
          {(() => {
            // Regex to find and highlight currency amounts (e.g., $215, KES 12,500, GHS 450)
            const parts = message.split(/(withdrew\s+)([\$\w\s\d,]+)(\s+via)/i);
            if (parts.length >= 4) {
              return (
                <>
                  <span className="truncate block">{parts[0]} withdrew</span>
                  <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] rounded-md border border-emerald-200/60 shadow-xs">
                    {parts[2]}
                  </span>{" "}
                  <span className="text-slate-500 font-medium">{parts[3].trim()}</span>
                </>
              );
            }
            return message;
          })()}
        </p>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Just now</p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="text-slate-300 hover:text-slate-500 transition-colors p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);
};

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function ActivatePage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  // ── Load user & check activation ──
  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          toast.error("Please register or log in first.");
          router.push("/join/register");
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, username, phone, is_activated")
          .eq("id", user.id)
          .single();

        if (profileError || !profileData) {
          toast.error("Unable to load profile data.");
          return;
        }

        if (profileData.is_activated) {
          toast.success("Your account is already activated!");
          router.push("/dashboard");
          return;
        }

        setProfile({
          id: user.id,
          username: profileData.username,
          phone: profileData.phone,
          email: user.email || "",
          is_activated: profileData.is_activated,
        });
      } catch {
        toast.error("Failed to load user information.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router, supabase]);

  // ── Verify M‑Pesa code ──
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(null);

    const result = mpesaCodeSchema.safeParse({ mpesaCode });
    if (!result.success) {
      const err = result.error.issues[0]?.message || "Invalid transaction code";
      setCodeError(err);
      toast.error(err);
      return;
    }

    setVerifying(true);

    try {
      const { error: txError } = await supabase.from("mpesa_transactions").insert({
        user_id: profile?.id,
        username: profile?.username,
        mpesa_code: result.data.mpesaCode,
        amount: ACTIVATION_AMOUNT,
        status: "pending",
      });

      if (txError) {
        if (txError.code === "23505") {
          toast.error("This M-Pesa code has already been submitted.");
        } else {
          toast.error(txError.message || "Failed to submit M-Pesa code.");
        }
        return;
      }

      fbq("InitiateCheckout", {
        content_name: "Account Activation",
        value: ACTIVATION_AMOUNT,
        currency: "KES",
      });

      toast.success("Code submitted! Verification in progress...");
      setMpesaCode("");
      router.push("/dashboard");
    } catch {
      toast.error("An error occurred during verification. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800">
        <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-medium">Loading details...</p>
      </div>
    );
  }

  // ── Render ──
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {/* Floating M-Pesa Ping */}
      <MpesaPing />

      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Activate Your Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            One‑time payment of <span className="font-bold text-rose-600">KES {ACTIVATION_AMOUNT}</span> unlocks your dashboard.
          </p>
        </div>

        {/* User Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Account Details
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Username</span>
              <span className="font-bold text-slate-800">{profile?.username}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Phone</span>
              <span className="font-bold text-slate-800">{profile?.phone}</span>
            </div>
            <div className="col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Email</span>
              <span className="font-bold text-slate-800 truncate block">{profile?.email}</span>
            </div>
          </div>
        </div>

        {/* Payment Instructions Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/80">
          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100 mb-6">
            <h3 className="font-bold text-rose-600 text-sm uppercase tracking-wider mb-3">
              💳 How to Activate your account via M‑Pesa
            </h3>
            <ol className="space-y-2 text-slate-700 text-sm font-medium list-decimal list-inside leading-relaxed">
              <li>Open <strong className="text-slate-900">M-Pesa</strong> on your phone</li>
              <li>Select <strong className="text-slate-900">Lipa na M-Pesa</strong> → <strong className="text-rose-600">Pochi la Biashara</strong></li>
              <li>
                Phone:{" "}
                <strong className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-slate-900 font-mono">
                  {POCHI_PHONE_NUMBER}
                </strong>
                <span className="text-slate-400 text-xs ml-1">(Melissa)</span>
              </li>
              <li>
                Amount:{" "}
                <strong className="text-rose-600 text-base">KES {ACTIVATION_AMOUNT}</strong>
              </li>
            </ol>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                M‑Pesa Transaction Code
              </label>
              <input
                type="text"
                value={mpesaCode}
                onChange={(e) => {
                  setMpesaCode(e.target.value.toUpperCase());
                  if (codeError) setCodeError(null);
                }}
                placeholder="e.g. QLI3FQOGVJ"
                maxLength={10}
                className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl text-slate-900 font-mono placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase tracking-widest transition ${
                  codeError ? "border-rose-500" : "border-slate-200"
                }`}
              />
              {codeError && (
                <p className="mt-1 text-sm text-rose-500 font-medium">{codeError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-5 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg tracking-wide shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {verifying ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying…
                </span>
              ) : (
                `Activate Now — KES ${ACTIVATION_AMOUNT}`
              )}
            </button>
          </form>

          <p className="mt-5 text-xs text-slate-400 text-center leading-relaxed">
            Your account will be live within minutes after verification.
          </p>
        </div>

      </div>
    </main>
  );
}