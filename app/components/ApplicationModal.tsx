"use client";

import { useState } from "react";
import Image from "next/image";
import { ApplicationFormData } from "@/types";
import SuccessState from "./SuccessState";

function SmartImage({
  src, fallback, alt, fill, width, height, className, sizes,
}: {
  src: string; fallback: string; alt: string; fill?: boolean;
  width?: number; height?: number; className?: string; sizes?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const sharedProps = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes };
  return fill
    ? <Image {...sharedProps} fill unoptimized alt={alt} />
    : <Image {...sharedProps} width={width ?? 400} height={height ?? 300} unoptimized alt={alt} />;
}

export default function ApplicationModal({ 
  onClose, 
  track, 
  onSuccess 
}: { 
  onClose: () => void; 
  track: string;
  onSuccess: (data: ApplicationFormData) => void;
}) {
  const [form, setForm] = useState<ApplicationFormData>({ name: "", whatsapp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ApplicationFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = "Please enter your full name";
    
    const cleaned = form.whatsapp.replace(/\s/g, "");
    if (!cleaned || !/^(07|01|\+254|254)\d{8,9}$/.test(cleaned)) {
      newErrors.whatsapp = "Enter a valid Kenyan number (e.g. 0712345678)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    onSuccess(form);
  };

  if (submitted) return <SuccessState data={form} onClose={onClose} />;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden">
        <div className="relative h-36 w-full">
          <SmartImage
            src="/modal/team-working.jpg"
            fallback="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=300&fit=crop&auto=format"
            alt="VelloEarn team working remotely"
            fill className="object-cover"
            sizes="(max-width: 448px) 100vw, 448px"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />
          <p className="absolute bottom-3 left-4 text-white text-xs font-semibold opacity-80">
            Applying for: {track}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Applications Open
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">Apply to Join the Team</h2>
              <p className="text-sm text-gray-500 mt-1">We&apos;ll reach out on WhatsApp within 24 hours.</p>
            </div>
            <button aria-label="close" onClick={onClose} className="shrink-0 ml-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your full name</label>
              <input type="text" placeholder="e.g. Wanjiru Muthoni" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp number</label>
              <input type="tel" placeholder="e.g. 0712 345 678" value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition ${errors.whatsapp ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              <p className="text-xs text-gray-400 mt-1">Activation instructions come here.</p>
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold text-base py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-200 mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : "Submit My Application →"}
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">No spam. No third-party sharing. Ever.</p>
        </div>
      </div>
    </div>
  );
}