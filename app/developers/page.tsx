import type { Metadata } from 'next';
import {
  ArrowRight,
  CloudArrowUp,
  Code,
  Cpu,
  HandCoins,
  LockKey,
  Plug,
  Plugs,
  Scales,
  SlidersHorizontal,
  WaveSquare,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Developers · Build on GS‑SSP',
  description:
    'Connect your machine to a GoldSky payment terminal with two HTTP endpoints, no SDK and no card data. The Aegis Flex Controller API, the terminals GS‑SSP runs on, and how to get developer access.',
};

// Facts: C:\workspace\gs-ssp\docs\partner\flex_controller_api.md (v1) and
// docs/CAPABILITIES.md. Aegis Flex is "terminal done, partner controller not
// yet" there, so it is written as "in pilot". No open cloud API, keys or
// webhooks exist yet: they only appear under "Coming soon", with no date.

// Four ways in, least work first (the ladder idea is from helcim.com's
// Download / No code / Low code / Full code). Status per CAPABILITIES.md:
// Cael and the pulse output are live at Eagleson; MDB runs on test machines
// only; Flex is in pilot. Keep the status labels honest when they change.
const TIERS = [
  {
    icon: SlidersHorizontal,
    level: 'No code',
    title: 'Set it up in Cael',
    text: 'Prices, products, screens, ads, coupons and member codes, changed from anywhere. Every sale shows up there.',
    status: 'Live',
    live: true,
  },
  {
    icon: WaveSquare,
    level: 'Wiring only',
    title: 'Pulse to your timer board',
    text: 'For timed equipment like wash bays and vacuums. The terminal sends the start pulse your timer already understands.',
    status: 'Live at Eagleson',
    live: true,
  },
  {
    icon: Plug,
    level: 'Standard port',
    title: 'MDB vending machines',
    text: 'The terminal plugs into the machine’s existing card reader port. Item first or card first, English and French.',
    status: 'On test machines',
    live: false,
  },
  {
    icon: Code,
    level: 'Full code',
    title: 'Flex Controller API',
    text: 'Your own controller, two HTTP endpoints. For machines that need to confirm the hand‑over or charge by weight.',
    status: 'In pilot',
    live: false,
    href: '#flex',
  },
];

const FLEX_POINTS = [
  { icon: Plugs, title: 'Two endpoints on your side', text: 'Your controller answers a status check and a dispense call over the site LAN. No GoldSky SDK or hardware inside your machine.' },
  { icon: LockKey, title: 'No card data, ever', text: 'The terminal takes the payment. Your controller only hears what was bought, how many and what was paid.' },
  { icon: HandCoins, title: 'No product, no charge', text: 'The money is kept only when your controller answers DISPENSED for that order. Anything else and the payment is voided.' },
  { icon: Scales, title: 'Charge what was taken', text: 'With a card hold, your controller can say how much of it to charge, for products sold by weight or volume.' },
];

const FLOW = [
  { n: '01', title: 'Choose and pay', text: 'The customer picks a product on the GoldSky terminal and pays by card or member code.' },
  { n: '02', title: 'Dispense', text: 'Once the payment is approved, the terminal calls POST /flex/v1/dispense on your controller.' },
  { n: '03', title: 'Hand over, then answer', text: 'Your controller hands the product over and answers DISPENSED, or FAILED with a reason.' },
  { n: '04', title: 'Keep or void', text: 'The terminal keeps or voids the payment, and the sale is recorded in Cael with its order id.' },
];

const TERMINALS = [
  { maker: 'PAX', models: 'IM30' },
  { maker: 'WizarPOS', models: 'Q3mini, Q2' },
  { maker: 'ID TECH', models: 'NEO2, NEO3' },
];

