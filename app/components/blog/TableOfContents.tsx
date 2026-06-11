// components/blog/TableOfContents.tsx
import { JSX, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: "h2" | "h3";
}

interface TableOfContentsProps {
  headings: Heading[];
  activeHeading: string;
}

export function TableOfContents({
  headings,
  activeHeading,
}: TableOfContentsProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const scrollToHeading = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="lg:sticky lg:top-8">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full bg-gray-50 rounded-xl p-4 flex justify-between items-center mb-4"
      >
        <span className="font-semibold text-gray-900">Table of Contents</span>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isExpanded ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Contents */}
      <div
        className={`${
          isExpanded ? "block" : "hidden"
        } lg:block bg-gray-50 rounded-xl p-6`}
      >
        <h3 className="font-bold text-gray-900 mb-4">In this article</h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${
                activeHeading === heading.id
                  ? "bg-blue-700 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              } ${heading.level === "h3" ? "pl-6 text-sm" : "font-medium"}`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
