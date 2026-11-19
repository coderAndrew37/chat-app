"use client";

import Image from "next/image";
import { useState } from "react";

export function SmartImage({
  src,
  fallback,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: {
  src: string;
  fallback: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const shared = {
    src: imgSrc,
    alt,
    className,
    sizes,
    priority,
    onError: () => setImgSrc(fallback),
    // Only bypass optimisation for external fallbacks (Unsplash etc.)
    unoptimized: /^https?:\/\//.test(imgSrc),
  };
  return fill ? (
    <Image {...shared} fill />
  ) : (
    <Image {...shared} width={width ?? 400} height={height ?? 300} />
  );
}