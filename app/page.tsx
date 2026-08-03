import { ArrowRight, ShieldCheck, Target, Headset } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/SectionHeading';
import { TagRow } from '@/components/TagRow';
import { LogoStrip } from '@/components/LogoStrip';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DashboardMockup } from '@/components/DashboardMockup';
import { CountUp } from '@/components/CountUp';

// Generic hardware categories and compliance standards only -- no
// manufacturer names, so this never reads as a claimed vendor partnership.
const ECOSYSTEM_LOGOS = [
  'EMV Payment Terminals',
  'NFC / Contactless Readers',
  'PIN Pad Devices',
  'Coin & Bill Acceptors',
  'Interac Flash',
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

// Each claim below is already stated elsewhere on the site (Compliance strip,
// Solutions pages, Contact page) -- this section only consolidates them into
// a "why trust us" argument, it doesn't introduce new claims.
const WHY_GOLDSKY = [
  {
    icon: ShieldCheck,
    title: 'A Real Compliance Path',
    desc: 'Semi-Integrated architecture keeps your PCI scope at SAQ C, running on already-certified PAX/Castles hardware — with a clear path to full EMV L3 and P2PE.',
  },
  {
    icon: Target,
    title: 'Built for Self-Serve, Not Bolted On',
    desc: "The payment engine, remote device management, and reporting are designed around unattended commerce from the start — not a generic POS retrofitted onto a vending machine.",
  },
  {
    icon: Headset,
    title: 'You Talk to the People Who Built It',
    desc: 'English & Mandarin support, direct from the team running GS-SSP — 1 business day response, no ticket queue.',
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
      {/* Hero — dark, jinbean.com-style: noise-textured dark background, gold-accented
          headline, floating illustrative UI mockup + a generic capability badge. Visual
          stays generic/illustrative (no named manufacturer, no real product photo) since
          the underlying hardware relationship isn't a signed partnership. */}
      <section className="hero-noise bg-warm-dark pt-16 pb-14 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <ScrollReveal>
              <Pill variant="brand" className="!bg-transparent !border-brand/40 !text-brand">
                <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block mr-1.5" />
                Unattended Retail &amp; Self-Serve Payments
              </Pill>
              <h1 className="mt-5 text-3xl md:text-[42px] font-extrabold leading-tight">
                <span className="text-hero-fg">Payment Terminals That Just Work —</span>
                <br />
                <span className="text-gold">Day and Night, No One On Site.</span>
              </h1>
              <p className="mt-4 text-base text-hero-muted leading-relaxed max-w-md">
                One system connects your car wash, vending, or self-serve terminals to Canadian debit and
                credit payments — and lets you check sales or fix a problem from your phone, without a trip
                to the site.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Talk to Us <ArrowRight size={17} />
                </Button>
                <Button href="/products/software" variant="heroSecondary" size="lg">
                  Explore GS-SSP
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm">
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gold">24/7</div>
                  <div className="text-xs text-hero-muted mt-1">Unattended Operation</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gold">IP65</div>
                  <div className="text-xs text-hero-muted mt-1">Weatherproof Rated</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gold">
                    <CountUp value={11} suffix="+" />
                  </div>
                  <div className="text-xs text-hero-muted mt-1">Payment Methods</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <DashboardMockup />
                <div className="absolute -bottom-8 -right-8 shadow-lg rounded-lg bg-white/5 border border-hero-fg/15 backdrop-blur-sm px-4 py-3 flex items-center gap-2 whitespace-nowrap">
                  <ShieldCheck size={18} className="text-gold shrink-0" />
                  <span className="text-[11px] text-hero-fg">Secure — EMV / NFC</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why GoldSky — consolidates claims already made elsewhere on the site into
          one trust argument, rather than leaving them scattered across pages. */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="Why GoldSky" title="What You're Actually Getting" align="center" />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {WHY_GOLDSKY.map((w) => (
              <ScrollReveal key={w.title}>
                <Card className="h-full">
                  <w.icon size={24} className="text-brand" />
                  <h3 className="mt-4 text-base font-semibold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{w.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
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
              <a href="/innovation" className="text-sm font-medium text-steel hover:underline shrink-0">
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
            <p className="mt-6 text-sm text-muted">
              Building hardware, a payment product, or an integration?{' '}
              <a href="/innovation" className="text-steel font-medium hover:underline">
                See the partner &amp; developer program →
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
