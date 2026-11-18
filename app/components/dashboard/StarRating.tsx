// components/star-rating.tsx
type Props = {
  count: number;
  outOf?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: "text-[11px] gap-px",
  md: "text-sm gap-0.5",
  lg: "text-lg gap-1",
};

export function StarRating({ count, outOf = 5, size = "sm", className = "" }: Props) {
  const filled = Math.round(count);
  return (
    <span
      role="img"
      aria-label={`${count} out of ${outOf} stars`}
      className={`inline-flex items-center leading-none ${SIZES[size]} ${className}`}
    >
      {Array.from({ length: outOf }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < filled ? "text-amber-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </span>
  );
}