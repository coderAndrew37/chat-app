import { Author } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export function AuthorBio({ author }: { author: Author }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 text-white mt-20">
      {/* Decorative background element */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={
              typeof author.image === "string"
                ? author.image
                : "/placeholder.jpg"
            }
            alt={author.name}
            fill
            className="rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
              The Author
            </span>
            <h3 className="text-3xl font-bold tracking-tight mt-1">
              {author.name}
            </h3>
            <p className="text-slate-400 font-light italic">{author.role}</p>
          </div>

          <p className="text-slate-300 leading-relaxed font-light max-w-2xl text-lg">
            {/* If bio is PortableText, we'd use the renderer, but if it's a string: */}
            {typeof author.bio === "string"
              ? author.bio
              : "Expert strategist at SleekSites."}
          </p>

          <div className="flex gap-4 pt-2">
            {/* Simplified sleek social icons */}
            {["Twitter", "LinkedIn", "Github"].map((platform) => (
              <Link
                key={platform}
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm underline underline-offset-8 decoration-slate-800 hover:decoration-blue-500"
              >
                {platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
