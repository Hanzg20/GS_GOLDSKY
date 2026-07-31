import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DashboardMockup } from '@/components/DashboardMockup';

export const metadata: Metadata = {
  title: 'Software Layer — GS-SSP Platform — GoldSky Technologies',
  description: 'GS-SSP Platform — Payment Engine, Operations Center, and Business Intelligence, unified in the cloud.',
};

const SUBSYSTEMS = [
  {
    name: 'Payment Engine',
    rows: [
      {
        modules: 'EMV L3 semi-integrated processing / Multi-payment routing / Pulse-output compatibility',
        tech: 'Moneris-compatible acquiring / PCI DSS 4.0 P2PE / Tokenized card data',
      },
      {
        modules: 'Membership & subscription management / Coupon redemption engine',
        tech: 'Apple Wallet integration / QR code generation & validation',
      },
    ],
  },
  {
    name: 'Operations Center',
    rows: [
      {
        modules: 'Remote device management (reboot / config / OTA)',
        tech: 'PAXSTORE MDM / Custom REST API',
      },
      {
        modules: 'Real-time device status monitoring / Fault alerting',
        tech: 'Webhook push / Email + SMS alerts',
      },
    ],
  },
  {
    name: 'Business Intelligence',
    rows: [
      {
        modules: 'Transaction & revenue dashboard / Bay- and device-level analytics',
        tech: 'Daily / weekly / monthly CSV export',
      },
      {
        modules: 'Dynamic ad push (1080p video) / Remote menu updates',
        tech: 'Content Management System (CMS)',
      },
      {
        modules: 'Automated reconciliation / Revenue-share reports / Settlement sync',
        tech: 'Integrates with QuickBooks / Xero',
      },
    ],
  },
];

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        title="Software Layer — GS-SSP Platform"
        subtitle="The cloud platform connecting your device fleet to your business — Payment Engine, Operations Center, and Business Intelligence."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Software' }]}
      />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="GS-SSP Platform" title="Three Subsystems, One Cloud Platform" />
          </ScrollReveal>

          <div className="mt-8 space-y-8">
            {SUBSYSTEMS.map((sub) => (
              <ScrollReveal key={sub.name}>
                <h3 className="text-sm font-semibold text-brand uppercase tracking-wide mb-3">{sub.name}</h3>
                <div className="space-y-3">
                  {sub.rows.map((row, i) => (
                    <Card key={i} bg="off" hover="none" compact>
                      <p className="text-sm font-medium text-ink">{row.modules}</p>
                      <p className="mt-1.5 text-xs font-mono text-steel">{row.tech}</p>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <SectionHeading pill="Cloud SaaS" pillVariant="steel" title="Cloud SaaS & Advertising" />
            <ul className="mt-5 space-y-4 text-sm text-body">
              <li>
                <span className="font-semibold text-ink">Remote Telemetry —</span> device heartbeat monitoring,
                real-time pressure/temperature sensor data (optional IoT module).
              </li>
              <li>
                <span className="font-semibold text-ink">Dynamic Content Push —</span> push 1080p video ads to
                terminal screens via CMS, switching content by time of day, weather, or scenario.
              </li>
              <li>
                <span className="font-semibold text-ink">Automated Reconciliation —</span> daily automatic
                reconciliation with revenue-share reports, aggregated across stores and bays.
              </li>
            </ul>
            <div className="mt-7">
              <Button href="/contact" variant="primary">
                Contact for Pricing <ArrowRight size={16} />
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <DashboardMockup />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
