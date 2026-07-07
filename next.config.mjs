/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure that dynamic route components don't crash the build
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizeFonts: false,
};

export default nextConfig;
