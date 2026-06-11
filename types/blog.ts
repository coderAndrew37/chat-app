// components/types/blog.ts
import type { Image } from "sanity";

export interface CustomImage extends Image {
  alt: string;
  caption?: string;
  source?: string;
  assetUrl?: string;
}

export interface Author {
  name: string;
  image: CustomImage | string | null;
  role: string;
  bio?: string | any[];
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface Quiz {
  _type: "quiz";
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface RelatedPostCard {
  _type: "relatedPost";
  heading: string;
  article: {
    title: string;
    slug: { current: string };
    mainImage: CustomImage;
  };
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children: Array<{
    _key: string;
    _type: string;
    text: string;
    marks?: string[];
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  list?: "bullet" | "number";
  level?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  // Updated body to include Quiz type
  body: (PortableTextBlock | RelatedPostCard | Quiz)[];
  mainImage: CustomImage | string | null;
  mainImageCaption?: string;
  mainImageSource?: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  category: string;
  featured: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: Image;
  };
  tags?: Tag[];
}

export interface Tag {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}
