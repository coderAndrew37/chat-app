import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function CategoryCard({ icon, title, description, href, badge }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-rose-200 hover:shadow-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
            {icon}
          </div>
          {badge && (
            <span className="rounded-full bg-rose-50 border border-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-600">
              {badge}
            </span>
          )}
        </div>
        <h3 className="mt-5 text-base font-bold text-gray-900 group-hover:text-rose-500 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-rose-500">
        <span>Explore Jobs</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}