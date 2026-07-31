import type { Metadata } from 'next';
import { CreditCard, Nfc, Apple, Smartphone, QrCode, Wallet, Coins, Ticket, WalletCards, CircleDollarSign, MessageSquare } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Payments & Ecosystem — GoldSky Technologies',
  description: '11 payment methods, a Canadian acquiring path, and a certified route to PCI/EMV/Interac compliance.',
};

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

export default function PaymentsPage() {
  return (
    <>
      <PageHero
        title="Payments & Ecosystem"
        subtitle="Every payment method your customers expect, a certified path to compliance, and a clear route to a Canadian acquiring partner."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Payments & Ecosystem' }]}
      />

      {/* Section 1 — Payment Methods */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading title="11 Payment Methods, One Terminal" align="center" />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAYMENT_METHODS.map((pm) => (
              <ScrollReveal key={pm.name}>
                <Card className="h-full">
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

      {/* Section 2 — Processing Path (no formal acquiring partnership is
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

      {/* Section 3 — Compliance */}
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

      {/* Section 4 — Onboarding */}
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
    </>
  );
}
