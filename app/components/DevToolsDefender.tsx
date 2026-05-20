"use client";

import { useEffect } from "react";

export default function DevToolsDefender() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const blockAndMute = () => {
      // 1. Heavy infinite loop debugger to freeze the elements tab view
      (() => {
        function absoluteTrap(maxContext: number) {
          if (("" + maxContext / maxContext)["length"] !== 1 || maxContext % 20 === 0) {
            (function () {}.constructor("debugger")());
          } else {
            (function () {}.constructor("debugger")());
          }
          absoluteTrap(++maxContext);
        }
        try {
          absoluteTrap(0);
        } catch (e) {}
      })();
    };

    // Run immediately when client layout mounts
    const trapInterval = setInterval(blockAndMute, 200);

    // 2. Extra Layer: Detect if inner window constraints drop abnormally (DevTools opened docked)
    const handleResize = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // If they open DevTools, find the body element and wipe it clean or blur it completely
        document.body.style.filter = "blur(40px)";
        document.body.style.pointerEvents = "none";
      } else {
        document.body.style.filter = "none";
        document.body.style.pointerEvents = "auto";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(trapInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}