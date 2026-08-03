import type { Metadata } from 'next';
import {
  Cpu,
  Puzzle,
  CreditCard,
  ArrowRight,
  Nfc,
  Apple,
  Smartphone,
  QrCode,
  Wallet,
  Coins,
  Ticket,
  WalletCards,
  CircleDollarSign,
  MessageSquare,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LogoStrip } from '@/components/LogoStrip';
import { DeveloperForm } from '@/components/DeveloperForm';

export const metadata: Metadata = {
  title: 'Innovation Center — GoldSky Technologies',
  description:
    'Open APIs, 11 payment methods, and a certified compliance path — everything hardware vendors, integrators, and payment processors need to build on GS-SSP.',
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

const PAYMENT_METHODS = [
  { icon: CreditCard, name: 'EMV Chip', type: 'Card Infrastructure', desc: 'All Visa / Mastercard / Amex chip cards, real-time online authorization.' },
  { icon: Nfc, name: 'NFC / Tap', type: 'Contactless', desc: 'Visa payWave / Mastercard Contactless / Interac Flash.' },
  { icon: Apple, name: 'Apple Pay', type: 'Mobile Wallet', desc: 'iPhone / Apple Watch, Secure Element protected.' },
  { icon: Smartphone, name: 'Google Pay', type: 'Mobile Wallet', desc: 'Android devices, tokenized payment.' },
  { icon: QrCode, name: 'QR Code', type: 'Scan-to-Pay', desc: 'Scan the terminal screen QR, or present a phone QR code.' },
  { icon: MessageSquare, name: 'WeChat Pay', type: 'Digital Wallet', desc: "Preferred by Canada's Chinese community, QR scan." },
  { icon: Wallet, name: 'Alipay', type: 'Digital Wallet', desc: 'International visitors, QR scan with automatic FX.' },
  { icon: Coins, name: 'Canadian Coins', type: 'Coin', desc: '25¢ / $1 Loonie / $2 Toonie — compatible with existing coin mechanisms.' },
  { icon: Ticket, name: 'Custom Token', type: 'Proprietary Token', desc: 'Merchant-defined tokens, CP990 coin-mechanism learning.' },
  { icon: WalletCards, name: 'Member QR / Wallet Pass', type: 'Membership ID', desc: 'Apple Wallet membership card scan — no extra app required.' },
  { icon: CircleDollarSign, name: 'Pre-paid Digital Credits', type: 'Stored Value', desc: 'GS-SSP app in-wallet balance.' },
];

const CODE_SAMPLE = `POST /v1/devices/{device_id}/reboot
Authorization: Bearer <api_key>

GET /v1/transactions?from=2026-01-01&limit=50
Authorization: Bearer <api_key>

POST /v1/coupons
Content-Type: application/json
{ "type": "PERCENT_OFF", "value": 15, "max_uses": 100 }`;

const COMPLIANCE = [
  { title: 'PCI DSS 4.0', desc: 'Fully enforced since March 2025 — GS-SSP’s Semi-Integrated architecture reduces merchant PCI scope to SAQ C.' },
  { title: 'EMV L1 / L2 (Hardware)', desc: 'Held by PAX / Castles — GS-SSP connects to already-certified platforms, no merchant self-certification needed.' },
  { title: 'EMV L3 (Application)', desc: 'Via a Moneris-compatible SDK path, designed to cut certification time to 2–3 months vs. 18 months for a self-built integration.' },
  { title: 'Interac Flash', desc: 'Supports Canadian contactless debit — covers the primary payment method for local consumers.' },
  { title: 'CSA Electrical Certification', desc: '240V system connections require CSA Field Evaluation — GS-SSP can help arrange it.' },
];

const ONBOARDING_STEPS = [
  { step: 1, title: 'Assess Your Scenario', desc: 'Contact GoldSky to walk through your venue and requirements.', time: 'Contact Us' },
  { step: 2, title: 'Choose a Terminal', desc: 'Select PAX IM30 or Castles S1U2 and request a development unit.', time: '2–5 business days' },
  { step: 3, title: 'Merchant Account', desc: 'Apply for a merchant account with our target Canadian acquirer (Moneris) — GoldSky assists with the process.', time: '1–2 weeks' },
  { step: 4, title: 'Cloud Account Setup', desc: 'GS-SSP cloud account provisioning and device binding configuration.', time: '1–2 business days' },
  { step: 5, title: 'Install & Go Live', desc: 'On-site installation, licensed electrician wiring, CSA evaluation if required, then launch.', time: 'Varies by site' },
];

// Generic hardware categories only -- no manufacturer names, so this never
// reads as a claimed vendor partnership.
const HARDWARE_ECOSYSTEM = ['EMV Payment Terminals', 'NFC / Contactless Readers', 'PIN Pad Devices', 'Coin & Bill Acceptors'];

export default function InnovationPage() {
  return (
    <>
      <PageHero
        title="Innovation Center"
        subtitle="Open APIs, every payment method your customers expect, and a certified compliance path — everything you need to build on GS-SSP."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Innovation Center' }]}
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

      {/* Section 2 — Payment Methods */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="11 Payment Methods, One Terminal" align="center" />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAYMENT_METHODS.map((pm) => (
              <ScrollReveal key={pm.name}>
                <Card bg="white" className="h-full">
                  <div className="w-10 h-10 rounded-full bg-steel-light flex items-center justify-center">
                    <pm.icon size={18} className="text-steel" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink">{pm.name}</h3>
                  <p className="text-[11px] font-medium text-muted uppercase tracking-wide mt-0.5">{pm.type}</p>
                  <p className="mt-2 text-sm text-body leading-relaxed">{pm.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — API & SDK Overview */}
      <section className="bg-warm-white py-16 md:py-20">
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

      {/* Section 4 — Processing Path (no formal acquiring partnership is
          confirmed yet -- this describes the Canadian acquirers GS-SSP's
          architecture is designed around, not an existing agreement). */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="Processing Path" pillVariant="steel" title="Designed Around a Canadian Acquiring Path" />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <Card bg="white">
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wide">Primary Target</span>
                <h3 className="mt-1 text-lg font-semibold text-ink">Moneris Canada</h3>
                <p className="mt-2 text-sm text-body">Canada's largest domestic acquirer.</p>
                <ul className="mt-3 space-y-1.5 text-sm text-body">
                  <li>• EMV L3 certified acquirer</li>
                  <li>• P2PE-compliant channel</li>
                  <li>• Local CAD settlement</li>
                  <li>• Canadian regulatory framework</li>
                </ul>
                <Button href="/contact" variant="textLink" className="mt-4">
                  Contact for Rate
                </Button>
              </Card>
            </ScrollReveal>
            <ScrollReveal>
              <Card bg="white">
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wide">Alternate Options Under Evaluation</span>
                <ul className="mt-3 space-y-2 text-sm text-body">
                  <li>Payroc</li>
                  <li>Stripe Terminal</li>
                  <li>Global Payments</li>
                </ul>
                <Button href="/contact" variant="textLink" className="mt-4">
                  Contact for Rate
                </Button>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 5 — Compliance */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="Compliance" />
          </ScrollReveal>
          <div className="mt-8 space-y-3">
            {COMPLIANCE.map((c, i) => (
              <ScrollReveal key={c.title}>
                <div className="flex gap-4 border-b border-border-warm pb-4 last:border-0">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-steel-light text-steel font-mono text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
                    <p className="mt-1 text-sm text-body leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Onboarding */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="Merchant Onboarding" subtitle="Five steps from first conversation to live acceptance." />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ONBOARDING_STEPS.map((s) => (
              <ScrollReveal key={s.step}>
                <Card bg="white" className="h-full">
                  <span className="text-2xl font-black text-brand/30">{String(s.step).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-sm font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-body leading-relaxed">{s.desc}</p>
                  <p className="mt-3 text-[11px] font-mono text-steel">{s.time}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Application Form */}
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

      {/* Section 8 — Hardware Ecosystem */}
      <LogoStrip names={HARDWARE_ECOSYSTEM} label="Hardware We Build For" />
    </>
  );
}
