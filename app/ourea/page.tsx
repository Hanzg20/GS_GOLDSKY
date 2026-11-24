import type { Metadata } from 'next';
import {
  ArrowRight,
  CashRegister,
  CreditCard,
  DeviceTablet,
  ForkKnife,
  Plus,
  Printer,
  Scales,
  Storefront,
} from '@phosphor-icons/react/dist/ssr';
import { ScrollReveal } from '@/components/ScrollReveal';
import { QuickContact } from '@/components/QuickContact';
import { TaglineReveal } from '@/components/TaglineReveal';
import { Browser, OureaTour, Screen } from '@/components/OureaTour';
import { CounterPOS, WizarQ2, WizarQ3Pro, WizarQ3mini } from '@/components/Devices';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Ourea · The store system for restaurants and shops',
  description:
    'Ourea runs the counter, the table and online orders in one system: a countertop POS, a customer display, Iris in your staff’s hand, QR ordering, online ordering and Cael in the cloud.',
};

// Ourea is the umbrella brand for the store system (owner, 2026-11-23): the
// counter POS, Ourea Eye, Iris (the handheld POS), Ourea Scan, online ordering
// and Cael (the SaaS cloud platform). Facts from docs/CAPABILITIES.md §2–3 and
// gs-ssp docs/marketing/ourea_xiaohongshu.md; status words match the rest of
// the site. Screens are real: the Ourea app, Iris and the demo store
// "GoldSky 演示小馆" on scan-order.si-sky.com (demo data, phone numbers
// blurred). Fresh grocery: no weighing scale in GS-SSP yet, so never "live".
// No prices: they are not set yet, and never "no monthly fees".

type Status = 'live' | 'new' | 'pilot' | 'soon';
const STATUS: Record<Status, { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'bg-brand/10 text-brand-dark dark:text-brand' },
  new: { label: 'New', cls: 'bg-brand/10 text-brand-dark dark:text-brand' },
  pilot: { label: 'In pilot', cls: 'bg-paper-deep text-ink-soft' },
  soon: { label: 'Coming soon', cls: 'border border-line text-ink-mute' },
};

