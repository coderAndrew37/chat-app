"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { fbq } from "@/app/components/pixels/MetaPixel";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { getStoredClickIds } from "@/lib/tracking";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState<Omit<RegisterInput, "country">>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof Omit<RegisterInput, "country">, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);
    setFieldErrors({});

    const validationResult = registerSchema.safeParse({
      ...formData,
      country: "kenya",
    });

    if (!validationResult.success) {
      const formattedErrors: Partial<Record<keyof RegisterInput, string>> = {};
      validationResult.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof RegisterInput;
        if (path) formattedErrors[path] = issue.message;
      });
      setFieldErrors(formattedErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const { username, email, password, phone } = validationResult.data;

      const { data: existingUser } = await supabase
        .from("profiles")
        .select("username")
        .ilike("username", username)
        .maybeSingle();

      if (existingUser) {
        setFieldErrors((prev) => ({
          ...prev,
          username: "Username is already taken. Please choose another.",
        }));
        toast.error("Username is already taken.");
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, phone, country: "Kenya" },
        },
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
          setFieldErrors((prev) => ({
            ...prev,
            email: "An account with this email already exists.",
          }));
          toast.error("An account with this email already exists.");
        } else {
          toast.error(authError.message);
        }
        return;
      }

      if (authData.user) {
        const { fbclid, gclid } = getStoredClickIds();

        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            id: authData.user.id,
            email,
            username,
            phone,
            is_activated: false,
            fbclid,
            gclid,
          },
          { onConflict: "id" }
        );

        if (profileError) {
          console.error("Profile Upsert Error:", profileError);

          if (profileError.code === "23505" || profileError.message?.includes("phone")) {
            setFieldErrors((prev) => ({
              ...prev,
              phone: "This phone number is already registered.",
            }));
            toast.error("This phone number is already in use.");
          } else {
            toast.error("Account created, but failed to initialize profile.");
          }
          setLoading(false);
          return;
        }

        fbq("CompleteRegistration", {
          content_name: "VelloEarn Free Registration",
          status: "success",
        });

        toast.success("Account created! Redirecting to activation...");
        router.push("/join/activate");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/join" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-rose-500/20">
              ★
            </div>
            <span className="font-extrabold text-2xl tracking-wider text-rose-500">
              VELLOEARN
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-rose-600 hover:text-rose-700 transition"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <form className="space-y-4" onSubmit={handleRegister} noValidate>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. Alex254"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition ${
                  fieldErrors.username ? "border-rose-500" : "border-slate-200"
                }`}
              />
              {fieldErrors.username && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition ${
                  fieldErrors.email ? "border-rose-500" : "border-slate-200"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number (M-Pesa)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0712345678"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition ${
                  fieldErrors.phone ? "border-rose-500" : "border-slate-200"
                }`}
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition ${
                  fieldErrors.password ? "border-rose-500" : "border-slate-200"
                }`}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-4 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Continue to Activation →"
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              By registering, you agree to our Terms of Service and Privacy
              Policy. Account activation requires a one-time verification fee.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}