import type { Metadata } from 'next';
import { Cpu, Puzzle, CreditCard, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LogoStrip } from '@/components/LogoStrip';
import { DeveloperForm } from '@/components/DeveloperForm';

export const metadata: Metadata = {
  title: 'Developers & ISVs — GoldSky Technologies',
  description: 'REST API, Android SDK, and Webhooks for hardware vendors, system integrators, and payment processors.',
};

const AUDIENCES = [
  {
    icon: Cpu,
    title: 'For OEM Hardware Vendors',
    desc: 'Connect easily to the GS-SSP hardware control ecosystem, with device adaptation specs and certification support.',
  },
  {
    icon: Puzzle,
    title: 'For System Integrators',
    desc: 'Open REST API, Android SDK, and Webhooks — built for deep integration into your own systems.',
  },
  {
    icon: CreditCard,
    title: 'For Payment Processors',
    desc: 'A standard semi-integrated architecture for fast onboarding to major acquirers, with a test sandbox environment.',
  },
];

const CODE_SAMPLE = `POST /v1/devices/{device_id}/reboot
Authorization: Bearer <api_key>

GET /v1/transactions?from=2026-01-01&limit=50
Authorization: Bearer <api_key>

POST /v1/coupons
Content-Type: application/json
{ "type": "PERCENT_OFF", "value": 15, "max_uses": 100 }`;

// Hardware models we build for -- not a claim of formal partnership. Keep
// named processors out until an actual partnership is confirmed.
const HARDWARE_ECOSYSTEM = ['PAX Technology', 'Castles Technology', 'FEITIAN', 'ID TECH'];

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        title="Developers & ISVs"
        subtitle="Open APIs, an Android SDK, and real-time webhooks — built for hardware vendors, integrators, and processors."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Developers & ISVs' }]}
      />

      {/* Section 1 — Audiences */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AUDIENCES.map((a) => (
              <ScrollReveal key={a.title}>
                <Card className="h-full">
                  <a.icon size={26} className="text-steel" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{a.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{a.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — API & SDK Overview */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="API & SDK" pillVariant="steel" title="Built to Integrate" />
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-ink">REST API</h3>
                  <p className="mt-1 text-sm text-body">
                    Device management (remote reboot / config / OTA), transaction queries, report exports, member
                    management, and coupon CRUD.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Android SDK</h3>
                  <p className="mt-1 text-sm text-body">
                    Wraps the PAX PAXSTORE SDK — payment triggers, pulse-output control, and device status reads.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Webhooks</h3>
                  <p className="mt-1 text-sm text-body">
                    Real-time event push — transaction completion, device online/offline, and fault alerts — to your
                    external systems.
                  </p>
                </div>
                <Button href="#" variant="textLink">
                  View Full API Docs <ArrowRight size={14} />
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <pre className="rounded-xl border border-border-warm-strong bg-warm-off p-5 overflow-x-auto text-xs font-mono text-steel leading-relaxed">
                {CODE_SAMPLE}
              </pre>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3 — Application Form */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="Apply for Developer Access" align="center" />
          </ScrollReveal>
          <div className="mt-8">
            <DeveloperForm />
          </div>
        </div>
      </section>

      {/* Section 4 — Hardware Ecosystem */}
      <LogoStrip names={HARDWARE_ECOSYSTEM} label="Hardware We Build For" />
    </>
  );
}
