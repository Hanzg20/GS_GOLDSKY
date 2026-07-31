import type { Metadata } from 'next';
import { ArrowRight, WashingMachine, PawPrint, ShoppingBasket } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TagRow } from '@/components/TagRow';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Unattended Commercial Automation — GoldSky Technologies',
  description: 'Rugged self-serve payment and control infrastructure for car washes, vending, laundromats, and pet stations.',
};

const USE_CASES = [
  {
    icon: WashingMachine,
    title: 'Self-Serve Car Wash',
    desc: 'Coin-op and card-based bay control with automated relay/pulse output.',
    tag: 'Coin-Op',
  },
  {
    icon: ShoppingBasket,
    title: 'Vending & Smart Locker',
    desc: 'Cashless vending and parcel locker access with remote inventory visibility.',
    tag: 'Retail',
  },
  {
    icon: PawPrint,
    title: 'Dog Wash & Pet Station',
    desc: 'Timed self-serve wash bays with membership and top-up wallet support.',
    tag: 'Pet Care',
  },
];

const PAYMENT_METHODS = ['Tap', 'Insert', 'QR', 'WeChat Pay', 'Alipay', '25¢ / $1 / $2 Coins', 'Custom Token'];

const GS_SSP_FEATURES = [
  'Coin-Op Compatibility',
  'Relay / Pulse Output',
  'Remote Management',
  'Membership & Loyalty',
  'Coupons & Vouchers',
  'Dynamic Pricing',
];

export default function UnattendedPage() {
  return (
    <>
      <PageHero
        title="Unattended Commercial Automation"
        subtitle="Outdoor-rated, 24/7 self-serve payment infrastructure — engineered for extreme weather and unattended operation."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Unattended Commercial' }]}
      />

      {/* Use Cases */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="Use Cases" />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {USE_CASES.map((uc) => (
              <ScrollReveal key={uc.title}>
                <Card className="h-full">
                  <uc.icon size={28} className="text-steel" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{uc.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{uc.desc}</p>
                  <span className="mt-3 inline-block text-[11px] font-medium text-muted bg-warm-off px-2.5 py-1 rounded-md border border-border-warm">
                    {uc.tag}
                  </span>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Spec */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="Hardware" pillVariant="steel" title="Terminal Options" />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <Card bg="white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">PAX IM30</h3>
                  <span className="text-[11px] font-semibold text-brand uppercase tracking-wide">Primary</span>
                </div>
                <TagRow className="mt-4" tags={['IP65', '−30°C to +60°C', '6.0" Screen', 'EMV L3', 'NFC', '4G LTE']} />
              </Card>
            </ScrollReveal>
            <ScrollReveal>
              <Card bg="white">
                <h3 className="text-lg font-semibold text-ink">Castles S1U2</h3>
                <p className="text-xs text-muted mt-1">Alternate option</p>
                <TagRow className="mt-4" tags={['IP54', '−20°C to +50°C', '5.5" Screen', 'EMV L3', 'NFC', 'WiFi + BT']} />
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Payment Coverage + GS-SSP Features */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <ScrollReveal>
            <h3 className="text-lg font-semibold text-ink mb-4">Payment Coverage</h3>
            <TagRow tags={PAYMENT_METHODS} />
          </ScrollReveal>
          <ScrollReveal>
            <h3 className="text-lg font-semibold text-ink mb-4">GS-SSP Feature Set</h3>
            <ul className="space-y-2">
              {GS_SSP_FEATURES.map((f) => (
                <li key={f} className="text-sm text-body flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Case study reference + CTA (customer name withheld by request) */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <Card bg="white" className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand mb-1">Real Deployment</p>
                <h3 className="text-lg font-semibold text-ink">6-Bay Self-Serve Car Wash — Ottawa, ON</h3>
                <p className="mt-1 text-sm text-body">6 bays, 20+ years in operation, now running GS-SSP.</p>
              </div>
              <Button href="/case-studies" variant="steelGhost">
                Read the Case Study <ArrowRight size={16} />
              </Button>
            </Card>
          </ScrollReveal>

          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary" size="lg">
              Request a Demo for Car Wash Integration <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
