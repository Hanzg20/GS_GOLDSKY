import type { Metadata } from 'next';
import {
  ArrowCounterClockwise,
  ArrowRight,
  ClockCountdown,
  Coins,
  CreditCard,
  LockKey,
  Plug,
  QrCode,
  ShieldCheck,
  Television,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PhotoSlot } from '@/components/PhotoSlot';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Eagleson Coin Wash · GoldSky case study',
  description:
    'A self serve car wash in Kanata, Ontario, where customers pay at the bay and the vacuum by card, phone or member code, with nobody behind the counter. Run on Aegis Wash, Aegis Timer and Cael.',
};

// Facts on this page come from the GS-SSP release notes for Aegis Wash and
// Aegis Timer (C:\workspace\gs-ssp\docs\releases, 2026-10-21 to 2026-11-08),
// docs/CAPABILITIES.md, and what the owner's own footage shows on the
// terminals (prices, VIP top-ups, the card sign on the wall). Bay count and
// go-live month are unconfirmed and stay out. The acquirer is not named,
// matching the home page FAQ.

const FACTS = [
  { label: 'Site', value: 'Self serve car wash and vacuum station, Kanata, Ontario' },
  { label: 'At the bays', value: 'Aegis Wash card terminal' },
  { label: 'At the vacuum', value: 'Aegis Timer card terminal' },
  { label: 'Behind it', value: 'Cael, the GoldSky cloud' },
  { label: 'Customers pay with', value: 'Visa, Mastercard, Interac, Google Pay, member codes, coupons and coins' },
  { label: 'Staff on site', value: 'None needed to take a payment' },
];

const PAY_WAYS = [
  { icon: CreditCard, title: 'Card or phone', text: 'Tap or insert at the terminal. Visa, Mastercard, Interac and Google Pay, as the sign on the bay wall says.' },
  { icon: QrCode, title: 'Member code', text: 'Customers top up once and scan their code at the terminal camera for every wash after.' },
  { icon: Ticket, title: 'Coupons', text: 'Scanned the same way. A free coupon covers the basic wash.' },
  { icon: Coins, title: 'Coins, still', text: 'The coin boxes stayed. Regulars who pay in coins carry on as before.' },
];

const VIP = [
  { pay: 10, get: 12 },
  { pay: 20, get: 25 },
  { pay: 50, get: 70 },
  { pay: 100, get: 160 },
];

const FIELD_LESSONS = [
  {
    icon: ClockCountdown,
    title: 'The card reader turns on by itself',
    text: 'Customers tapped their card the moment they picked a wash, before the reader was on. Now the pay page says what to do, counts down four seconds out loud, and starts the card reader unless they choose a code.',
  },
  {
    icon: ArrowCounterClockwise,
    title: 'A page left alone goes back to the start',
    text: 'If a customer walks away mid purchase, the terminal returns to its start screen after 30 seconds, ready for the next car.',
  },
  {
    icon: Ticket,
    title: 'A coupon is only spent on a real wash',
    text: 'The coupon is checked before the card is asked for, and handed back if the card is declined or the water does not start.',
  },
  {
    icon: Plug,
    title: 'Back on its own after a power cut',
    text: 'The terminals lose power when the site does. They restart straight into the wash screen, and Cael shows the owner if anything is still covering it.',
  },
  {
    icon: LockKey,
    title: 'Settings stay locked in an open bay',
    text: 'Water and hands on an outdoor screen are a fact of life. The technician screen now takes a four corner tap and a 6 to 8 digit PIN set in Cael.',
  },
  {
    icon: Television,
    title: 'Idle screens sell the next wash',
    text: 'Between customers the terminals play the store’s own ads and VIP offers, chosen and scheduled in Cael.',
  },
];

