import "server-only";
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
});

export const urlForServer = (source: Image): string => {
  return imageBuilder.image(source).auto("format").fit("max").url();
};
