const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Статический экспорт для Netlify
  trailingSlash: true, // Для совместимости с CDN
  images: { 
    unoptimized: true
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Настройка для статического экспорта
  basePath: '',
  distDir: 'out',
};

module.exports = nextConfig;