"use client";

// app/auth/confirm/page.tsx
//
// Supabase's generateLink(type:"magiclink") produces an IMPLICIT FLOW link.
// The full session (access_token + refresh_token) is embedded directly in
// the URL hash fragment. No token exchange is needed — we call setSession()
// with the tokens we already have.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Status = "verifying" | "success" | "error";

export default function ConfirmPage() {
  const router = useRouter();
  const [status, setStatus]     = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();

      const hash        = window.location.hash.substring(1);
      const hashParams  = new URLSearchParams(hash);
      const queryParams = new URLSearchParams(window.location.search.substring(1));
      const get         = (k: string) => queryParams.get(k) ?? hashParams.get(k);

      const errorParam = get("error");
      const errorDesc  = get("error_description");
      const next       = get("next") ?? "/chat";

      console.log("[auth/confirm] raw hash keys:", [...hashParams.keys()]);

      if (errorParam) {
        console.error("[auth/confirm] error in URL:", errorParam, errorDesc);
        setErrorMsg(errorDesc ?? errorParam);
        setStatus("error");
        return;
      }

      // ── Implicit flow: access_token + refresh_token already in hash ───────
      const accessToken  = get("access_token");
      const refreshToken = get("refresh_token");

      if (accessToken && refreshToken) {
        console.log("[auth/confirm] implicit flow — setting session from hash tokens");

        const { data, error } = await supabase.auth.setSession({
          access_token:  accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.user) {
          console.error("[auth/confirm] setSession failed:", error?.message);
          setErrorMsg(error?.message ?? "Session could not be established.");
          setStatus("error");
          return;
        }

        console.log("[auth/confirm] session set, user:", data.user.id);
        await createProfile(supabase, data.user);
        setStatus("success");
        setTimeout(() => router.replace(next), 800);
        return;
      }

      // ── PKCE flow: token_hash or code in query string ─────────────────────
      const tokenHash = get("token_hash");
      const type      = get("type") ?? "magiclink";
      const code      = get("code");

      if (tokenHash) {
        console.log("[auth/confirm] verifyOtp with token_hash, type:", type);
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as "magiclink" | "email" | "signup",
        });

        if (error || !data.user) {
          console.error("[auth/confirm] verifyOtp failed:", error?.message);
          setErrorMsg(error?.message ?? "Verification failed.");
          setStatus("error");
          return;
        }

        await createProfile(supabase, data.user);
        setStatus("success");
        setTimeout(() => router.replace(next), 800);
        return;
      }

      if (code) {
        console.log("[auth/confirm] exchangeCodeForSession");
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error || !data.user) {
          console.error("[auth/confirm] exchange failed:", error?.message);
          setErrorMsg(error?.message ?? "Verification failed.");
          setStatus("error");
          return;
        }

        await createProfile(supabase, data.user);
        setStatus("success");
        setTimeout(() => router.replace(next), 800);
        return;
      }

      console.error("[auth/confirm] no recognised token in URL. Hash:", hash);
      setErrorMsg("The confirmation link is incomplete or has already been used.");
      setStatus("error");
    };

    void run();
  }, [router]);

  // ── UI ────────────────────────────────────────────────────────────────────

  if (status === "verifying") {
    return (
      <Screen>
        <svg className="w-10 h-10 animate-spin text-rose-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Verifying your email…</h2>
        <p className="text-gray-400 text-sm">Just a moment, we&apos;re confirming your account.</p>
      </Screen>
    );
  }

  if (status === "success") {
    return (
      <Screen>
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Email confirmed! ❤️</h2>
        <p className="text-gray-400 text-sm">Redirecting you to Chat254…</p>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">Confirmation failed</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        {errorMsg || "This link has expired or already been used."}
      </p>
      <div className="space-y-3">
        <Link href="/" className="block w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors text-center">
          Back to Home
        </Link>
        <Link href="/auth/forgot-password" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-center text-sm">
          Request a new link
        </Link>
      </div>
    </Screen>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
        {children}
      </div>
    </div>
  );
}

async function createProfile(
  supabase: ReturnType<typeof createClient>,
  user: { id: string; email?: string; user_metadata?: Record<string, unknown> },
) {
  const meta = (user.user_metadata ?? {}) as {
    name?: string;
    age?: number;
    gender?: "male" | "female" | "other";
  };

  const { error } = await supabase.from("profiles").upsert(
    {
      id:        user.id,
      name:      meta.name   ?? "User",
      email:     user.email  ?? "",
      age:       meta.age    ?? 18,
      gender:    meta.gender ?? "other",
      is_online: true,
      last_seen: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("[auth/confirm] profile upsert failed:", error.message);
  } else {
    console.log("[auth/confirm] profile created/updated for:", user.id);
  }
}