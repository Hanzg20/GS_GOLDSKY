import type { Metadata } from 'next';
import { ArrowRight, Store, Smartphone, ReceiptText } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TagRow } from '@/components/TagRow';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Attended & Front-Desk — GoldSky Technologies',
  description: 'Staffed point-of-sale infrastructure unified with your unattended fleet on one cloud ledger.',
};

const USE_CASES = [
  { icon: Store, title: 'Front Counter Checkout', desc: 'Countertop terminal for staffed retail and service-counter checkout.' },
  { icon: Smartphone, title: 'Mobile Handheld Checkout', desc: 'Line-busting and table-side payment with a handheld Android terminal.' },
  { icon: ReceiptText, title: 'Manual Refunds & Overrides', desc: 'Staff-initiated refunds and comps reconciled centrally with every other channel.' },
];

export default function AttendedPage() {
  return (
    <>
      <PageHero
        title="Attended & Front-Desk"
        subtitle="Staffed point-of-sale scenarios, unified with your unattended fleet on one cloud ledger and settlement pipeline."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Attended & Front-Desk' }]}
      />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="Built for Staffed Locations" />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {USE_CASES.map((uc) => (
              <ScrollReveal key={uc.title}>
                <Card className="h-full">
                  <uc.icon size={28} className="text-steel" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{uc.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{uc.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <Card bg="white">
              <p className="text-sm font-medium text-steel">
                Unified cloud reconciliation, unified settlement pipeline, front and back office on a single
                system.
              </p>
              <h3 className="mt-5 text-sm font-semibold text-ink uppercase tracking-wide">Technology</h3>
              <TagRow className="mt-3" tags={['Countertop POS', 'Mobile Handheld', 'Unified Processing', 'Cloud Reconciliation']} />
            </Card>
          </ScrollReveal>

          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary" size="lg">
              Talk to Us About Attended Deployments <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
