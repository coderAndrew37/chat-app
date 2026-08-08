"use client";

import { useEffect, useState } from "react";

export function LiveTaskCounter() {
  const [taskCount, setTaskCount] = useState<number>(248);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaskCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
      </span>
      <span>
        <strong className="text-gray-900">{taskCount}</strong> active tasks updated today in Botswana
      </span>
    </div>
  );
}