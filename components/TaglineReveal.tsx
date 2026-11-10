'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// B11: large type, words go from ~30% ink to full ink one at a time, in reading
// order, as the block crosses a trigger line. One scroll listener, throttled
// through requestAnimationFrame. Reduced motion: full colour from the start.
export function TaglineReveal({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = lines.map((l) => l.split(' '));
  const total = words.reduce((n, w) => n + w.length, 0);
  // Full colour until JS runs (no JS, or before hydration, the text must still
  // read). The section sits below the fold, so dimming on mount is never seen.
  const [lit, setLit] = useState(total);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setLit(0);

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts when the block's top reaches 85% of the viewport, done when it reaches 35%
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setLit((prev) => Math.max(prev, Math.round(progress * total))); // reveal once
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  let index = 0;
  return (
    <p ref={ref} className={cn('heading-2 max-w-prose', className)} aria-label={lines.join(' ')}>
      {words.map((lineWords, li) => (
        <span key={li} className="block" aria-hidden>
          {lineWords.map((w, wi) => {
            const i = index++;
            return (
              <span
                key={wi}
                className={cn(
                  'transition-opacity duration-500 ease-gs',
                  i < lit ? 'opacity-100' : 'opacity-30',
                )}
              >
                {w}
                {wi < lineWords.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}
