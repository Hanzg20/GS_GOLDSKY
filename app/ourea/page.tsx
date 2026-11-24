import type { Metadata } from 'next';
import {
  ArrowRight,
  Barcode,
  CashRegister,
  ChatCircleText,
  CloudArrowUp,
  CreditCard,
  DeviceMobile,
  DeviceTablet,
  ForkKnife,
  Globe,
  Monitor,
  Printer,
  QrCode,
  Receipt,
  Scales,
  Storefront,
  Tag,
  Translate,
} from '@phosphor-icons/react/dist/ssr';
import { ScrollReveal } from '@/components/ScrollReveal';
import { QuickContact } from '@/components/QuickContact';
import { Button } from '@/components/ui/Button';
import { LineEmblem } from '@/components/art/LineEmblem';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Ourea · The store system for restaurants and shops',
  description:
    'Ourea runs the counter, the table and online orders in one system: a countertop POS, a customer display, Iris in your staff’s hand, QR ordering, online ordering and Cael in the cloud.',
};

// Ourea is the umbrella brand for the store system (owner, 2026-11-23): the
// counter POS, Ourea Eye, Iris (the handheld POS), Ourea Scan, online ordering
// and Cael (the SaaS cloud platform). Facts from docs/CAPABILITIES.md §2–3 and
// gs-ssp docs/marketing/ourea_xiaohongshu.md. Status words match the rest of
// the site. Screens are real: the Ourea app, Iris and the demo store
// "GoldSky 演示小馆" on scan-order.si-sky.com (demo data only; phone numbers
// blurred). Fresh grocery: no weighing scale in GS-SSP yet, so never "live".

type Status = 'live' | 'new' | 'pilot' | 'soon';
const STATUS: Record<Status, { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'bg-brand/10 text-brand-dark dark:text-brand' },
  new: { label: 'New', cls: 'bg-brand/10 text-brand-dark dark:text-brand' },
  pilot: { label: 'In pilot', cls: 'bg-paper-deep text-ink-soft' },
  soon: { label: 'Coming soon', cls: 'border border-line text-ink-mute' },
};

function Pill({ s, className }: { s: Status; className?: string }) {
  return (
    <span className={cn('caption-5 inline-flex w-fit rounded-full px-2.5 py-1', STATUS[s].cls, className)}>
      {STATUS[s].label}
    </span>
  );
}

const FAMILY: { icon: typeof Monitor; name: string; role: string; text: string; status: Status }[] = [
  {
    icon: DeviceTablet,
    name: 'Ourea POS',
    role: 'At the counter',
    text: 'The countertop checkout on an Android tablet or terminal: product grid, options and add-ons, card, cash, QR and member card.',
    status: 'live',
  },
  {
    icon: Monitor,
    name: 'Ourea Eye',
    role: 'Facing the guest',
    text: 'A WizarPOS Q3mini that is both the card terminal and the customer screen. Guests see the order and choose their own tip.',
    status: 'live',
  },
  {
    icon: DeviceMobile,
    name: 'Iris',
    role: 'The handheld POS',
    text: 'The same checkout in your staff’s hand, at the table or in the line. Runs on PAX, WizarPOS and ID TECH terminals.',
    status: 'live',
  },
  {
    icon: QrCode,
    name: 'Ourea Scan',
    role: 'QR ordering at the table',
    text: 'Guests scan the table’s code and order together on their own phones, in their own language, straight to the kitchen.',
    status: 'live',
  },
  {
    icon: Globe,
    name: 'Online ordering',
    role: 'Your own ordering page',
    text: 'Pickup and your own delivery from a page with your menu. Orders land on the same board at the counter.',
    status: 'new',
  },
  {
    icon: CloudArrowUp,
    name: 'Cael',
    role: 'The cloud platform',
    text: 'Menus, prices, dish photos, devices and reports for every store, from any browser. Changes reach every screen.',
    status: 'live',
  },
];

const STORES: {
  id: string;
  icon: typeof Monitor;
  title: string;
  status: Status;
  text: string;
  points: string[];
}[] = [
  {
    id: 'restaurants',
    icon: ForkKnife,
    title: 'Restaurants',
    status: 'live',
    text: 'Quick service and dine in, from the first order to the day’s close.',
    points: [
      'Dine in or take out, order notes, daily call numbers, kitchen tickets',
      'Floor plan, checks, rounds to the kitchen, split payments',
      'QR ordering at the table and your own online ordering page',
      'Options and add-ons on each dish, guest-chosen tips',
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
      'Products, prices and barcodes managed in Cael, with bulk import',
      'A tax rate per product, discounts and member points',
      'Cash drawer, shifts and a count at close',
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
      'Running a grocery? Tell us about your counters and scales',
    ],
  },
];