const STATUS_SAMPLE = `GET /flex/v1/status

200 OK
{ "ready": true, "message": "OK", "sold_out": ["3"] }`;

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="dev-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal>
            <p className="caption-4 uppercase tracking-widest text-brand">Developers</p>
            <h1 id="dev-title" className="heading-1 mt-6">
              Build on GS‑SSP
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              Put a GoldSky payment terminal in front of your own machine, or bring GS‑SSP to the terminals you
              work with. Most machines need less code than you think.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#access">Request developer access</Button>
              <Button href="/developers/flex" variant="secondary">
                Read the Flex API
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10 md:p-8">
              <p className="caption-4 uppercase tracking-widest text-[#9C9384]">Your controller</p>
              <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-cream">
                <code>{STATUS_SAMPLE}</code>
              </pre>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integration ladder */}
      <section aria-labelledby="tiers-title" className="px-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="tiers-title" className="heading-3">
              Four ways to connect, least work first
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Pick the lightest one that does the job. The payment, the receipt and the “no product, no charge”
              rule stay the same at every level.
            </p>
          </ScrollReveal>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t, i) => {
              const body = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <t.icon size={26} className="text-brand" />
                    <span
                      className={`caption-5 rounded-full px-2.5 py-1 ${
                        t.live ? 'bg-brand/10 text-brand-dark' : 'bg-paper-deep text-ink-mute'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="caption-4 mt-6 uppercase tracking-widest text-ink-mute">
                    {i + 1} · {t.level}
                  </p>
                  <h3 className="title-2 mt-2">{t.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{t.text}</p>
                  {t.href && (
                    <span className="body-6 mt-4 inline-flex items-center gap-1 text-brand-dark">
                      See the API
                      <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
                    </span>
                  )}
                </>
              );
              return (
                <li key={t.title}>
                  <ScrollReveal delay={i * 80} className="h-full">
                    {t.href ? (
                      <a
                        href={t.href}
                        className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 ease-gs hover:border-line-strong"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6">{body}</div>
                    )}
                  </ScrollReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Available now: Aegis Flex */}
      <section id="flex" aria-labelledby="flex-title" className="scroll-mt-24 border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <p className="caption-4 uppercase tracking-widest text-brand">Available now · v1, in pilot</p>
            <h2 id="flex-title" className="heading-3 mt-3">
              Aegis Flex Controller API
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Your machine, our payment terminal. The customer chooses and pays on the terminal; your controller
              hands the product over. This is the whole interface between the two.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {FLEX_POINTS.map((p, i) => (
              <li key={p.title}>
                <ScrollReveal delay={(i % 4) * 80} className="border-t border-line-strong pt-6">
                  <p.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{p.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{p.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          <ScrollReveal className="mt-16">
            <h3 className="heading-5">How a sale flows</h3>
            <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              {FLOW.map((s) => (
                <li key={s.n} className="rounded-2xl border border-line bg-panel p-6">
                  <span className="caption-3 text-brand">{s.n}</span>
                  <p className="title-2 mt-2">{s.title}</p>
                  <p className="body-6 mt-2 text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          <ScrollReveal className="mt-10">
            <a href="/developers/flex" className="body-4 group inline-flex items-center gap-1 text-brand-dark">
              Read the full API reference
              <ArrowRight size={16} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Terminals */}
      <section aria-labelledby="terminals-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <ScrollReveal>
            <Cpu size={28} className="text-brand" />
            <h2 id="terminals-title" className="heading-3 mt-4">
              The terminals GS‑SSP runs on
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              One platform across three terminal makers, on Android 7.1 and up. Building hardware of your own, or
              already using one of these? Tell us and we will look at it with you.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TERMINALS.map((t) => (
                <li key={t.maker} className="rounded-2xl border border-line bg-panel p-6">
                  <p className="caption-4 uppercase tracking-widest text-ink-mute">{t.maker}</p>
                  <p className="heading-5 mt-2">{t.models}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming soon */}
      <section aria-labelledby="soon-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-20">
        <ScrollReveal className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <CloudArrowUp size={44} className="shrink-0 text-brand" />
          <div className="max-w-prose">
            <p className="caption-4 uppercase tracking-widest text-ink-mute">Coming soon</p>
            <h2 id="soon-title" className="heading-4 mt-2">
              Sale records in your own cloud
            </h2>
            <p className="body-4 mt-3 text-ink-soft">
              Every sale on a GoldSky terminal is already recorded in Cael with its order id. Delivering those
              records to your systems as they happen is next. If you need it, or another interface, say so
              below: requests shape what we build.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Access */}
      <section id="access" aria-labelledby="access-title" className="scroll-mt-24 px-4 py-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="access-title" className="heading-2 text-cream">
                Request developer access
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                Tell us about your machine or your hardware and what it should do. We will send the integration
                material, including a stand‑in controller you can test against before your own is ready.
              </p>
            </div>
            <QuickContact
              defaultSite="Developer or integration partner"
              messageHint="Your machine or hardware, and what the terminal should make it do"
              submitLabel="Request access"
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
