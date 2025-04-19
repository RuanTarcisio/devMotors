import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cosmicjs.com",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
