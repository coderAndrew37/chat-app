"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "How It Works", href: "/earn" },
  { label: "Ways to Earn", href: "/earn" },
  { label: "Chatting", href: "/earn/chatting" },
  { label: "AI Training", href: "/earn/ai-training" },
  { label: "Teach Swahili", href: "/earn/swahili-teaching" },
  { label: "Surveys", href: "/earn/surveys" },
];

const DESKTOP_NAV = NAV_LINKS.slice(0, 2);
const EARN_LINKS = NAV_LINKS.slice(2);

interface NavbarProps {
  onApplyClick: () => void;
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const pathname = usePathname();

  // Helper to close sidebar
  const closeSidebar = () => setSidebarOpen(false);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* ── Main nav bar ─────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-extrabold text-rose-500 tracking-tight">
                Chat254
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {DESKTOP_NAV.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-rose-500 font-medium transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}

              {/* "Ways to Earn" dropdown */}
              <div className="relative" onMouseLeave={() => setEarnOpen(false)}>
                <button
                  onMouseEnter={() => setEarnOpen(true)}
                  onClick={() => setEarnOpen(!earnOpen)}
                  className="flex items-center gap-1 text-gray-600 hover:text-rose-500 font-medium transition-colors text-sm"
                >
                  Earn Tracks
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      earnOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {earnOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    {EARN_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-rose-50 hover:text-rose-600 ${
                          pathname === link.href
                            ? "text-rose-600 bg-rose-50"
                            : "text-gray-700"
                        }`}
                        onClick={() => setEarnOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onApplyClick}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
              >
                Apply Now
              </button>
            </div>

            {/* Mobile: Apply button + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onApplyClick}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile sidebar overlay ────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Navigation menu"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
          <Link href="/" onClick={closeSidebar}>
            <span className="text-xl font-extrabold text-rose-500 tracking-tight">
              Chat254
            </span>
          </Link>
          <button
            onClick={closeSidebar}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-4 h-4"
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
        </div>

        {/* Sidebar body */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {DESKTOP_NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 mb-1 px-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Earn Tracks
            </p>
          </div>
          {EARN_LINKS.map((link) => {
            const icons: Record<string, string> = {
              "/earn/chatting": "💬",
              "/earn/ai-training": "🤖",
              "/earn/swahili-teaching": "🌍",
              "/earn/surveys": "📋",
            };
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <span className="text-base w-6 text-center">
                  {icons[link.href]}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer CTA */}
        <div className="px-4 py-5 border-t border-gray-100 shrink-0 flex flex-col gap-3">
          <button
            onClick={() => {
              onApplyClick();
              closeSidebar();
            }}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm py-3 rounded-full transition-colors shadow-md"
          >
            Apply Now — It&apos;s Free
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-1">
            Chat254 · Remote work for Kenyans
          </p>
        </div>
      </aside>
    </>
  );
}