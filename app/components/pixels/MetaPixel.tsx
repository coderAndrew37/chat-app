"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type FbqTrack = (
  action: string,
  event: string,
  data?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    fbq?: FbqTrack;
  }
}

// Typed fbq helper
export function fbq(
  event: string,
  data?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;

    // Skip the absolute first render to prevent duplicate initial PageViews
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fbq("PageView");
  }, [pathname, searchParams]);

  // Prevent rendering anything if env variable is missing
  if (!PIXEL_ID) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "NEXT_PUBLIC_META_PIXEL_ID is missing"
      );
    }
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;
          n.loaded=!0;
          n.version='2.0';
          n.queue=[];
          t=b.createElement(e);
          t.async=!0;
          t.src=v;
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}
          (window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        <Image
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
          width={1}
          height={1}
          unoptimized
          style={{ display: "none" }}
        />
      </noscript>
    </>
  );
}