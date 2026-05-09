// app/sitemap.ts
// Next.js generates /sitemap.xml automatically from this file.

import { MetadataRoute } from "next";

const BASE_URL = "https://velloearn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const tracks = [
    "chatting",
    "surveys",
    "ai-training",
    "academic-writing",
    "forex",
  ];

  const trackUrls = tracks.map((track) => ({
    url: `${BASE_URL}/earn/${track}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...trackUrls,
  ];
}