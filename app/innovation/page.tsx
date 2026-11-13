import type { Metadata } from 'next';

// /innovation became /developers (2026-11-13). Cloudflare Pages answers the old
// address with a 301 from public/_redirects; this page is only the fallback
// for hosts that ignore that file.
export const metadata: Metadata = {
  title: 'Moved to Developers',
  robots: { index: false },
};

export default function InnovationMoved() {
  return (
    <section className="px-4 pb-24 pt-40">
      <meta httpEquiv="refresh" content="0; url=/developers" />
      <div className="mx-auto max-w-content">
        <p className="body-3 text-ink-soft">
          This page has moved to{' '}
          <a href="/developers" className="text-brand-dark underline">
            Developers
          </a>
          .
        </p>
      </div>
    </section>
  );
}
