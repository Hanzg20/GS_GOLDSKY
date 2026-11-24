'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CounterPOS, CounterPOSDual, WizarQ2, WizarQ3Pro, WizarQ3mini } from './Devices';

// The tour of real Ourea screens on /ourea: one tab per place the system
// works, one stage that shows that place's screens. Screens are from the
// Ourea app, Iris and the demo store (see app/ourea/page.tsx).

type Shot = { src: string; alt: string; w: number; h: number };
type Stop = {
  id: string;
  tab: string;
  where: string;
  title: string;
  text: string;
  points: string[];
  layout: 'tablet' | 'phones' | 'handhelds' | 'pair' | 'browser' | 'eye';
  shots: Shot[];
  note?: string;
};

const T = (src: string, alt: string, h = 795): Shot => ({ src: `/images/ourea/${src}.webp`, alt, w: 1600, h });
const P = (src: string, alt: string): Shot => ({ src: `/images/ourea/${src}.webp`, alt, w: 585, h: 1266 });

const STOPS: Stop[] = [
  {
    id: 'counter',
    tab: 'Counter',
    where: 'Ourea POS',
    title: 'Ring it up in a few taps',
    text: 'Dishes by category, options and add-ons that price themselves, then card, cash, QR or member card.',
    points: [
      'Spice levels and add-ons on each dish, required or optional',
      'Hold, discount and split an order; refund part of it with a manager’s PIN',
      'Dine in or take out, call numbers, tickets to the kitchen printer',
    ],
    layout: 'tablet',
    shots: [
      T(
        'options',
        'Choosing options for Braised Beef Noodle on Ourea POS: a required spice level and up to two add-ons, the price updating',
      ),
    ],
  },
  {
    id: 'guest',
    tab: 'Guest screen',
    where: 'Ourea Eye',
    title: 'Two screens: one for staff, one for the guest',
    text: 'On a dual screen SUNMI D3 Pro the guest display faces the customer. With a WizarPOS Q3 Pro as the register, a Q3mini beside it is Ourea Eye: the card terminal and the guest’s screen in one.',
    points: [
      'The guest sees the total and picks the tip',
      'Tips on the amount before tax, a custom amount, or none',
      'Tap or chip on the Q3mini, right where the guest is looking',
    ],
    layout: 'eye',
    shots: [
      T('counter', 'Ourea POS on a dual screen SUNMI D3 Pro: the cashier’s screen'),
      { src: '/images/ourea/eye-tip-wide.webp', alt: 'The D3 Pro guest display: the total and the tip choice', w: 640, h: 400 },
      { src: '/images/ourea/iris-keypad.webp', alt: 'A WizarPOS Q3 Pro as the register: the keypad', w: 720, h: 1072 },
      { src: '/images/ourea/eye-tip.webp', alt: 'A Q3mini as Ourea Eye beside it: the total and the tip choice for the guest', w: 480, h: 480 },
    ],
  },
  {
    id: 'table',
    tab: 'Table QR',
    where: 'Ourea Scan',
    title: 'Guests order from their own phones',
    text: 'One cart for the whole table, dish photos and translated names, an allergy filter, and the beaver to order in one sentence.',
    points: [
      'English, Français, 中文 and العربية, chosen by the guest',
      'Nothing goes in the cart until the guest taps',
      'Orders go straight to the kitchen',
    ],
    layout: 'phones',
    shots: [
      P('scan-menu', 'The menu on a guest’s phone with dish photos, Chinese and English names, spice marks and prices'),
      P(
        'scan-beaver',
        'Talk to Beaver: the guest typed “Two of us, not too spicy, something with chicken” and Beaver suggests Kung Pao Chicken for two',
      ),
      P('scan-cart', 'The table’s shared cart with two dishes, a note for the kitchen, the total and Place order'),
    ],
    note: 'Paying at the table from the guest’s phone is in pilot.',
  },
  {
    id: 'online',
    tab: 'Online orders',
    where: 'Online ordering',
    title: 'Online orders land on the same counter',
    text: 'Your store gets its own ordering page for pickup or your own delivery. Paid orders arrive as New, Preparing and Ready.',
    points: ['The time each order is due, and a ticket for the kitchen', 'Ready, or Can’t make it, in one tap'],
    layout: 'tablet',
    shots: [
      T(
        'online-orders',
        'The Online orders board on Ourea: New, Preparing and Ready columns, an order with four items, a tip, a ready by time, Print ticket, Ready and Can’t make it',
      ),
    ],
    note: 'Uber Eats and DoorDash orders are coming soon.',
  },
  {
    id: 'handheld',
    tab: 'Handheld',
    where: 'Iris',
    title: 'The checkout walks to the table',
    text: 'Iris is Ourea in your staff’s hand: the floor plan, the keypad, the menu and delivery, with card or cash taken at the table.',
    points: ['Tables, a keypad for quick amounts, the menu and delivery', 'Ask Beaver to set a reminder; it shows it to confirm first', 'Runs on WizarPOS, PAX and ID TECH terminals'],
    layout: 'handhelds',
    shots: [
      {
        src: '/images/ourea/iris-tables.webp',
        alt: 'Iris on a WizarPOS Q2: the opening checklist, tabs for Tables, Keypad, Library and Delivery, three tables with one seated',
        w: 720,
        h: 1082,
      },
      {
        src: '/images/ourea/iris-keypad.webp',
        alt: 'Iris keypad: enter an amount in Canadian dollars and confirm',
        w: 720,
        h: 1072,
      },
      {
        src: '/images/ourea/iris-beaver.webp',
        alt: 'Beaver on Iris: asked in Chinese to check for a delivery in ten minutes, it shows the reminder to confirm before saving',
        w: 720,
        h: 1072,
      },
    ],
  },
  {
    id: 'close',
    tab: 'Close of day',
    where: 'Ourea POS',
    title: 'The day’s takings and the cash drawer',
    text: 'Transactions and the day report on the terminal, a counted drawer at every shift, and out of stock shown on the counter.',
    points: ['Float, cash in and out, over or short worked out', 'Every store’s numbers also in Cael'],
    layout: 'pair',
    shots: [
      T('day', 'Transactions on Ourea with the Day Settlement Report at the top and paid cash and card sales below'),
      T(
        'drawer',
        'The cash drawer screen: open the drawer with a float, and an earlier shift showing expected, counted and one dollar short',
      ),
    ],
  },
  {
    id: 'cael',
    tab: 'Cael cloud',
    where: 'Cael',
    title: 'Every store’s sales, menu and tables, from any browser',
    text: 'Sales reports, products, barcodes, prices and tax rates for every store, plus tables, devices and ads. Change it once and Ourea and Iris pick it up.',
    points: [
      'Sales over time against the previous period, by device, location or payment method',
      'Bulk import of products from CSV or Excel, a tax rate per product, stock',
      'Tables by area, each with a QR card to print',
    ],
    layout: 'browser',
    shots: [
      {
        src: '/images/ourea/cael-sales.webp',
        alt: 'A sales report in Cael: gross and net sales, orders and average order value, sales over time against the previous period, and a breakdown',
        w: 1600,
        h: 833,
      },
      {
        src: '/images/ourea/cael-retail.webp',
        alt: 'Products in Cael for a grocery store: names in Chinese and English, barcodes, categories, prices, HST or exempt, stock and an on sale switch',
        w: 1158,
        h: 377,
      },
    ],
  },
];

