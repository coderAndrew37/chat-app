// lib/blog/heading-parser.ts
import {
  PortableTextBlock,
  RelatedPostCard,
  Quiz,
} from "@/types/blog";

export function getHeadings(
  body: (PortableTextBlock | RelatedPostCard | Quiz)[],
) {
  return body
    .filter((block): block is PortableTextBlock => {
      // Type guard: Check if it's a standard block with a heading style
      return (
        block._type === "block" &&
        !!block.style &&
        ["h2", "h3"].includes(block.style)
      );
    })
    .map((block) => {
      const text = block.children?.map((child) => child.text).join("") || "";
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      return {
        id,
        text,
        level: block.style as "h2" | "h3",
      };
    });
}
