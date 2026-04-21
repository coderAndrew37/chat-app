// app/auth/confirm/route.ts
//
// PKCE email confirmation callback.
// Supabase emails the user a link: /auth/confirm?code=<pkce_code>
// This route exchanges the code, creates the profile, then redirects.

import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { upsertProfileData } from "@/lib/data/profiles.data";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/chat";

  console.log("[auth/confirm] callback received", { hasCode: !!code, next });

  if (!code) {
    console.error("[auth/confirm] missing code param");
    return NextResponse.redirect(new URL("/auth/error?reason=missing_code", origin));
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("[auth/confirm] exchangeCodeForSession failed:", {
      message: error?.message,
      status: error?.status,
    });
    return NextResponse.redirect(new URL("/auth/error?reason=invalid_code", origin));
  }

  const { user } = data;
  console.log("[auth/confirm] session established:", user.id);

  const meta = (user.user_metadata ?? {}) as {
    name?: string;
    age?: number;
    gender?: "male" | "female" | "other";
  };

  const { error: profileError } = await upsertProfileData({
    id: user.id,
    name: meta.name ?? "User",
    email: user.email ?? "",
    age: meta.age ?? 18,
    gender: meta.gender ?? "other",
    is_online: true,
    last_seen: new Date().toISOString(),
  });

  if (profileError) {
    // Auth succeeded — don't block. User can complete profile later.
    console.error("[auth/confirm] profile upsert failed:", profileError);
  }

  return NextResponse.redirect(new URL(next, origin));
}