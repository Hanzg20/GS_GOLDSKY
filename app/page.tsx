import type { Metadata } from 'next';
import {
  ArrowDown,
  ArrowRight,
  ArrowsClockwise,
  ChatCircleText,
  Cards,
  MapPinArea,
  Plus,
  Translate,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TaglineReveal } from '@/components/TaglineReveal';
import { HeroPanorama } from '@/components/art/HeroPanorama';
import { PlacesRibbon } from '@/components/PlacesRibbon';
import { AegisNight } from '@/components/art/AegisNight';
import { PhotoSlot } from '@/components/PhotoSlot';
import { AegisAppIcon, LineEmblem, type AegisApp, type LineId } from '@/components/art/LineEmblem';
import { ScrollHero } from '@/components/ScrollHero';
import { DayMark } from '@/components/DayMark';
import { ScenarioPicker } from '@/components/ScenarioPicker';
import { QuickContact } from '@/components/QuickContact';
import { ArtImage } from '@/components/ArtImage';
import { DayRail } from '@/components/DayRail';
import { RollNumber } from '@/components/RollNumber';
import { NightPhoto } from '@/components/NightPhoto';
import { ApexBeaver } from '@/components/ApexBeaver';
import type { NightId } from '@/lib/nightPhotos';

export const metadata: Metadata = {
  title: 'GoldSky · Payment and store tools for Canadian businesses',
  description:
    'GS-SSP brings counter, handheld and self serve payments together on one platform. Built in Ottawa, running in Kanata.',
};

// Every product fact on this page comes from the GS-SSP project
// (C:\workspace\gs-ssp: CLAUDE.md, docs/system_architecture.md, docs/releases).
// Anything not confirmed there renders through <Missing> and must be filled in
// before launch.

function Missing({ children }: { children: string }) {
  return <span className="fact-missing">{`{{${children}}}`}</span>;
}

type Line = {
  id: LineId;
  name: string;
  cn: string;
  role: string;
  text: string;
  href: string;
  /** light theme: the illustration */
  art: { src: string; srcSet: string; alt: string };
  /** dark theme: the photograph */
  night: NightId;
  /** Aegis apps with where each stands (docs/CAPABILITIES.md) */
  apps?: { name: string; live: boolean }[];
};

const LINES: Record<'ourea' | 'iris' | 'aegis' | 'cael', Line> = {
  ourea: {
    id: 'ourea',
    name: 'Ourea',
    cn: '山神',
    role: 'At the counter',
    text: 'The counter that holds steady. Quick service and dine in, a customer display, cash drawer and shifts, and table QR ordering where guests order in one sentence, in their own language.',
    href: '/solutions/attended',
    art: {
      src: '/images/art/line-ourea-640.webp',
      srcSet: '/images/art/line-ourea-640.webp 640w, /images/art/line-ourea.webp 1200w',
      alt: 'Illustration: a cashier at a restaurant counter with a countertop terminal',
    },
    night: 'counter',
  },
  iris: {
    id: 'iris',
    name: 'Iris',
    cn: '虹',
    role: 'In hand',
    text: "Checkout that walks to the table. Card or cash in your staff's hand, on terminals from three makers.",
    href: '/solutions/attended',
    art: {
      src: '/images/art/line-iris-640.webp',
      srcSet: '/images/art/line-iris-640.webp 640w, /images/art/line-iris.webp 1200w',
      alt: 'Illustration: a server walking through a restaurant with a handheld device',
    },
    night: 'dinein',
  },
  aegis: {
    id: 'aegis',
    name: 'Aegis',
    cn: '神盾',
    role: 'When no one is there',
    text: 'On guard when no one is there. Card and code payment for car washes, vacuums, vending and partner machines. No product, no charge: if the machine does not confirm, the payment is reversed.',
    href: '/solutions/unattended',
    art: {
      src: '/images/art/home-aegis-night-720.webp',
      srcSet: '/images/art/home-aegis-night-720.webp 720w, /images/art/home-aegis-night.webp 1300w',
      alt: 'Illustration: self serve wash bays at night under a glowing shield',
    },
    night: 'terminal',
    apps: [
      { name: 'Wash', live: true },
      { name: 'Timer', live: true },
      { name: 'Vend', live: false },
      { name: 'Flex', live: false },
    ],
  },
  cael: {
    id: 'cael',
    name: 'Cael',
    cn: '云',
    role: 'Behind every store',
    text: 'Every store in one place. Prices, menus, screens, ads, coupons and sales, managed from anywhere.',
    href: '/products/software',
    art: {
      src: '/images/art/line-cael-640.webp',
      srcSet: '/images/art/line-cael-640.webp 640w, /images/art/line-cael.webp 1200w',
      alt: 'Illustration: soft clouds over a row of small shops, a beam of light linking them',
    },
    night: 'sites',
  },
};

