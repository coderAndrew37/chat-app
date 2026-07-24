"use client";

import { useEffect, useState } from "react";

// 1. Properly extend the global Window interface
declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }

  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent | null;
  }
}

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check client state
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    // Listen for Chrome/Android PWA install event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.deferredPrompt = promptEvent;
      setInstallEvent(promptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Batch prompt check in a single timer to avoid synchronous cascade warnings
    let timer: NodeJS.Timeout;
    if (!standalone) {
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (!dismissed) {
        timer = setTimeout(() => {
          setIsIOS(iOS);
          setIsStandalone(standalone);
          setShowPrompt(true);
        }, 3000);
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = installEvent || window.deferredPrompt;
    if (promptEvent) {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      window.deferredPrompt = null;
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed", "true");
    setShowPrompt(false);
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <>
      {/* iOS Prompt */}
      {isIOS && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-rose-500 shadow-2xl p-4 z-50 animate-slide-up">
          <div className="max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📱</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm">Install VelloEarn</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Tap the share button then &quot;Add to Home Screen&quot; to install the app.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-gray-700">Share</span>
                  </div>
                  <span className="text-xs text-gray-400">→</span>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-xs text-gray-700">Add to Home</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Android/Desktop Prompt */}
      {!isIOS && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-rose-500 shadow-2xl p-4 z-50 animate-slide-up">
          <div className="max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📲</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm">Install VelloEarn App</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Get the app for a better experience with faster loading and offline access.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="mt-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
                >
                  Install App
                </button>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}