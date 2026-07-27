"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { fbq } from "@/app/components/pixels/MetaPixel";

const ACTIVATION_AMOUNT = 200;
const POCHI_PHONE_NUMBER = "0746577838";

const mpesaCodeSchema = z.object({
  mpesaCode: z
    .string()
    .trim()
    .toUpperCase()
    .length(10, "M-Pesa transaction code must be exactly 10 characters")
    .regex(/^[A-Z0-9]{10}$/, "Invalid M-Pesa transaction code format"),
});

interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  is_activated: boolean;
}

export default function ActivatePage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

const handleCopyNumber = () => {
  navigator.clipboard.writeText(POCHI_PHONE_NUMBER);
  setCopied(true);
  toast.success("Phone number copied to clipboard!");
  setTimeout(() => setCopied(false), 2000);
};

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
          .select("id, username, phone,  is_activated")
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
      } catch (err: unknown) {
        toast.error("Failed to load user information.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router, supabase]);

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred during verification. Please try again.");
      }
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800">
        <div className="w-8 h-8 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-500 font-medium">Loading details...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-md mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
            ACCOUNT ACTIVATION
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Complete activation for: <span className="text-rose-600 font-bold">{profile?.username}</span>
          </p>
        </div>

        {/* User Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Account Details Summary
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 mb-6 text-sm">
            <h3 className="font-bold text-rose-600 text-xs uppercase tracking-wider mb-2">
              Payment via Pochi la Biashara
            </h3>
            <ol className="space-y-1.5 text-slate-700 text-xs font-medium list-decimal list-inside leading-relaxed">
              <li>Open <strong className="text-slate-900">M-Pesa</strong> on your phone</li>
              <li>Select <strong className="text-slate-900">Lipa na M-Pesa</strong> → <strong className="text-rose-600">Pochi la Biashara</strong></li>
            <li className="flex items-center flex-wrap gap-1.5">
  <span>Phone:</span>
  <button
    type="button"
    onClick={handleCopyNumber}
    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 active:scale-95 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-900 font-mono font-bold text-xs shadow-sm transition-all group"
    title="Click to copy number"
  >
    <span>{POCHI_PHONE_NUMBER}</span>
    <span className="text-[10px] text-slate-400 group-hover:text-rose-500 font-sans font-medium">
      {copied ? "✓ Copied!" : "📋 Copy"}
    </span>
  </button>
  <span className="text-slate-500 font-medium">(Melissa)</span>
</li>
            </ol>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Enter M-Pesa Code
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
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 font-mono placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase tracking-widest transition ${
                  codeError ? "border-rose-500" : "border-slate-200"
                }`}
              />
              {codeError && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{codeError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-4 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none uppercase"
            >
              {verifying ? "Confirming..." : "CONFIRM ACTIVATION"}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-slate-500 text-center leading-relaxed">
            Your account will be instantly verified once total payments reach Ksh {ACTIVATION_AMOUNT}.
          </p>
        </div>

      </div>
    </main>
  );
}