function LineCard({ line }: { line: Line }) {
  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-[transform,border-color] duration-500 ease-gs hover:-translate-y-1 hover:border-brand/50">
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={line.art.src}
          srcSet={line.art.srcSet}
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          alt={line.art.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-gs group-hover/card:scale-[1.03] dark:hidden"
        />
        <NightPhoto
          id={line.night}
          className="hidden h-full w-full dark:block"
          imgClassName="transition-transform duration-700 ease-gs group-hover/card:scale-[1.03]"
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4">
          <LineEmblem line={line.id} className="origin-left scale-75" />
          <div className="-ml-3">
            <p className="caption-4 uppercase tracking-widest text-ink-mute">{line.role}</p>
            <h3 className="heading-5 mt-1 flex items-baseline gap-2">
              {line.name}
              <span className="caption-2 font-seal text-ink-mute">{line.cn}</span>
            </h3>
          </div>
        </div>
        <p className="body-6 mt-3 text-ink-soft">{line.text}</p>
        {line.apps && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${line.name} apps`}>
            {line.apps.map((app) => (
              <li
                key={app.name}
                className="caption-1 inline-flex items-center gap-2 rounded-lg border border-line bg-paper-deep px-3 py-1.5 text-ink-soft"
              >
                {line.name} {app.name}
                <span
                  className={
                    app.live
                      ? 'caption-5 inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-brand-dark dark:text-brand'
                      : 'caption-5 uppercase tracking-wider text-ink-mute'
                  }
                >
                  {app.live && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />}
                  {app.live ? 'Live' : 'In pilot'}
                </span>
              </li>
            ))}
          </ul>
        )}
        <a href={line.href} className="body-5 group mt-auto inline-flex items-center gap-1 pt-4 text-brand-dark">
          More on {line.name}
          <ArrowRight
            size={14}
            weight="bold"
            className="transition-transform duration-300 ease-gs group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  );
}

// What makes Apex worth trusting, each built (docs/CAPABILITIES.md §1.1).
const APEX_PROOFS = [
  { title: 'Every number has a source.', text: 'The data does the sums, and each figure is checked before you see it.' },
  { title: 'It suggests, you decide.', text: 'Say "record hydro 234.50" and nothing is saved until a manager confirms.' },
  { title: 'It speaks up first.', text: 'Low stock, a long shift, an unpaid delivery.' },
];

// The five guardians as they ink into the hero picture, in scroll order.
const GUARDIANS = [
  { n: 1, char: '山', name: 'Ourea', role: 'at the counter' },
  { n: 2, char: '虹', name: 'Iris', role: 'in hand' },
  { n: 3, char: '盾', name: 'Aegis', role: 'self serve' },
  { n: 4, char: '峰', name: 'Apex', role: 'the assistant' },
  { n: 5, char: '云', name: 'Cael', role: 'the cloud' },
];

// Big numbers, facts only, counting down 5 to 1: lines, Aegis apps, terminal
// makers, languages, and the one platform they all run on.
const STATS = [
  { value: 5, label: 'product lines on one platform' },
  { value: 4, label: 'Aegis apps for self serve machines' },
  { value: 3, label: 'terminal makers supported' },
  { value: 2, label: 'support languages, English and Mandarin' },
  { value: 1, label: 'platform behind all of it, GS‑SSP' },
];

const BENEFITS = [
  {
    icon: ArrowsClockwise,
    title: "Never charge for a wash that didn't happen",
    text: 'If the machine fails after the card is approved, the payment is reversed automatically.',
  },
  {
    icon: Cards,
    title: 'One menu on every screen',
    text: 'The counter, the handheld and the table QR all read the same catalogue.',
  },
  {
    icon: MapPinArea,
    title: 'See every site without driving there',
    text: 'Terminal status, prices and screen ads, from Cael.',
  },
  {
    icon: ChatCircleText,
    title: 'Ask your numbers in plain words',
    text: 'Apex answers questions about today, this week and this month.',
  },
  {
    icon: Translate,
    title: 'Talk to the people who built it',
    text: 'Support in English and Mandarin.',
  },
];

const AEGIS_APPS: { name: string; app: AegisApp; text: string }[] = [
  { name: 'Aegis Wash', app: 'wash', text: 'Card and QR for self serve wash bays.' },
  { name: 'Aegis Timer', app: 'timer', text: 'Pay, and the vacuum runs for the minutes bought.' },
  { name: 'Aegis Vend', app: 'vend', text: 'Card payment for MDB vending machines.' },
  { name: 'Aegis Flex', app: 'flex', text: "Our terminal takes the payment, a partner's machine hands over the product." },
];

const STEPS = [
  { title: 'Tell us about your site', text: 'What you sell and how customers pay today.' },
  { title: 'We set up your store', text: 'Terminals chosen, menus and prices loaded in Cael.' },
  { title: 'Go live with us beside you', text: 'We install, then watch the first weeks with you.' },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What kinds of businesses is GS‑SSP for?',
    a: 'Restaurants and shops with a counter, and self serve sites such as car washes, vacuum stations and vending machines. One platform covers both.',
  },
  {
    q: 'Which terminals do you support?',
    a: 'GS‑SSP runs on terminals from WizarPOS, PAX and ID TECH. We help you pick the right one for your site.',
  },
  {
    q: 'Who processes the payments?',
    a: <Missing>processor answer, to be confirmed</Missing>,
  },
  {
    q: 'What happens if a machine fails after the card is charged?',
    a: 'The payment is reversed. A customer is only charged when the machine confirms it delivered.',
  },
  {
    q: 'Can I keep my existing coin acceptor?',
    a: <Missing>coin acceptor answer, to be confirmed</Missing>,
  },
  {
    q: 'Does it work if the internet drops?',
    a: 'Card payments need a connection. Menus, prices and settings are kept on the terminal, so it starts up and keeps its setup while offline.',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on your site and the terminals you need. Tell us about it and we will send a quote.',
  },
  {
    q: 'Do you offer support in Mandarin?',
    a: 'Yes. Our team supports you in English and Mandarin.',
  },
];

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`caption-3 uppercase tracking-widest ${className ?? 'text-brand-dark'}`}>{children}</p>;
}

export default function HomePage() {
  return (
    <>
      {/* 1 · Hero: a scroll scene on large screens. The frame stays pinned while
          the sun rises and the five guardians ink in, one by one. */}
      <DayRail />
      <ScrollHero className="data-[pinned]:h-[240vh] dark:data-[pinned]:h-[170vh]" data-hour={6}>
        <section
          aria-labelledby="hero-title"
          className="relative isolate flex flex-col justify-center px-4 pb-16 pt-10 md:pb-20 md:pt-16 dark:min-h-[calc(100svh_-_80px)] dark:justify-end group-data-[pinned]/hero:sticky group-data-[pinned]/hero:top-20 group-data-[pinned]/hero:h-[calc(100svh_-_80px)] group-data-[pinned]/hero:pb-10 group-data-[pinned]/hero:pt-4"
        >
          {/* dark theme: a full bleed photograph instead of the panorama, running
              up behind the header and easing back as you scroll (Starlink) */}
          <div aria-hidden className="absolute inset-x-0 -top-20 bottom-0 -z-10 hidden overflow-hidden dark:block">
            <NightPhoto id="hero" decorative className="night-zoom h-full w-full" />
            <div className="night-shade absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/10 to-transparent" />
          </div>
          <div className="night-copy mx-auto grid w-full max-w-content grid-cols-1 items-end gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <ScrollReveal>
              <DayMark hour={6}>First light</DayMark>
              <h1 id="hero-title" className="heading-1 mt-5 max-w-prose xl:text-7xl">
                <span className="hero-ink">
                  Every counter, cart
                  <br className="hidden lg:block" /> and wash bay,
                  <br className="hidden lg:block" />{' '}
                </span>
                <span className="hero-ink relative inline-block">
                  looked after
                  {/* hand drawn ink stroke, draws itself in once */}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 16"
                    preserveAspectRatio="none"
                    className="ink-underline absolute -bottom-2 left-0 h-3 w-full dark:hidden"
                  >
                    <path
                      d="M3 11 C 60 4, 130 3, 190 6 S 270 12, 297 5"
                      pathLength={1}
                      fill="none"
                      stroke="#C8661A"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="body-3 text-lg leading-7 text-ink-soft">
                GoldSky builds GS‑SSP, one platform for taking payments and running stores across
                restaurants, shops and self serve sites. Five product lines, made in Ottawa.
              </p>
              <div className="mt-6">
                <Button href="#talk">
                  Talk to our team <ArrowRight size={18} weight="bold" />
                </Button>
              </div>
              <p className="caption-2 mt-6 flex items-center gap-2 text-ink-mute">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-brand" />
                </span>
                Running every day at Eagleson Coin Wash, Kanata
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal
            delay={200}
            className="mx-auto mt-10 w-full max-w-[1280px] dark:hidden lg:w-[min(100%,calc((100svh_-_480px)*2.3))]"
          >
            <HeroPanorama />
            <ul
              aria-label="The five GS-SSP lines, each a guardian in the picture"
              className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:justify-between"
            >
              {GUARDIANS.map((g) => (
                <li
                  key={g.n}
                  className="guardian flex items-center gap-2"
                  style={{ opacity: `calc(0.3 + 0.7 * var(--g${g.n}, 1))` }}
                >
                  <span
                    aria-hidden
                    className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink font-seal text-xs text-paper"
                  >
                    {g.char}
                  </span>
                  <span className="title-4">{g.name}</span>
                  <span className="caption-5 text-ink-mute">{g.role}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <p
            aria-hidden
            className="caption-4 pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-ink-mute group-data-[pinned]/hero:flex"
            style={{ opacity: 'var(--hint, 0)' }}
          >
            Scroll <ArrowDown size={14} className="animate-bounce" />
          </p>
        </section>
      </ScrollHero>

      <PlacesRibbon
        places={[
          'Self serve car washes',
          'Vacuum stations',
          'Vending machines',
          'Quick service counters',
          'Dine in restaurants',
          'Table QR ordering',
          'Partner machines',
        ]}
      />

      {/* 2 · Which one is you: scenario picker with a bento per business */}
      <section aria-labelledby="scenes-title" data-hour={8} className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <DayMark hour={8}>Doors open</DayMark>
            <h2 id="scenes-title" className="heading-3 mt-4">
              Which one is your business?
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Pick the closest match. They all run on the same platform, so adding another later is easy.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="mt-12">
            <ScenarioPicker />
          </ScrollReveal>
        </div>
      </section>

      {/* 3 · Five product lines */}
      <section aria-labelledby="lines-title" data-hour={12} className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <DayMark hour={12}>Midday</DayMark>
            <h2 id="lines-title" className="heading-3 mt-4">
              Every counter, every bay, one mind
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              At the counter, in hand, when no one is there and in the cloud, with an assistant that listens in
              the middle. Five lines on one platform, each named for an old guardian: mountain, rainbow,
              shield, summit and cloud.
            </p>
          </ScrollReveal>

          {/* Apex, the assistant, in the middle; the counter on the left, self
              serve and the cloud on the right. Each card opens on a picture:
              the illustration in light, a photograph in dark. */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {(['ourea', 'iris'] as const).map((id, i) => (
              <ScrollReveal key={id} delay={i * 80} className="lg:col-start-1">
                <LineCard line={LINES[id]} />
              </ScrollReveal>
            ))}
            <ScrollReveal delay={120} className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <article className="flex h-full flex-col rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10">
                <div className="flex items-center gap-4">
                  <LineEmblem line="apex" />
                  <div>
                    <p className="caption-4 uppercase tracking-widest text-brand">AI assistant</p>
                    <h3 className="heading-5 mt-1 flex items-baseline gap-2 text-cream">
                      Apex <span className="caption-2 font-seal text-cream/60">顶峰</span>
                    </h3>
                  </div>
                </div>
                <p className="body-6 mt-4 text-[#B9AF9E]">
                  Ask in plain words: sales, stock, members, staff hours. It lives in Ourea, Iris and Cael, and
                  the beaver is the same one your guests order from.
                </p>
                <ul className="mt-4 space-y-2">
                  {APEX_PROOFS.map((proof) => (
                    <li key={proof.title} className="body-6 flex gap-3 text-[#B9AF9E]">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>
                        <span className="font-semibold text-cream">{proof.title}</span> {proof.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <ApexBeaver className="mt-6 flex-1 justify-center" />
                <a href="/apex" className="body-5 group mt-6 inline-flex items-center gap-1 text-cream">
                  Meet Apex
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-300 ease-gs group-hover:translate-x-1"
                  />
                </a>
              </article>
            </ScrollReveal>
            {(['aegis', 'cael'] as const).map((id, i) => (
              <ScrollReveal
                key={id}
                delay={160 + i * 80}
                className={i === 0 ? 'lg:col-start-3 lg:row-start-1' : 'lg:col-start-3 lg:row-start-2'}
              >
                <LineCard line={LINES[id]} />
              </ScrollReveal>
            ))}
          </div>

          {/* big numbers, facts only */}
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-strong pt-10 md:grid-cols-5">
            {STATS.map((st, i) => (
              <ScrollReveal key={st.label} delay={i * 80} className="flex flex-col-reverse justify-end">
                <dt className="body-6 mt-2 max-w-[200px] text-ink-soft">{st.label}</dt>
                <dd className="font-serif text-6xl font-medium tracking-tight text-ink dark:font-bold md:text-7xl">
                  <RollNumber value={st.value} delay={i * 120} />
                </dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 4 · Tagline reveal, at golden hour */}
      <section
        data-hour={18}
        data-tone="brand"
        className="relative isolate overflow-hidden bg-brand px-4 py-24 dark:bg-black md:py-32"
      >
        {/* dark theme: golden hour over the town, the day's 18:00 */}
        <div aria-hidden className="absolute inset-0 -z-10 hidden dark:block">
          <NightPhoto id="golden" decorative className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="mx-auto max-w-content">
          <DayMark hour={18} tone="brand" className="mb-10">
            Golden hour
          </DayMark>
          <ScrollReveal className="mb-12">
            <div aria-hidden className="flex gap-3">
              {['山', '虹', '盾', '峰', '云'].map((c, i) => (
                <span
                  key={c}
                  className="stamp flex h-12 w-12 items-center justify-center rounded-lg border border-cream/60 font-seal text-xl text-cream"
                  style={{ animationDelay: `${300 + i * 140}ms` }}
                >
                  {c}
                </span>
              ))}
            </div>
          </ScrollReveal>
          <TaglineReveal
            className="text-cream"
            lines={[
              'Named after the old guardians of mountain, rainbow, shield, summit and sky.',
              'Built for the people who open the doors every morning.',
            ]}
          />
        </div>
      </section>

      {/* 4 · Benefits */}
      <section aria-labelledby="benefits-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <SectionLabel>What changes for you</SectionLabel>
            <h2 id="benefits-title" className="heading-3 mt-3">
              Less driving, fewer surprises, one place to look
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <li key={b.title}>
                <ScrollReveal delay={(i % 3) * 80} className="border-t border-line pt-6">
                  <b.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{b.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{b.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Aegis */}
      {/* night section: bg-night, warm not black (a raised panel in dark mode) */}
      <section
        aria-labelledby="aegis-title"
        data-hour={23}
        data-tone="dark"
        className="relative isolate overflow-hidden bg-night px-4 py-16 dark:flex dark:min-h-[100svh] dark:flex-col dark:justify-center dark:bg-black md:py-24"
      >
        {/* dark theme: the night wash bays fill the section, copy on the left */}
        <div aria-hidden className="absolute inset-0 -z-10 hidden dark:block">
          <NightPhoto id="aegis" decorative className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/0" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="mx-auto w-full max-w-content">
          <ScrollReveal>
            <DayMark hour={23} tone="dark">
              Nobody on site
            </DayMark>
          </ScrollReveal>
        </div>
        <div className="mx-auto mt-10 grid w-full max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal className="order-2 dark:hidden lg:order-1">
            <AegisNight />
          </ScrollReveal>
          <ScrollReveal className="order-1 lg:order-2 dark:lg:order-1">
            <div className="flex items-center gap-4">
              <LineEmblem line="aegis" />
              <SectionLabel className="text-brand">Aegis · 神盾</SectionLabel>
            </div>
            <h2 id="aegis-title" className="heading-2 mt-6 text-cream">
              No one on site,
              <br /> still looked after
            </h2>
            <p className="body-3 mt-4 text-[#B9AF9E]">
              Aegis is a family of self serve terminals. Each one is its own app, built for one kind of
              machine, and all of them report to Cael.
            </p>
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {AEGIS_APPS.map((app) => (
                <div key={app.name} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-6">
                  <dt className="title-3 flex items-center gap-3 text-cream">
                    <AegisAppIcon app={app.app} inverse className="h-10 w-10 shrink-0" />
                    {app.name}
                  </dt>
                  <dd className="body-6 text-[#B9AF9E]">{app.text}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* 6 · Case */}
      <section aria-labelledby="case-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionLabel>In the field</SectionLabel>
            <h2 id="case-title" className="heading-3 mt-3">
              Eagleson Coin Wash, Kanata
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              A self serve wash in Kanata, Ontario, taking card and QR payments on Aegis Wash, with Aegis
              Timer running the vacuum station beside it. Prices and terminals are managed from Cael.
            </p>
            <a
              href="/case-studies"
              className="body-5 group mt-8 inline-flex items-center gap-1 text-brand-dark"
            >
              Read the case study
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 ease-gs group-hover:translate-x-1"
              />
            </a>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid grid-cols-2 gap-3">
            <PhotoSlot id="eagleson-site" className="col-span-2" />
            <PhotoSlot id="eagleson-terminal" compact />
            <PhotoSlot id="eagleson-vacuum" compact />
          </ScrollReveal>
        </div>
      </section>

      {/* 7 · How it works: the climb to the summit (Apex) beside three steps */}
      <section aria-labelledby="steps-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <ScrollReveal className="order-2 lg:order-1">
            <ArtImage
              name="line-apex"
              className="mx-auto aspect-[4/5] max-w-[420px] dark:hidden lg:max-w-none"
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 420px, 100vw"
            />
            <NightPhoto
              id="summit"
              className="mx-auto hidden aspect-[4/5] max-w-[420px] rounded-2xl dark:block lg:max-w-none"
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 420px, 100vw"
            />
          </ScrollReveal>
          <div className="order-1 lg:order-2">
            <ScrollReveal className="max-w-prose">
              <SectionLabel>Getting started</SectionLabel>
              <h2 id="steps-title" className="heading-3 mt-3">
                Three steps to your first sale
              </h2>
            </ScrollReveal>
            <ol className="mt-10 flex flex-col gap-3">
              {STEPS.map((st, i) => (
                <li key={st.title}>
                  <ScrollReveal
                    delay={i * 100}
                    className="grid grid-cols-[48px_1fr] items-start gap-4 rounded-2xl border border-line bg-panel p-6 transition-[transform,border-color] duration-500 ease-gs hover:translate-x-1 hover:border-brand/50"
                  >
                    <span aria-hidden className="font-serif text-4xl leading-none text-brand dark:font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="title-2">{st.title}</h3>
                      <p className="body-6 mt-2 text-ink-soft">{st.text}</p>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section aria-labelledby="faq-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <ScrollReveal>
            <SectionLabel>Questions</SectionLabel>
            <h2 id="faq-title" className="heading-3 mt-3">
              What operators ask us first
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="divide-y divide-line border-y border-line">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-2">
                  <summary className="title-2 flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-3 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      size={18}
                      className="shrink-0 text-ink-mute transition-transform duration-300 ease-gs group-open:rotate-45"
                    />
                  </summary>
                  <div className="body-3 pb-4 pr-8 text-ink-soft">{item.a}</div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA: the enquiry form right here, the next morning */}
      <section id="talk" aria-labelledby="talk-title" data-hour={30} className="scroll-mt-24 px-4 pb-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <DayMark hour={6} tone="dark">
                Tomorrow, first light
              </DayMark>
              <h2 id="talk-title" className="heading-2 mt-6 text-cream">
                Tell us about your site
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                A counter, a wash bay or a row of machines. We will tell you honestly what GS‑SSP can do.
              </p>
              <p className="caption-2 mt-8 text-[#9C9384]">
                Prefer to write?{' '}
                <a
                  href="mailto:info@goldsky.ca"
                  className="text-cream underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:decoration-brand"
                >
                  info@goldsky.ca
                </a>
              </p>
            </div>
            <QuickContact />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
