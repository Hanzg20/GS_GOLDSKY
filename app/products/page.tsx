import type { Metadata } from 'next';
import { ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AegisAppIcon, LineEmblem, type AegisApp, type LineId } from '@/components/art/LineEmblem';
import { NightPhoto } from '@/components/NightPhoto';
import { PhotoSlot } from '@/components/PhotoSlot';
import { ApexBeaver } from '@/components/ApexBeaver';
import { QuickContact } from '@/components/QuickContact';
import type { NightId } from '@/lib/nightPhotos';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Products · The GoldSky terminal family',
  description:
    'Five product lines on one platform: Ourea at the counter, Iris in hand, Aegis when no one is there, Cael in the cloud, and Apex, the AI assistant in the middle.',
};

// The family page, after the structure of a "full series" launch: one claim,
// then each line as a role. Every capability listed is a ✅ line in
// docs/CAPABILITIES.md; 🟡 and 🔵 items appear only as status pills or under
// "What's next".

type Section = {
  id: LineId;
  name: string;
  cn: string;
  role: string;
  title: string;
  text: string;
  points: string[];
  href?: string;
  art?: { src: string; srcSet: string; alt: string };
  night?: NightId;
};

const SECTIONS: Section[] = [
  {
    id: 'ourea',
    name: 'Ourea',
    cn: '山神',
    role: 'At the counter',
    title: 'The counter that holds steady',
    text: 'A countertop POS for quick service, dine in and shops, with a customer display beside it and QR ordering at the tables.',
    points: [
      'Quick service: dine in or take out, order notes, daily call numbers, kitchen tickets',
      'Dine in: floor plan, checks, rounds, split payments, network kitchen printer',
      'Cash drawer and shifts: float, cash in and out, count at close, over or short worked out',
      'Customer display where guests choose their own tip',
      'Table QR ordering: one shared cart per table, straight to the kitchen, call a server',
      'Partial refunds and offline card sales, both behind a manager’s say',
    ],
    href: '/solutions/attended',
    art: {
      src: '/images/art/line-ourea-640.webp',
      srcSet: '/images/art/line-ourea-640.webp 640w, /images/art/line-ourea.webp 1200w',
      alt: 'Illustration: a cashier at a restaurant counter with a countertop terminal',
    },
    night: 'counter',
  },
  {
    id: 'iris',
    name: 'Iris',
    cn: '虹',
    role: 'In hand',
    title: 'Checkout that walks to the table',
    text: 'The full counter checkout in your staff’s hand: cart, tip, payment and receipt, at the table or at the door.',
    points: [
      'Card or cash at the table, with quick amounts and the change worked out',
      'Runs on payment terminals from three makers',
      'The same journal, delivery orders and Apex as Ourea',
    ],
    href: '/solutions/attended',
    art: {
      src: '/images/art/line-iris-640.webp',
      srcSet: '/images/art/line-iris-640.webp 640w, /images/art/line-iris.webp 1200w',
      alt: 'Illustration: a server walking through a restaurant with a handheld device',
    },
    night: 'dinein',
  },
  {
    id: 'cael',
    name: 'Cael',
    cn: '云',
    role: 'Behind every store',
    title: 'Every store in one place',
    text: 'The cloud console for owners and for us: every store, terminal and screen, managed from anywhere.',
    points: [
      'Prices and products, published to the terminals',
      'Dish photos and translated names, straight into QR ordering',
      'Logo, name and welcome text on every screen',
      'Ad playlists per device, with proof of play',
      'Coupons in bulk, with the store’s own terms on the ticket',
      'Transactions, device health, remote reboot and lock',
    ],
    href: '/products/software',
    art: {
      src: '/images/art/line-cael-640.webp',
      srcSet: '/images/art/line-cael-640.webp 640w, /images/art/line-cael.webp 1200w',
      alt: 'Illustration: soft clouds over a row of small shops, a beam of light linking them',
    },
    night: 'sites',
  },
];

const AEGIS_ROWS: { app: AegisApp; name: string; text: string; status: 'live' | 'pilot' | 'next' }[] = [
  { app: 'wash', name: 'Aegis Wash', text: 'Self serve car wash: pick a package, pay by card or code, the water runs for the time bought.', status: 'live' },
  { app: 'timer', name: 'Aegis Timer', text: 'Pay by time. First up, the vacuum beside the wash.', status: 'live' },
  { app: 'vend', name: 'Aegis Vend', text: 'Card payment on the front of a vending machine, over MDB.', status: 'pilot' },
  { app: 'flex', name: 'Aegis Flex', text: 'Our terminal takes the payment; a partner’s own machine hands the product over.', status: 'pilot' },
  { app: 'laundry', name: 'Aegis Laundry', text: 'Self serve laundry, one terminal for a row of machines.', status: 'next' },
  { app: 'ev', name: 'Aegis EV', text: 'EV charging.', status: 'next' },
];

