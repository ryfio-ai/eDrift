import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.edriftelectric.com';
  
  // Base pages
  const routes = [
    '',
    '/products',
    '/careers',
    '/blog',
    '/newsletter',
    '/about',
    '/contact',
    '/case-studies',
    '/engineering-tools',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new URLSearchParams().get('t') || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
