import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy — GoldSky Technologies',
  description: 'How GoldSky Technologies collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5 md:px-10 prose-sm text-sm text-body leading-relaxed space-y-5">
          <p className="text-xs text-muted">
            GoldSky Technologies Inc. — Ontario Corporation #1001101532 — Ottawa, Ontario, Canada
          </p>
          <p>
            This page is a placeholder pending final legal review. GoldSky Technologies collects only the
            information you submit through our contact and developer application forms — name, company, email,
            and your message — solely to respond to your inquiry.
          </p>
          <p>
            We do not sell or share your information with third parties for marketing purposes. Information
            submitted through this site is retained only as long as needed to respond to your request and
            maintain a record of business communications.
          </p>
          <p>
            For questions about this policy or to request removal of your information, contact us at{' '}
            <a href="/contact" className="text-steel font-medium hover:underline">
              our Contact page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
