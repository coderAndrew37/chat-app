// actions/auth.actions.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AUTH_REDIRECT_URLS } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export type AuthState = {
  success: boolean;
  error?: string;
  message?: string;
  email?: string;
};

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export async function signUpAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const age = Number(formData.get("age"));
  const gender = formData.get("gender") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, age, gender },
      emailRedirectTo: AUTH_REDIRECT_URLS.confirm(process.env.NEXT_PUBLIC_SITE_URL!),
    },
  });

  if (error) {
    console.error("[auth/signUp] error:", error.message);
    if (error.message.toLowerCase().includes("already registered"))
      return { success: false, error: "That email is already registered. Try signing in." };
    if (error.message.toLowerCase().includes("signups not allowed"))
      return { success: false, error: "Sign ups are currently disabled." };
    return { success: false, error: error.message };
  }

  return { success: true, email, message: "Confirmation link sent to your email." };
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function signInAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[auth/signIn] error:", error.message);
    if (error.message.toLowerCase().includes("invalid login credentials"))
      return { success: false, error: "Invalid email or password." };
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOutAction(): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("profiles").update({ is_online: false }).eq("id", user.id);
  }

  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, error: error.message };

  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export async function forgotPasswordAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();
  const email = formData.get("email") as string;

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: AUTH_REDIRECT_URLS.resetPassword(process.env.NEXT_PUBLIC_SITE_URL!),
  });

  // Always return success to prevent email enumeration
  return { success: true, message: "If the account exists, a reset link has been sent." };
}

// ─── Update Password ──────────────────────────────────────────────────────────

export async function updatePasswordAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createServerSupabaseClient();
  const newPassword = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) return { success: false, error: error.message };

  await supabase.auth.signOut();
  return { success: true, message: "Password updated. Please sign in." };
}