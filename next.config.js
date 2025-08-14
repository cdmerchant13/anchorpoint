/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/anchorpoint' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/anchorpoint' : '',
  experimental: {
    // Enable if you have dynamic routes that need to be pre-generated
    // generateBuildId: false,
    // generateEtags: false,
  },
  // Exclude API routes from static export
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
