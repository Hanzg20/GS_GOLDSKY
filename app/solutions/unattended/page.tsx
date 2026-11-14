import type { Metadata } from 'next';
import {
  ArrowRight,
  ArrowsClockwise,
  HandCoins,
  Lock,
  SpeakerHigh,
  Television,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PhotoSlot } from '@/components/PhotoSlot';
import { AegisAppIcon, type AegisApp } from '@/components/art/LineEmblem';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Self serve · Aegis',
  description:
    'Aegis puts a card terminal on machines that work alone: car wash bays and vacuums today, vending and partner machines in pilot. No product, no charge.',
};

// Aegis, from docs/CAPABILITIES.md (the Aegis table and "shared by every
// Aegis app"). Status words match the Products page. The self-serve app can
// reverse a charge but not refund one, so never write "refunds any time".

const APPS: { app: AegisApp; name: string; text: string; status: 'live' | 'pilot' | 'next' }[] = [
  { app: 'wash', name: 'Aegis Wash', text: 'Pick a package, pay by card or code, the water runs for the time bought. Member codes, coupons, promotions.', status: 'live' },
  { app: 'timer', name: 'Aegis Timer', text: 'Pay by time. First up, the vacuum beside the wash.', status: 'live' },
  { app: 'vend', name: 'Aegis Vend', text: 'Card payment on a vending machine over MDB. Item first or card first, English and French.', status: 'pilot' },
  { app: 'flex', name: 'Aegis Flex', text: 'Our terminal takes the payment; your own machine hands the product over.', status: 'pilot' },
  { app: 'laundry', name: 'Aegis Laundry', text: 'Self serve laundry, one terminal for a row of machines.', status: 'next' },
  { app: 'ev', name: 'Aegis EV', text: 'EV charging.', status: 'next' },
];

const STATUS = {
  live: { label: 'Live', cls: 'bg-brand/10 text-brand-dark' },
  pilot: { label: 'In pilot', cls: 'bg-paper-deep text-ink-soft' },
  next: { label: 'Coming soon', cls: 'text-ink-mute' },
} as const;

const SHARED = [
  { icon: HandCoins, title: 'No product, no charge', text: 'If the machine does not confirm, the payment is reversed or given back.' },
  { icon: ArrowsClockwise, title: 'Back after a power cut', text: 'The terminal restarts and opens straight into the app.' },
  { icon: SpeakerHigh, title: 'It talks the customer through', text: 'Voice prompts, the key ones spoken three times, at a volume you set.' },
  { icon: Television, title: 'Ads when idle', text: 'Images and video from Cael play between customers.' },
  { icon: Lock, title: 'Locked or reversed from afar', text: 'Lock a terminal or reverse a charge from Cael without going to the site.' },
];

export default function UnattendedPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="unattended-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="caption-4 uppercase tracking-widest text-brand">Aegis · self serve</p>
            <h1 id="unattended-title" className="heading-1 mt-6">
              On guard when no one is there
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              A card terminal on the machines that work alone. Customers pay by card, phone or member code; the
              machine runs only for what was paid.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#talk">Talk to our team</Button>
              <Button href="/case-studies" variant="secondary">
                See it at a real wash
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <PhotoSlot id="eagleson-site" />
          </ScrollReveal>
        </div>
      </section>

      {/* The series */}
      <section aria-labelledby="apps-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="apps-title" className="heading-3">
              One app for each kind of machine
            </h2>
            <p className="body-3 mt-4 text-ink-soft">Where each one stands today.</p>
          </ScrollReveal>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {APPS.map((a) => (
              <li key={a.app}>
                <ScrollReveal className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 py-6 md:grid-cols-[auto_200px_1fr_auto]">
                  <AegisAppIcon app={a.app} />
                  <p className="title-2">{a.name}</p>
                  <p className="body-6 col-span-2 text-ink-soft md:col-span-1">{a.text}</p>
                  <span className={`caption-5 col-span-2 w-fit rounded-full px-2.5 py-1 md:col-span-1 ${STATUS[a.status].cls}`}>
                    {STATUS[a.status].label}
                  </span>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shared */}
      <section aria-labelledby="shared-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="shared-title" className="heading-3">
              What every Aegis app does
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {SHARED.map((s, i) => (
              <li key={s.title}>
                <ScrollReveal delay={(i % 5) * 60} className="border-t border-line-strong pt-6">
                  <s.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{s.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{s.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Connecting */}
      <section aria-labelledby="connect-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-20">
        <ScrollReveal className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-prose">
            <h2 id="connect-title" className="heading-4">
              Connecting it to your machine
            </h2>
            <p className="body-4 mt-3 text-ink-soft">
              A start pulse to the timer you already have, the vending machine’s own card reader port, or two HTTP
              endpoints on your controller. The lightest one that does the job.
            </p>
          </div>
          <a href="/developers#tiers-title" className="body-4 group inline-flex shrink-0 items-center gap-1 text-brand-dark">
            The four ways to connect
            <ArrowRight size={16} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
          </a>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 py-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                Tell us about your machines
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                What they are, how many, and how customers pay today. We will say plainly what works now.
              </p>
            </div>
            <QuickContact defaultSite="Self serve car wash" messageHint="What machines, how many, and how customers pay today" />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
