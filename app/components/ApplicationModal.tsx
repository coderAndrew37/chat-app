"use client";

import { useState } from "react";
import Image from "next/image";

interface ApplicationFormData {
  name: string;
  whatsapp: string;
}

function SmartImage({
  src, fallback, alt, fill, width, height, className, sizes,
}: {
  src: string; fallback: string; alt: string; fill?: boolean;
  width?: number; height?: number; className?: string; sizes?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const sharedProps = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes };
  return fill
    ? <Image {...sharedProps} fill unoptimized  alt="image"/>
    : <Image {...sharedProps} width={width ?? 400} height={height ?? 300} unoptimized  alt="image"/>;
}

function SuccessState({ data, onClose }: { data: ApplicationFormData; onClose: () => void }) {
  const firstName = data.name.trim().split(" ")[0];
  const whatsappNumber = "254700000000";
  const message = encodeURIComponent(
    `Hi! My name is ${data.name} and I just applied to join the Chat254 remote team. My WhatsApp is ${data.whatsapp}. I'd like to confirm my application and receive my activation instructions.`
  );
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Application received, {firstName}!</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          We&apos;re reviewing your profile. Tap below to confirm on WhatsApp and get your activation instructions.
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-green-200 mb-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirm on WhatsApp
        </a>
        <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition">I&apos;ll do this later</button>
      </div>
    </div>
  );
}

export default function ApplicationModal({ onClose, track }: { onClose: () => void; track: string }) {
  const [form, setForm] = useState<ApplicationFormData>({ name: "", whatsapp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ApplicationFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = "Please enter your full name";
    const cleaned = form.whatsapp.replace(/\s/g, "");
    if (!cleaned || !/^(07|01|\+254|254)\d{8,9}$/.test(cleaned)) newErrors.whatsapp = "Enter a valid Kenyan number (e.g. 0712345678)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
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
            alt="Chat254 team working remotely"
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