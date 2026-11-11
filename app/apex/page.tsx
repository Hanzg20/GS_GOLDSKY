import type { Metadata } from 'next';
import {
  ArrowRight,
  BellRinging,
  ChatCircleText,
  CheckCircle,
  FileText,
  ForkKnife,
  MagnifyingGlass,
  Microphone,
  Prohibit,
  Receipt,
  Translate,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LineEmblem } from '@/components/art/LineEmblem';
import { ApexBeaver } from '@/components/ApexBeaver';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Apex · The GoldSky AI assistant',
  description:
    'Ask your store in plain words and get numbers you can check. Apex looks things up, acts once you confirm, and speaks up first. Your guests order in one sentence, in their own language.',
};

// Every claim on this page is a ✅ line in docs/CAPABILITIES.md §1 (from the
// GS-SSP project). The example exchanges show the kind of question Apex takes;
// they are not a real store's numbers, so none of them carries a figure.

type Example = { q: string; a: string; source?: string };

const ABILITIES: {
  icon: typeof MagnifyingGlass;
  title: string;
  text: string;
  example: Example;
}[] = [
  {
    icon: MagnifyingGlass,
    title: 'It looks it up',
    text: 'Sales for any period, by day, hour, staff member, payment method or category. Best and slow sellers, one sale and its refunds, stock, members, hours and tips, expenses and rough profit.',
    example: {
      q: 'How did this week go against last week?',
      a: 'Here are both weeks side by side, day by day, with the difference for each.',
      source: 'Source: sales summary, both weeks',
    },
  },
  {
    icon: CheckCircle,
    title: 'It does it, once you confirm',
    text: 'Record an expense, set a reminder, create a delivery order, tick a checklist, write a note, receive or count stock. One sentence can ask and act. Nothing is saved until a manager taps confirm.',
    example: {
      q: 'Record hydro 234.50, and tell me this month’s utilities.',
      a: 'Here is the month so far. The hydro bill is on a card below, waiting for you to confirm.',
    },
  },
  {
    icon: BellRinging,
    title: 'It speaks up first',
    text: 'Fixed rules, checked every few minutes: stock that won’t last three days, someone clocked in for over 12 hours, a delivery unpaid after two hours, an overdue checklist. The beaver holds up a sign; tap it to ask.',
    example: {
      q: 'What is on your sign?',
      a: 'Two things worth a look: one item running low, and a checklist past due.',
    },
  },
  {
    icon: FileText,
    title: 'It writes the month',
    text: 'A daily brief, today against the same day last week. At month end, a full report: sales, tax, tips, refunds, expenses, rough profit, stock, best sellers, hours, loyalty.',
    example: {
      q: 'Last month’s month-end report, please.',
      a: 'Here it is, section by section. Each number is checked against your records.',
      source: 'Source: month report, last month',
    },
  },
];

const HONEST = [
  { n: '01', title: 'The data does the sums', text: 'Totals come from your records, worked out by the system. The model only puts them into words.' },
  { n: '02', title: 'Every figure is checked', text: 'Each number in an answer is matched against what was looked up. If one doesn’t match, it is rewritten or flagged.' },
  { n: '03', title: 'Every answer shows its source', text: 'A tag under the answer says where the numbers came from, so you can check for yourself.' },
];

const MORE = [
  { icon: Microphone, title: 'Ask out loud', text: 'Speak the question in English or Chinese.' },
  { icon: Receipt, title: 'Photograph a receipt', text: 'The camera finds it, squares it and reads the amount, then asks you to confirm the expense.' },
  { icon: UsersThree, title: 'All your stores', text: 'In Cael, owners with several stores ask which did best, across their own stores only.' },
];

const GUESTS = [
  {
    icon: ChatCircleText,
    title: 'Order in one sentence',
    text: '“Two beef noodles, one without onion, and a cold dish.” The beaver turns it into real lines from your menu, asks which cold dish, and adds to the cart only when the guest says so.',
  },
  {
    icon: ForkKnife,
    title: 'The right amount for the table',
    text: 'It asks how many and how spicy, suggests picks for the party, and answers “is this enough?” with what to add or cut. Allergies and no‑spice are checked on the server.',
  },
  {
    icon: Translate,
    title: 'In their own language',
    text: 'English, French, Chinese and Arabic, right to left. It answers in the language it was asked in, and explains a dish in a few sentences.',
  },
  {
    icon: CheckCircle,
    title: 'It never invents a dish',
    text: 'Only real, orderable items from your menu. Allergens and diets only from what you entered.',
  },
];

const NEVER = ['Refund a sale', 'Change a price', 'Delete a record', 'Add staff', 'Touch payment settings'];

function Exchange({ example }: { example: Example }) {
  return (
    <div className="mt-6 flex flex-col gap-2 rounded-xl bg-paper-deep p-4" aria-label="Example exchange">
      <p className="body-6 max-w-[88%] self-end rounded-2xl rounded-br-md bg-panel px-4 py-2 text-ink ring-1 ring-inset ring-line">
        {example.q}
      </p>
      <p className="body-6 max-w-[88%] self-start rounded-2xl rounded-bl-md bg-brand px-4 py-2 text-cream">{example.a}</p>
      {example.source && (
        <p className="caption-5 self-start rounded-md border border-line px-2 py-0.5 uppercase tracking-wider text-ink-mute">
          {example.source}
        </p>
      )}
    </div>
  );
}

