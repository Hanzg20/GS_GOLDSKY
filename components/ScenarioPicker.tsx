'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowsClockwise,
  ChatCircleText,
  Cards,
  Desktop,
  HandTap,
  MapPinArea,
  Plug,
  QrCode,
  Timer,
  Handshake,
  Monitor,
  WashingMachine,
  Thermometer,
  CoinVertical,
  Package,
  Prohibit,
  ChargingStation,
  GasPump,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';
import { PhotoSlot } from './PhotoSlot';
import { ArtImage, type ArtName } from './ArtImage';
import { NightPhoto } from './NightPhoto';
import type { NightId } from '@/lib/nightPhotos';
import { LineEmblem, type LineId } from './art/LineEmblem';
import { PHOTOS, type PhotoId } from '@/lib/photos';
import { cn } from '@/lib/utils';

// "Which one is you?" Pick a kind of business on the left, see how GS-SSP
// looks there on the right, as a bento of one tall picture and five cells.
// The picture is the real photo once it is ready (lib/photos.ts); until then
// the illustration for that line, or the photo placeholder if there is none.
// Every claim here is in the GS-SSP docs; nothing is a made up number.
// While on screen it plays through the businesses by itself (a bar fills on
// the active tab); hovering or focusing pauses it, any click or key stops it.
// No autoplay under prefers-reduced-motion.
const DWELL = 6000;

type Scenario = {
  id: string;
  tab: string;
  lines: { id: LineId; name: string }[];
  /** the real photo slot (lib/photos.ts); none yet for the newer businesses */
  photo?: PhotoId;
  /** in development in GS-SSP: tab and title say "Coming soon" */
  soon?: boolean;
  /** illustration shown until the real photo is ready */
  art?: ArtName;
  /** dark theme photograph shown until the real photo is ready */
  night: NightId;
  title: string;
  text: string;
  points: { icon: Icon; title: string; text: string }[];
  href: string;
};

