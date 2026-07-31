import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/SectionHeading';
import { TagRow } from '@/components/TagRow';
import { LogoStrip } from '@/components/LogoStrip';
import { ScrollReveal } from '@/components/ScrollReveal';

// Hardware models we build for and standards we comply with -- not a claim
// of formal partnership. Keep named processors (Moneris/Nuvei/etc.) out of
// this list until an actual partnership is confirmed.
const ECOSYSTEM_LOGOS = [
  'PAX Technology',
  'Castles Technology',
  'FEITIAN',
  'ID TECH',
  'Interac Flash',
  'EMV',
  'PCI DSS 4.0',
  'CSA Certified',
];

const PAYMENT_SOLUTIONS = [
  {
    title: 'Unattended Commercial Automation',
    desc: 'Coin-op car washes, vending, laundromats, and dog wash stations — rugged, outdoor-rated payment terminals engineered for 24/7 self-serve operation with no staff on site.',
    tags: ['IP65', 'EMV L3', 'Interac Flash', '24/7 Unattended'],
    href: '/solutions/unattended',
  },
  {
    title: 'Attended & Front-Desk',
    desc: 'Countertop and mobile handheld checkout for staffed locations — unified onto the same cloud ledger and settlement pipeline as the unattended fleet.',
    tags: ['Countertop POS', 'Mobile Handheld', 'Cloud Reconciliation'],
    href: '/solutions/attended',
  },
];

const GS_SSP_FEATURES = [
  { dot: 'bg-brand', text: 'Semi-Integrated Architecture' },
  { dot: 'bg-steel', text: 'Omni-Channel Payment' },
  { dot: 'bg-gold', text: 'Industrial Reliability' },
];

export default function HomePage() {
  return (
    <>
      {/* Focus statement — who we are, stated plainly, no unrelated verticals */}
      <section className="bg-warm-white pt-16 pb-10 md:pt-20 md:pb-14">
        <div className="mx-auto max-w-content px-5 md:px-10 text-center">
          <ScrollReveal>
            <Pill variant="brand">Attended & Unattended Commercial Payment</Pill>
            <h1 className="mt-5 text-3xl md:text-[42px] font-extrabold text-ink leading-tight max-w-3xl mx-auto">
              Payment Infrastructure Built for Self-Serve &amp; Staffed Commerce
            </h1>
            <p className="mt-4 text-base text-body max-w-2xl mx-auto leading-relaxed">
              GoldSky is a payments-first technology company. GS-SSP is our semi-integrated hardware-to-cloud
              platform, purpose-built for unattended and attended commercial payment — engineered to EMV, PCI
              DSS, and Interac requirements from day one.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Talk to Us <ArrowRight size={17} />
              </Button>
              <Button href="/products/software" variant="secondary" size="lg">
                Explore GS-SSP
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hardware & Compliance Ecosystem */}
      <LogoStrip names={ECOSYSTEM_LOGOS} label="Built for Industry-Standard Hardware & Compliance" />

      {/* Payment Solutions — attended vs. unattended, nothing else */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="Solutions" title="Built for the Way Commerce Actually Happens" align="center" />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PAYMENT_SOLUTIONS.map((sol) => (
              <ScrollReveal key={sol.title}>
                <Card hover="accent-left" className="h-full">
                  <h3 className="text-lg font-semibold text-ink">{sol.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{sol.desc}</p>
                  <TagRow className="mt-4" tags={sol.tags} />
                  <a
                    href={sol.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-steel hover:underline"
                  >
                    Learn More <ArrowRight size={14} />
                  </a>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GS-SSP Spotlight (dark) */}
      <section className="hero-noise bg-warm-dark py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <Pill variant="brand" className="!bg-transparent !border-brand/40 !text-brand">
              Featured Platform
            </Pill>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-hero-fg leading-tight">
              GS-SSP — Self-Service Payment Platform
            </h2>
            <p className="mt-4 text-base text-hero-muted leading-relaxed">
              A semi-integrated hardware-to-cloud platform purpose-built for unattended commercial payment —
              car washes, vending, laundromats, and beyond. One deployment, every payment method, full remote
              control.
            </p>
            <ul className="mt-6 space-y-3">
              {GS_SSP_FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm text-hero-fg">
                  <span className={`w-2 h-2 rounded-full ${f.dot}`} />
                  {f.text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/products/software" variant="primary" size="lg">
                Explore GS-SSP <ArrowRight size={17} />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-3">
              <div className="rounded-lg border-l-[3px] border-brand bg-white/[0.04] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.08em] text-hero-muted">Cloud Layer</p>
                <p className="text-sm font-mono text-hero-fg mt-1">Cloud SaaS — GS-SSP Platform</p>
              </div>
              <div className="flex justify-center text-hero-muted/40">↓</div>
              <div className="rounded-lg border-l-[3px] border-steel bg-white/[0.04] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.08em] text-hero-muted">Controller Layer</p>
                <p className="text-sm font-mono text-hero-fg mt-1">GS-SSP Edge Controller + PAX IM30</p>
              </div>
              <div className="flex justify-center text-hero-muted/40">↓</div>
              <div className="rounded-lg border-l-[3px] border-gold bg-white/[0.04] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.08em] text-hero-muted">Hardware Layer</p>
                <p className="text-sm font-mono text-hero-fg mt-1">MDB / DEX / Relay / Sensors</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Compliance strip — exactly what acquiring banks are checking for */}
      <section className="bg-warm-off py-10">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <ShieldCheck size={18} className="text-steel shrink-0" />
              <p className="text-sm text-body">
                Built on a Semi-Integrated architecture that keeps merchant PCI scope at SAQ C, connects to
                already-certified PAX/Castles hardware (EMV L1/L2), and is designed around a Moneris-compatible
                path to EMV L3 and P2PE compliance.
              </p>
              <a href="/payments" className="text-sm font-medium text-steel hover:underline shrink-0">
                See Compliance Path →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ready to Transform CTA */}
      <section className="bg-warm-white py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-[32px] font-bold text-ink max-w-2xl mx-auto leading-tight">
              Join the Growing Network of Operators Running on GS-SSP
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Talk to Us <ArrowRight size={17} />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Request Demo
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