const STATUS = {
  live: { label: 'Live', cls: 'text-brand-dark dark:text-brand font-semibold' },
  pilot: { label: 'In pilot', cls: 'text-ink-soft' },
  next: { label: 'Coming soon', cls: 'text-ink-mute' },
} as const;

const PLATFORM = [
  { title: 'One platform', text: 'GS‑SSP runs the counter, the handheld, the unattended machines and the cloud.' },
  { title: 'Three terminal makers', text: 'Card and QR on payment terminals from three makers, so you are not tied to one.' },
  { title: 'Keeps working offline', text: 'Settings are cached and sales are queued, then sent once the connection is back.' },
  { title: 'Members and coupons', text: 'Member balances, points and coupons work across the lines.' },
];

const NEXT = ['Self serve laundry', 'EV charging', 'Uber Eats and DoorDash orders', 'Pay at the table from the guest’s phone'];

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((p) => (
        <li key={p} className="body-5 flex gap-3 text-ink-soft">
          <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-brand" />
          {p}
        </li>
      ))}
    </ul>
  );
}

function Heading({ s, tone = 'ink' }: { s: Pick<Section, 'id' | 'name' | 'cn' | 'role' | 'title'>; tone?: 'ink' | 'cream' }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <LineEmblem line={s.id} />
        <div>
          <p className={cn('caption-4 uppercase tracking-widest', tone === 'cream' ? 'text-brand' : 'text-ink-mute')}>
            {s.role}
          </p>
          <p className={cn('heading-5 mt-1 flex items-baseline gap-2', tone === 'cream' && 'text-cream')}>
            {s.name}
            <span className={cn('caption-2 font-seal', tone === 'cream' ? 'text-cream/60' : 'text-ink-mute')}>{s.cn}</span>
          </p>
        </div>
      </div>
      <h2 id={`${s.id}-title`} className={cn('heading-3 mt-8 scroll-mt-32', tone === 'cream' && 'text-cream')}>
        {s.title}
      </h2>
    </>
  );
}

function MoreLink({ href, name }: { href: string; name: string }) {
  return (
    <a href={href} className="body-5 group mt-8 inline-flex items-center gap-1 text-brand-dark">
      More on {name}
      <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
    </a>
  );
}

