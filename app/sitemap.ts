import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-static';

// Every page meant to be found. Moved pages (/innovation, /products/hardware,
// /solutions/next-gen) redirect and are left out.
const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/ourea', priority: 0.9 },
  { path: '/solutions', priority: 0.8 },
  { path: '/solutions/attended', priority: 0.8 },
  { path: '/solutions/unattended', priority: 0.8 },
  { path: '/products', priority: 0.8 },
  { path: '/products/software', priority: 0.7 },
  { path: '/case-studies', priority: 0.7 },
  { path: '/apex', priority: 0.6 },
  { path: '/developers', priority: 0.6 },
  { path: '/developers/flex', priority: 0.4 },
  { path: '/contact', priority: 0.7 },
  { path: '/privacy', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({ url: `${SITE}${p.path}`, lastModified, changeFrequency: 'monthly', priority: p.priority }));
}
