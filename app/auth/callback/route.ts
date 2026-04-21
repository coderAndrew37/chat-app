// app/auth/callback/route.ts
//
// PKCE callback for password reset flow.
// Supabase sends users here with ?code=<pkce_code> after clicking the
// reset password link in their email.
//
// Kept separate from /auth/confirm so each route has a single responsibility.

import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("[auth/callback] received", { hasCode: !!code });

  if (!code) {
    console.error("[auth/callback] missing code param");
    return NextResponse.redirect(new URL("/auth/error?reason=missing_code", origin));
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession failed:", {
      message: error.message,
      status: error.status,
    });
    return NextResponse.redirect(new URL("/auth/error?reason=invalid_code", origin));
  }

  console.log("[auth/callback] session established — redirecting to new-password");

  // Session is now set via cookies. Redirect to the form page where
  // the user sets their new password.
  return NextResponse.redirect(new URL("/auth/new-password", origin));
}