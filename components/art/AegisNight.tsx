import { cn } from '@/lib/utils';

// The generated night engraving of a self serve car wash (docs/AI_IMAGE_PROMPT.md,
// home-aegis-night v3, second batch: no lettering, plate or maple leaf). A few
// glints twinkle over its stars so the scene stays alive like the rest of the
// page; they stop under prefers-reduced-motion. The hand drawn SVG version is
// still in ./AegisArt if we ever need to go back.
const GLINTS = [
  { x: 82, y: 11.4, s: 12, d: '0s' },
  { x: 98.2, y: 22.6, s: 9, d: '1.6s' },
];

export function AegisNight({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-[#34302A] bg-[#161410]', className)}>
      {/* static export: plain img, no Image Optimization */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/art/home-aegis-night.webp"
        srcSet="/images/art/home-aegis-night-720.webp 720w, /images/art/home-aegis-night.webp 1300w"
        sizes="(min-width: 1024px) 560px, 100vw"
        width={1300}
        height={1000}
        alt="Illustration: a self serve car wash at night under a crescent moon, one bay lit with a car inside, a payment terminal showing a contactless symbol, and a large shield glowing in the sky"
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
      {GLINTS.map((g) => (
        <span
          key={`${g.x}-${g.y}`}
          aria-hidden
          className="twinkle pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${g.x}%`, top: `${g.y}%`, width: g.s, height: g.s, animationDelay: g.d }}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#F5EEDC]" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#F5EEDC]" />
        </span>
      ))}
    </div>
  );
}
