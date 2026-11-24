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

// WizarPOS frames, from the makers' datasheets (2025-10):
//   Q2      188 × 85 mm, 5.5" 720 × 1280, 58 mm printer on top, light grey
//   Q3 Pro  166 × 78 mm, 6.5" 720 × 1600, slim, punch hole camera, black
//   Q3mini  93.7 × 83.9 mm, 4" 480 × 480, chip slot on the top edge, white

/** WizarPOS Q2: 425 × 940 drawing; the screen is 340 × 604 (9:16) at 42.5, 300. */
export function WizarQ2({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: '425 / 940' }}>
      <svg viewBox="0 0 425 940" aria-hidden className="absolute inset-0 h-full w-full">
        <ellipse cx="212" cy="930" rx="160" ry="9" fill="rgba(31,29,26,0.16)" />
        {/* printer on top: housing, paper slot, tear bar */}
        <rect x="60" y="8" width="305" height="150" rx="42" fill="#DCDFE3" stroke="#C3C7CD" strokeWidth="2" />
        <rect x="104" y="34" width="217" height="10" rx="5" fill="#9AA0A8" />
        <rect x="96" y="52" width="233" height="4" rx="2" fill="#C3C7CD" />
        {/* body */}
        <rect x="8" y="72" width="409" height="852" rx="50" fill="#ECEEF0" stroke="#C9CDD2" strokeWidth="2" />
        <rect x="2" y="330" width="6" height="64" rx="3" fill="#C9CDD2" />
        <rect x="2" y="410" width="6" height="40" rx="3" fill="#C9CDD2" />
        <rect x="417" y="360" width="5" height="110" rx="2.5" fill="#B9BEC5" />
        {/* top bezel: speaker and camera */}
        <rect x="182" y="244" width="60" height="6" rx="3" fill="#C3C7CD" />
        <circle cx="262" cy="247" r="7" fill="#2A2E36" />
        {/* glass */}
        <rect x="34" y="290" width="357" height="622" rx="20" fill="#0E1014" />
        <rect x="42.5" y="300" width="340" height="604" rx="8" fill={APP_BG} />
      </svg>
      <div className="absolute overflow-hidden rounded-[2%]" style={{ left: '10%', top: '31.91%', width: '80%', height: '64.26%', background: APP_BG }}>
        <ScreenImg s={s} eager={eager} top />
      </div>
    </div>
  );
}

/** WizarPOS Q3 Pro: 390 × 830 drawing; the screen is 358 × 796 (9:20) at 16, 17. */
export function WizarQ3Pro({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: '390 / 830' }}>
      <svg viewBox="0 0 390 830" aria-hidden className="absolute inset-0 h-full w-full">
        <rect x="0" y="190" width="5" height="60" rx="2.5" fill="#2A2C31" />
        <rect x="0" y="270" width="5" height="80" rx="2.5" fill="#2A2C31" />
        <rect x="385" y="240" width="5" height="110" rx="2.5" fill="#2A2C31" />
        <rect x="4" y="4" width="382" height="822" rx="50" fill="#1B1C20" />
        <rect x="4" y="4" width="382" height="822" rx="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <rect x="16" y="17" width="358" height="796" rx="40" fill={APP_BG} />
      </svg>
      <div className="absolute overflow-hidden rounded-[10%/4.6%]" style={{ left: '4.1%', top: '2.05%', width: '91.8%', height: '95.9%', background: APP_BG }}>
        <ScreenImg s={s} eager={eager} top />
      </div>
      {/* the punch hole camera sits over the screen */}
      <span aria-hidden className="absolute left-1/2 top-[3.6%] h-[1.7%] w-[3.6%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
    </div>
  );
}

/** WizarPOS Q3mini: 420 × 470 drawing; the screen is 320 × 320 at 50, 88. */
export function WizarQ3mini({ s, className, eager }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: '420 / 470' }}>
      <svg viewBox="0 0 420 470" aria-hidden className="absolute inset-0 h-full w-full">
        {/* chip card slot on the top edge */}
        <rect x="140" y="0" width="140" height="10" rx="4" fill="#C3C7CD" />
        <rect x="6" y="6" width="408" height="458" rx="58" fill="#F1F2F4" stroke="#CDD1D6" strokeWidth="2" />
        <rect x="414" y="140" width="5" height="60" rx="2.5" fill="#CDD1D6" />
        <circle cx="210" cy="44" r="7" fill="#2A2E36" />
        <rect x="40" y="78" width="340" height="340" rx="18" fill="#0E1014" />
        <rect x="50" y="88" width="320" height="320" rx="6" fill={APP_BG} />
      </svg>
      <div className="absolute overflow-hidden rounded-[2%]" style={{ left: '11.9%', top: '18.72%', width: '76.19%', height: '68.09%', background: APP_BG }}>
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
