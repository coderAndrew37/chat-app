"use client";

import React from "react";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import Link from "next/link";

import { QuizComponent } from "./QuizComponent";
import { Quiz, RelatedPostCard } from "@/types/blog";

// --- Interfaces ---

interface FaqItem {
  question: string;
  answer: string;
}

interface TableRow {
  isHeader: boolean;
  cells: string[];
}

// --- Slugify ---

const slugify = (children: React.ReactNode): string => {
  const childrenArray = React.Children.toArray(children);
  const text = childrenArray
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return child.toString();
      }
      if (React.isValidElement(child)) {
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

// --- Components ---

const components: PortableTextComponents = {
  types: {
    // ─── Image ────────────────────────────────────────────────────────────────
    image: ({ value }) => (
      <figure className="my-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={value.assetUrl || "/placeholder.jpg"}
            alt={value.alt || "VelloEarn"}
            fill
            className="object-cover"
          />
        </div>
        {(value.caption || value.source) && (
          <figcaption className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-gray-400 px-1">
            {value.caption && (
              <span className="italic">{value.caption}</span>
            )}
            {value.source && (
              <span className="font-semibold uppercase tracking-wider">
                {value.source}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    ),

    // ─── Table ────────────────────────────────────────────────────────────────
    table: ({ value }: { value: { caption?: string; rows: TableRow[] } }) => {
      const headerRows = value.rows?.filter((r) => r.isHeader) ?? [];
      const bodyRows = value.rows?.filter((r) => !r.isHeader) ?? [];

      return (
        <div className="my-8 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden border border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              {headerRows.length > 0 && (
                <thead className="bg-gray-50">
                  {headerRows.map((row, i) => (
                    <tr key={i}>
                      {row.cells.map((cell, j) => (
                        <th
                          key={j}
                          className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
              )}
              <tbody className="bg-white divide-y divide-gray-100">
                {bodyRows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    {row.cells.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 text-sm text-gray-600 ${
                          j === 0 ? "font-semibold text-gray-900" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {value.caption && (
              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                <span className="text-xs text-gray-400 italic">
                  {value.caption}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    },

    // ─── Quiz ─────────────────────────────────────────────────────────────────
    quiz: ({ value }: { value: Quiz }) => (
      <div className="my-10">
        <QuizComponent
          quiz={value}
          onComplete={() => console.log("Quiz finished!")}
        />
      </div>
    ),

    // ─── Code ─────────────────────────────────────────────────────────────────
    code: ({ value }) => (
      <div className="my-8">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-[#282c34]">
          {value.filename && (
            <div className="px-4 py-2.5 border-b border-white/5 bg-white/5 text-gray-400 text-[10px] font-mono flex justify-between items-center tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
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
              padding: "1.25rem",
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

    // ─── FAQ ──────────────────────────────────────────────────────────────────
    inlineFaq: ({ value }: { value: { faqs: FaqItem[] } }) => (
      <div className="my-8 space-y-2 border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Frequently Asked
          </span>
        </div>
        {value.faqs?.map((faq, i) => (
          <details
            key={i}
            className="group border-b border-gray-100 last:border-0"
          >
            <summary className="list-none flex justify-between items-center cursor-pointer px-4 py-3 hover:bg-gray-50 transition-colors outline-none">
              <span className="text-sm font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              <span className="text-rose-500 transition-transform group-open:rotate-45 text-xl font-light shrink-0">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    ),

    // ─── CTA ──────────────────────────────────────────────────────────────────
    cta: ({
      value,
    }: {
      value: { title: string; buttonText: string; url: string };
    }) => (
      <div className="my-10 p-6 sm:p-8 rounded-2xl bg-rose-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight mb-1">
              {value.title || "Ready to get started?"}
            </h3>
            
          </div>
          <Link
            href={"https://mulaearn.com/register.php?ref=velloearn" }
            className="shrink-0 px-6 py-3 bg-white text-rose-500 rounded-full font-bold text-sm hover:bg-rose-50 transition-colors shadow-md"
          >
            {value.buttonText || "Join Now"}
          </Link>
        </div>
      </div>
    ),

    // ─── Related Post (inline) ────────────────────────────────────────────────
    relatedPost: ({ value }: { value: RelatedPostCard }) => {
      const post = value.article;
      if (!post) return null;
      const slug =
        typeof post.slug === "string" ? post.slug : post.slug?.current;

      return (
        <div className="my-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            {value.heading || "You Might Also Like"}
          </p>
          <Link
            href={`/blog/${slug}`}
            className="group flex gap-4 items-center p-3 border border-gray-200 rounded-xl hover:border-rose-200 hover:bg-rose-50/30 transition-all"
          >
            <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={
                  typeof post.mainImage === "string"
                    ? post.mainImage
                    : "/placeholder.jpg"
                }
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-rose-500 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
              <span className="text-xs text-rose-500 font-semibold mt-1 block">
                Read →
              </span>
            </div>
          </Link>
        </div>
      );
    },
  },

  // ─── Block styles — editorial, tight, PD-like ────────────────────────────
  block: {
    h2: ({ children }) => (
      <h2
        id={slugify(children)}
        className="text-xl sm:text-2xl font-extrabold mt-10 mb-3 text-gray-900 leading-snug tracking-tight scroll-mt-20"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slugify(children)}
        className="text-lg font-bold mt-7 mb-2 text-gray-900 leading-snug scroll-mt-20"
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-[15px] leading-7 text-gray-700 mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-rose-400 pl-5 my-7 text-lg text-gray-600 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },

  // ─── Lists ───────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 space-y-2 mb-5 text-[15px] text-gray-700 leading-7">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 space-y-2 mb-5 text-[15px] text-gray-700 leading-7">
        {children}
      </ol>
    ),
  },

  // ─── Marks ───────────────────────────────────────────────────────────────
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-rose-500 hover:text-rose-600 underline underline-offset-2 decoration-rose-200 hover:decoration-rose-400 transition-colors"
      >
        {children}
      </a>
    ),
    internalLink: ({ children, value }) => (
      <Link
        href={`/blog/${value?.reference?.slug?.current || ""}`}
        className="text-rose-500 hover:text-rose-600 underline underline-offset-2 decoration-rose-200 hover:decoration-rose-400 transition-colors"
      >
        {children}
      </Link>
    ),
  },
};

// ─── Export ──────────────────────────────────────────────────────────────────

export default function CustomPortableText({
  value,
}: {
  value: (PortableTextBlock | RelatedPostCard | Quiz)[];
}) {
  return (
    <div className="max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}