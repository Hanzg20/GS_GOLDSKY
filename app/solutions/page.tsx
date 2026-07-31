import type { Metadata } from 'next';
import { ArrowRight, Car, ShoppingCart, Zap } from 'lucide-react';
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
