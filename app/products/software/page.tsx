import type { Metadata } from 'next';
import {
  Heartbeat,
  Images,
  Palette,
  Receipt,
  Storefront,
  Tag,
  Television,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LineArt } from '@/components/LineArt';
import { QuickContact } from '@/components/QuickContact';

export const metadata: Metadata = {
  title: 'Cael · Every store in one place',
  description:
    'Cael is the GoldSky cloud console: prices, products, screens, ads, coupons and sales for every store and terminal, managed from anywhere, with Apex to ask across stores.',
};

// Cael, from the Cael table in docs/CAPABILITIES.md (✅ lines only). Remote
// void/refund is GoldSky admins only, so it is not offered to owners here.
// Distributor roles are 🔵 and stay out. No CSV, accounting, webhook or IoT
// claims: there is no source for them.

const FEATURES = [
  { icon: Tag, title: 'Prices and products', text: 'Set once, published to the terminals. Partner machine slots, sold out and tile pictures included.' },
  { icon: Images, title: 'Menus that sell', text: 'Dish photos and English and Chinese names, used directly in QR ordering at the table.' },
  { icon: Palette, title: 'Your brand on every screen', text: 'Logo, merchant name and welcome text, sent to each terminal.' },
  { icon: Television, title: 'Ad playlists', text: 'A playlist per device for the idle screen, with proof of play.' },
  { icon: Ticket, title: 'Coupons in bulk', text: 'Single use by default, with the store’s own terms printed on the ticket.' },
  { icon: Receipt, title: 'Every sale', text: 'A transaction monitor across stores, each sale with its order id.' },
  { icon: Heartbeat, title: 'Device health', text: 'Heartbeat and diagnostics for every terminal; reboot or lock one remotely.' },
  { icon: Storefront, title: 'Stores and devices', text: 'Organizations, locations and terminals; move a terminal to another store when you need to.' },
];

export default function CaelPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="cael-title" className="px-4 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="caption-4 uppercase tracking-widest text-brand">Cael · the cloud</p>
            <h1 id="cael-title" className="heading-1 mt-6">
              Every store in one place
            </h1>
            <p className="body-2 mt-6 max-w-prose text-ink-soft">
              Prices, menus, screens, ads, coupons and sales for every counter, handheld and machine you run,
              managed from anywhere.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <LineArt line="cael" night="sites" />
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="border-y border-line bg-paper-deep px-4 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal className="max-w-prose">
            <h2 id="features-title" className="heading-3">
              What you manage from Cael
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <li key={f.title}>
                <ScrollReveal delay={(i % 4) * 80} className="border-t border-line-strong pt-6">
                  <f.icon size={24} className="text-brand" />
                  <h3 className="title-2 mt-4">{f.title}</h3>
                  <p className="body-6 mt-2 text-ink-soft">{f.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Apex across stores */}
      <section aria-labelledby="apex-title" className="px-4 py-16 md:py-24">
        <ScrollReveal className="mx-auto grid max-w-content grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 id="apex-title" className="heading-3">
              Ask across your stores
            </h2>
            <p className="body-3 mt-4 text-ink-soft">
              Apex lives in Cael too. Owners with several stores ask “which store did best this week” and get an
              answer from their own stores only, with store alerts and side‑by‑side comparisons.
            </p>
            <a href="/apex" className="body-5 mt-6 inline-block text-brand-dark underline-offset-4 hover:underline">
              More on Apex
            </a>
          </div>
          <div className="rounded-2xl bg-night p-6 dark:ring-1 dark:ring-inset dark:ring-white/10 md:p-8">
            <p className="caption-4 uppercase tracking-widest text-[#9C9384]">You ask</p>
            <p className="body-3 mt-2 text-cream">Which store did best this week?</p>
            <p className="caption-4 mt-6 uppercase tracking-widest text-[#9C9384]">Apex answers</p>
            <p className="body-4 mt-2 text-[#B9AF9E]">
              With the numbers from your sales records and a source under each one. Nothing estimated.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Settlement note */}
      <section aria-label="Where the money goes" className="border-y border-line bg-paper-deep px-4 py-12 md:py-16">
        <ScrollReveal className="mx-auto max-w-content">
          <p className="body-3 max-w-prose text-ink-soft">
            <strong className="text-ink">Card sales settle straight into the store’s own bank account.</strong>{' '}
            Cael shows them; it does not hold your money.
          </p>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section id="talk" aria-labelledby="talk-title" className="scroll-mt-24 px-4 py-24">
        <ScrollReveal>
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 rounded-2xl bg-night px-6 py-12 dark:ring-1 dark:ring-inset dark:ring-white/10 md:px-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 id="talk-title" className="heading-2 text-cream">
                Running several sites?
              </h2>
              <p className="body-3 mt-4 text-[#B9AF9E]">
                Tell us how many stores and terminals, and we will show you Cael with your own setup in mind.
              </p>
            </div>
            <QuickContact defaultSite="Several sites" messageHint="How many stores and terminals, and what they are" />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
