// lib/actions/auth.actions.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
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
// Supabase dashboard must have:
//   Authentication → Settings → "Enable email confirmations" → OFF
//   Authentication → Settings → "Enable email signups"       → ON
//   Authentication → Hooks → "Customize Access Token" hook   → DISABLED
//
// With confirmations OFF:
//   - signUp() creates + auto-confirms the user immediately
//   - We generate a magiclink via admin client (one-time login link)
//   - Only our Resend email goes out — Supabase sends nothing
//   - User clicks link → /auth/confirm page (client-side) reads the hash
//     fragment, calls verifyOtp(), establishes session, creates profile

export async function signUpAction(
  _prevState: AuthState | null,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();
  const admin    = createAdminSupabaseClient();

  const email    = (formData.get("email")    as string).trim().toLowerCase();
  const password =  formData.get("password") as string;
  const name     = (formData.get("name")     as string).trim();
  const age      = Number(formData.get("age"));
  const gender   =  formData.get("gender")   as string;

  console.log("[signUp] attempting signup for:", email);

  // ── Step 1: Create the auth user ─────────────────────────────────────────
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, age, gender },
    },
  });

  if (signUpError) {
    console.error("[signUp] error:", signUpError.message);
    const msg = signUpError.message.toLowerCase();
    if (msg.includes("already registered") || msg.includes("already been registered"))
      return { success: false, error: "That email is already registered. Try signing in." };
    if (msg.includes("signups not allowed"))
      return { success: false, error: "Sign ups are currently disabled." };
    return { success: false, error: signUpError.message };
  }

  console.log("[signUp] user created, id:", signUpData.user?.id);

  // ── Step 2: Generate one-time magic link via admin client ─────────────────
  // type "magiclink" = a one-time login link. With email confirmations OFF,
  // the user is already confirmed — this link just proves they own the email
  // and establishes their first session.
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: { name, age, gender },
    },
  });

  if (linkError || !linkData?.properties?.action_link) {
    console.error("[signUp] generateLink error:", linkError?.message);
    return {
      success: true,
      email,
      message: "Account created but confirmation email failed. Please contact support.",
    };
  }

  console.log("[signUp] magic link generated");

  // ── Step 3: Send via Resend ───────────────────────────────────────────────
  const { error: mailError } = await sendConfirmationEmail({
    email,
    name,
    confirmationUrl: linkData.properties.action_link,
  });

  if (mailError) {
    console.error("[signUp] mail error:", mailError.message);
    return {
      success: true,
      email,
      message: "Account created but confirmation email failed. Please contact support.",
    };
  }

  console.log("[signUp] confirmation email sent to:", email);
  return { success: true, email };
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function signInAction(
  _prevState: AuthState | null,
  formData: FormData,
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
      return { success: false, error: "Too many attempts. Please wait a moment." };
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
    console.log("[signOut] marking offline:", user.id);
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
  formData: FormData,
): Promise<AuthState> {
  const admin = createAdminSupabaseClient();
  const email = (formData.get("email") as string).trim().toLowerCase();

  console.log("[forgotPassword] reset requested for:", email);

  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  // Always return success — prevents email enumeration
  if (linkError || !linkData?.properties?.action_link) {
    console.error("[forgotPassword] generateLink error:", linkError?.message);
    return { success: true };
  }

  const { error: mailError } = await sendPasswordResetEmail({
    email,
    resetUrl: linkData.properties.action_link,
  });

  if (mailError) {
    console.error("[forgotPassword] mail error:", mailError.message);
  } else {
    console.log("[forgotPassword] reset email sent to:", email);
  }

  return { success: true };
}

// ─── Update Password ──────────────────────────────────────────────────────────

export async function updatePasswordAction(
  _prevState: AuthState | null,
  formData: FormData,
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
  console.log("[updatePassword] success");
  return { success: true };
}