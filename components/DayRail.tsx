'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// The clock of "one day in town": a slim rail fixed at the left edge on wide
// screens. As the page scrolls, the sun travels down the rail and the time
// ticks from 06:00 to the next morning, following the sections marked with
// data-hour. Colours follow the section underneath (data-tone).
// Purely decorative (aria-hidden); the DayMark labels carry the same words.

const TICKS = [
  { h: 6, label: '06' },
  { h: 12, label: '12' },
  { h: 18, label: '18' },
  { h: 24, label: '00' },
  { h: 30, label: '06' },
];
const span = (h: number) => (h - 6) / 24; // 06:00 → 0, next 06:00 → 1

export function DayRail() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const time = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    let last = '';

    const update = () => {
      raf = 0;
      const marks = Array.from(document.querySelectorAll<HTMLElement>('[data-hour]'));
      if (!marks.length) return;
      const mid = window.innerHeight * 0.5;
      const rects = marks.map((m) => m.getBoundingClientRect());
      const tops = rects.map((r) => r.top);
      // the first chapter starts counting only once the page moves, so the
      // clock reads exactly 06:00 at the very top
      tops[0] = Math.min(tops[0], 0) + mid;
      let i = 0;
      while (i < marks.length - 1 && tops[i + 1] <= mid) i++;
      const h0 = Number(marks[i].dataset.hour);
      let hour = h0;
      if (i < marks.length - 1 && tops[i] <= mid) {
        const h1 = Number(marks[i + 1].dataset.hour);
        hour = h0 + (h1 - h0) * Math.min(1, (mid - tops[i]) / (tops[i + 1] - tops[i]));
      }
      // past the last chapter (footer): fade away
      const lastBottom = marks[marks.length - 1].getBoundingClientRect().bottom;
      el.style.opacity = lastBottom < mid ? '0' : '1';

      // colour of whatever section is actually under the rail's middle
      const under = rects[i].top <= mid && rects[i].bottom > mid ? marks[i] : null;
      const tone = under?.dataset.tone ?? 'light';
      if (el.dataset.tone !== tone) el.dataset.tone = tone;
      const night = hour % 24 >= 20 || hour % 24 < 5;
      el.dataset.night = night ? 'true' : 'false';

      if (dot.current) dot.current.style.top = `${(span(hour) * 100).toFixed(2)}%`;
      const mins = Math.round(((hour % 24) * 60) / 5) * 5;
      const label = `${String(Math.floor(mins / 60) % 24).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
      if (label !== last && time.current) {
        time.current.textContent = label;
        last = label;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      data-tone="light"
      className={cn(
        'group/rail pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 transition-[opacity,color] duration-500 ease-gs xl:flex dark:xl:hidden',
        'text-ink-mute data-[tone=brand]:text-cream/80 data-[tone=dark]:text-[#9C9384]',
      )}
    >
      <div className="relative h-60 w-px bg-current opacity-60">
        {TICKS.map((t) => (
          <span
            key={t.h}
            className="absolute left-1/2 flex -translate-y-1/2 items-center"
            style={{ top: `${span(t.h) * 100}%` }}
          >
            <span className="h-px w-2 -translate-x-1/2 bg-current" />
            <span className="caption-5 absolute left-3 font-mono tabular-nums">{t.label}</span>
          </span>
        ))}
        <span
          ref={dot}
          className={cn(
            'absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[top,background-color] duration-300 ease-gs',
            'bg-brand group-data-[tone=brand]/rail:bg-cream group-data-[night=true]/rail:bg-[#EDE6D6]',
          )}
          style={{ top: '0%' }}
        />
      </div>
      <span ref={time} className="caption-4 font-mono tabular-nums">
        06:00
      </span>
    </div>
  );
}
