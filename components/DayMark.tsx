import { cn } from '@/lib/utils';

// The page is one day in a small Canadian town, from first light to the next
// morning. Each chapter is marked with the hour and a tiny sun on its arc:
// the site's one recurring symbol. Daytime: an orange sun on the horizon arc.
// Night: no sun, a pale crescent at the top (orange stays reserved for the day).
export function DayMark({
  hour,
  children,
  tone = 'light',
  className,
}: {
  /** 0 to 24 */
  hour: number;
  children: React.ReactNode;
  tone?: 'light' | 'dark' | 'brand';
  className?: string;
}) {
  const day = hour >= 6 && hour <= 18;
  // 06:00 at the left end of the arc, 12:00 on top, 18:00 at the right end
  const a = Math.PI * (1 - (Math.min(18, Math.max(6, hour)) - 6) / 12);
  const cx = 16 + 12 * Math.cos(a);
  const cy = 17 - 12 * Math.sin(a);
  const hh = String(Math.floor(hour) % 24).padStart(2, '0');
  const mm = String(Math.round((hour % 1) * 60)).padStart(2, '0');

  const color = {
    light: { line: 'rgb(var(--c-line-strong))', text: 'text-ink-mute', label: 'text-brand-dark', sun: '#C8661A' },
    dark: { line: '#4A453C', text: 'text-[#9C9384]', label: 'text-brand', sun: '#C8661A' },
    brand: { line: 'rgba(250,248,244,.5)', text: 'text-cream/70', label: 'text-cream', sun: '#FAF8F4' },
  }[tone];

  return (
    <p className={cn('flex items-center gap-3', className)}>
      <svg viewBox="0 0 32 20" className="h-5 w-8 shrink-0" aria-hidden>
        <path d="M4 17 A12 12 0 0 1 28 17" fill="none" stroke={color.line} strokeWidth={1} strokeDasharray="1.5 2.5" />
        <path d="M1 17 H31" stroke={color.line} strokeWidth={1} />
        {day ? (
          <circle cx={cx} cy={cy} r={3} fill={color.sun} />
        ) : (
          <>
            <circle cx={16} cy={6} r={3.2} fill="#EDE6D6" />
            <circle cx={17.6} cy={5} r={2.8} fill="rgb(var(--c-night))" />
          </>
        )}
      </svg>
      <span className={cn('caption-4 font-mono tabular-nums', color.text)}>
        {hh}:{mm}
      </span>
      <span aria-hidden className={cn('h-px w-4', tone === 'brand' ? 'bg-cream/50' : 'bg-line-strong')} />
      <span className={cn('caption-3 uppercase tracking-widest', color.label)}>{children}</span>
    </p>
  );
}
