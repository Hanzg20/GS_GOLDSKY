'use client';

import { useEffect, useRef, useState } from 'react';
import { NIGHT, type NightId } from '@/lib/nightPhotos';
import { cn } from '@/lib/utils';

// A dark theme photograph (lib/nightPhotos.ts). Lazy, so pages in the light
// theme, where it is display:none, never download it. If the file isn't there
// yet it falls back to a dusk gradient carrying the spot's name and size.
export function NightPhoto({
  id,
  className,
  imgClassName,
  sizes = '100vw',
  decorative = false,
}: {
  id: NightId;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** background picture behind text: empty alt */
  decorative?: boolean;
}) {
  const p = NIGHT[id];
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  // an error that fired before hydration is not replayed, so check once
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0 && el.currentSrc) setMissing(true);
  }, []);

  return (
    <div className={cn('relative overflow-hidden bg-[#0b0c0f]', className)}>
      {missing ? (
        <div
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : p.alt}
          className="absolute inset-0 bg-[radial-gradient(120%_75%_at_65%_100%,#7a5238_0%,#2c3446_42%,#0b0d12_100%)]"
        >
          <p
            className={cn(
              'absolute right-4 max-w-[80%] text-right font-mono text-[11px] leading-4 text-white/55',
              // backgrounds carry text and shading at the bottom left: label top right
              decorative ? 'right-[10%] top-32' : 'bottom-4',
            )}
          >
            夜间照片 · {p.title}
            <br />
            {p.src.replace('/images/', 'public/images/')} · {p.w}×{p.h}
          </p>
        </div>
      ) : (
        // static export: plain img, no Image Optimization
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={p.src}
          sizes={sizes}
          width={p.w}
          height={p.h}
          alt={decorative ? '' : p.alt}
          loading="lazy"
          decoding="async"
          onError={() => setMissing(true)}
          className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  );
}
