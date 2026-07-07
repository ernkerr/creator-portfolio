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
  // Crossposter is a full app with its own login; redirect (not rewrite) so
  // OAuth callbacks and session cookies live on its own host.
  async redirects() {
    return [
      { source: "/crossposter", destination: "https://crossposter-nine.vercel.app", permanent: false },
      { source: "/crossposter/:path*", destination: "https://crossposter-nine.vercel.app/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
