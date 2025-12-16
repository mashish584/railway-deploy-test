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
    // Disable image optimization caching to reduce memory usage
    unoptimized: true,
  },
  // Optimize resource loading
  experimental: {
    optimizePackageImports: ["swiper"],
  },
  // Disable compression to reduce memory buffers
  compress: true,
  onDemandEntries: {
    // Minimize memory retention - pages are evicted quickly
    maxInactiveAge: 60 * 1000, // 60 seconds (minimal retention)
    pagesBufferLength: 0, // No page buffer to reduce memory usage
  },
  // Disable caching headers
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  //         },
  //         {
  //           key: "Pragma",
  //           value: "no-cache",
  //         },
  //         {
  //           key: "Expires",
  //           value: "0",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // Ignore build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
} as NextConfig;

export default nextConfig;
