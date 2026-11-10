import { cn } from '@/lib/utils';

// Shared vocabulary for every illustration (docs/IMAGE_STYLE.md).
// Theme aware: the neutrals are CSS variables (app/globals.css), so the art
// turns into a night engraving in dark mode. The orange never changes.
export const C = {
  paper: 'var(--art-paper)',
  paperDeep: 'var(--art-paper-deep)',
  mass: 'var(--art-mass)',
  ink: 'var(--art-ink)',
  mute: 'var(--art-mute)',
  accent: '#C8661A',
  sky: '#6E8FA6',
} as const;

/** Outline stroke: 1.5px at any rendered size. */
export const ink = {
  stroke: C.ink,
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const;

/** Hatching / distant line: 1px soft ink. */
export const hatch = {
  stroke: C.mute,
  strokeWidth: 1,
  strokeLinecap: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const;

/** Parallel horizontal hatching lines, the engraving texture used for sky and ground. */
export function HLines({
  x1,
  x2,
  y1,
  y2,
  gap,
  opacity = 0.45,
  stagger = 0,
  color = C.mute,
}: {
  color?: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  gap: number;
  opacity?: number;
  /** shorten alternate lines by this much on each side, for a hand-cut feel */
  stagger?: number;
}) {
  const lines = [];
  for (let y = y1, i = 0; y <= y2; y += gap, i++) {
    const inset = i % 2 ? stagger : 0;
    lines.push(<line key={y} x1={x1 + inset} x2={x2 - inset} y1={y} y2={y} {...hatch} stroke={color} />);
  }
  return <g opacity={opacity}>{lines}</g>;
}

/** Frame every illustration sits in: rounded, hairline border, paper grain. */
export function ArtFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('paper-grain overflow-hidden rounded-2xl border border-line bg-paper-deep', className)}>
      {children}
    </div>
  );
}