function Pill({ s, className }: { s: Status; className?: string }) {
  return (
    <span className={cn('caption-5 inline-flex w-fit shrink-0 rounded-full px-2.5 py-1', STATUS[s].cls, className)}>
      {STATUS[s].label}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="caption-3 uppercase tracking-widest text-brand-dark dark:text-brand">{children}</p>;
}

/** Partner marks drawn as masks in the text colour, like the home ribbon. */
function Mark({ src, ratio, label }: { src: string; ratio: number; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="block h-5 bg-ink-mute"
      style={{
        aspectRatio: String(ratio),
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

const shot = (name: string, alt: string, h = 795) => ({ src: `/images/ourea/${name}.webp`, alt, w: 1600, h });
const phone = (name: string, alt: string) => ({ src: `/images/ourea/${name}.webp`, alt, w: 585, h: 1266 });

// The six pieces, each with a crop of its real screen.
const FAMILY: {
  name: string;
  role: string;
  text: string;
  status: Status;
  thumb: { kind: 'tablet' | 'phone' | 'browser'; s: ReturnType<typeof shot> };
}[] = [
  {
    name: 'Ourea POS',
    role: 'At the counter',
    text: 'The countertop checkout on a SUNMI desktop POS, an Android tablet or a terminal: card, cash, QR and member card.',
    status: 'live',
    thumb: { kind: 'tablet', s: shot('counter', 'Ourea POS: the cart and a grid of dishes by category') },
  },
  {
    name: 'Ourea Eye',
    role: 'Facing the guest',
    text: 'A WizarPOS Q3mini that is both the card terminal and the customer screen, where guests pick their tip.',
    status: 'live',
    thumb: { kind: 'tablet', s: shot('tip', 'The tip screen facing the guest') },
  },
  {
    name: 'Iris',
    role: 'The handheld POS',
    text: 'The same checkout in your staff’s hand, at the table or in the line.',
    status: 'live',
    thumb: { kind: 'phone', s: { src: '/images/ourea/iris-tables.webp', alt: 'Iris on a handheld: the tables view', w: 720, h: 1082 } },
  },
  {
    name: 'Ourea Scan',
    role: 'QR ordering at the table',
    text: 'Guests order together on their own phones, in their own language, straight to the kitchen.',
    status: 'live',
    thumb: { kind: 'phone', s: phone('scan-menu', 'Ourea Scan: the menu on a guest’s phone') },
  },
  {
    name: 'Online ordering',
    role: 'Your own ordering page',
    text: 'Pickup and your own delivery, on the same order board as the counter.',
    status: 'new',
    thumb: { kind: 'tablet', s: shot('online-orders', 'The online orders board') },
  },
  {
    name: 'Cael',
    role: 'The cloud platform',
    text: 'Menus, prices, dish photos, devices and reports for every store, from any browser.',
    status: 'live',
    thumb: {
      kind: 'browser',
      s: { src: '/images/ourea/cael-menu.webp', alt: 'Cael: the restaurant’s dishes with categories, prices, tax and an on sale switch', w: 1158, h: 493 },
    },
  },
];

const STORES: { id: string; icon: typeof ForkKnife; title: string; status: Status; text: string; points: string[] }[] = [
  {
    id: 'restaurants',
    icon: ForkKnife,
    title: 'Restaurants',
    status: 'live',
    text: 'Quick service and dine in, from the first order to the day’s close.',
    points: [
      'Dine in or take out, order notes, call numbers, kitchen tickets',
      'Floor plan, checks, rounds to the kitchen, split payments',
      'QR ordering at the table and your own online ordering page',
    ],
  },
  {
    id: 'retail',
    icon: Storefront,
    title: 'Shops',
    status: 'live',
    text: 'Retail mode: scan and sell, with no kitchen in the way.',
    points: [
      'Barcode scanning at the counter',
      'Products, prices and barcodes in Cael, with bulk import',
      'A tax rate per product, discounts and member points',
    ],
  },
  {
    id: 'grocery',
    icon: Scales,
    title: 'Fresh grocery',
    status: 'soon',
    text: 'Barcode checkout works today. Selling by weight is not built yet.',
    points: [
      'Packaged goods: the same scan and sell as Shops',
      'Weighing scale and price per kilogram: in development',
      'Running a grocery? Tell us about your counters',
    ],
  },
];

const STEPS = [
  { title: 'Tell us about your store', text: 'What you sell, how many counters and tables, and how customers pay today.' },
  { title: 'We set it up', text: 'Your menu, prices and dish photos loaded in Cael; tablets, terminals and printers ready.' },
  { title: 'Open with us beside you', text: 'We install and train your staff, then stay close through the first weeks.' },
];

// The devices, drawn from the makers' datasheets; screens are real.
const IRIS_SHOT = { src: '/images/ourea/iris-tables.webp', alt: 'Iris: the tables view with the opening checklist and a reminder', w: 720, h: 1082 };
const DEVICES: { id: string; maker: string; model: string; role: string; specs: string }[] = [
  { id: 'd3', maker: 'SUNMI', model: 'D3 Pro', role: 'Ourea POS at the counter', specs: 'Desktop POS with a large touchscreen and the receipt printer in its base' },
  { id: 'q2', maker: 'WizarPOS', model: 'Q2', role: 'Iris in hand', specs: '5.5 inch screen, 58 mm printer built in, chip, tap and swipe, 415 g' },
  { id: 'q3pro', maker: 'WizarPOS', model: 'Q3 Pro', role: 'Iris in hand', specs: '6.5 inch screen, slim and light at 357 g, chip and tap, optional barcode scanner' },
  { id: 'q3mini', maker: 'WizarPOS', model: 'Q3mini', role: 'Ourea Eye, facing the guest', specs: '4 inch square screen, palm sized at 131 g, chip and tap under the screen' },
];

const HARDWARE = [
  { icon: DeviceTablet, title: 'The counter', text: 'A SUNMI desktop POS such as the D3 Pro, an Android tablet or a countertop terminal runs Ourea POS.' },
  { icon: CreditCard, title: 'Other terminals', text: 'PAX IM30 and ID TECH NEO2 and NEO3 run Iris and take payments too.' },
  { icon: Printer, title: 'Printers', text: 'Network receipt and kitchen printers (ESC/POS), or the terminal’s own.' },
  { icon: CashRegister, title: 'Cash drawer', text: 'Floats, cash in and out, and a counted drawer at every shift.' },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What kinds of stores is Ourea for?',
    a: 'Quick service and dine in restaurants, and shops that scan and sell. One setting on the counter switches between them. Selling fresh food by weight is still in development.',
  },
  {
    q: 'Which devices do I need?',
    a: 'A desktop POS such as the SUNMI D3 Pro, or an Android tablet, at the counter, a payment terminal, and a receipt printer. Add Iris handhelds, a kitchen printer or Ourea Eye as you need them. We help you pick.',
  },
  {
    q: 'Can I use the terminal I already have?',
    a: 'Ourea runs on SUNMI desktop POS such as the D3 Pro, the WizarPOS Q2, Q3 Pro and Q3mini, and terminals from PAX and ID TECH, from Android 7.1 up. Tell us the model and we will confirm it before you buy anything.',
  },
  {
    q: 'Who processes the card payments?',
    a: 'Nuvei processes card and QR payments, and the money settles straight into your own merchant account.',
  },
  {
    q: 'What happens if the internet drops?',
    a: 'Menus, prices and settings stay on the terminal, and sales are sent once the connection is back. Card payments need a connection unless you switch on offline card sales for that terminal, which is off by default and carries the risk for the store.',
  },
  {
    q: 'Which languages does it speak?',
    a: 'Guests can order in English, French, Chinese or Arabic on Ourea Scan. Our team supports you in English and Mandarin.',
  },
  {
    q: 'Do Uber Eats and DoorDash orders come in?',
    a: 'Not yet. Your own online ordering page for pickup and delivery works today; the delivery platforms are coming soon.',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on your store and the devices you need. Book a demo and we will send a written quote.',
  },
];

// ---------------------------------------------------------------------------

export default function OureaPage() {
  return (
    <>
      {/* Hero: copy on the left, the real counter and the guest's phone on a warm stage */}
      <section aria-labelledby="ourea-title" className="overflow-hidden px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-12">
          <ScrollReveal>
            <Eyebrow>Ourea · the store system</Eyebrow>
            <h1 id="ourea-title" className="heading-1 mt-5 max-w-[680px] text-balance">
              The counter, the table and online,{' '}
              <span className="whitespace-nowrap">in one system</span>
            </h1>
            <p className="body-2 mt-6 max-w-[680px] text-pretty text-ink-soft">
              For restaurants and shops: checkout at the counter, a screen for the guest, Iris in your staff’s
              hand, QR ordering at the table and your own online ordering page. One menu and one set of numbers,
              in Cael.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#talk">
                Book a demo <ArrowRight size={18} weight="bold" />
              </Button>
              <a href="#screens" className="body-5 group inline-flex items-center gap-1 text-brand-dark">
                See the real screens
                <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6">
              <span className="flex items-center gap-5">
                <span className="caption-4 uppercase tracking-widest text-ink-mute">Runs on</span>
                <span className="font-sans text-lg font-bold tracking-[0.18em] text-ink-mute">SUNMI</span>
                <Mark src="/images/partners/wizarpos.png" ratio={645 / 96} label="WizarPOS" />
                <Mark src="/images/partners/pax.svg" ratio={130.648 / 56.873} label="PAX" />
                <Mark src="/images/partners/idtech.png" ratio={533 / 96} label="ID TECH" />
              </span>
              <span className="flex items-center gap-5">
                <span className="caption-4 uppercase tracking-widest text-ink-mute">Payments</span>
                <Mark src="/images/partners/nuvei.svg" ratio={77 / 25} label="Nuvei" />
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative rounded-3xl bg-brand-light px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-14">
              <CounterPOS
                eager
                s={shot(
                  'counter',
                  'Ourea POS at the counter: the cart on the left, dishes by category on the right, card, cash, QR and member payment buttons',
                )}
                className="w-[86%]"
              />
              <Screen
                eager
                phone
                s={phone('scan-menu', 'Ourea Scan on a guest’s phone: the demo restaurant’s menu with dish photos and Talk to Beaver')}
                className="absolute bottom-8 right-6 w-[26%] md:bottom-10 md:right-8"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The family, each with its real screen */}
      <section aria-labelledby="family-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-[680px]">
            <Eyebrow>Offline and online</Eyebrow>
            <h2 id="family-title" className="heading-3 mt-3 text-balance">
              One system, every place you sell
            </h2>
            <p className="body-3 mt-4 text-pretty text-ink-soft">
              Each piece works on its own. Together they share one menu, one set of orders and one set of numbers.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FAMILY.map((f, i) => (
              <li key={f.name}>
                <ScrollReveal delay={(i % 3) * 80} className="flex h-full flex-col rounded-2xl border border-line bg-panel p-2">
                  <div className="relative flex aspect-[16/10] items-start justify-center overflow-hidden rounded-xl bg-brand-light">
                    {f.thumb.kind === 'tablet' && (
                      <Screen s={f.thumb.s} className="absolute left-6 top-6 w-[130%] max-w-none" />
                    )}
                    {f.thumb.kind === 'phone' && <Screen s={f.thumb.s} phone className="mt-6 w-[42%]" />}
                    {f.thumb.kind === 'browser' && (
                      <Browser s={f.thumb.s} className="absolute left-6 top-6 w-[130%] max-w-none" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="heading-6">{f.name}</h3>
                        <p className="caption-4 mt-1 uppercase tracking-widest text-ink-mute">{f.role}</p>
                      </div>
                      <Pill s={f.status} />
                    </div>
                    <p className="body-6 mt-3 text-pretty text-ink-soft">{f.text}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The tour of real screens */}
      <section id="screens" aria-labelledby="screens-title" className="scroll-mt-24 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-[680px]">
            <Eyebrow>The real screens</Eyebrow>
            <h2 id="screens-title" className="heading-3 mt-3 text-balance">
              A day at the store, screen by screen
            </h2>
            <p className="body-3 mt-4 text-pretty text-ink-soft">
              Taken from Ourea, Iris and our demo restaurant, not mock ups.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="mt-10">
            <OureaTour />
          </ScrollReveal>
        </div>
      </section>

      {/* Tagline */}
      <section className="border-y border-line bg-paper-deep px-4 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <TaglineReveal
            lines={['One menu, one set of orders,', 'one place to see the day,', 'from the counter to the guest’s phone.']}
          />
        </div>
      </section>

      {/* By kind of store */}
      <section aria-labelledby="stores-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <ScrollReveal>
              <Eyebrow>Restaurants, shops, grocery</Eyebrow>
              <h2 id="stores-title" className="heading-3 mt-3 text-balance">
                Set up for how your store sells
              </h2>
              <p className="body-3 mt-4 text-pretty text-ink-soft">
                One setting on Ourea picks the way you sell. Switch it, and the counter changes with it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="rounded-3xl bg-brand-light p-6 md:p-10">
                <Screen
                  s={shot(
                    'business-type',
                    'Ourea Settings, Business type: Retail store (scan and sell, no kitchen), Quick service restaurant, or Dine in restaurant',
                    445,
                  )}
                />
              </div>
            </ScrollReveal>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STORES.map((s, i) => (
              <li key={s.id}>
                <ScrollReveal
                  delay={i * 80}
                  className={cn(
                    'flex h-full flex-col rounded-2xl border bg-panel p-6 md:p-8',
                    s.status === 'soon' ? 'border-dashed border-line-strong' : 'border-line',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <s.icon size={28} className="text-brand" />
                    <Pill s={s.status} />
                  </div>
                  <h3 className="heading-5 mt-6">{s.title}</h3>
                  <p className="body-5 mt-3 text-pretty text-ink-soft">{s.text}</p>
                  <ul className="body-6 mt-4 space-y-2 text-ink-soft">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The devices */}
      <section aria-labelledby="devices-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-[680px]">
            <Eyebrow>The devices</Eyebrow>
            <h2 id="devices-title" className="heading-3 mt-3 text-balance">
              What it runs on
            </h2>
            <p className="body-3 mt-4 text-pretty text-ink-soft">
              A desktop POS at the counter, handhelds for the floor and a small screen for the guest. We help you
              pick and set them up.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {DEVICES.map((d, i) => (
              <li key={d.id}>
                <ScrollReveal delay={i * 80} className="flex h-full flex-col rounded-2xl border border-line bg-panel p-2">
                  <div className="flex h-56 items-end justify-center overflow-hidden rounded-xl bg-brand-light px-4 pt-6 md:h-72">
                    {d.id === 'd3' && (
                      <CounterPOS
                        s={shot('counter', 'Ourea POS on a SUNMI D3 Pro: the cart and dishes by category')}
                        className="mb-4 w-full"
                      />
                    )}
                    {d.id === 'q2' && <WizarQ2 s={IRIS_SHOT} className="mb-[-8%] w-[46%]" />}
                    {d.id === 'q3pro' && (
                      <WizarQ3Pro
                        s={{ src: '/images/ourea/iris-keypad.webp', alt: 'Iris keypad on a WizarPOS Q3 Pro', w: 720, h: 1072 }}
                        className="mb-[-10%] w-[44%]"
                      />
                    )}
                    {d.id === 'q3mini' && (
                      <WizarQ3mini
                        s={{ src: '/images/ourea/q3mini-splash.webp', alt: 'The Q3mini starting up: the GoldSky mark, powered by GoldSky', w: 480, h: 480 }}
                        className="mb-6 w-[58%]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="caption-4 uppercase tracking-widest text-ink-mute">{d.maker}</p>
                    <h3 className="heading-6 mt-1">{d.model}</h3>
                    <p className="body-5 mt-1 text-brand-dark dark:text-brand">{d.role}</p>
                    <p className="body-6 mt-3 text-pretty text-ink-soft">{d.specs}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it starts, and what sits on the counter */}
      <section aria-labelledby="start-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-[680px]">
            <Eyebrow>Getting started</Eyebrow>
            <h2 id="start-title" className="heading-3 mt-3 text-balance">
              Three steps to your first sale
            </h2>
          </ScrollReveal>
          <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((st, i) => (
              <li key={st.title}>
                <ScrollReveal delay={i * 100} className="h-full rounded-2xl border border-line bg-panel p-6 md:p-8">
                  <span aria-hidden className="font-serif text-5xl leading-none text-brand">
                    {i + 1}
                  </span>
                  <h3 className="title-1 mt-6">{st.title}</h3>
                  <p className="body-6 mt-2 text-pretty text-ink-soft">{st.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-line-strong pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {HARDWARE.map((h, i) => (
              <li key={h.title}>
                <ScrollReveal delay={i * 60}>
                  <h.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{h.title}</h3>
                  <p className="body-6 mt-2 text-pretty text-ink-soft">{h.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <ScrollReveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="heading-3 mt-3 text-balance">
              What store owners ask us first
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="divide-y divide-line border-y border-line">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-2">
                  <summary className="title-2 flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-3 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus size={18} className="shrink-0 text-ink-mute transition-transform duration-300 ease-gs group-open:rotate-45" />
                  </summary>
                  <p className="body-3 pb-4 pr-8 text-pretty text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 pb-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-balance text-cream">
                See Ourea with your own menu
              </h2>
              <p className="body-3 mt-4 text-pretty text-[#B9AF9E]">
                We bring a tablet and a terminal to your store, outside your busy hours, in Ottawa and around.
              </p>
            </div>
            <QuickContact
              defaultSite="Dine in restaurant"
              messageHint="Your kind of store, how many counters or tables, and how customers pay today"
              submitLabel="Book a demo"
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