function Img({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.src}
      alt={s.alt}
      width={s.w}
      height={s.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('block h-auto w-full', className)}
    />
  );
}

/** A slim dark bezel, so the screen reads as a device without turning into a slab. */
export function Screen({ s, className, phone, eager }: { s: Shot; className?: string; phone?: boolean; eager?: boolean }) {
  return (
    <div
      className={cn(
        'bg-[#0B0D12] shadow-[0_24px_48px_-24px_rgba(31,29,26,0.5)] ring-1 ring-black/10',
        phone ? 'rounded-[32px] p-1.5' : 'rounded-2xl p-1.5',
        className,
      )}
    >
      <Img s={s} eager={eager} className={phone ? 'rounded-[26px]' : 'rounded-[10px]'} />
    </div>
  );
}

/** A light browser window for Cael, the web platform. */
export function Browser({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={cn('overflow-hidden rounded-xl bg-white shadow-[0_24px_48px_-24px_rgba(31,29,26,0.45)] ring-1 ring-black/10', className)}>
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#F4F2EE] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="caption-5 ml-2 rounded-md bg-white px-2 py-0.5 text-[#6F695F]">cmp.goldsky.ca</span>
      </div>
      <Img s={s} eager={eager} />
    </div>
  );
}

function Stage({ stop }: { stop: Stop }) {
  const { layout, shots } = stop;
  return (
    <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-brand-light p-6 md:min-h-[480px] md:p-10">
      {layout === 'tablet' && <CounterPOS s={shots[0]} className="max-w-[680px]" />}
      {layout === 'phones' && (
        <div className="grid w-full max-w-[600px] grid-cols-3 items-center gap-3 md:gap-6">
          {shots.map((s, i) => (
            <Screen key={s.src} s={s} phone className={cn(i === 1 && 'md:-translate-y-6')} />
          ))}
        </div>
      )}
      {layout === 'handhelds' && (
        <div className="grid w-full max-w-[600px] grid-cols-3 items-end gap-3 md:gap-6">
          {shots.map((s, i) => (
            <WizarQ2 key={s.src} s={s} className={cn(i === 1 && 'md:-translate-y-6')} />
          ))}
        </div>
      )}
      {layout === 'eye' && (
        <div className="grid w-full max-w-[720px] grid-cols-1 items-end gap-8 md:grid-cols-[3fr_2fr]">
          <CounterPOSDual s={shots[0]} guest={shots[1]} />
          <div className="flex items-end justify-center gap-3">
            <WizarQ3Pro s={shots[2]} className="w-[48%]" />
            <WizarQ3mini s={shots[3]} className="mb-2 w-[44%]" />
          </div>
        </div>
      )}
      {layout === 'browser' && (
        <div className="relative w-full max-w-[720px] pb-[22%]">
          <Browser s={shots[0]} className="w-[92%]" />
          <Browser s={shots[1]} className="absolute bottom-0 right-0 w-[56%]" />
        </div>
      )}
      {layout === 'pair' && (
        <div className="relative w-full max-w-[680px]">
          <CounterPOS s={shots[0]} className="w-[88%]" />
          <Screen s={shots[1]} className="absolute bottom-[8%] right-0 w-[52%]" />
        </div>
      )}
    </div>
  );
}

