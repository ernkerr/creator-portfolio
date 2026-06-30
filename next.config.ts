import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Serve the private tools hub (separate app) under erin-codes.com/admin.
  async rewrites() {
    return [
      { source: "/admin", destination: "https://brand-manager-web.vercel.app/admin" },
      { source: "/admin/:path*", destination: "https://brand-manager-web.vercel.app/admin/:path*" },
    ];
  },
};

export default nextConfig;
