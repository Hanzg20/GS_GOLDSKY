import { cn } from '@/lib/utils';

// Generated illustrations (docs/AI_IMAGE_PROMPT.md), exported to
// public/images/art/<name>.webp (1200 × 1500) and <name>-640.webp.
// Illustrations only: never stand-ins for real sites, terminals or people.
export const ART = {
  'line-ourea': {
    alt: 'Illustration: a cashier at a restaurant counter with a countertop terminal and a customer display, mountains through the window',
  },
  'line-iris': {
    alt: 'Illustration: a server walking through a bright restaurant toward the tables, a handheld device in hand',
  },
  'line-cael': {
    alt: 'Illustration: soft clouds over a row of small shops, a beam of warm light linking them',
  },
  'line-apex': {
    alt: 'Illustration: the view from a high summit at sunrise over a small town in a wide valley',
  },
  // the scenario picker on Home (batch C, 2026-11-23)
  'scene-fuel': {
    alt: 'Illustration: a driver paying at a self serve fuel pump under a canopy, pines and a snowy peak behind',
  },
  'scene-laundry': {
    alt: 'Illustration: a quiet laundromat on a winter morning, a customer at the card terminal on the wall between rows of washers',
  },
  'scene-wash': {
    alt: 'Illustration: a self serve car wash in daylight, someone rinsing a car in an open bay beside a payment terminal',
  },
  'scene-vend': {
    alt: 'Illustration: someone paying with a phone at a vending machine under a snowy porch roof at dusk',
  },
  'scene-firewood': {
    alt: 'Illustration: a wooden firewood kiosk at the edge of the pines at sunset, a payment terminal beside it, a customer carrying a bundle to the car',
  },
  'scene-ev': {
    alt: 'Illustration: a driver tapping a card on an electric vehicle charger, a plugged in car beside it',
  },
} as const;
export type ArtName = keyof typeof ART;

export function ArtImage({
  name,
  sizes = '(min-width: 1024px) 360px, 100vw',
  className,
  priority = false,
}: {
  name: ArtName;
  /** how wide it shows, so the browser picks the 640 or 1200 file */
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn('paper-grain overflow-hidden rounded-2xl border border-line bg-paper-deep', className)}>
      {/* static export: plain img, no Image Optimization */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/art/${name}.webp`}
        srcSet={`/images/art/${name}-640.webp 640w, /images/art/${name}.webp 1200w`}
        sizes={sizes}
        width={1200}
        height={1500}
        alt={ART[name].alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // dark theme: dim the cream paper a little so the print sits in the night page
        className="h-full w-full object-cover transition-[filter] duration-500 ease-gs dark:brightness-[.8] dark:contrast-[1.05]"
      />
    </div>
  );
}
