import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: ".",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Optimize resource loading
  experimental: {
    optimizePackageImports: ["swiper"],
  },
  // Enable compression
  compress: true,
  onDemandEntries: {
    // Increased from 60s to 5 minutes to reduce page recreation frequency
    // This balances memory usage with performance by keeping recently used pages in memory
    maxInactiveAge: 5 * 60 * 1000, // 5 minutes
    pagesBufferLength: 3,
  },
  // Ignore build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
} as NextConfig;

export default nextConfig;
