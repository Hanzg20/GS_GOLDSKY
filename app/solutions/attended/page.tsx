import type { Metadata } from 'next';
import {
  CallBell,
  CashRegister,
  ChatCircleText,
  DeviceMobile,
  ForkKnife,
  Monitor,
  QrCode,
  Receipt,
  Translate,
  WifiSlash,
} from '@phosphor-icons/react/dist/ssr';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LineArt } from '@/components/LineArt';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'At the counter and the table · Ourea and Iris',
  description:
    'Ourea, the countertop POS for quick service, dine in and shops, and Iris, the same checkout in your staff’s hand. QR ordering at the table, a customer display, cash drawer and shifts, and Apex.',
};

// Ourea and Iris, from docs/CAPABILITIES.md §2. Only ✅ lines. Pay at the table
// from the guest's phone is 🟡 (sandbox) and delivery platforms 🔵: both only
// under "Coming soon". Offline card sales: say the store opts in and carries
// the risk.

const COUNTER = [
  { icon: CallBell, title: 'Quick service', text: 'Dine in or take out, order notes, daily call numbers and kitchen tickets.' },
  { icon: ForkKnife, title: 'Dine in', text: 'Floor plan, checks, rounds and split payments, with a network kitchen printer.' },
  { icon: CashRegister, title: 'Cash drawer and shifts', text: 'Float, cash in and out (out needs a manager), a count at close, over or short worked out for you.' },
  { icon: Monitor, title: 'A customer display', text: 'Ourea Eye faces the guest: the card terminal and the screen in one, where guests choose their own tip.' },
  { icon: Receipt, title: 'Refunds with a manager’s say', text: 'Partial refunds pick the returned items and need a manager PIN.' },
  { icon: WifiSlash, title: 'Offline card sales, if you want them', text: 'Off by default. Switch them on per terminal, with limits per sale and per count. The store carries that risk.' },
];

const TABLE = [
  { icon: QrCode, title: 'One cart per table', text: 'Guests scan the table’s code and order together, straight to the kitchen, and can call a server.' },
  { icon: Translate, title: 'In their own language', text: 'Dish photos and translated names, an allergy filter, and the beaver to order in one sentence: English, French, Chinese or Arabic.' },
  { icon: DeviceMobile, title: 'Iris at the table', text: 'The full checkout in a server’s hand: cart, tip, card or cash with the change worked out, and the receipt.' },
];

const APEX = [
  'Ask in plain words about sales, staff, stock and members. Every number has a source.',
  'Say it, then confirm it: record an expense, count stock, set a reminder. Nothing is saved until a manager taps confirm.',
  'It speaks up first: stock that won’t last three days, a shift over twelve hours, a delivery left unpaid.',
];

function Grid({ items, cols = 'lg:grid-cols-3' }: { items: typeof COUNTER; cols?: string }) {
  return (
    <ul className={`mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 ${cols}`}>
      {items.map((p, i) => (
        <li key={p.title}>
          <ScrollReveal delay={(i % 3) * 80} className="border-t border-line-strong pt-6">
            <p.icon size={24} className="text-brand" />
            <h3 className="title-2 mt-4">{p.title}</h3>
            <p className="body-6 mt-2 text-ink-soft">{p.text}</p>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

export default function AttendedPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="attended-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="caption-4 uppercase tracking-widest text-brand">Ourea · Iris</p>
            <h1 id="attended-title" className="heading-1 mt-6">
              At the counter and at the table
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              Ourea holds the counter for quick service, dine in and shops. Iris takes the same checkout to the
              table. Both run on payment terminals from three makers.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <LineArt line="ourea" night="counter" />
          </ScrollReveal>
        </div>
      </section>

      {/* The counter */}
      <section aria-labelledby="counter-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="counter-title" className="heading-3">
              The counter that holds steady
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Product grid, cart, and payment by card, cash, QR or member card, with what a busy service needs
              around it.
            </p>
          </ScrollReveal>
          <Grid items={COUNTER} />
        </div>
      </section>

      {/* The table */}
      <section aria-labelledby="table-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <ScrollReveal>
            <LineArt line="iris" night="dinein" />
          </ScrollReveal>
          <div>
            <ScrollReveal className="max-w-prose">
              <h2 id="table-title" className="heading-3">
                At the table
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                Guests order from their phone; your staff take the payment where the guests are.
              </p>
            </ScrollReveal>
            <Grid items={TABLE} cols="lg:grid-cols-1" />
          </div>
        </div>
      </section>

      {/* Apex */}
      <section aria-labelledby="apex-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <ScrollReveal>
            <ChatCircleText size={28} className="text-brand" />
            <h2 id="apex-title" className="heading-3 mt-4">
              Apex, in the same screen
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              The manager’s assistant lives in Ourea and Iris. It suggests; you decide.
            </p>
            <a href="/apex" className="body-5 mt-6 inline-block text-brand-dark underline-offset-4 hover:underline">
              More on Apex
            </a>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ul className="space-y-4">
              {APEX.map((a) => (
                <li key={a} className="body-4 rounded-2xl border border-line bg-panel p-6 text-ink-soft">
                  {a}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming soon */}
      <section aria-labelledby="soon-title" className="px-4 py-16 md:py-20">
        <ScrollReveal className="mx-auto max-w-content">
          <p className="caption-4 uppercase tracking-widest text-ink-mute">Coming soon</p>
          <h2 id="soon-title" className="heading-4 mt-2">
            Pay at the table from the guest’s phone, and Uber Eats and DoorDash orders
          </h2>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 pb-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                See it at your counter
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                Tell us about your service: how many counters and tables, and how guests pay today.
              </p>
            </div>
            <QuickContact messageHint="How many counters and tables, and how guests pay today" />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
