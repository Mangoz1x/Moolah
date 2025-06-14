/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable PWA support
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Ensure proper headers for PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