function LineSection({ s, flip }: { s: Section; flip: boolean }) {
  return (
    <section aria-labelledby={`${s.id}-title`} className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal className={cn(flip && 'lg:order-2')}>
          <Heading s={s} />
          <p className="body-3 mt-4 text-ink-soft">{s.text}</p>
          <Points items={s.points} />
          {s.href && <MoreLink href={s.href} name={s.name} />}
        </ScrollReveal>
        <ScrollReveal delay={80} className={cn(flip && 'lg:order-1')}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line dark:border-0 sm:aspect-[4/3] lg:aspect-[4/5]">
            {s.art && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.art.src}
                srcSet={s.art.srcSet}
                sizes="(min-width: 1024px) 560px, 100vw"
                alt={s.art.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover dark:hidden"
              />
            )}
            {s.night && (
              <NightPhoto id={s.night} className="hidden h-full w-full dark:block" sizes="(min-width: 1024px) 560px, 100vw" />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  const [ourea, iris, cael] = SECTIONS;
  return (
    <>
      {/* Hero: the claim and the family */}
      <section aria-labelledby="products-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-3xl">
            <p className="caption-4 uppercase tracking-widest text-brand">The GoldSky terminal family</p>
            <h1 id="products-title" className="heading-1 mt-6">
              Every counter, every bay, one mind
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              At the counter, in hand, when no one is there and in the cloud, with an assistant that listens in
              the middle. Five lines on one platform, each named for an old guardian.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <ul className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-3 lg:grid-cols-5">
              {(
                [
                  ['ourea', 'Ourea', 'At the counter'],
                  ['iris', 'Iris', 'In hand'],
                  ['apex', 'Apex', 'The AI assistant'],
                  ['aegis', 'Aegis', 'When no one is there'],
                  ['cael', 'Cael', 'Behind every store'],
                ] as const
              ).map(([id, name, role]) => (
                <li key={id}>
                  <a href={`#${id}-title`} className="group flex items-center gap-3">
                    <LineEmblem line={id} className="origin-left scale-75" />
                    <span className="-ml-3">
                      <span className="title-2 block transition-colors duration-300 group-hover:text-brand-dark">{name}</span>
                      <span className="caption-2 block text-ink-mute">{role}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <div className="border-t border-line">
        <LineSection s={ourea} flip={false} />
      </div>
      <div className="border-y border-line bg-paper-deep">
        <LineSection s={iris} flip />
      </div>

      {/* Apex, the AI in the middle */}
      <section aria-labelledby="apex-title" className="px-4 py-16 md:py-24">
        <ScrollReveal className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Heading s={{ id: 'apex', name: 'Apex', cn: '顶峰', role: 'The AI assistant', title: 'The assistant that listens' }} tone="cream" />
            <p className="body-3 mt-4 text-[#B9AF9E]">
              Ask your store in plain words and get numbers you can check. It lives in Ourea, Iris and Cael, and
              the same beaver helps your guests order in one sentence, in their own language.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Every number has a source, checked before you see it',
                'It suggests, you decide: nothing is saved until a manager confirms',
                'It speaks up first: low stock, a long shift, an unpaid delivery',
                'A daily brief and a month-end report',
              ].map((p) => (
                <li key={p} className="body-5 flex gap-3 text-[#B9AF9E]">
                  <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-brand" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/apex">Meet Apex</Button>
            </div>
          </div>
          <ApexBeaver />
        </ScrollReveal>
      </section>

      {/* Aegis: a series, with where each app stands */}
      <section aria-labelledby="aegis-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <Heading s={{ id: 'aegis', name: 'Aegis', cn: '神盾', role: 'When no one is there', title: 'On guard when no one is there' }} />
              <p className="body-3 mt-4 text-ink-soft">
                A family of self serve terminals, each its own app built for one kind of machine, all reporting to
                Cael. No product, no charge: if the machine does not confirm, the payment is reversed.
              </p>
              <Points
                items={[
                  'Restarts after a power cut and opens straight into the app',
                  'Voice prompts, with the key ones said three times',
                  'Ads from Cael while it waits',
                  'Remote lock and remote reversal from Cael',
                ]}
              />
              <MoreLink href="/solutions/unattended" name="Aegis" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line dark:border-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/art/home-aegis-night-720.webp"
                  srcSet="/images/art/home-aegis-night-720.webp 720w, /images/art/home-aegis-night.webp 1300w"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  alt="Illustration: self serve wash bays at night under a glowing shield"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover dark:hidden"
                />
                <NightPhoto id="aegis" className="hidden h-full w-full dark:block" sizes="(min-width: 1024px) 560px, 100vw" />
              </div>
            </ScrollReveal>
          </div>

          {/* dark theme: the two machines that are live today; the vacuum one is the
              on-site loop from Eagleson (PhotoSlot plays it, falling back to the still) */}
          <div className="mt-12 hidden grid-cols-2 gap-4 dark:grid">
            {(
              [
                ['terminal', 'Aegis Wash', 'The terminal on the bay wall'],
                ['vacuum', 'Aegis Timer', 'The vacuum beside the wash'],
              ] as const
            ).map(([id, name, caption]) => (
              <ScrollReveal key={id} className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[4/3]">
                {id === 'vacuum' ? (
                  <PhotoSlot id="eagleson-vacuum" fill play className="rounded-none border-0" />
                ) : (
                  <NightPhoto id={id} className="h-full w-full" sizes="(min-width: 768px) 50vw, 50vw" />
                )}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4">
                  <span className="title-2 block text-cream">{name}</span>
                  <span className="caption-2 block text-cream/70">{caption}</span>
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12">
            <ul className="divide-y divide-line border-y border-line" aria-label="Aegis apps and where each stands">
              {AEGIS_ROWS.map((r) => (
                <li key={r.app} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 py-4 md:grid-cols-[auto_200px_1fr_auto]">
                  <AegisAppIcon app={r.app} className="h-10 w-10 shrink-0 md:row-auto" />
                  <span className="title-2">{r.name}</span>
                  <span className="body-6 col-start-2 text-ink-soft md:col-start-auto">{r.text}</span>
                  <span className={cn('caption-4 col-start-2 uppercase tracking-wider md:col-start-auto', STATUS[r.status].cls)}>
                    {STATUS[r.status].label}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <LineSection s={cael} flip />

      {/* The platform underneath */}
      <section aria-labelledby="platform-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <p className="caption-4 uppercase tracking-widest text-brand">Underneath</p>
            <h2 id="platform-title" className="heading-3 mt-3">
              One platform, GS‑SSP
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM.map((p, i) => (
              <li key={p.title}>
                <ScrollReveal delay={i * 80} className="border-t border-line-strong pt-6">
                  <h3 className="title-2">{p.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{p.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <ScrollReveal className="mt-16">
            <h3 className="title-2">What’s next</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {NEXT.map((n) => (
                <li key={n} className="caption-1 rounded-lg border border-line bg-panel px-3 py-1.5 text-ink-soft">
                  {n}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 py-16 md:py-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                Which ones fit your site?
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                A counter, a wash bay or a row of machines. Tell us what you run and we will say honestly what fits
                today and what is still coming.
              </p>
            </div>
            <QuickContact />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