export function OureaTour() {
  const [active, setActive] = useState(0);
  const stop = STOPS[active];

  function onKey(e: React.KeyboardEvent) {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const next = (active + step + STOPS.length) % STOPS.length;
    setActive(next);
    document.getElementById(`tour-tab-${STOPS[next].id}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Ourea screens"
        onKeyDown={onKey}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {STOPS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              id={`tour-tab-${s.id}`}
              role="tab"
              aria-selected={on}
              aria-controls="tour-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'body-5 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 transition-colors duration-300 ease-gs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                on ? 'border-ink bg-ink text-paper' : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
              )}
            >
              {s.tab}
            </button>
          );
        })}
      </div>

      <div
        key={stop.id}
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${stop.id}`}
        className="panel-in mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12"
      >
        <div>
          <p className="caption-3 uppercase tracking-widest text-brand-dark dark:text-brand">{stop.where}</p>
          <h3 className="heading-4 mt-3 text-balance">{stop.title}</h3>
          <p className="body-3 mt-4 text-pretty text-ink-soft">{stop.text}</p>
          <ul className="mt-6 space-y-3">
            {stop.points.map((p) => (
              <li key={p} className="body-6 flex gap-3 text-ink-soft">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {p}
              </li>
            ))}
          </ul>
          {stop.note && <p className="caption-2 mt-6 text-ink-mute">{stop.note}</p>}
        </div>
        <Stage stop={stop} />
      </div>
    </div>
  );
}
