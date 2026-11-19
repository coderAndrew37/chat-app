// app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboard } from "@/lib/use-dashboard";
import { OnboardingModal } from "@/app/components/dashboard/OnboardingModal";

type NavKey =
  | "overview"
  | "tasks"
  | "hotels"
  | "surveys"
  | "chatting"
  | "ai-training"
  | "wallet"
  | "withdrawals"
  | "transactions"
  | "settings";

const ICON: Record<NavKey | "more", string> = {
  overview: "M3 12l9-9 9 9M5 10v10h14V10",
  tasks:
    "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4",
  hotels:
    "M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M8 8h3M8 12h3M8 16h3",
  surveys:
    "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 12h6M9 16h4",
  chatting: "M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.4A8 8 0 1 1 21 12z",
  "ai-training":
    "M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z",
  wallet:
    "M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l2-3h12M16 14h2",
  withdrawals: "M12 19V7m0 0l-4 4m4-4l4 4M5 4h14",
  transactions: "M4 6h16M4 12h16M4 18h10",
  settings: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  more: "M4 7h16M4 12h16M4 17h16",
};

function Icon({
  k,
  className = "h-5 w-5",
}: {
  k: NavKey | "more";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICON[k]} />
    </svg>
  );
}

type NavItem = { key: NavKey; href: string; label: string };

const NAV_HOME: NavItem[] = [
  { key: "overview", href: "/dashboard", label: "Overview" },
];

const NAV_EARN: NavItem[] = [
  { key: "tasks", href: "/dashboard/tasks", label: "My Tasks" },
  { key: "hotels", href: "/dashboard/hotels", label: "Available Hotels" },
  { key: "surveys", href: "/dashboard/surveys", label: "Surveys" },
  { key: "chatting", href: "/dashboard/chatting", label: "Chatting Scenarios" },
  { key: "ai-training", href: "/dashboard/ai-training", label: "AI Training" },
];

const NAV_ACCOUNT: NavItem[] = [
  { key: "wallet", href: "/dashboard/wallet", label: "Earnings & Wallet" },
  { key: "withdrawals", href: "/dashboard/withdrawals", label: "Withdrawals" },
  { key: "transactions", href: "/dashboard/transactions", label: "Transaction History" },
  { key: "settings", href: "/dashboard/settings", label: "Profile & Settings" },
];

const ALL_NAV: NavItem[] = [...NAV_HOME, ...NAV_EARN, ...NAV_ACCOUNT];

