
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  // Настройки для Netlify статического экспорта
  trailingSlash: true,
  images: {
    domains: ['upak.tech', 'localhost'],
    unoptimized: true, // Необходимо для статического экспорта
  },
  // Исключаем серверные функции при статическом экспорте
  webpack: (config, { isServer }) => {
    // Для статического экспорта исключаем серверные модули
    if (!isServer || process.env.NODE_ENV === 'production') {
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
