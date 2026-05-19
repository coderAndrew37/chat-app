"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function SmartImage({
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

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const sharedProps = {
    src: imgSrc,
    alt,
    className,
    onError: () => setImgSrc(fallback),
    sizes,
    priority,
  };

  return fill ? (
    <Image {...sharedProps} fill unoptimized />
  ) : (
    <Image {...sharedProps} width={width ?? 400} height={height ?? 300} unoptimized />
  );
}
