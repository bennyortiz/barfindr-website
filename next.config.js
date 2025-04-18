/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Add redirects for backward compatibility
  async redirects() {
    return [
      {
        source: '/bars/1',
        destination: '/bars/the-roosevelt-room',
        permanent: true,
      },
      {
        source: '/bars/2',
        destination: '/bars/whislers',
        permanent: true,
      },
      {
        source: '/bars/3',
        destination: '/bars/rainey-street-bars',
        permanent: true,
      },
      {
        source: '/bars/4',
        destination: '/bars/midnight-cowboy',
        permanent: true,
      },
      {
        source: '/bars/5',
        destination: '/bars/the-white-horse',
        permanent: true,
      },
      {
        source: '/bars/6',
        destination: '/bars/firehouse-lounge',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
