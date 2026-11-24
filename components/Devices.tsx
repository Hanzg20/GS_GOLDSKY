import { cn } from '@/lib/utils';

// Front-view device frames for real screenshots on /ourea, drawn to the
// proportions of the hardware Ourea runs on (owner, 2026-11-23): a desktop POS
// shaped like the SUNMI D3 Pro (15.6" 16:9 screen, slim bezel, a column stand
// and a base with the receipt printer) and a WizarPOS handheld (printer on
// top, 9:16 screen, card slot at the foot). No maker logos are drawn. The
// screenshot sits in the screen area; any gap is the app's own dark colour.

type Shot = { src: string; alt: string; w: number; h: number };

const APP_BG = '#0B0D12';

function ScreenImg({ s, eager, fit = 'contain', top = false }: { s: Shot; eager?: boolean; fit?: 'contain' | 'cover'; top?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.src}
      alt={s.alt}
      width={s.w}
      height={s.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain', top ? 'object-top' : 'object-center')}
    />
  );
}

/** Desktop POS: 1000 × 760 drawing; the screen is 884 × 497 (16:9) at 58, 38. */
export function CounterPOS({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: '1000 / 760' }}>
      <svg viewBox="0 0 1000 760" aria-hidden className="absolute inset-0 h-full w-full">
        {/* shadow on the counter */}
        <ellipse cx="500" cy="738" rx="300" ry="14" fill="rgba(31,29,26,0.18)" />
        {/* base, with the printer's paper slot and cover seam */}
        <path d="M250 676 Q250 652 276 652 H724 Q750 652 750 676 V716 Q750 732 734 732 H266 Q250 732 250 716 Z" fill="#1C1F25" />
        <path d="M262 664 H738" stroke="#2C3038" strokeWidth="3" />
        <rect x="350" y="672" width="300" height="8" rx="4" fill="#0E1014" />
        <circle cx="710" cy="704" r="5" fill="#3A3F48" />
        {/* column */}
        <path d="M440 556 H560 L588 656 H412 Z" fill="#23262D" />
        <path d="M452 556 H548 L560 600 H440 Z" fill="#2C3038" />
        {/* the display: body, then the glass */}
        <rect x="36" y="16" width="928" height="548" rx="24" fill="#16181D" />
        <rect x="40" y="20" width="920" height="540" rx="21" fill="#0F1115" />
        <rect x="58" y="38" width="884" height="497" rx="6" fill={APP_BG} />
        {/* chin: the camera dot and a hairline highlight on the bezel */}
        <circle cx="500" cy="548" r="3.5" fill="#2A2E36" />
        <rect x="40" y="20" width="920" height="540" rx="21" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      </svg>
      <div
        className="absolute overflow-hidden rounded-[0.6%]"
        style={{ left: '5.8%', top: '5%', width: '88.4%', height: '65.4%', background: APP_BG }}
      >
        <ScreenImg s={s} eager={eager} />
      </div>
    </div>
  );
}

/** Handheld POS: 400 × 860 drawing; the screen is 304 × 540 (9:16) at 48, 120. */
export function HandheldPOS({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: '400 / 860' }}>
      <svg viewBox="0 0 400 860" aria-hidden className="absolute inset-0 h-full w-full">
        <ellipse cx="200" cy="846" rx="150" ry="10" fill="rgba(31,29,26,0.18)" />
        {/* the printer on top, with its paper slot */}
        <rect x="56" y="14" width="288" height="96" rx="34" fill="#23262D" />
        <rect x="104" y="30" width="192" height="8" rx="4" fill="#0E1014" />
        {/* body */}
        <rect x="20" y="64" width="360" height="772" rx="50" fill="#1A1C22" />
        <rect x="24" y="68" width="352" height="764" rx="47" fill="#121419" />
        <rect x="48" y="120" width="304" height="540" rx="10" fill={APP_BG} />
        {/* below the screen: the keys and the card slot at the foot */}
        <rect x="150" y="700" width="100" height="10" rx="5" fill="#2A2E36" />
        <rect x="120" y="796" width="160" height="10" rx="5" fill="#0B0C10" />
        <circle cx="200" cy="96" r="4" fill="#2A2E36" />
        <rect x="24" y="68" width="352" height="764" rx="47" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      </svg>
      <div
        className="absolute overflow-hidden rounded-[3%]"
        style={{ left: '12%', top: '13.95%', width: '76%', height: '62.8%', background: APP_BG }}
      >
        <ScreenImg s={s} eager={eager} top />
      </div>
    </div>
  );
}
