import { ArtFrame, C, HLines, hatch, ink } from './shared';

const CLOUD = 'M13 36 a8.5 8.5 0 1 1 1.6-16.8 a11 11 0 0 1 21.2 2.4 A7.5 7.5 0 0 1 34.5 36 Z';

function Pine({ x, top, base = 400 }: { x: number; top: number; base?: number }) {
  const h = base - 10 - top;
  return (
    <g fill={C.paper} {...ink}>
      <path d={`M${x} ${base} V${base - 10}`} />
      <path
        d={`M${x} ${top} L${x + h * 0.36} ${top + h * 0.55} L${x + h * 0.2} ${top + h * 0.55} L${x + h * 0.45} ${base - 10} L${x - h * 0.45} ${base - 10} L${x - h * 0.2} ${top + h * 0.55} L${x - h * 0.36} ${top + h * 0.55} Z`}
      />
    </g>
  );
}

// Guardian n (1 Ourea, 2 Iris, 3 Aegis, 4 Apex, 5 Cael) inks in as --gn goes
// 0 → 1 (set by ScrollHero; defaults to 1, fully drawn).
const guardian = (n: number) => ({
  className: 'guardian',
  style: { opacity: `calc(0.14 + 0.86 * var(--g${n}, 1))` },
});

function Bay({ x, w }: { x: number; w: number }) {
  return (
    <>
      <path
        d={`M${x} 400 V340 Q${x} 326 ${x + 14} 326 H${x + w - 14} Q${x + w} 326 ${x + w} 340 V400`}
        fill={C.mass}
        {...ink}
      />
      <HLines x1={x + 6} x2={x + w - 6} y1={344} y2={396} gap={7} opacity={0.4} />
    </>
  );
}

