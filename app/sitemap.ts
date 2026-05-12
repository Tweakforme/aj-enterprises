import { MetadataRoute } from 'next';
import { blogPosts } from './blog/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://orcaenterprises.ca';
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/services',
    '/calculator',
    '/work',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/blog' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...blogRoutes];
}
