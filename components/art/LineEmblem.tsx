import { cn } from '@/lib/utils';
import { C } from './shared';

export type LineId = 'ourea' | 'iris' | 'aegis' | 'apex' | 'cael';

// The five product line marks (docs/ICON_PROMPT.md, 2026-11-09). The shape
// tells them apart; the Chinese seal carries the character. Chosen from the
// Doubao studies in D:\MYAPP\goldsky-art-masters\icons (set 15 for the shapes,
// 10 to 12 for the seal, 14 for the Aegis badges) and redrawn on a 48 grid:
// one bold stroke, round caps, ink plus a single touch of orange.
//   Ourea  wide, low twin peaks, solid      (holds steady)
//   Iris   three arcs: rainbow and tap waves
//   Aegis  shield with a check
//   Apex   tall open peak, an orange star at the top
//   Cael   cloud wired to three places
const W = 3.2;

function stroke(color: string = C.ink) {
  return {
    stroke: color,
    strokeWidth: W,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  } as const;
}

const SHIELD = 'M24 5 L39 10.5 V23 C39 33 32.5 40 24 43.5 C15.5 40 9 33 9 23 V10.5 Z';

function Glyph({ line, ink = C.ink, paper = C.paper }: { line: LineId; ink?: string; paper?: string }) {
  const s = stroke(ink);
  switch (line) {
    case 'ourea':
      return (
        <>
          <path d="M3.5 40 L17 15.5 L25 28 L31.5 19 L44.5 40 Z" {...s} fill={ink} />
          {/* snow caps */}
          <path d="M13 22.8 L17 15.5 L21 22.8 L19 21.2 L17 23.4 L15 21.2 Z" fill={paper} />
          <path d="M28.6 23 L31.5 19 L34.4 23 L33 22 L31.5 23.6 L30 22 Z" fill={paper} />
        </>
      );
    case 'iris':
      return (
        <>
          <path d="M6 36 A18 18 0 0 1 42 36" {...s} />
          <path d="M11.8 36 A12.2 12.2 0 0 1 36.2 36" {...s} />
          <path d="M17.6 36 A6.4 6.4 0 0 1 30.4 36" {...stroke(C.accent)} />
          <path d="M4.5 41.5 H43.5" {...s} />
        </>
      );
    case 'aegis':
      return (
        <>
          <path d={SHIELD} {...s} />
          <path d="M17 24 L22 29 L31.5 19" {...s} />
        </>
      );
    case 'apex':
      return (
        <>
          <path d="M21 10 L37 40 H5 Z" {...s} />
          <path d="M34 3 L35.5 7.5 L40 9 L35.5 10.5 L34 15 L32.5 10.5 L28 9 L32.5 7.5 Z" fill={C.accent} />
        </>
      );
    case 'cael':
      return (
        <>
          <path d="M13 28 a8.5 8.5 0 1 1 1.6-16.8 a11 11 0 0 1 21.2 2.4 A7.5 7.5 0 0 1 34.5 28 Z" {...s} />
          <path d="M24 28 V36.5 M24 32.5 L14.5 37 M24 32.5 L33.5 37" {...s} strokeWidth={2.2} />
          {[
            [13.5, 38.5],
            [24, 40],
            [34.5, 38.5],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r={2.6} {...s} strokeWidth={2.2} fill={paper} />
          ))}
        </>
      );
  }
}

const SEAL: Record<LineId, { char: string; label: string }> = {
  ourea: { char: '山', label: 'mountain' },
  iris: { char: '虹', label: 'rainbow' },
  aegis: { char: '盾', label: 'shield' },
  apex: { char: '峰', label: 'summit' },
  cael: { char: '云', label: 'cloud' },
};

/** Bare mark for small sizes (16 to 24px): navigation, inline lists. No seal. */
export function LineIcon({ line, className }: { line: LineId; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn('h-6 w-6', className)} role="img" aria-label={`Symbol: ${SEAL[line].label}`}>
      <Glyph line={line} />
    </svg>
  );
}

