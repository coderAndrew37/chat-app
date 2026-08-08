import Link from "next/link";

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
      className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:border-emerald-300/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-500/30"
    >
      <div className="mb-4 text-emerald-600 dark:text-emerald-400">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      {badge && (
        <span className="mt-3 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          {badge}
        </span>
      )}
    </Link>
  );
}