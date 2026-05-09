/**
 * conversionEvents.ts
 *
 * Call fireApplicationSubmit() inside ApplicationModal's onSuccess callback.
 * This fires Lead events on Meta, TikTok, and Google simultaneously.
 *
 * Usage:
 *   import { fireApplicationSubmit } from "@/lib/conversionEvents";
 *
 *   const handleSuccess = (data: { name: string; whatsapp: string }) => {
 *     fireApplicationSubmit({ track: "Remote Chatting", name: data.name });
 *     setModalOpen(false);
 *     setSuccessData(data);
 *   };
 */

// ── Meta (Facebook + Instagram) ──────────────────────────────────────────────
function fireMeta(track: string) {
  if (typeof window === "undefined") return;
  const fbq = (window as any).fbq;
  if (!fbq) return;

  // Standard Lead event — what you optimise your ad campaigns towards
  fbq("track", "Lead", {
    content_name: track,
    content_category: "VelloEarn Application",
    currency: "KES",
  });

  // Also fire a custom event so you can segment by track in Events Manager
  fbq("trackCustom", "TrackApplication", { track });
}

// ── TikTok ───────────────────────────────────────────────────────────────────
function fireTikTok(track: string) {
  if (typeof window === "undefined") return;
  const ttq = (window as any).ttq;
  if (!ttq) return;

  // SubmitForm maps to TikTok's "Submit Form" standard event
  ttq.track("SubmitForm", {
    content_name: track,
    content_type: "product",
  });
}

// ── Google Ads ────────────────────────────────────────────────────────────────
function fireGoogle(track: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (!gtag) return;

  gtag("event", "conversion", {
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
    event_category: "Application",
    event_label: track,
  });
}

// ── Main export ───────────────────────────────────────────────────────────────
export function fireApplicationSubmit({
  track,
  name,
}: {
  track: string;
  name?: string;
}) {
  fireMeta(track);
  fireTikTok(track);
  fireGoogle(track);

  // Optional: push to dataLayer if you use GTM
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "application_submit",
      track,
      name,
    });
  }
}