import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.upak.space';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/brief', '/contact', '/faq', '/pilot-plan', '/pilot-terms', '/pricing', '/privacy'];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
