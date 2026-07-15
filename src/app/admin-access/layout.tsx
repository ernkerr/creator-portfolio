import type { Metadata } from "next";

// The gate page itself is a client component, so the noindex lives here.
export const metadata: Metadata = {
  title: "Admin Access",
  robots: { index: false, follow: false },
};

export default function AdminAccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
