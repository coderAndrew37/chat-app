"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function ChatNavbar() {
  const { profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  };

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="h-14 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-extrabold text-rose-500 hover:text-rose-600 transition-colors"
      >
        Chat254
      </Link>

      {/* Right: profile + sign out */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
            {initials}
          </div>
          <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[120px] truncate">
            {profile?.name ?? "Loading..."}
          </span>
        </div>

        <button
          onClick={handleSignOut}
          className="text-xs text-gray-500 hover:text-rose-500 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
