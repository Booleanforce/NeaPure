import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ensure large enough variants exist for a full-viewport hero image
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2400, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optional but helps: skip re-compression losses for hero-quality shots
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;