// The hero panorama: a gold sky over a Canadian town. The five guardians are in
// the landscape (mountain, rainbow, shield sign, summit, cloud). The sun is the
// one accent; it rises once on load and the clouds drift (transform only, both
// stop under prefers-reduced-motion).
export function HeroPanorama({ className }: { className?: string }) {
  return (
    <ArtFrame className={className}>
      <svg
        viewBox="0 0 1200 520"
        role="img"
        aria-label="Illustration: a large golden sun rising behind mountains over a small Canadian town with a restaurant, a house, a self serve car wash, a vacuum station and a vending kiosk"
        className="block h-auto w-full"
      >
        <g className="par-sky">
          <HLines x1={40} x2={1160} y1={120} y2={392} gap={10} stagger={60} opacity={0.26} />
        </g>

        {/* rainbow (Iris) */}
        <g {...guardian(2)}>
          <g fill="none" opacity={0.55}>
            <path d="M40 400 A260 260 0 0 1 560 400" {...hatch} />
            <path d="M60 400 A240 240 0 0 1 540 400" {...hatch} />
            <path d="M80 400 A220 220 0 0 1 520 400" {...hatch} />
          </g>
        </g>

        {/* the sun: the one accent */}
        <g className="animate-sun-rise">
          <g className="sun-scroll">
            <circle cx={820} cy={318} r={124} fill={C.accent} />
          </g>
        </g>

        {/* clouds (Cael) */}
        <g {...guardian(5)}>
          <g className="par-cloud">
            <g className="animate-drift">
              <path d={CLOUD} transform="translate(110 40) scale(3.4)" fill={C.paper} {...ink} />
              <path d={CLOUD} transform="translate(1000 70) scale(2.4)" fill={C.paper} {...ink} />
            </g>
            <g className="animate-drift-slow">
              <path
                d={CLOUD}
                transform="translate(560 120) scale(1.8)"
                fill={C.paper}
                {...ink}
                opacity={0.75}
              />
            </g>
          </g>
        </g>

        {/* birds */}
        <g className="par-birds" fill="none" {...ink} strokeWidth={1.2}>
          <path d="M640 150 q8 -8 16 0 q8 -8 16 0" />
          <path d="M680 176 q5 -5 10 0 q5 -5 10 0" />
          <path d="M612 186 q4 -4 8 0 q4 -4 8 0" />
        </g>

        {/* ground fill: hides the sun below the horizon while it rises */}
        <rect x={0} y={400} width={1200} height={120} fill={C.paperDeep} />

        {/* far ridge the sun rises behind */}
        <path
          d="M540 400 L690 326 L790 350 L900 312 L1020 342 L1200 316 L1200 400 Z"
          fill={C.mass}
          {...ink}
        />
        <path d="M940 400 L1080 262 L1200 372 L1200 400 Z" fill={C.mass} {...ink} />
        <path d="M1063 279 L1080 262 L1098 279 L1088 275 L1080 284 L1072 275 Z" fill={C.paper} {...ink} />

        {/* main mountains (Ourea) and the summit (Apex) */}
        <g className="par-near">
          <g {...guardian(1)}>
            <path
              d="M0 400 L0 296 L92 218 L142 262 L262 118 L352 236 L402 200 L540 400 Z"
              fill={C.mass}
              {...ink}
            />
            <g opacity={0.5}>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={i}
                  x1={276 + i * 9}
                  y1={170 + i * 14}
                  x2={294 + i * 11}
                  y2={194 + i * 16}
                  {...hatch}
                />
              ))}
            </g>
          </g>
          <g {...guardian(4)}>
            <path d="M238 150 L262 118 L288 154 L275 147 L262 160 L249 147 Z" fill={C.paper} {...ink} />
            <path d="M262 118 V92 M262 92 L280 99 L262 106" fill="none" {...ink} />
          </g>
        </g>

        {/* ---------- town on the ground line y=400 ---------- */}
        <Pine x={56} top={318} />

        {/* restaurant */}
        <g fill={C.paper} {...ink}>
          <rect x={104} y={290} width={160} height={110} />
          <rect x={144} y={266} width={80} height={24} />
          <path d="M94 290 H274 L262 316 H106 Z" />
          <rect x={154} y={340} width={36} height={60} />
          <rect x={204} y={334} width={44} height={34} />
        </g>
        <g opacity={0.7}>
          {[114, 132, 150, 168, 186, 204, 222, 240, 258].map((x) => (
            <line key={x} x1={x} y1={291} x2={x - 3} y2={315} {...hatch} />
          ))}
        </g>

        {/* house */}
        <g fill={C.paper} {...ink}>
          <rect x={290} y={320} width={100} height={80} />
          <path d="M282 320 L340 272 L398 320 Z" />
          <rect x={325} y={344} width={30} height={26} />
          <path d="M340 344 V370 M325 357 H355" />
        </g>

        {/* self serve car wash, three bays */}
        <g fill={C.paper} {...ink}>
          <rect x={420} y={296} width={232} height={104} />
          <rect x={412} y={282} width={248} height={14} />
        </g>
        <Bay x={432} w={64} />
        <Bay x={504} w={64} />
        <Bay x={576} w={64} />

        {/* shield sign (Aegis) */}
        <g fill={C.paper} {...ink} {...guardian(3)}>
          <path d="M686 400 V330" />
          <path d="M686 282 L706 289 V304 C706 316 697 324 686 328 C675 324 666 316 666 304 V289 Z" />
          <path d="M677 304 L683 311 L696 297" fill="none" />
        </g>

        <Pine x={736} top={326} />
        <Pine x={768} top={350} />

        {/* vacuum station */}
        <g fill={C.paper} {...ink}>
          <rect x={800} y={330} width={40} height={70} rx={4} />
          <rect x={808} y={340} width={24} height={16} />
          <path d="M840 352 Q884 352 876 398" fill="none" />
        </g>

        {/* vending kiosk */}
        <g fill={C.paper} {...ink}>
          <rect x={904} y={308} width={52} height={92} rx={3} />
          <rect x={912} y={318} width={36} height={28} />
          <rect x={916} y={372} width={28} height={6} />
        </g>

        <Pine x={1000} top={322} />
        <Pine x={1040} top={346} />
        <Pine x={1110} top={330} />
        <Pine x={1160} top={354} />

        {/* ground */}
        <line x1={0} y1={400} x2={1200} y2={400} {...ink} />
        <HLines x1={30} x2={1170} y1={414} y2={512} gap={13} stagger={80} opacity={0.32} />
        <path d="M560 520 L604 400 M700 520 L656 400" fill="none" {...hatch} opacity={0.5} />
      </svg>
    </ArtFrame>
  );
}
