import type { Metadata } from 'next';
import {
  ArrowRight,
  Buildings,
  CallBell,
  Car,
  ForkKnife,
  Storefront,
  Package,
} from '@phosphor-icons/react/dist/ssr';
import { ScrollReveal } from '@/components/ScrollReveal';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Solutions · By kind of business',
  description:
    'GoldSky for quick service counters, dine in restaurants, self serve car washes, vending and partner machines, and owners with several sites.',
};

// By kind of business, matching the site types in the contact form. Every
// line is a ✅ item in docs/CAPABILITIES.md, or carries its status pill
// (🟡 = "In pilot"). Planned work is only under "Coming soon", never dated.

type Status = 'live' | 'pilot';

const BUSINESSES: {
  icon: typeof Storefront;
  title: string;
  lines: string;
  text: string;
  points: string[];
  status: Status;
  href: string;
  cta: string;
}[] = [
  {
    icon: CallBell,
    title: 'Quick service counter',
    lines: 'Ourea · Apex',
    text: 'Orders in fast, out to the kitchen, paid at the counter.',
    points: ['Dine in or take out, order notes, daily call numbers', 'Kitchen tickets', 'Customer display where guests pick their own tip', 'Cash drawer and shifts, counted at close'],
    status: 'live',
    href: '/solutions/attended',
    cta: 'Counter and handheld',
  },
  {
    icon: ForkKnife,
    title: 'Dine in restaurant',
    lines: 'Ourea · Iris · Apex',
    text: 'The floor plan at the counter, the payment at the table.',
    points: ['Floor plan, checks, rounds, split payments', 'Handheld checkout at the table, card or cash', 'QR ordering from the table, straight to the kitchen', 'Guests order in their own language'],
    status: 'live',
    href: '/solutions/attended',
    cta: 'Counter and handheld',
  },
  {
    icon: Car,
    title: 'Self serve car wash',
    lines: 'Aegis Wash · Aegis Timer',
    text: 'Card, phone and member codes at the bay and the vacuum, with nobody on site.',
    points: ['Running at Eagleson Coin Wash in Kanata', 'Works with the timers you have', 'Member top ups, coupons, promotions', 'No wash, no charge'],
    status: 'live',
    href: '/case-studies',
    cta: 'Read the Eagleson case',
  },
  {
    icon: Package,
    title: 'Vending and partner machines',
    lines: 'Aegis Vend · Aegis Flex',
    text: 'Card payment on a vending machine, or our terminal in front of your own.',
    points: ['Vending machines over MDB, English and French', 'Your own machine through two HTTP endpoints', 'The money is kept only when the product is handed over'],
    status: 'pilot',
    href: '/solutions/unattended',
    cta: 'Self serve in detail',
  },
  {
    icon: Buildings,
    title: 'Several sites',
    lines: 'Cael · Apex',
    text: 'Every store, terminal and screen from one place.',
    points: ['Prices, products and ads published to every terminal', 'Device health, remote reboot and lock', 'Ask Apex which store did best this week'],
    status: 'live',
    href: '/products/software',
    cta: 'About Cael',
  },
];

const NEXT = ['Self serve laundry', 'EV charging', 'Uber Eats and DoorDash orders', 'Pay at the table from the guest’s phone'];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="solutions-title" className="px-4 pb-12 pt-32 md:pb-16 md:pt-40">
        <ScrollReveal className="mx-auto max-w-content">
          <p className="caption-4 uppercase tracking-widest text-brand">Solutions</p>
          <h1 id="solutions-title" className="heading-1 mt-6 max-w-[16ch]">
            Find your kind of business
          </h1>
          <p className="body-2 mt-6 max-w-prose text-ink-soft">
            One platform runs the counter, the handheld, the machines that work alone and the cloud behind them.
            Start from what you run.
          </p>
        </ScrollReveal>
      </section>

      {/* Businesses */}
      <section aria-label="Kinds of business" className="px-4 pb-16 md:pb-24">
        <ul className="mx-auto grid max-w-content grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BUSINESSES.map((b, i) => (
            <li key={b.title}>
              <ScrollReveal delay={(i % 3) * 80} className="h-full">
                <a
                  href={b.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 ease-gs hover:border-line-strong md:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <b.icon size={28} className="text-brand" />
                    <span
                      className={`caption-5 rounded-full px-2.5 py-1 ${
                        b.status === 'live' ? 'bg-brand/10 text-brand-dark' : 'bg-paper-deep text-ink-mute'
                      }`}
                    >
                      {b.status === 'live' ? 'Live' : 'In pilot'}
                    </span>
                  </div>
                  <h2 className="heading-5 mt-6">{b.title}</h2>
                  <p className="caption-4 mt-1 uppercase tracking-widest text-ink-mute">{b.lines}</p>
                  <p className="body-5 mt-4 text-ink-soft">{b.text}</p>
                  <ul className="body-6 mt-4 flex-1 space-y-2 text-ink-soft">
                    {b.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="body-6 mt-6 inline-flex items-center gap-1 text-brand-dark">
                    {b.cta}
                    <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
                  </span>
                </a>
              </ScrollReveal>
            </li>
          ))}
          <li>
            <ScrollReveal delay={160} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-line-strong p-6 md:p-8">
                <Storefront size={28} className="text-ink-mute" />
                <h2 className="heading-5 mt-6">Coming soon</h2>
                <p className="body-5 mt-4 text-ink-soft">Next on the platform. Run one of these? Tell us below.</p>
                <ul className="body-6 mt-4 space-y-2 text-ink-soft">
                  {NEXT.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-mute" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 pb-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                Not sure which fits?
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                Tell us what you run and how customers pay today. We will tell you what works now and what does
                not yet.
              </p>
            </div>
            <QuickContact />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
