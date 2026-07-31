import type { Metadata } from 'next';
import { MapPin, Clock, Linkedin, Globe, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/ContactForm';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact Us — GoldSky Technologies',
  description: 'Talk to us, request a demo, or start a partnership conversation with GoldSky Technologies.',
};

const QUICK_ENTRIES = [
  { label: 'Talk to Us', desc: 'General questions about GoldSky or GS-SSP.' },
  { label: 'Request Demo', desc: 'See the GS-SSP platform in action.' },
  { label: 'Partnership Inquiry', desc: 'For hardware, payment, and integration partners.' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'll respond within 1 business day."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: info + form */}
          <ScrollReveal>
            <Card>
              <h2 className="text-lg font-semibold text-ink">GoldSky Technologies</h2>
              <p className="mt-1 text-xs text-muted">GoldSky Technologies Inc. — Ontario Corporation #1001101532</p>
              <div className="mt-4 space-y-3 text-sm text-body">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-steel mt-0.5 shrink-0" />
                  <span>Ottawa, Ontario, Canada (registered address)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-steel mt-0.5 shrink-0" />
                  <span>Mon–Fri, 9:00 AM – 6:00 PM EST</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {QUICK_ENTRIES.map((q) => (
                  <div key={q.label} className="rounded-lg bg-warm-off border border-border-warm p-3">
                    <p className="text-xs font-semibold text-ink">{q.label}</p>
                    <p className="text-[11px] text-muted mt-0.5 leading-snug">{q.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-6">
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Right: location */}
          <ScrollReveal>
            <div className="rounded-xl overflow-hidden border border-border-warm h-64 lg:h-full min-h-[280px]">
              <iframe
                title="GoldSky Technologies — Ottawa"
                src="https://www.google.com/maps?q=Ottawa,Ontario,Canada&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 space-y-4 text-sm text-body">
              <div className="flex items-center gap-2.5">
                <Globe size={16} className="text-steel" />
                <span>Languages: English &amp; Mandarin support available</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin size={16} className="text-steel" />
                <span className="text-muted text-xs">LinkedIn</span>
                <span className="text-muted text-xs">·</span>
                <span className="text-muted text-xs">Xiaohongshu</span>
                <span className="text-muted text-xs">·</span>
                <span className="text-muted text-xs">TikTok</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-muted">
                <ShieldCheck size={16} className="text-steel mt-0.5 shrink-0" />
                <span>
                  Your information is protected under our{' '}
                  <a href="/privacy" className="text-steel font-medium hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
