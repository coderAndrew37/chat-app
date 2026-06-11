"use client";

import { ReactNode, useEffect, useState } from "react";

interface BlogClientShellProps {
  children: ReactNode;
}

export function BlogClientShell({ children }: BlogClientShellProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar — rose to match VelloEarn */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-[60] bg-gray-100">
        <div
          className="h-full bg-rose-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="prose-article">
        {children}
      </article>
    </>
  );
}