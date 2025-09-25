
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  // Исключаем серверные модули
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback['@prisma/client'] = false;
      config.resolve.fallback['fs'] = false;
      config.resolve.fallback['path'] = false;
      config.resolve.fallback['os'] = false;
    }
    return config;
  },
};

module.exports = nextConfig;
