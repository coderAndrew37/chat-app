import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    //adding unsplash and cloudinary as trusted image sources

    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
