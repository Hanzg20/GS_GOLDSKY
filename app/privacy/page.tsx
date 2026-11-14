import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy · GoldSky',
  description: 'How GoldSky Technologies collects, uses and protects your information.',
};

// Text unchanged from the previous page (pending legal review), except that
// the developer application form it mentioned no longer exists: enquiries,
// developer ones included, all go through the contact form now.
export default function PrivacyPage() {
  return (
    <section aria-labelledby="privacy-title" className="px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-prose">
        <p className="caption-4 uppercase tracking-widest text-brand">Privacy</p>
        <h1 id="privacy-title" className="heading-2 mt-6">
          Privacy policy
        </h1>
        <p className="body-6 mt-4 text-ink-mute">
          GoldSky Technologies Inc. · Ontario Corporation #1001101532 · Ottawa, Ontario, Canada
        </p>
        <div className="body-4 mt-10 space-y-5 text-ink-soft">
          <p>
            This page is a placeholder pending final legal review. GoldSky Technologies collects only the
            information you submit through our contact forms (name, company, email and your message) solely to
            respond to your inquiry.
          </p>
          <p>
            We do not sell or share your information with third parties for marketing purposes. Information
            submitted through this site is retained only as long as needed to respond to your request and
            maintain a record of business communications.
          </p>
          <p>
            For questions about this policy or to request removal of your information, write to{' '}
            <a href="mailto:info@goldsky.ca" className="text-brand-dark underline underline-offset-4">
              info@goldsky.ca
            </a>{' '}
            or use{' '}
            <a href="/contact" className="text-brand-dark underline underline-offset-4">
              our contact page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