export default function ApexPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="apex-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal>
            <div className="flex items-center gap-4">
              <LineEmblem line="apex" />
              <p className="caption-4 uppercase tracking-widest text-brand">Apex · the AI assistant</p>
            </div>
            <h1 id="apex-title" className="heading-1 mt-8">
              Ask in plain words. Get numbers you can check.
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              Apex lives in Ourea, Iris and Cael. It looks things up in your own records, acts only once you
              confirm, and tells you what deserves a look before you ask. The same beaver helps your guests
              order.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#talk">Talk to our team</Button>
              <Button href="#abilities" variant="secondary">
                See what it does
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10 md:p-10">
              <ApexBeaver />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Two faces */}
      <section aria-labelledby="faces-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="faces-title" className="heading-3">
              One beaver, two jobs
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Behind the counter it works for you. On the table’s QR code it works for your guests. Both only
              ever speak from your store’s own data.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ScrollReveal>
              <a
                href="#abilities"
                className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-8 transition-[transform,border-color] duration-500 ease-gs hover:-translate-y-1 hover:border-brand/50"
              >
                <p className="caption-4 uppercase tracking-widest text-ink-mute">For you</p>
                <h3 className="heading-5 mt-2">Apex, in Ourea, Iris and Cael</h3>
                <p className="body-5 mt-3 text-ink-soft">
                  Owners and managers ask about sales, stock, staff and money, record things by voice or in a
                  sentence, and get alerts and reports.
                </p>
                <span className="body-5 mt-auto inline-flex items-center gap-1 pt-6 text-brand-dark">
                  What it does for you
                  <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
                </span>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <a
                href="#guests"
                className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-8 transition-[transform,border-color] duration-500 ease-gs hover:-translate-y-1 hover:border-brand/50"
              >
                <p className="caption-4 uppercase tracking-widest text-ink-mute">For your guests</p>
                <h3 className="heading-5 mt-2">The beaver, in Ourea Scan</h3>
                <p className="body-5 mt-3 text-ink-soft">
                  Guests scan the table’s code and order in one sentence, in their own language, with help
                  choosing the right amount.
                </p>
                <span className="body-5 mt-auto inline-flex items-center gap-1 pt-6 text-brand-dark">
                  What it does for guests
                  <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-gs group-hover:translate-x-1" />
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* For you: four abilities */}
      <section id="abilities" aria-labelledby="abilities-title" className="scroll-mt-24 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <p className="caption-4 uppercase tracking-widest text-brand">For you</p>
            <h2 id="abilities-title" className="heading-3 mt-3">
              It looks up, it does, it speaks up, it writes
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {ABILITIES.map((ab, i) => (
              <li key={ab.title}>
                <ScrollReveal delay={(i % 2) * 80} className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 md:p-8">
                  <ab.icon size={28} className="text-brand" />
                  <h3 className="heading-5 mt-4">{ab.title}</h3>
                  <p className="body-5 mt-3 text-ink-soft">{ab.text}</p>
                  <div className="mt-auto">
                    <Exchange example={ab.example} />
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <p className="caption-2 mt-4 text-ink-mute">Example questions. Answers show the kind of reply, not a real store’s figures.</p>

          {/* the trust story */}
          <ScrollReveal className="mt-16 rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10 md:p-10">
            <h3 className="heading-4 text-cream">How it keeps the numbers honest</h3>
            <ol className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {HONEST.map((h) => (
                <li key={h.n} className="border-t border-white/15 pt-6">
                  <span className="caption-3 text-brand">{h.n}</span>
                  <p className="title-2 mt-2 text-cream">{h.title}</p>
                  <p className="body-6 mt-2 text-[#B9AF9E]">{h.text}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {MORE.map((m, i) => (
              <li key={m.title}>
                <ScrollReveal delay={i * 80} className="border-t border-line pt-6">
                  <m.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{m.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{m.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* For guests */}
      <section id="guests" aria-labelledby="guests-title" className="scroll-mt-24 border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <p className="caption-4 uppercase tracking-widest text-brand">For your guests · Ourea Scan</p>
            <h2 id="guests-title" className="heading-3 mt-3">
              Your guests order in one sentence, in their own language
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              The table’s QR code opens your menu on the guest’s phone, with the beaver ready to help. Orders go
              straight to the kitchen, or wait for your staff if you prefer.
            </p>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {GUESTS.map((g, i) => (
              <li key={g.title}>
                <ScrollReveal delay={(i % 2) * 80} className="border-t border-line-strong pt-6">
                  <g.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{g.title}</h3>
                  <p className="body-5 mt-2 text-ink-soft">{g.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What it never does */}
      <section aria-labelledby="never-title" className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <ScrollReveal>
            <h2 id="never-title" className="heading-3">
              It suggests. You decide.
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Apex never changes your money or your setup on its own. Asked to, it tells you where to do it
              yourself. Text in your item names and notes is read as data, never as instructions.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ul className="flex flex-wrap gap-3" aria-label="Things Apex never does">
              {NEVER.map((n) => (
                <li key={n} className="body-5 inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-4 py-3 text-ink-soft">
                  <Prohibit size={18} className="text-brand" />
                  {n}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 pb-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                Ask Apex about your store
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                Tell us how you run your counter or your tables. We will show you what Apex can answer from your
                own records.
              </p>
            </div>
            <QuickContact />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
