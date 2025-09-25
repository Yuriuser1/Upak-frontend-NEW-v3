const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Статический экспорт
  distDir: 'out',
  trailingSlash: true,
  images: { 
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Игнорируем ошибки TypeScript для быстрой сборки
  },
  // Исключаем API роуты из статического экспорта
  async generateBuildId() {
    return 'upak-static-export'
  },
};

module.exports = nextConfig;