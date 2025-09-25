
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  },
  experimental: {
    esmExternals: false
  }
};

module.exports = nextConfig;
