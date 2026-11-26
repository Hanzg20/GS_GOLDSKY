import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-static';

// Everything may be crawled; the sitemap lists the pages. Cloudflare adds its
// own content-signal comments in front of this file.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