/** Medallion (48 to 64px): the mark in a circle, the Chinese seal at its lower right. */
export function LineEmblem({ line, className }: { line: LineId; className?: string }) {
  const seal = SEAL[line];
  return (
    <div className={cn('relative h-16 w-16 shrink-0', className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper">
        <svg viewBox="0 0 48 48" className="h-9 w-9" role="img" aria-label={`Symbol: ${seal.label}`}>
          <Glyph line={line} />
        </svg>
      </div>
      <span
        aria-hidden
        className="absolute -bottom-1 -right-1.5 flex h-7 w-7 items-center justify-center rounded-[5px] bg-brand font-seal text-sm leading-none text-cream shadow-[0_0_0_2px_rgb(var(--c-paper))]"
      >
        {seal.char}
      </span>
    </div>
  );
}

export type AegisApp = 'wash' | 'timer' | 'vend' | 'flex' | 'laundry' | 'ev';

const BADGE: Record<AegisApp, { label: string; glyph: React.ReactNode }> = {
  wash: {
    label: 'water drop',
    glyph: <path d="M36 29.5 C34 32.2 31.6 34.8 31.6 37.4 a4.4 4.4 0 0 0 8.8 0 C40.4 34.8 38 32.2 36 29.5 Z" fill="#FAF8F4" />,
  },
  timer: {
    label: 'hourglass',
    glyph: (
      <path
        d="M32 30 H40 M32 42 H40 M33.2 30 C33.2 34 38.8 34 38.8 36 C38.8 38 33.2 38 33.2 42 M38.8 30 C38.8 34 33.2 34 33.2 36 C33.2 38 38.8 38 38.8 42"
        stroke="#FAF8F4"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  vend: {
    label: 'vending window',
    glyph: (
      <g stroke="#FAF8F4" strokeWidth={1.6} fill="none" strokeLinejoin="round">
        <rect x={31.5} y={30} width={9} height={12} rx={1.2} />
        <path d="M36 30 V38 M31.5 34 H40.5 M31.5 38 H40.5" />
      </g>
    ),
  },
  flex: {
    label: 'flame',
    glyph: (
      <path
        d="M36 28.8 C38.6 31.6 40.6 34 40.6 37.6 a4.6 4.6 0 0 1 -9.2 0 C31.4 35.6 32.6 34 33.6 32.6 C34.3 34 35 34.8 35.9 35 C36.3 33.2 36.3 31 36 28.8 Z"
        fill="#FAF8F4"
      />
    ),
  },
  laundry: {
    label: 'washer door',
    glyph: (
      <g stroke="#FAF8F4" strokeWidth={1.6} fill="none">
        <circle cx={36} cy={36} r={5} />
        <circle cx={36} cy={36} r={2} />
      </g>
    ),
  },
  ev: {
    label: 'lightning',
    glyph: <path d="M37.6 28.8 L32 37.2 H36 L34.4 43.2 L40 34.8 H36 Z" fill="#FAF8F4" />,
  },
};

/** Aegis family: the same shield for every app, an orange badge says which. */
export function AegisAppIcon({
  app,
  inverse = false,
  className,
}: {
  app: AegisApp;
  /** on a night panel: cream shield */
  inverse?: boolean;
  className?: string;
}) {
  const ink = inverse ? '#FAF8F4' : C.ink;
  const ring = inverse ? 'rgb(var(--c-night))' : C.paper;
  return (
    <svg viewBox="0 0 48 48" className={cn('h-8 w-8', className)} role="img" aria-label={`Aegis, ${BADGE[app].label}`}>
      <path d={SHIELD} {...stroke(ink)} />
      <path d="M17 24 L22 29 L31.5 19" {...stroke(ink)} />
      <circle cx={36} cy={36} r={10.5} fill={C.accent} stroke={ring} strokeWidth={2.5} />
      {BADGE[app].glyph}
    </svg>
  );
}