// In time order through the day, as the photos are: 06:30 fuel, 07:30 counter,
// 09:30 laundry, 10:00 wash, 12:00 dine in, 17:30 vending, 19:00 firewood,
// 20:00 EV, 21:00 several sites. It opens on the counter, a live business.
const SCENARIOS: Scenario[] = [
  // Fuel: not in the GS-SSP docs at all (2026-11-09), added at the owner's
  // request. Copy makes no technical claim; confirm before launch.
  {
    id: 'fuel',
    tab: 'Self serve fuel',
    soon: true,
    lines: [
      { id: 'aegis', name: 'Aegis' },
      { id: 'cael', name: 'Cael' },
    ],
    night: 'fuel',
    title: 'Pay at the pump, the same way',
    text: 'Self serve fuel is on our list. Tell us about your station and we will tell you honestly where we are.',
    points: [
      { icon: GasPump, title: 'Card at the pump', text: 'The same card and tap payment as our other self serve sites.' },
      { icon: MapPinArea, title: 'With your other sites', text: 'Managed in Cael alongside your wash bays and machines.' },
      { icon: ChatCircleText, title: 'Talk to us early', text: 'Running a station? We would like to hear about it.' },
    ],
    href: '/contact',
  },
  {
    id: 'counter',
    tab: 'Quick service counter',
    lines: [
      { id: 'ourea', name: 'Ourea' },
      { id: 'cael', name: 'Cael' },
    ],
    photo: 'ourea-counter',
    night: 'counter',
    art: 'line-ourea',
    title: 'A counter that keeps up with the line',
    text: 'Ourea takes the order and the payment, with a customer display facing the queue.',
    points: [
      { icon: Monitor, title: 'Customer display', text: 'The customer sees the order and the total as it is rung up.' },
      { icon: Cards, title: 'One menu everywhere', text: 'Change a price in Cael and every screen has it.' },
      { icon: ChatCircleText, title: 'Ask how today went', text: 'Apex answers questions about your sales in plain words.' },
    ],
    href: '/solutions/attended',
  },
  {
    id: 'laundry',
    tab: 'Laundromat',
    soon: true,
    lines: [
      { id: 'aegis', name: 'Aegis' },
      { id: 'cael', name: 'Cael' },
    ],
    night: 'laundry',
    title: 'A row of washers and dryers, one card terminal',
    text: 'Aegis Laundry is in development: one terminal that takes the payment for a row of machines.',
    points: [
      { icon: Thermometer, title: 'Pick the cycle', text: 'Water temperature and extras, priced in Cael.' },
      { icon: WashingMachine, title: 'Dryer time', text: 'Customers buy drying minutes and top up as needed.' },
      { icon: CoinVertical, title: 'Keeps your machines', text: 'Connects where the coin mechanism does.' },
    ],
    href: '/solutions/unattended',
  },
  {
    id: 'wash',
    tab: 'Self serve car wash',
    lines: [
      { id: 'aegis', name: 'Aegis' },
      { id: 'cael', name: 'Cael' },
    ],
    photo: 'aegis-bay',
    night: 'wash',
    title: 'Every bay takes cards, day and night',
    text: 'Aegis Wash takes card and QR payment in each bay. Aegis Timer runs the vacuum for the minutes bought.',
    points: [
      { icon: ArrowsClockwise, title: 'Reversed if the bay fails', text: 'No charge for a wash that did not happen.' },
      { icon: Timer, title: 'Vacuum on a timer', text: 'Pay, and it runs for exactly the minutes bought.' },
      { icon: MapPinArea, title: 'Every bay from home', text: 'Terminal status and prices, in Cael.' },
    ],
    href: '/solutions/unattended',
  },
  {
    id: 'dinein',
    tab: 'Dine in restaurant',
    lines: [
      { id: 'ourea', name: 'Ourea' },
      { id: 'iris', name: 'Iris' },
    ],
    photo: 'iris-table',
    night: 'dinein',
    art: 'line-iris',
    title: 'Ordered at the table, paid at the table',
    text: 'Guests order with a table QR code, and your staff bring Iris over when it is time to pay.',
    points: [
      { icon: QrCode, title: 'Table QR ordering', text: 'Guests order from their own phone.' },
      { icon: HandTap, title: 'Checkout in hand', text: 'Iris walks to the table, so the card never leaves the guest.' },
      { icon: Cards, title: 'One catalogue', text: 'Counter, handheld and table QR all read the same menu.' },
    ],
    href: '/solutions/attended',
  },
  {
    id: 'vend',
    tab: 'Vending machines',
    lines: [
      { id: 'aegis', name: 'Aegis' },
      { id: 'cael', name: 'Cael' },
    ],
    photo: 'aegis-vend',
    night: 'vend',
    title: 'Card payment for the machines you already have',
    text: 'Aegis Vend adds card payment to MDB vending machines.',
    points: [
      { icon: Plug, title: 'Speaks MDB', text: 'Fits the standard vending machine connection.' },
      { icon: ArrowsClockwise, title: 'Charged on delivery', text: 'Only when the machine confirms it delivered.' },
      { icon: MapPinArea, title: 'Every machine from home', text: 'Terminal status and prices, in Cael.' },
    ],
    href: '/solutions/unattended',
  },
  {
    id: 'firewood',
    tab: 'Firewood and partner machines',
    lines: [
      { id: 'aegis', name: 'Aegis' },
      { id: 'cael', name: 'Cael' },
    ],
    night: 'firewood',
    title: 'Their machine, our payment',
    text: "Aegis Flex is the card terminal in front of a partner's machine, such as a firewood kiosk: the customer pays on our terminal, their machine hands it over.",
    points: [
      { icon: Handshake, title: 'Works with partners', text: "Talks to the partner's controller over the local network." },
      { icon: ArrowsClockwise, title: 'Charged when dispensed', text: 'The money is kept only once the machine says it handed over.' },
      { icon: Prohibit, title: 'Sold out shows', text: 'An empty slot greys out, the rest keep selling.' },
    ],
    href: '/solutions/unattended',
  },
  {
    id: 'ev',
    tab: 'EV charging',
    soon: true,
    lines: [
      { id: 'aegis', name: 'Aegis' },
      { id: 'cael', name: 'Cael' },
    ],
    night: 'ev',
    title: 'Tap to pay at the charger',
    text: 'Aegis EV is in development: the same card payment, built for electric vehicle chargers.',
    points: [
      { icon: ChargingStation, title: 'Card at the charger', text: 'No app or membership needed to pay.' },
      { icon: Package, title: 'Its own app', text: 'Like every Aegis terminal, a separate app built for one kind of machine.' },
      { icon: ChatCircleText, title: 'Talk to us early', text: 'Planning chargers? We would like to hear about your site.' },
    ],
    href: '/contact',
  },
  {
    id: 'sites',
    tab: 'Several sites',
    lines: [
      { id: 'cael', name: 'Cael' },
      { id: 'apex', name: 'Apex' },
    ],
    photo: 'cael-console',
    night: 'sites',
    art: 'line-cael',
    title: 'Every store and terminal in one place',
    text: 'Menus, prices, devices and screens, managed from Cael wherever you are.',
    points: [
      { icon: Desktop, title: 'Terminal status', text: 'See which terminals are online at every site.' },
      { icon: Monitor, title: 'Screen ads', text: 'Put your own promotions on the customer screens.' },
      { icon: ChatCircleText, title: 'Apex, for the owner', text: 'How much did we sell this week? Just ask.' },
    ],
    href: '/products/software',
  },
];

