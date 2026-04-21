// lib/actions/auth.actions.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sendConfirmationEmail, sendPasswordResetEmail } from "@/lib/mail";

export type AuthState = {
  success: boolean;
  error?: string;
  message?: string;
  email?: string;
};

// ─── Sign Up ──────────────────────────────────────────────────────────────────
//
// Architecture:
//   1. Create the user in Supabase Auth (email confirmation disabled in
//      Supabase dashboard — we own the confirmation flow via Resend).
//   2. Generate a sign-up OTP via Supabase (gives us a secure token).
//   3. Send the branded confirmation email through Resend directly.
//
// Why not use Supabase's built-in email?
//   Supabase's SMTP relay is rate-limited, unreliable for production, and
//   gives you no delivery visibility. Owning the send via Resend gives you
//   delivery logs, webhooks, and full template control.

export async function signUpAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();

  const email    = (formData.get("email")    as string).trim().toLowerCase();
  const password =  formData.get("password") as string;
  const name     = (formData.get("name")     as string).trim();
  const age      = Number(formData.get("age"));
  const gender   =  formData.get("gender")   as string;

  console.log("[signUp] attempting signup for:", email);

  // ── Step 1: Create the user ──────────────────────────────────────────────
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, age, gender },
      // emailRedirectTo is unused — we build the link ourselves below.
      // Supabase dashboard must have "Confirm email" DISABLED so the user
      // record is created immediately without waiting for Supabase to send.
    },
  });

  if (signUpError) {
    console.error("[signUp] supabase.auth.signUp error:", signUpError);
    const msg = signUpError.message.toLowerCase();
    if (msg.includes("already registered") || msg.includes("already been registered"))
      return { success: false, error: "That email is already registered. Try signing in." };
    if (msg.includes("signups not allowed"))
      return { success: false, error: "Sign ups are currently disabled." };
    if (msg.includes("password"))
      return { success: false, error: "Password must be at least 6 characters." };
    return { success: false, error: signUpError.message };
  }

  console.log("[signUp] user created, id:", signUpData.user?.id);

  // ── Step 2: Generate a confirmation token via Supabase OTP ──────────────
  // We use generateLink() to get a secure, expiring token URL from Supabase,
  // then embed it in our own branded email instead of letting Supabase send.
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: {
      data: { name, age, gender },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });

  if (linkError || !linkData?.properties?.action_link) {
    console.error("[signUp] generateLink error:", linkError);
    // User was created — don't block them. Return success; they can
    // request a resend later. Log for ops visibility.
    return {
      success: true,
      email,
      message: "Account created but confirmation email failed. Contact support.",
    };
  }

  const confirmationUrl = linkData.properties.action_link;
  console.log("[signUp] confirmation link generated (not logged for security)");

  // ── Step 3: Send confirmation email via Resend ───────────────────────────
  const { error: mailError } = await sendConfirmationEmail({ email, name, confirmationUrl });

  if (mailError) {
    console.error("[signUp] resend email error:", mailError);
    return {
      success: true,
      email,
      message: "Account created but confirmation email failed. Contact support.",
    };
  }

  console.log("[signUp] confirmation email sent to:", email);
  return { success: true, email, message: "Confirmation link sent to your email." };
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function signInAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();

  const email    = (formData.get("email")    as string).trim().toLowerCase();
  const password =  formData.get("password") as string;

  console.log("[signIn] attempt for:", email);

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[signIn] error:", error.message);
    const msg = error.message.toLowerCase();
    if (msg.includes("invalid login credentials") || msg.includes("invalid email or password"))
      return { success: false, error: "Invalid email or password." };
    if (msg.includes("email not confirmed"))
      return { success: false, error: "Please confirm your email before signing in." };
    if (msg.includes("too many requests"))
      return { success: false, error: "Too many attempts. Please wait a moment and try again." };
    return { success: false, error: error.message };
  }

  console.log("[signIn] success for:", email);
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOutAction(): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    console.log("[signOut] marking offline, user:", user.id);
    await supabase.from("profiles").update({ is_online: false }).eq("id", user.id);
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[signOut] error:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export async function forgotPasswordAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();
  const email = (formData.get("email") as string).trim().toLowerCase();

  console.log("[forgotPassword] reset requested for:", email);

  // Generate the reset link via Supabase admin (same pattern as signup)
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  // Always return success to prevent email enumeration — log errors internally
  if (linkError || !linkData?.properties?.action_link) {
    console.error("[forgotPassword] generateLink error:", linkError);
    return { success: true, message: "If the account exists, a reset link has been sent." };
  }

  const resetUrl = linkData.properties.action_link;
  const { error: mailError } = await sendPasswordResetEmail({ email, resetUrl });

  if (mailError) {
    console.error("[forgotPassword] resend email error:", mailError);
  } else {
    console.log("[forgotPassword] reset email sent to:", email);
  }

  return { success: true, message: "If the account exists, a reset link has been sent." };
}

// ─── Update Password ──────────────────────────────────────────────────────────

export async function updatePasswordAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();
  const newPassword = formData.get("password") as string;

  console.log("[updatePassword] updating password");

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.error("[updatePassword] error:", error.message);
    return { success: false, error: error.message };
  }

  await supabase.auth.signOut();
  console.log("[updatePassword] success, signed out");
  return { success: true, message: "Password updated. Please sign in." };
}