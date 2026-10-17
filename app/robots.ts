import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/hours-check'],
      disallow: '/admin',
    },
    sitemap: 'https://www.stashlabs.com.au/sitemap.xml',
  };
}
