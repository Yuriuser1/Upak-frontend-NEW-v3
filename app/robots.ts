import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/brief', '/contact', '/faq', '/pilot-plan', '/pilot-terms', '/pricing', '/privacy'],
        disallow: ['/dashboard', '/dashboard/', '/login', '/register', '/profile', '/forgot-password', '/reset-password', '/payment'],
      },
    ],
    sitemap: 'https://www.upak.space/sitemap.xml',
  };
}
