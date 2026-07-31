import type { Metadata } from 'next';
import { ArrowRight, Car, ShoppingCart, Zap, Building2, Hotel } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { TagRow } from '@/components/TagRow';
import { ScenePlaceholder } from '@/components/ScenePlaceholder';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Solutions — GoldSky Technologies',
  description: 'From coin-op car wash to EV charging to enterprise retail — one platform, any self-serve venue.',
};

// Target venue types, not proven deployments -- framed with the same
// "coming soon" / reduced-weight treatment as Next-Gen Infrastructure below.
// No client names, metrics, or specific hardware models are claimed.
const EMERGING_SCENARIOS = [
  {
    icon: Building2,
    title: 'Office & Corporate Campus Micro-Markets',
    fit: 'Break rooms, lobbies, and shared workspaces at corporate campuses and multi-tenant office buildings.',
    whyNA:
      'North American workplace amenity budgets are shifting away from staffed cafeterias and coin vending toward 24/7 cashless micro-markets — a format that fits hybrid-office schedules where there is no consistent on-site staff to run a till.',
    fitDetail:
      'Gravity-sensing or AI-vision smart cabinets paired with EMV/NFC tap checkout, with fleet-wide reporting so a facilities or HR team can manage inventory and sales across several corporate sites from one dashboard.',
    tags: ['EMV / NFC Tap', 'AI Vision Cabinets', 'Multi-Site Fleet View'],
  },
  {
    icon: Hotel,
    title: 'Hotel & Hospitality Self-Serve Retail',
    fit: 'Lobby markets and dining-area grab-and-go retail at hotels and extended-stay properties.',
    whyNA:
      'North American hotel operators are replacing limited-hours room service and traditional mini-bars with always-open self-serve markets, since guests increasingly expect frictionless tap payment rather than waiting on staff at odd hours.',
    fitDetail:
      'Refrigerated and ambient smart cabinets for food & beverage, EMV/NFC tap terminals, with centralized sales and inventory reporting across a multi-property portfolio.',
    tags: ['EMV / NFC Tap', 'Refrigerated Cabinets', 'Multi-Property Reporting'],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Solutions — Designed for Your Vertical"
        subtitle="From coin-op car wash to EV charging to enterprise retail — one platform, any self-serve venue."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 space-y-6">
          {/* Section A — Unattended Commercial (primary) */}
          <ScrollReveal>
            <Card className="p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <ScenePlaceholder icon={Car} label="PAX IM30 deployed at a self-serve car wash bay" />
                <div>
                  <Pill variant="brand" className="mb-4">
                    Primary Focus
                  </Pill>
                  <h2 className="text-2xl font-bold text-ink">Unattended Commercial Automation</h2>
                  <p className="mt-3 text-base text-body leading-relaxed">
                    Rugged, outdoor-rated payment and control infrastructure for venues with no staff on site —
                    engineered for 24/7 operation in extreme weather.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-body">
                    <li>• Self-Serve Car Wash (Coin-Op)</li>
                    <li>• Vending Machine & Smart Locker</li>
                    <li>• Laundromat</li>
                    <li>• Dog Wash Station</li>
                  </ul>
                  <TagRow
                    className="mt-5"
                    tags={['IP65', 'IK09', 'EMV L3', 'Interac Flash', 'Mifare RFID', '−30°C Rated', '24/7 Unattended']}
                  />
                  <div className="mt-6">
                    <Button href="/solutions/unattended" variant="primary">
                      Explore Unattended Solutions <ArrowRight size={17} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Section B — Attended & Front-Desk (secondary) */}
          <ScrollReveal>
            <Card className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-xl font-semibold text-ink">Attended & Front-Desk</h2>
                  <p className="mt-3 text-sm text-body leading-relaxed">
                    Staffed point-of-sale scenarios — front counter checkout, manual refunds, and mobile handheld
                    payment.
                  </p>
                  <p className="mt-3 text-sm font-medium text-steel">
                    One unified cloud ledger, one settlement pipeline, front and back office on a single
                    system.
                  </p>
                  <TagRow
                    className="mt-5"
                    tags={['Countertop POS', 'Mobile Handheld', 'Unified Processing', 'Cloud Reconciliation']}
                  />
                  <a href="/solutions/attended" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-steel hover:underline">
                    Learn More <ArrowRight size={14} />
                  </a>
                </div>
                <div className="order-1 lg:order-2">
                  <ScenePlaceholder icon={ShoppingCart} label="Front-desk countertop POS terminal" />
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Section B2 — Emerging Micro-Market Scenarios (target venue types, reduced weight) */}
          <ScrollReveal>
            <Card className="p-6 md:p-8 opacity-90">
              <Pill variant="comingSoon" className="mb-3">
                Target Scenarios
              </Pill>
              <h2 className="text-xl font-semibold text-ink">Emerging Micro-Market Scenarios</h2>
              <p className="mt-2 text-sm text-body leading-relaxed max-w-2xl">
                Two unattended-retail venue types we see as especially well-suited to the North American market —
                extensions of the same smart-cabinet and payment-terminal category as our vending solutions, not
                yet deployed by GoldSky.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {EMERGING_SCENARIOS.map((s) => (
                  <div key={s.title} className="rounded-lg border border-border-warm bg-warm-off p-5">
                    <s.icon size={22} className="text-muted" />
                    <h3 className="mt-3 text-base font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-xs font-medium text-muted">{s.fit}</p>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                      Why North America
                    </p>
                    <p className="mt-1 text-sm text-body leading-relaxed">{s.whyNA}</p>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">Platform Fit</p>
                    <p className="mt-1 text-sm text-body leading-relaxed">{s.fitDetail}</p>

                    <TagRow className="mt-4" tags={s.tags} />
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-muted max-w-2xl">
                Target scenarios based on category fit, not confirmed deployments.{' '}
                <a href="/contact" className="text-steel font-medium hover:underline">
                  Talk to us
                </a>{' '}
                if this matches a venue you operate.
              </p>
            </Card>
          </ScrollReveal>

          {/* Section C — Next-Gen Infrastructure (placeholder, reduced weight) */}
          <ScrollReveal>
            <Card className="p-6 md:p-8 opacity-90">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={22} className="text-muted" />
                <h2 className="text-xl font-semibold text-ink">Next-Gen Infrastructure</h2>
                <Pill variant="comingSoon">Coming Q4 2026</Pill>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-body">
                <div>
                  <p className="font-medium text-ink">EV Charging & Energy</p>
                  <p className="mt-1 text-muted">OCPP 1.6/2.0 · Dynamic billing · Advertising displays</p>
                </div>
                <div>
                  <p className="font-medium text-ink">Smart Mobility & Parking</p>
                  <p className="mt-1 text-muted">ALPR license-plate recognition · Gate integration</p>
                </div>
              </div>
              <TagRow className="mt-5" tags={['OCPP 1.6', 'OCPP 2.0', 'ALPR', 'OCPI Roaming', 'Dynamic Pricing']} />
              <p className="mt-5 text-xs text-muted">
                Interested in EV or Parking?{' '}
                <a href="/contact" className="text-steel font-medium hover:underline">
                  Talk to us early.
                </a>
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