const BNAV: NavItem[] = [
  { key: "overview", href: "/dashboard", label: "Home" },
  { key: "tasks", href: "/dashboard/tasks", label: "My Tasks" },
  { key: "wallet", href: "/dashboard/wallet", label: "Wallet" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

function titleFor(pathname: string): string {
  if (pathname === "/dashboard") return "Overview";
  // Track detail pages (deepest matches first)
  if (/^\/dashboard\/hotels\/[^/]+\/rate/.test(pathname)) return "Review Workspace";
  if (/^\/dashboard\/hotels\/[^/]+/.test(pathname)) return "Hotel";
  if (/^\/dashboard\/surveys\/[^/]+/.test(pathname)) return "Survey";
  if (/^\/dashboard\/chatting\/[^/]+/.test(pathname)) return "Chatting Scenario";
  if (/^\/dashboard\/ai-training\/[^/]+/.test(pathname)) return "AI Training Task";
  // Track grids
  if (pathname === "/dashboard/hotels") return "Available Hotels";
  if (pathname === "/dashboard/surveys") return "Surveys";
  if (pathname === "/dashboard/chatting") return "Chatting Scenarios";
  if (pathname === "/dashboard/ai-training") return "AI Training";
  // Standard nav items
  const hit = ALL_NAV.find((n) => isActive(pathname, n.href));
  return hit?.label ?? "Overview";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ pathname, open: false });
  const menuOpen = menuState.pathname === pathname && menuState.open;
  const setMenuOpen = (open: boolean) => setMenuState({ pathname, open });
  const { country, dailyCount } = useDashboard();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const title = titleFor(pathname);

  const renderItem = (item: NavItem) => {
    const active = isActive(pathname, item.href);
    return (
      <Link
        key={item.key}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[0.94rem] font-semibold transition-colors ${
          active
            ? "bg-[#eeecfd] text-[#4637c2]"
            : "text-[#667088] hover:bg-[#f6f6fb] hover:text-[#14213d]"
        }`}
      >
        <Icon k={item.key} />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="min-h-dvh bg-[#f6f6fb] text-[#1c2438]">
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[#e5e6f1] bg-white px-4 sm:px-6">
        <Link
          href="/dashboard"
          aria-label="HotelRate dashboard home"
          className="flex items-center"
        >
          <Image
            src={encodeURI("/assets/hotel review logo.webp")}
            alt="HotelRate"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <Image
          src="/assets/lipahub-logo.png"
          alt="LipaHub"
          width={120}
          height={40}
          className="h-9 w-auto object-contain"
          priority
        />
      </header>

      <div className="flex min-h-dvh pt-16">
        <aside
          id="dashboard-sidebar"
          aria-label="Main navigation"
          className={`fixed left-0 top-16 bottom-0 z-40 w-[250px] overflow-y-auto border-r border-[#e5e6f1] bg-white p-3 transition-transform duration-250 ease-out md:translate-x-0 ${
            menuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <nav className="grid gap-0.5">
            {NAV_HOME.map(renderItem)}

            <p className="mt-3 px-3 pb-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#8a93aa]">
              Earn
            </p>
            {NAV_EARN.map(renderItem)}

            <p className="mt-3 px-3 pb-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#8a93aa]">
              Account
            </p>
            {NAV_ACCOUNT.map(renderItem)}
          </nav>
        </aside>

        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 top-16 z-35 bg-[#14213d]/45 transition-opacity duration-200 md:hidden ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <div className="flex min-h-[calc(100dvh-4rem)] w-full flex-col md:ml-[250px]">
          <header className="sticky top-16 z-20 flex items-center gap-2 border-b border-[#e5e6f1] bg-[#f6f6fb]/92 px-3 py-2 backdrop-blur sm:gap-3 sm:px-4 sm:py-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-controls="dashboard-sidebar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#e5e6f1] bg-white text-[#14213d] md:hidden"
            >
              <Icon k="more" />
            </button>

            <h1 className="font-heading min-w-0 flex-1 truncate text-base font-extrabold text-[#14213d] sm:text-xl">
              {title}
            </h1>

            <Link
              href="/dashboard/settings"
              title="Country and currency"
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#e5e6f1] bg-white px-3 py-1.5 text-xs font-bold text-[#14213d] sm:inline-flex"
            >
              {country.flag} {country.cur}
            </Link>

            <Link
              href="/dashboard/tasks"
              title="Tasks completed today"
              className="shrink-0 rounded-full bg-[#eeecfd] px-3 py-1.5 text-xs font-bold text-[#4637c2]"
            >
              {dailyCount}
              <span className="hidden sm:inline"> today</span>
            </Link>
          </header>

          <main
            id="view"
            tabIndex={-1}
            className="w-full flex-1 px-3 py-4 outline-none sm:px-6 sm:py-6 lg:px-7"
          >
            <div className="mx-auto max-w-[1240px]">{children}</div>
          </main>

          <footer className="mt-2 border-t border-[#e5e6f1] bg-white px-4 py-4 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center text-xs text-[#667088] md:pb-6">
            © 2026 HotelRate. Powered by LipaHub. All rights reserved.
          </footer>
        </div>
      </div>

      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 gap-1 border-t border-[#e5e6f1] bg-white px-1 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-14px_rgba(20,33,61,0.4)] md:hidden"
      >
        {BNAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`grid min-h-12 place-items-center gap-0.5 rounded-[10px] px-1 py-1 text-[0.72rem] font-semibold ${
                active
                  ? "bg-[#eeecfd] text-[#4637c2]"
                  : "text-[#667088] hover:text-[#14213d]"
              }`}
            >
              <Icon k={item.key} />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="More navigation options"
          className="grid min-h-12 place-items-center gap-0.5 rounded-[10px] px-1 py-1 text-[0.72rem] font-semibold text-[#667088] hover:text-[#14213d]"
        >
          <Icon k="more" />
          More
        </button>
      </nav>

      <OnboardingModal />
    </div>
  );
}