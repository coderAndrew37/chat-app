"use client";

import { ReactNode, useEffect, useState } from "react";
import { TableOfContents } from "@/app/components/blog/TableOfContents";

interface BlogClientShellProps {
  children: ReactNode;
  headings: { id: string; text: string; level: "h2" | "h3" }[];
}

export function BlogClientShell({ children, headings }: BlogClientShellProps) {
  const [activeHeading, setActiveHeading] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Progress Bar Logic
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    // 2. Intersection Observer for TOC
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 1.0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [headings]);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <TableOfContents headings={headings} activeHeading={activeHeading} />
        </aside>
        <article className="flex-1 min-w-0">{children}</article>
      </div>
    </>
  );
}
