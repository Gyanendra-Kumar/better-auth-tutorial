import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
