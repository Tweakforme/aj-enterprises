import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://orcaenterprises.ca';
  const lastModified = new Date();

  const routes = [
    '',
    '/services',
    '/calculator',
    '/work',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
