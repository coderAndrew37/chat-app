"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema, type RegisterFormData } from "@/types/schemas";
import { signUpAction, type AuthState } from "@/lib/actions/auth.actions";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  redirectTo?: string;
}

type Gender = "male" | "female" | "other";

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

type RegisterFormInput = Omit<RegisterFormData, "age"> & { age: unknown };

const INITIAL_STATE: AuthState = { success: false };

function CheckEmailScreen({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Check your inbox</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-1">We sent a confirmation link to</p>
      <p className="font-bold text-gray-800 text-sm mb-6 break-all">{email}</p>
      <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2">
        <p className="text-xs text-gray-500 flex items-start gap-2">
          <span className="text-green-500 font-bold mt-0.5">✓</span> Click the link in the email to activate your account
        </p>
        <p className="text-xs text-gray-500 flex items-start gap-2">
          <span className="text-green-500 font-bold mt-0.5">✓</span> The link expires in 24 hours
        </p>
        <p className="text-xs text-gray-500 flex items-start gap-2">
          <span className="text-amber-500 font-bold mt-0.5">!</span> Check your spam folder if you don&apos;t see it
        </p>
      </div>
      <button onClick={onClose}
        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors">
        Got it
      </button>
    </div>
  );
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, isPending] = useActionState<AuthState, FormData>(signUpAction, INITIAL_STATE);

  const { register, reset, formState: { errors } } =
    useForm<RegisterFormInput, unknown, RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: { agreeToTerms: false },
    });

  // Only side-effects here: reset the form on success, show toast on error.
  // No setState calls — fully satisfies react-hooks/set-state-in-effect.
  const prevStateRef = useRef(state);
  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state.success) {
      reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, reset]);

  // Derived directly from action state — eliminates the confirmedEmail useState
  // entirely. The server action now returns the email on success (see below).
  const confirmedEmail = state.success && state.email ? state.email : null;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {confirmedEmail ? (
          <CheckEmailScreen email={confirmedEmail} onClose={onClose} />
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="text-3xl mb-2">❤️</div>
              <h2 className="text-2xl font-extrabold text-gray-900">Create Free Account</h2>
              <p className="text-gray-500 text-sm mt-1">Join thousands of singles on Chat254</p>
            </div>

            <form action={action} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="reg-name">Full Name</label>
                <input id="reg-name" type="text" autoComplete="name" placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  {...register("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="reg-email">Email Address</label>
                <input id="reg-email" type="email" autoComplete="email" placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="reg-age">Age</label>
                  <input id="reg-age" type="number" placeholder="18+"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.age ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    {...register("age")} />
                  {errors.age && <p className="text-red-500 text-xs mt-1.5">{errors.age.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="reg-gender">Gender</label>
                  <select id="reg-gender"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white ${errors.gender ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    {...register("gender")}>
                    <option value="">Select</option>
                    {GENDER_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="reg-password">Password</label>
                <input id="reg-password" type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${errors.password ? "border-red-400" : "border-gray-200"}`}
                  {...register("password")} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[38px] text-xs text-gray-500">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 accent-rose-500" {...register("agreeToTerms")} />
                  <span className="text-sm text-gray-500">I agree to the Terms of Service and Privacy Policy</span>
                </label>
              </div>

              <button type="submit" disabled={isPending}
                className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                {isPending ? "Creating account..." : "Create Free Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <button onClick={onSwitchToLogin} className="text-rose-500 font-semibold">Sign In</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}