// app/hotels/layout.tsx
"use client";

import DashboardLayout from "../layout";


export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}