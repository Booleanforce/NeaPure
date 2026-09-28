/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local FastAPI backend (uvicorn default)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      // Production backend — replace with your real domain
      {
        protocol: "https",
        hostname: "your-production-domain.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;