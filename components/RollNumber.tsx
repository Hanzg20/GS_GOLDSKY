'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// A single digit that rolls up from 0 to its value, like a counter wheel,
// the first time it comes into view. Rendered at its final value on the
// server (no JS or reduced motion: the real number, no motion).
export function RollNumber({ value, delay = 0, className }: { value: number; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<'final' | 'ready' | 'rolling'>('final');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already on screen: leave it
    setState('ready');
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => setState('rolling'));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const digits = Array.from({ length: value + 1 }, (_, i) => i);
  const at = state === 'ready' ? 0 : value;

  return (
    <span ref={ref} className={cn('relative inline-block h-[1.15em] overflow-hidden leading-none [font-variant-numeric:lining-nums_tabular-nums]', className)}>
      <span className="sr-only">{value}</span>
      <span
        aria-hidden
        className="flex select-none flex-col"
        style={{
          transform: `translateY(-${at * 1.15}em)`,
          transition: state === 'rolling' ? `transform 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms` : 'none',
        }}
      >
        {digits.map((d) => (
          <span key={d} className="flex h-[1.15em] items-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}
