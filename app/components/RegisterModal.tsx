"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterFormData } from "@/types/schemas";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  /** If set, redirect here after successful registration instead of /chat */
  redirectTo?: string;
}

type Gender = "male" | "female" | "other";

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  redirectTo,
}: RegisterModalProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // 1. Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: { name: data.name }, // raw_user_meta_data
          },
        },
      );

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          toast.error("This email is already registered. Try logging in.");
        } else {
          toast.error(signUpError.message);
        }
        return;
      }

      const userId = authData.user?.id;
      if (!userId) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      // 2. Upsert public profile
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        name: data.name,
        email: data.email,
        age: data.age,
        gender: data.gender,
        is_online: true,
        last_seen: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Auth succeeded — don't block the user, profile can be retried
        toast.warning(
          "Account created but profile setup had an issue. You may need to update your profile.",
        );
      } else {
        toast.success("Welcome to Chat254! 🎉 Your account is ready.");
      }

      reset();
      onClose();
      router.push(redirectTo ?? "/chat");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">❤️</div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Create Free Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join thousands of singles on Chat254
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Name */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="reg-name"
            >
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                errors.name
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 focus:border-rose-400"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="reg-email"
            >
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 focus:border-rose-400"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="reg-age"
              >
                Age
              </label>
              <input
                id="reg-age"
                type="number"
                placeholder="18+"
                min={18}
                max={99}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                  errors.age
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 focus:border-rose-400"
                }`}
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.age.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="reg-gender"
              >
                Gender
              </label>
              <select
                id="reg-gender"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 bg-white ${
                  errors.gender
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 focus:border-rose-400"
                }`}
                {...register("gender")}
              >
                <option value="">Select</option>
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="reg-password"
            >
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 6 characters"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                errors.password
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 focus:border-rose-400"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="reg-confirm"
            >
              Confirm Password
            </label>
            <input
              id="reg-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-rose-500/20 ${
                errors.confirmPassword
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 focus:border-rose-400"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-rose-500"
                {...register("agreeToTerms")}
              />
              <span className="text-sm text-gray-500 leading-relaxed">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-rose-500 hover:underline font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-rose-500 hover:underline font-medium"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-rose-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Creating account...
              </>
            ) : (
              "Create Free Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-rose-500 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