function Clip({
  id,
  label,
  title,
  steps,
}: {
  id: 'eagleson-terminal' | 'eagleson-vacuum';
  label: string;
  title: string;
  steps: string[];
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start lg:flex-col">
      <PhotoSlot id={id} compact className="w-full sm:max-w-[280px] lg:max-w-none" />
      <div>
        <p className="caption-4 uppercase tracking-widest text-brand">{label}</p>
        <h3 className="heading-5 mt-2">{title}</h3>
        <ol className="mt-4 space-y-2">
          {steps.map((s, i) => (
            <li key={s} className="body-5 flex gap-3 text-ink-soft">
              <span className="caption-3 mt-0.5 w-5 shrink-0 text-brand">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="case-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <ScrollReveal>
            <p className="caption-4 uppercase tracking-widest text-brand">Case study · Kanata, Ontario</p>
            <h1 id="case-title" className="heading-1 mt-6">
              Eagleson Coin Wash
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              A self serve car wash with a vacuum station beside it. Customers pay at the bay and at the vacuum
              with a card, a phone or a member code, any hour the site is open, with nobody behind a counter.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#talk">Talk to our team</Button>
              <Button href="#footage" variant="secondary">
                See it at the bay
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <PhotoSlot id="eagleson-site" />
          </ScrollReveal>
        </div>
      </section>

      {/* Facts */}
      <section aria-label="The site at a glance" className="border-y border-line bg-paper-deep px-4 py-12 md:py-16">
        <ScrollReveal className="mx-auto max-w-content">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label} className="border-t border-line-strong pt-4">
                <dt className="caption-4 uppercase tracking-widest text-ink-mute">{f.label}</dt>
                <dd className="body-4 mt-2 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </section>

      {/* Footage */}
      <section id="footage" aria-labelledby="footage-title" className="scroll-mt-24 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="footage-title" className="heading-3">
              What a customer does
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Filmed on a phone at Eagleson. No staff to find, no app to download.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <Clip
                id="eagleson-terminal"
                label="Aegis Wash · in the bay"
                title="Pick a wash, pay, wash"
                steps={[
                  'Tap the screen to start.',
                  'Pick a wash: $4 to $8, each with its minutes.',
                  'Pay by card, or scan a member code or coupon.',
                  'The water runs for the time paid.',
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <Clip
                id="eagleson-vacuum"
                label="Aegis Timer · at the vacuum"
                title="Pick a hose, pay, vacuum"
                steps={[
                  'Pick Vacuum 1 or Vacuum 2; each shows if it is free.',
                  'Pick the time: $2 for 4 minutes, $3 for 6.',
                  'Pay the same way as in the bay.',
                  'That hose turns on for the time paid.',
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ways to pay + VIP */}
      <section aria-labelledby="pay-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="pay-title" className="heading-3">
              Every way a customer might pay
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PAY_WAYS.map((p, i) => (
              <li key={p.title}>
                <ScrollReveal delay={(i % 4) * 80} className="border-t border-line-strong pt-6">
                  <p.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{p.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{p.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          <ScrollReveal className="mt-16 rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10 md:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="caption-4 uppercase tracking-widest text-brand">VIP top ups</p>
                <h3 className="heading-4 mt-3 text-cream">Paid up front, washed later</h3>
                <p className="body-5 mt-4 text-[#B9AF9E]">
                  Regulars load money onto a member code at the terminal and get extra credit on top. The owner
                  sets the offers in Cael; these are the ones on the Eagleson screens.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="VIP top up offers at Eagleson">
                {VIP.map((v) => (
                  <li key={v.pay} className="rounded-xl border border-white/15 p-4">
                    <p className="caption-4 uppercase tracking-widest text-[#B9AF9E]">Pay ${v.pay}</p>
                    <p className="heading-5 mt-1 text-cream">Get ${v.get}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Shaped by the site */}
      <section aria-labelledby="lessons-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="lessons-title" className="heading-3">
              What the site taught us
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              An open bay in an Ottawa autumn is a hard place for a screen. Since the terminals went in, the
              owner has told us what customers actually do, and each release of Aegis Wash and Aegis Timer has
              answered some of it.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {FIELD_LESSONS.map((l, i) => (
              <li key={l.title}>
                <ScrollReveal delay={(i % 3) * 80} className="border-t border-line pt-6">
                  <l.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{l.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{l.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The promise */}
      <section aria-labelledby="promise-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-20">
        <ScrollReveal className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <ShieldCheck size={48} className="shrink-0 text-brand" />
          <div className="max-w-prose">
            <h2 id="promise-title" className="heading-4">
              No wash, no charge
            </h2>
            <p className="body-4 mt-3 text-ink-soft">
              The terminal only keeps a payment once the bay or the vacuum confirms it has started. If it
              doesn’t, the charge is reversed. Prices, terminals and every sale are in Cael, wherever the owner
              is.
            </p>
            <a
              href="/products#aegis-title"
              className="body-5 group mt-6 inline-flex items-center gap-1 text-brand-dark"
            >
              More about Aegis
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 py-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                Run a wash or a vacuum?
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                Tell us about your site: how many bays, what you take today, what you would like customers to
                pay with. We will tell you what it takes to run it like Eagleson.
              </p>
            </div>
            <QuickContact />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
