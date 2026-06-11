"use client";

import React from "react";
import { PortableText, PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import Link from "next/link";

import { QuizComponent } from "./QuizComponent";
import { Quiz, RelatedPostCard } from "@/types/blog";

// --- Interfaces for Type Safety ---

interface PricingRow {
  tier: string;
  price: string;
  features: string;
}

interface ComparisonRow {
  feature: string;
  leftValue: string;
  rightValue: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// Fixed slugify helper with strict typing
const slugify = (children: React.ReactNode): string => {
  const childrenArray = React.Children.toArray(children);

  const text = childrenArray
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return child.toString();
      }

      // Check if it's a valid React Element and safely access props
      if (React.isValidElement(child)) {
        // We cast to any here because ReactNode props are technically unknown,
        // but we are specifically looking for text content or nested children
        const props = child.props as {
          children?: React.ReactNode;
          text?: string;
        };

        if (props.text) return props.text;
        if (props.children) return slugify(props.children);
      }
      return "";
    })
    .join("");

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-12 group">
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/5">
          <Image
            src={value.assetUrl || "/placeholder.jpg"}
            alt={value.alt || "SleekSites Insight"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {(value.caption || value.source) && (
          <figcaption className="mt-4 px-4 flex flex-col md:flex-row md:justify-between items-baseline gap-2">
            {value.caption && (
              <span className="text-sm text-slate-500 font-light italic">
                — {value.caption}
              </span>
            )}
            {value.source && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-bold group-hover:text-blue-400 transition-colors">
                Source: {value.source}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    ),

    quiz: ({ value }: { value: Quiz }) => (
      <div className="my-16">
        <QuizComponent
          quiz={value}
          onComplete={() => console.log("Quiz finished!")}
        />
      </div>
    ),

    code: ({ value }) => (
      <div className="my-10 group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#282c34]">
          {value.filename && (
            <div className="px-6 py-3 border-b border-white/5 bg-white/5 text-slate-400 text-[10px] font-mono flex justify-between items-center tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {value.filename}
              </span>
              <span className="opacity-50">{value.language}</span>
            </div>
          )}
          <SyntaxHighlighter
            language={value.language || "typescript"}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              fontSize: "13px",
              lineHeight: "1.6",
              background: "transparent",
              fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            }}
            lineNumberStyle={{
              minWidth: "2em",
              paddingRight: "1em",
              color: "#4b5263",
              textAlign: "right",
            }}
            showLineNumbers={true}
          >
            {value.code || ""}
          </SyntaxHighlighter>
        </div>
      </div>
    ),

    inlinePricingTable: ({
      value,
    }: {
      value: { heading?: string; rows: PricingRow[] };
    }) => (
      <div className="my-12 overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-sm">
        {value.heading && (
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            {value.heading}
          </div>
        )}
        <div className="divide-y divide-slate-100">
          {value.rows?.map((row, i) => (
            <div
              key={i}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors"
            >
              <div className="max-w-md">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  {row.tier}
                </span>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {row.features}
                </p>
              </div>
              <div className="text-xl font-black text-slate-900 leading-none">
                {row.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    comparisonBox: ({
      value,
    }: {
      value: { leftLabel: string; rightLabel: string; rows: ComparisonRow[] };
    }) => (
      <div className="my-12 grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
        <div className="bg-slate-50 p-4 text-center border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
          {value.leftLabel}
        </div>
        <div className="bg-slate-950 p-4 text-center border-b border-slate-900 text-[10px] font-black uppercase tracking-widest text-blue-400">
          {value.rightLabel}
        </div>
        {value.rows?.map((row, i) => (
          <React.Fragment key={i}>
            <div className="bg-white p-6 flex flex-col justify-center border-b border-slate-100">
              <span className="text-[9px] uppercase font-bold text-slate-300 mb-1">
                {row.feature}
              </span>
              <p className="text-sm font-medium text-slate-600">
                {row.leftValue}
              </p>
            </div>
            <div className="bg-slate-950 p-6 flex flex-col justify-center border-b border-slate-900">
              <span className="text-[9px] uppercase font-bold text-slate-600 mb-1">
                {row.feature}
              </span>
              <p className="text-sm font-bold text-white">{row.rightValue}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    ),

    inlineFaq: ({ value }: { value: { faqs: FaqItem[] } }) => (
      <div className="my-12 space-y-4">
        {value.faqs?.map((faq, i) => (
          <details
            key={i}
            className="group border border-slate-200 rounded-2xl bg-white p-6 transition-all hover:border-blue-200"
          >
            <summary className="list-none flex justify-between items-center cursor-pointer font-bold text-slate-900 pr-4 outline-none">
              <span className="text-lg">{faq.question}</span>
              <span className="text-blue-500 transition-transform group-open:rotate-45 text-2xl font-light">
                +
              </span>
            </summary>
            <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed font-light">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    ),

    cta: ({
      value,
    }: {
      value: { title: string; buttonText: string; url: string };
    }) => (
      <div className="my-16 p-8 md:p-12 rounded-[2.5rem] bg-blue-600 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              {value.title}
            </h3>
            <p className="text-blue-100 opacity-80">
              Built for speed. Optimized for Kenya.
            </p>
          </div>
          <Link
            href={value.url || "#"}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-950 hover:text-white transition-all shadow-xl shadow-blue-900/20"
          >
            {value.buttonText}
          </Link>
        </div>
      </div>
    ),

    relatedPost: ({ value }: { value: RelatedPostCard }) => {
      const post = value.article;
      if (!post) return null;
      const slug =
        typeof post.slug === "string" ? post.slug : post.slug?.current;

      return (
        <div className="my-16 group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Link
            href={`/blog/${slug}`}
            className="relative block bg-slate-50 border border-slate-200 rounded-[2rem] p-4 md:p-6 transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-2/5 aspect-[16/10] relative rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={
                    typeof post.mainImage === "string"
                      ? post.mainImage
                      : "/placeholder.jpg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    {value.heading || "Further Reading"}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center text-blue-600 text-sm font-bold gap-2 pt-2 group-hover:translate-x-2 transition-transform">
                  Read Article
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    },
  },

  block: {
    h2: ({ children }) => (
      <h2
        id={slugify(children)}
        className="text-3xl md:text-4xl font-bold mt-16 mb-6 tracking-tight text-slate-900 scroll-mt-32"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slugify(children)}
        className="text-2xl font-bold mt-10 mb-4 tracking-tight text-slate-800 scroll-mt-32"
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-8 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-blue-600 pl-8 my-12 italic text-2xl text-slate-700 font-light leading-snug">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-4 mb-8 text-lg md:text-xl text-slate-600 font-light pl-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-4 mb-8 text-lg md:text-xl text-slate-600 font-light pl-4">
        {children}
      </ol>
    ),
  },
};

export default function CustomPortableText({
  value,
}: {
  value: (PortableTextBlock | RelatedPostCard | Quiz)[];
}) {
  return (
    <div className="max-w-3xl mx-auto px-1">
      <PortableText value={value} components={components} />
    </div>
  );
}
