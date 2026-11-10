'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Scroll scene for the hero. While the visitor scrolls through a tall wrapper,
// the inner frame stays pinned and the scroll position becomes CSS variables:
//   --sun          0.3 → 1   how far the sun has risen
//   --g1 … --g5    0 → 1     each guardian inking in, in order
//                            (Ourea, Iris, Aegis, Apex, Cael)
//   --hint         1 → 0     the "scroll" hint fading out
//   --p            0 → 1     raw progress, for parallax depth and the birds
// Only on lg+ screens tall enough to hold the frame, with motion allowed. Everywhere else the variables keep
// their CSS defaults (everything fully drawn) and the hero is a normal section.
// One rAF-throttled scroll listener; transforms and opacity only.

const STAGES = [0.06, 0.2, 0.34, 0.48, 0.62];
const VARS = ['--p', '--sun', '--hint', ...STAGES.map((_, i) => `--g${i + 1}`)];
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ScrollHero({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement> & {
  'data-hour'?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)');
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? clamp(-r.top / span) : 1;
      el.style.setProperty('--sun', (0.3 + 0.7 * clamp(p / 0.7)).toFixed(3));
      el.style.setProperty('--p', p.toFixed(3));
      el.style.setProperty('--hint', (1 - clamp(p / 0.06)).toFixed(3));
      STAGES.forEach((s, i) => el.style.setProperty(`--g${i + 1}`, clamp((p - s) / 0.14).toFixed(3)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const start = () => {
      el.dataset.pinned = '';
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    };
    const stop = () => {
      delete el.dataset.pinned;
      VARS.forEach((v) => el.style.removeProperty(v));
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const apply = () => (mq.matches ? start() : stop());

    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      stop();
    };
  }, []);

  return (
    <div ref={ref} {...rest} className={cn('scroll-hero group/hero', className)}>
      {children}
    </div>
  );
}
