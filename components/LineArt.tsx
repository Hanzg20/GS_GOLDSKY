import { NightPhoto } from '@/components/NightPhoto';
import type { NightId } from '@/lib/nightPhotos';
import { cn } from '@/lib/utils';

// The light-theme illustration of a product line with its night photo for the
// dark theme, in a rounded frame (same treatment as the Products page).
const ART = {
  ourea: { file: 'line-ourea', alt: 'Illustration: a cashier at a restaurant counter with a countertop terminal' },
  iris: { file: 'line-iris', alt: 'Illustration: a server walking through a restaurant with a handheld device' },
  cael: { file: 'line-cael', alt: 'Illustration: soft clouds over a row of small shops, a beam of light linking them' },
} as const;

export function LineArt({
  line,
  night,
  className,
}: {
  line: keyof typeof ART;
  night: NightId;
  className?: string;
}) {
  const a = ART[line];
  return (
    <div className={cn('relative aspect-[4/3] overflow-hidden rounded-2xl border border-line dark:border-0', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/art/${a.file}-640.webp`}
        srcSet={`/images/art/${a.file}-640.webp 640w, /images/art/${a.file}.webp 1200w`}
        sizes="(min-width: 1024px) 560px, 100vw"
        alt={a.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover dark:hidden"
      />
      <NightPhoto id={night} className="hidden h-full w-full dark:block" sizes="(min-width: 1024px) 560px, 100vw" />
    </div>
  );
}
