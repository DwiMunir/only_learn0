import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Link pendek untuk caption Instagram: onlylearn.id/c/sunday-scaries
  async redirects() {
    return [
      { source: "/c/:slug", destination: "/catatan/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
