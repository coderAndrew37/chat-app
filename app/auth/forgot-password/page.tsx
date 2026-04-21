// app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { forgotPasswordAction } from "@/lib/actions/auth.actions";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await forgotPasswordAction(data.email);
    // Always show success — action handles enumeration protection internally
    setSentEmail(data.email);
    setSent(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Check your inbox</h1>
            <p className="text-gray-500 text-sm mb-2">If an account exists for</p>
            <p className="font-bold text-gray-800 text-sm mb-6 break-all">{sentEmail}</p>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2">
              <p className="text-xs text-gray-500 flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                We sent a password reset link
              </p>
              <p className="text-xs text-gray-500 flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                The link expires in 1 hour
              </p>
              <p className="text-xs text-gray-500 flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">!</span>
                Check your spam folder if you don&apos;t see it
              </p>
            </div>
            <Link href="/"
              className="block w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors text-center">
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <Link href="/" className="inline-block text-3xl mb-4">❤️</Link>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Forgot your password?</h1>
              <p className="text-gray-500 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="fp-email">
                  Email Address
                </label>
                <input
                  id="fp-email" type="email" autoComplete="email" placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-rose-400"
                  }`}
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-rose-100 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : "Send Reset Link"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Remember your password?{" "}
              <Link href="/" className="text-rose-500 font-semibold hover:underline">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}