const HARDWARE = [
  { icon: DeviceTablet, title: 'The counter', text: 'An Android tablet or countertop terminal runs Ourea POS.' },
  { icon: CreditCard, title: 'Payment terminals', text: 'WizarPOS Q3mini and Q2, PAX IM30, ID TECH NEO2 and NEO3. Card and QR, settled to your own account.' },
  { icon: Printer, title: 'Printers', text: 'Network receipt and kitchen printers (ESC/POS), or the terminal’s own printer.' },
  { icon: CashRegister, title: 'Cash drawer', text: 'Opens from the receipt printer, with floats, cash in and out, and counted shifts.' },
];

// ---------------------------------------------------------------------------

function Tablet({ src, alt, w, h, className }: { src: string; alt: string; w: number; h: number; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[22px] border border-black/10 bg-[#0B0D12] p-2 shadow-[0_40px_80px_-40px_rgba(31,29,26,0.55)] md:p-3',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="block h-auto w-full rounded-[12px]" />
    </div>
  );
}

function Phone({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-[34px] border border-black/10 bg-[#0B0D12] p-[7px] shadow-[0_40px_80px_-40px_rgba(31,29,26,0.55)]',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={585}
        height={1266}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="block h-auto w-full rounded-[28px]"
      />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="caption-3 uppercase tracking-widest text-brand-dark dark:text-brand">{children}</p>;
}

function Points({ items }: { items: { icon: typeof Monitor; text: string }[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((p) => (
        <li key={p.text} className="body-5 flex gap-3 text-ink-soft">
          <p.icon size={20} className="mt-0.5 shrink-0 text-brand" />
          {p.text}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------

export default function OureaPage() {
  return (
    <>
      {/* Hero: the counter and the guest's phone, both real screens */}
      <section aria-labelledby="ourea-title" className="overflow-hidden px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <LineEmblem line="ourea" className="origin-left scale-75" />
              <p className="caption-4 -ml-2 uppercase tracking-widest text-brand-ink">Ourea · the store system</p>
            </div>
            <h1 id="ourea-title" className="heading-1 mt-6">
              The counter, the table and online, in one system
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              Ourea is everything a restaurant or shop runs on: the checkout at the counter, a screen facing the
              guest, Iris in your staff’s hand, QR ordering at the table, your own online ordering page, and Cael
              in the cloud behind them. One menu, one set of prices, one place to see the day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#talk">
                Book a demo <ArrowRight size={18} weight="bold" />
              </Button>
              <Button href="#screens" variant="secondary">
                See the real screens
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="relative mt-14 md:mt-16">
            <Tablet
              src="/images/ourea/counter.webp"
              alt="Ourea POS at the counter: the cart on the left, a grid of dishes by category on the right, card, cash, QR and member payment buttons"
              w={1600}
              h={795}
              className="mr-[18%] md:mr-[22%]"
            />
            <Phone
              src="/images/ourea/scan-menu.webp"
              alt="Ourea Scan on a guest's phone: the demo restaurant's menu with dish photos, Chinese and English names, and Talk to Beaver"
              priority
              className="absolute bottom-[-8%] right-0 w-[30%] max-w-[300px] md:right-[2%] md:w-[24%]"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* The family */}
      <section aria-labelledby="family-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <Eyebrow>Offline and online</Eyebrow>
            <h2 id="family-title" className="heading-3 mt-3">
              One system, every place you sell
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Each piece works alone, and together they share one menu, one set of orders and one set of numbers.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FAMILY.map((f, i) => (
              <li key={f.name}>
                <ScrollReveal delay={(i % 3) * 80} className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6">
                  <div className="flex items-start justify-between gap-3">
                    <f.icon size={28} className="text-brand" />
                    <Pill s={f.status} />
                  </div>
                  <h3 className="heading-5 mt-6">{f.name}</h3>
                  <p className="caption-4 mt-1 uppercase tracking-widest text-ink-mute">{f.role}</p>
                  <p className="body-6 mt-3 text-ink-soft">{f.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Real screens, one surface at a time */}
      <div id="screens" className="scroll-mt-24">
        {/* the counter */}
        <section aria-labelledby="counter-title" className="px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <ScrollReveal>
              <Eyebrow>Ourea POS · at the counter</Eyebrow>
              <h2 id="counter-title" className="heading-3 mt-3">
                Ring it up in a few taps
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                Dishes by category, options and add-ons that price themselves, then card, cash, QR or member card.
              </p>
              <Points
                items={[
                  { icon: Tag, text: 'Spice levels and add-ons on each dish, required or optional' },
                  { icon: Receipt, text: 'Hold an order, discount it, split it, refund part of it with a manager’s PIN' },
                  { icon: ForkKnife, text: 'Dine in or take out, notes and call numbers, tickets to the kitchen printer' },
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={120} className="space-y-6">
              <Tablet
                src="/images/ourea/options.webp"
                alt="Choosing options for Braised Beef Noodle on Ourea POS: a required spice level and up to two add-ons, the price updating"
                w={1600}
                h={795}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* the guest: tip on Ourea Eye */}
        <section aria-labelledby="eye-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <ScrollReveal delay={120} className="order-2 lg:order-1">
              <Tablet
                src="/images/ourea/tip.webp"
                alt="The tip screen turned to the guest: the total, 10, 12 or 15 percent with the amounts, a custom tip or no tip"
                w={1600}
                h={795}
              />
            </ScrollReveal>
            <ScrollReveal className="order-1 lg:order-2">
              <Eyebrow>Ourea Eye · facing the guest</Eyebrow>
              <h2 id="eye-title" className="heading-3 mt-3">
                The guest sees the order and picks the tip
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                With Ourea Eye the card terminal is also the customer screen: the order builds up as it is rung in,
                and the guest chooses the tip there. Without one, the tip screen turns to the guest on the counter.
              </p>
              <Points
                items={[
                  { icon: Monitor, text: 'Tips worked out on the amount before tax, or a custom amount, or none' },
                  { icon: CreditCard, text: 'Tap, chip or PIN on the same device' },
                ]}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* the table: Ourea Scan, three phones */}
        <section aria-labelledby="scan-title" className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-content">
            <ScrollReveal className="max-w-prose">
              <Eyebrow>Ourea Scan · QR ordering at the table</Eyebrow>
              <h2 id="scan-title" className="heading-3 mt-3">
                Guests order from their own phones, in their own language
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                One cart for the whole table, dish photos and translated names, an allergy filter, and the beaver
                to order in one sentence. Orders go straight to the kitchen.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
              {[
                {
                  src: '/images/ourea/scan-menu.webp',
                  alt: 'The menu on a guest’s phone with dish photos, Chinese and English names, spice marks and prices',
                  cap: 'The menu, with photos and two languages',
                },
                {
                  src: '/images/ourea/scan-beaver.webp',
                  alt: 'Talk to Beaver: the guest typed “Two of us, not too spicy, something with chicken” and Beaver suggests Kung Pao Chicken for two, to add to the cart',
                  cap: 'Say it in one sentence; nothing is added until the guest taps',
                },
                {
                  src: '/images/ourea/scan-cart.webp',
                  alt: 'The table’s shared cart with two dishes, a note for the kitchen, subtotal, tax and total, and Place order',
                  cap: 'One cart for the table, a note for the kitchen',
                },
              ].map((p, i) => (
                <ScrollReveal key={p.src} delay={i * 100} className="flex flex-col items-center">
                  <Phone src={p.src} alt={p.alt} className="w-full max-w-[280px]" />
                  <p className="body-6 mt-5 max-w-[280px] text-center text-ink-soft">{p.cap}</p>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="body-6 inline-flex items-center gap-2 text-ink-soft">
                <Translate size={18} className="text-brand" /> English, Français, 中文, العربية
              </span>
              <span className="body-6 inline-flex items-center gap-2 text-ink-soft">
                Pay at the table from the guest’s phone <Pill s="pilot" />
              </span>
            </ScrollReveal>
          </div>
        </section>

        {/* online orders */}
        <section aria-labelledby="online-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
          <div className="mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:items-end lg:gap-16">
              <ScrollReveal>
                <Eyebrow>Online ordering</Eyebrow>
                <h2 id="online-title" className="heading-3 mt-3">
                  Online orders on the same counter
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <p className="body-3 text-ink-soft">
                  Your store gets its own ordering page for pickup or your own delivery. Paid orders arrive on Ourea
                  as New, Preparing and Ready, with the time they are due and a ticket for the kitchen.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={120} className="mt-12">
              <Tablet
                src="/images/ourea/online-orders.webp"
                alt="The Online orders board on Ourea: New, Preparing and Ready columns; an order for table A1 with four items, a tip, a ready-by time, Print ticket, Ready and Can’t make it"
                w={1600}
                h={520}
              />
            </ScrollReveal>
            <ScrollReveal className="mt-8 flex flex-wrap gap-3">
              <span className="body-6 inline-flex items-center gap-2 text-ink-soft">
                Pickup and your own delivery <Pill s="new" />
              </span>
              <span className="body-6 inline-flex items-center gap-2 text-ink-soft">
                Uber Eats and DoorDash orders <Pill s="soon" />
              </span>
            </ScrollReveal>
          </div>
        </section>

        {/* Iris */}
        <section aria-labelledby="iris-title" className="px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <Eyebrow>Iris · the handheld POS</Eyebrow>
              <h2 id="iris-title" className="heading-3 mt-3">
                The checkout walks to the table
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                Iris is Ourea in your staff’s hand: the floor plan, the keypad, the menu and delivery, with card or
                cash taken at the table and the change worked out. The card never leaves the guest.
              </p>
              <Points
                items={[
                  { icon: DeviceMobile, text: 'Runs on terminals from PAX, WizarPOS and ID TECH' },
                  { icon: ChatCircleText, text: 'Reminders and Apex, the store assistant, on the same device' },
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={120} className="flex justify-center">
              <div className="w-full max-w-[340px] rounded-[30px] border border-black/10 bg-[#0B0D12] p-2 shadow-[0_40px_80px_-40px_rgba(31,29,26,0.55)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ourea/iris-tables.webp"
                  alt="Iris on a handheld terminal: the opening checklist, tabs for Tables, Keypad, Library and Delivery, three tables with one seated, and a reminder from Beaver"
                  width={720}
                  height={1082}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-[24px]"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* behind the counter */}
        <section aria-labelledby="close-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
          <div className="mx-auto max-w-content">
            <ScrollReveal className="max-w-prose">
              <Eyebrow>Behind the counter</Eyebrow>
              <h2 id="close-title" className="heading-3 mt-3">
                Products, the day’s takings and the cash drawer
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                Out of stock shows on the counter. The day report and the drawer count are on the terminal, and
                every store’s numbers are in Cael.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  src: '/images/ourea/products.webp',
                  alt: 'Products on Ourea: eight dishes by category, one marked out of stock',
                  cap: 'Products and stock',
                },
                {
                  src: '/images/ourea/day.webp',
                  alt: 'Transactions on Ourea with the Day Settlement Report at the top and paid cash and card sales below',
                  cap: 'Transactions and the day report',
                },
                {
                  src: '/images/ourea/drawer.webp',
                  alt: 'The cash drawer screen: open the drawer with a float, and an earlier shift showing expected, counted and one dollar short',
                  cap: 'Cash drawer and shifts, over or short worked out',
                },
              ].map((p, i) => (
                <ScrollReveal key={p.src} delay={i * 100}>
                  <Tablet src={p.src} alt={p.alt} w={1600} h={795} />
                  <p className="body-6 mt-4 text-ink-soft">{p.cap}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* by kind of store */}
      <section aria-labelledby="stores-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <ScrollReveal>
              <Eyebrow>Restaurants, shops, grocery</Eyebrow>
              <h2 id="stores-title" className="heading-3 mt-3">
                Set up for how your store sells
              </h2>
              <p className="body-3 mt-4 text-ink-soft">
                One setting on Ourea picks the way you sell. Switch it and the counter changes with it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <Tablet
                src="/images/ourea/business-type.webp"
                alt="Ourea Settings, Business type: Retail store (scan and sell, no kitchen), Quick-service restaurant, or Dine-in restaurant"
                w={1600}
                h={445}
              />
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
                  <p className="body-5 mt-3 text-ink-soft">{s.text}</p>
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
          <ScrollReveal className="mt-6">
            <p className="body-6 inline-flex items-center gap-2 text-ink-mute">
              <Barcode size={18} /> Products, prices and barcodes for every store are managed in Cael.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* hardware */}
      <section aria-labelledby="hw-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <Eyebrow>Hardware</Eyebrow>
            <h2 id="hw-title" className="heading-3 mt-3">
              What sits on the counter
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              We help you pick the devices for your store and set them up for you.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {HARDWARE.map((h, i) => (
              <li key={h.title}>
                <ScrollReveal delay={i * 60} className="border-t border-line-strong pt-6">
                  <h.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{h.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{h.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 py-16 md:py-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                See Ourea in your own store
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                We bring a tablet and a terminal to you, outside your busy hours, and show it with your own menu.
                In Ottawa and around.
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
