import type { Metadata } from 'next';
import { Buildings, Clock, EnvelopeSimple, Translate } from '@phosphor-icons/react/dist/ssr';
import { ScrollReveal } from '@/components/ScrollReveal';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Contact · Talk to our team',
  description: 'Talk to GoldSky about your counter, your self serve site or an integration. Ottawa, Ontario.',
};

// Details carried over from the previous contact page (hours, languages,
// one business day reply, corporation number); nothing new is claimed.

const DETAILS = [
  { icon: EnvelopeSimple, label: 'Email', value: 'info@goldsky.ca', href: 'mailto:info@goldsky.ca' },
  { icon: Clock, label: 'Hours', value: 'Monday to Friday, 9:00 to 18:00 Eastern' },
  { icon: Translate, label: 'Languages', value: 'English and Mandarin' },
  { icon: Buildings, label: 'Company', value: 'GoldSky Technologies Inc., Ottawa, Ontario · Ontario Corporation #1001101532' },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <ScrollReveal>
          <p className="caption-4 uppercase tracking-widest text-brand">Contact</p>
          <h1 id="contact-title" className="heading-1 mt-6">
            Talk to our team
          </h1>
          <p className="body-2 mt-6 text-ink-soft">
            Tell us what you run and how customers pay today. We reply within one business day.
          </p>
          <dl className="mt-10 space-y-6">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex gap-4">
                <d.icon size={22} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <dt className="caption-4 uppercase tracking-widest text-ink-mute">{d.label}</dt>
                  <dd className="body-4 mt-1 text-ink">
                    {d.href ? (
                      <a href={d.href} className="underline-offset-4 hover:underline">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="body-6 mt-10 text-ink-mute">
            What you send is handled under our{' '}
            <a href="/privacy" className="text-brand-dark underline underline-offset-4">
              privacy policy
            </a>
            .
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="rounded-2xl bg-night px-6 py-10 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-10 md:py-12">
            <h2 className="heading-4 text-cream">Send us a note</h2>
            <p className="body-5 mt-2 text-[#B9AF9E]">A few details and we will come back to you.</p>
            <div className="mt-8">
              <QuickContact />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
