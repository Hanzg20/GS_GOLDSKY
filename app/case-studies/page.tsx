import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ScenePhoto } from '@/components/ScenePhoto';
import { CountUp } from '@/components/CountUp';

export const metadata: Metadata = {
  title: 'Case Studies — GoldSky Technologies',
  description: 'Real GS-SSP deployments — starting with a 6-bay self-serve car wash in the Ottawa area.',
};

// Customer identity withheld by request -- describe the deployment, not the business.
const CASE_FACTS: { label: string; value: string }[] = [
  { label: 'Customer', value: 'Self-Serve Car Wash Operator (name withheld by request)' },
  { label: 'Location', value: 'Ottawa area, ON' },
  { label: 'Industry', value: 'Coin-Op Self-Serve Car Wash' },
  { label: 'Operating History', value: '20+ years' },
  { label: 'Deployment Scale', value: '6 self-serve bays (Bay 1–6)' },
  { label: 'Replaced System', value: 'Nayax VPOS Touch (payment) + CP990 iCoin mechanism (retained for compatibility)' },
  { label: 'Deployed Products', value: 'GS-SSP Platform + PAX IM30 (×6) + Magikist CPGX integration' },
  { label: 'Payment Methods', value: 'EMV Chip / NFC Tap / QR / WeChat Pay / 25¢ · $1 · $2 CAD coins' },
  { label: 'Chemical System', value: 'ZEP Blue Marvel 2000 / White Foam Shampoo / Formula 50 / Presoak / Cherry Clear Coat' },
  { label: 'Monitoring', value: '1 camera per bay, 6-channel CCTV, cloud DVR' },
  { label: 'Payment Processing', value: 'Nuvei Canada / Moneris Canada (under evaluation)' },
  { label: 'Platform Status', value: "Ottawa region's first real-world GS-SSP deployment" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        title="Case Studies"
        subtitle="Real deployments, real operators, real results."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]}
      />

      {/* Case 1 — Self-Serve Car Wash (customer name withheld by request) */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <Pill variant="brand" className="mb-4">
              Featured Case Study
            </Pill>
            <h2 className="text-2xl md:text-3xl font-bold text-ink">6-Bay Self-Serve Car Wash</h2>
            <p className="mt-2 text-sm text-body max-w-xl">
              20+ years of operation in the Ottawa area — now running the GS-SSP platform across all six bays.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="space-y-3">
                <ScenePhoto
                  src="/images/car-wash-bay-panorama.jpg"
                  alt="Self-serve car wash bay, full-site view"
                  label="Self-serve car wash — full-site panorama"
                  note="Representative photo — not the actual site"
                  className="aspect-video"
                />
                <div className="grid grid-cols-2 gap-3">
                  <ScenePhoto
                    src="/images/payment-terminal-closeup.jpg"
                    alt="Payment terminal closeup at a self-serve bay"
                    label="Bay closeup — PAX IM30 terminal"
                    note="Representative photo"
                  />
                  <ScenePhoto
                    src="/images/coin-acceptance-closeup.jpg"
                    alt="Coin and card acceptance closeup"
                    label="Bay closeup — coin + card acceptance"
                    note="Representative photo"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { value: 6, suffix: '', label: 'Bays' },
                  { value: 20, suffix: '+', label: 'Years Operating' },
                  { value: 11, suffix: '', label: 'Payment Methods' },
                  { value: 0, suffix: '24/7', label: 'Unattended', raw: true },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-warm-off border border-border-warm p-4">
                    <div className="text-3xl font-extrabold text-brand">
                      {s.raw ? s.suffix : <CountUp value={s.value} suffix={s.suffix} />}
                    </div>
                    <div className="text-xs text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-brand-light border-l-4 border-brand rounded-r-lg p-5">
                <p className="text-sm text-[#6E3A0C] leading-relaxed">
                  Twenty years running coin-op, now running cloud-connected — every bay, every payment method, one
                  dashboard.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Facts table */}
          <ScrollReveal className="mt-10">
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {CASE_FACTS.map((f) => (
                  <div key={f.label} className="flex flex-col border-b border-border-warm pb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">{f.label}</span>
                    <span className="text-sm text-ink mt-0.5">{f.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>

          {/* Before/After */}
          <ScrollReveal className="mt-10">
            <SectionHeading title="Before → After" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card bg="off" hover="none">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">Before</span>
                <ul className="mt-3 space-y-2 text-sm text-body">
                  <li>• Coins only</li>
                  <li>• High Nayax monthly fees</li>
                  <li>• No remote management</li>
                </ul>
              </Card>
              <Card bg="white" hover="none" className="border-brand/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">After</span>
                <ul className="mt-3 space-y-2 text-sm text-body">
                  <li>• GS-SSP omni-channel payment</li>
                  <li>• Full cloud-based control</li>
                  <li>• Membership & loyalty system</li>
                </ul>
              </Card>
            </div>
          </ScrollReveal>

          <div className="mt-10 text-center">
            <Button href="/solutions/unattended" variant="primary" size="lg">
              See How GS-SSP Works <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>

      {/* Case 2 — Placeholder */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <Card bg="white" className="text-center py-14 border-dashed">
              <p className="text-lg font-semibold text-ink">Next Case Study</p>
              <p className="mt-2 text-sm text-body max-w-md mx-auto">
                Interested in becoming a GoldSky reference customer?
              </p>
              <div className="mt-5">
                <Button href="/contact" variant="steelGhost">
                  Get in Touch
                </Button>
              </div>
            </Card>
          </ScrollReveal>

          <div className="mt-8 text-center text-sm text-muted">
            Be notified when we publish new case studies —{' '}
            <a href="/contact" className="text-steel font-medium hover:underline">
              subscribe here
            </a>
            .
          </div>
        </div>
      </section>
    </>
  );
}
