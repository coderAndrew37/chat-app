// lib/utils.ts
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}