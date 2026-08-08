"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function LiveTaskCounter() {
  const [taskCount, setTaskCount] = useState<number>(0);

  useEffect(() => {
    // Simulate API call for live task count
    const fetchCount = () => {
      // Random count between 120 and 350 for demo
      const count = Math.floor(Math.random() * 230) + 120;
      setTaskCount(count);
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-4 py-2 text-sm font-semibold text-emerald-800 backdrop-blur-sm dark:bg-emerald-900/30 dark:text-emerald-200">
      <Clock className="h-4 w-4" />
      <span>{taskCount} active tasks updated today</span>
    </div>
  );
}