import type { Metadata } from 'next';

// Retired 2026-11-14: the old terminal spec sheet and the dated EV/parking
// teaser had claims with no source. Cloudflare Pages answers this address with
// a 301 from public/_redirects; this page is only the fallback.
export const metadata: Metadata = {
  title: 'Moved to Products',
  robots: { index: false },
};

export default function Moved() {
  return (
    <section className="px-4 pb-24 pt-40">
      <meta httpEquiv="refresh" content="0; url=/products" />
      <div className="mx-auto max-w-content">
        <p className="body-3 text-ink-soft">
          This page has moved to{' '}
          <a href="/products" className="text-brand-dark underline">
            Products
          </a>
          .
        </p>
      </div>
    </section>
  );
}
