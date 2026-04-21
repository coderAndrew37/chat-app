// app/auth/new-password/page.tsx
//
// The actual "set new password" form.
// Named /auth/new-password (not /auth/reset-password) to avoid the
// Next.js conflict of having both a route.ts and page.tsx in the same
// folder. The PKCE callback at /auth/callback redirects here.
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updatePasswordAction } from "@/lib/actions/auth.actions";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function NewPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const result = await updatePasswordAction(data.password);
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Password updated! Please sign in with your new password.");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🔐</div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Set new password</h1>
          <p className="text-gray-500 text-sm">Choose a strong password for your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="new-pw">
              New Password
            </label>
            <input
              id="new-pw" type="password" autoComplete="new-password" placeholder="Min. 8 characters"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-rose-400"
              }`}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirm-pw">
              Confirm New Password
            </label>
            <input
              id="confirm-pw" type="password" autoComplete="new-password" placeholder="Repeat your new password"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-rose-400"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword.message}</p>}
          </div>

          <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 mb-1">Password must have:</p>
            {["At least 8 characters", "At least one uppercase letter (A–Z)", "At least one number (0–9)"].map((req) => (
              <p key={req} className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                {req}
              </p>
            ))}
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-rose-100 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Updating password...
              </>
            ) : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}