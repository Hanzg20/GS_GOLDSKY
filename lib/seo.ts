import type { Metadata } from 'next';

// One place for search metadata. goldsky.ca (no www) is the address Google
// should index; every page names itself as canonical, so the www copy that
// Cloudflare also serves is not counted as a duplicate.
export const SITE = 'https://goldsky.ca';

const DEFAULT_IMAGE = {
  url: '/images/art/share-og.jpg',
  width: 1200,
  height: 630,
  alt: 'Illustration: a self serve car wash under a snow capped mountain and a large orange sun',
};

type Image = { url: string; width: number; height: number; alt: string };

export function seo({
  path,
  title,
  description,
  image = DEFAULT_IMAGE,
  noindex = false,
}: {
  path: string;
  title: string;
  description: string;
  image?: Image;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'GoldSky Technologies',
      locale: 'en_CA',
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** The company, for Google's knowledge panel and local results. Facts only. */
export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: 'GoldSky Technologies',
  alternateName: 'GoldSky',
  url: SITE,
  logo: `${SITE}/goldsky-logo.png`,
  image: `${SITE}/images/art/share-og.jpg`,
  email: 'info@goldsky.ca',
  description:
    'Ottawa team building POS systems, QR code table ordering, online ordering and card payment for restaurants, retail stores, self serve car washes and vending machines in Canada.',
  address: { '@type': 'PostalAddress', addressLocality: 'Ottawa', addressRegion: 'ON', addressCountry: 'CA' },
  areaServed: [
    { '@type': 'City', name: 'Ottawa' },
    { '@type': 'Country', name: 'Canada' },
  ],
  knowsLanguage: ['en', 'zh'],
};

/** FAQ rich results from a page's own questions; answers that are not plain text are left out. */
export function faqJsonLd(items: { q: string; a: unknown }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((i) => typeof i.a === 'string')
      .map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a as string } })),
  };
}
