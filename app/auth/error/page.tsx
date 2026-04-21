// app/auth/error/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const REASON_MESSAGES: Record<string, string> = {
  missing_code:  "The confirmation link is incomplete. Please request a new one.",
  invalid_code:  "This link has already been used or has expired. Please request a new one.",
  no_user:       "We couldn't find your account. Please try registering again.",
  server_error:  "A server error occurred. Please try again in a moment.",
  missing_params: "The link is malformed. Please request a new one.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") ?? "unknown";
  const message = REASON_MESSAGES[reason] ?? "Something went wrong. Please try again.";

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Something went wrong</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">{message}</p>
      <div className="space-y-3">
        <Link href="/"
          className="block w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors text-center">
          Back to Home
        </Link>
        <Link href="/auth/forgot-password"
          className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-center text-sm">
          Request a new link
        </Link>
      </div>
      {process.env.NODE_ENV === "development" && (
        <p className="mt-6 text-xs text-gray-300 font-mono">reason: {reason}</p>
      )}
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <Suspense fallback={<div className="text-center text-gray-400 text-sm">Loading...</div>}>
          <ErrorContent />
        </Suspense>
      </div>
    </div>
  );
}