export function ScenarioPicker() {
  const [active, setActive] = useState(1); // the counter
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const s = SCENARIOS[active];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setAuto(true);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // keep the active chip visible in the sideways list on phones (horizontal only)
  useEffect(() => {
    const c = list.current;
    const b = tabs.current[active];
    if (!auto || !c || !b || c.scrollWidth <= c.clientWidth) return;
    c.scrollTo({ left: b.offsetLeft - 16, behavior: 'smooth' });
  }, [active, auto]);

  const next = () => setActive((a) => (a + 1) % SCENARIOS.length);
  const fill = cn(
    'block h-full w-full rounded-full bg-brand',
    'group-hover/picker:[animation-play-state:paused] group-focus-within/picker:[animation-play-state:paused]',
  );
  const play = { animationPlayState: inView ? undefined : 'paused', animationDuration: `${DWELL}ms` } as const;

  function onKey(e: React.KeyboardEvent) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    setAuto(false);
    const next = (active + step + SCENARIOS.length) % SCENARIOS.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div ref={root} className="group/picker grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      {/* the list: chips that scroll sideways on phones, a vertical list on desktop */}
      <div
        role="tablist"
        aria-label="Kind of business"
        aria-orientation="vertical"
        onKeyDown={onKey}
        ref={list}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:rounded-2xl lg:border lg:border-line lg:bg-panel lg:p-3 lg:pb-3"
      >
        {SCENARIOS.map((sc, i) => {
          const on = i === active;
          return (
            <button
              key={sc.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${sc.id}`}
              aria-selected={on}
              aria-controls={`panel-${sc.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
              className={cn(
                'relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-left transition-colors duration-300 ease-gs',
                'lg:whitespace-normal lg:rounded-xl lg:border-0 lg:px-4 lg:py-3',
                on
                  ? 'border-ink bg-ink text-paper lg:bg-paper-deep lg:text-ink'
                  : 'border-line text-ink-soft hover:text-ink lg:hover:bg-paper-deep/60',
              )}
            >
              {/* desktop: the orange bar on the left; while autoplaying it fills top to bottom */}
              <span
                aria-hidden
                className={cn(
                  'absolute left-0 top-3 hidden h-[calc(100%-24px)] w-[3px] overflow-hidden rounded-full transition-opacity duration-300 lg:block',
                  on ? 'opacity-100' : 'opacity-0',
                  on && auto ? 'bg-brand/20' : 'bg-brand',
                )}
              >
                {on && auto && (
                  <span
                    className={cn(fill, 'origin-top [animation-name:fill-y] [animation-timing-function:linear]')}
                    style={play}
                    onAnimationEnd={next}
                  />
                )}
              </span>
              {/* phones: a thin line under the active chip */}
              {on && auto && (
                <span aria-hidden className="absolute bottom-1 left-4 right-4 h-[2px] overflow-hidden rounded-full bg-paper/25 lg:hidden">
                  <span
                    className={cn(fill, 'origin-left bg-paper [animation-name:fill-x] [animation-timing-function:linear]')}
                    style={play}
                    onAnimationEnd={next}
                  />
                </span>
              )}
              <span className="body-5 lg:font-serif lg:text-lg">
                {sc.tab}
                {sc.soon && <SoonPill className="ml-2 align-middle" />}
              </span>
              <span className={cn('caption-5 mt-0.5 hidden text-ink-mute lg:block', !on && 'lg:hidden')}>
                {sc.lines.map((l) => l.name).join(' · ')}
              </span>
            </button>
          );
        })}
      </div>

      {/* the bento */}
      <div
        key={s.id}
        role="tabpanel"
        id={`panel-${s.id}`}
        aria-labelledby={`tab-${s.id}`}
        className="panel-in grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
      >
        {/* tall picture: left column, two rows high */}
        <div className="aspect-square sm:col-span-2 sm:aspect-[16/10] md:col-span-1 md:row-span-2 md:aspect-auto md:min-h-[400px]">
          {s.photo && PHOTOS[s.photo].ready ? (
            <PhotoSlot id={s.photo} compact fill />
          ) : (
            <>
              {/* light: the illustration (or the photo brief); dark: a photograph */}
              <div className="h-full dark:hidden">
                {s.art ? (
                  <ArtImage name={s.art} className="h-full" sizes="(min-width: 768px) 320px, 100vw" />
                ) : s.photo ? (
                  <PhotoSlot id={s.photo} compact fill />
                ) : (
                  // newer businesses: no illustration yet (docs/NIGHT_PHOTO_BRIEF.md)
                  <div className="flex h-full flex-col justify-end rounded-2xl border border-dashed border-line-strong bg-paper-deep p-4">
                    <p className="caption-4 font-mono text-ink-mute">插画待生成 · line-{s.id}</p>
                  </div>
                )}
              </div>
              <NightPhoto
                id={s.night}
                className="hidden h-full rounded-2xl dark:block"
                sizes="(min-width: 768px) 320px, 100vw"
              />
            </>
          )}
        </div>

        <div className="flex flex-col rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/5">
          {s.soon && <SoonPill className="mb-3 self-start border-cream/30 text-cream/80" />}
          <h3 className="heading-6 text-cream">{s.title}</h3>
          <p className="body-6 mt-3 text-[#B9AF9E]">{s.text}</p>
        </div>

        <Point {...s.points[0]} />
        <Point {...s.points[1]} />
        <Point {...s.points[2]} />

        {/* full width strip under the bento */}
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-deep px-6 py-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between md:col-span-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="caption-4 text-ink-mute">Runs on</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {s.lines.map((l) => (
                <div key={l.id} className="flex items-center">
                  <LineEmblem line={l.id} className="origin-left scale-75" />
                  <span className="title-3 -ml-3">{l.name}</span>
                </div>
              ))}
            </div>
          </div>
          <a href={s.href} className="body-5 group inline-flex items-center gap-1 text-brand-dark">
            See how it works
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 ease-gs group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function Point({ icon: I, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6 transition-[transform,border-color] duration-500 ease-gs hover:-translate-y-1 hover:border-brand/50">
      <I size={24} className="text-brand" />
      <h4 className="title-2 mt-4">{title}</h4>
      <p className="body-6 mt-2 text-ink-soft">{text}</p>
    </div>
  );
}

/** a business GS-SSP is still building for: said plainly, never implied live */
function SoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border border-current/30 px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider opacity-80',
        className,
      )}
    >
      Coming soon
    </span>
  );
}
