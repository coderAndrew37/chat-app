import "server-only";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "published",
});

export const urlFor = (source: any) => {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
