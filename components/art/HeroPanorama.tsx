import { cn } from '@/lib/utils';
import { C, HLines, hatch, ink } from './shared';

const CLOUD = 'M13 36 a8.5 8.5 0 1 1 1.6-16.8 a11 11 0 0 1 21.2 2.4 A7.5 7.5 0 0 1 34.5 36 Z';
const G = 420; // the ground line

function Pine({ x, top, base = G }: { x: number; top: number; base?: number }) {
  const h = base - 10 - top;
  return (
    <g fill={C.paper} {...ink}>
      <path d={`M${x} ${base} V${base - 10}`} />
      <path
        d={`M${x} ${top} L${x + h * 0.36} ${top + h * 0.55} L${x + h * 0.2} ${top + h * 0.55} L${x + h * 0.45} ${base - 10} L${x - h * 0.45} ${base - 10} L${x - h * 0.2} ${top + h * 0.55} L${x - h * 0.36} ${top + h * 0.55} Z`}
      />
      <path d={`M${x} ${top + h * 0.3} V${base - 14}`} {...hatch} opacity={0.6} />
    </g>
  );
}

// Guardian n (1 Ourea, 2 Iris, 3 Aegis, 4 Apex, 5 Cael) inks in as --gn goes
// 0 → 1 (set by ScrollHero; defaults to 1, fully drawn).
const guardian = (n: number) => ({
  className: 'guardian',
  style: { opacity: `calc(0.14 + 0.86 * var(--g${n}, 1))` },
});

function Car({ x, y = G, flip = false }: { x: number; y?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}`} fill={C.paper} {...ink}>
      <path d="M0 -9 V-19 Q1 -24 9 -25 L21 -36 H47 L59 -25 Q69 -24 71 -18 V-9 Z" />
      <path d="M25 -32 H45 L53 -25 H19 Z" />
      <path d="M36 -32 V-25" />
      <circle cx={16} cy={-8} r={7} />
      <circle cx={55} cy={-8} r={7} />
    </g>
  );
}

function Person({ x, y = G, load = false }: { x: number; y?: number; load?: boolean }) {
  return (
    <g fill="none" {...ink}>
      <circle cx={x} cy={y - 31} r={3.6} fill={C.paper} />
      <path d={`M${x} ${y - 27} V${y - 13} M${x} ${y - 13} L${x - 4} ${y} M${x} ${y - 13} L${x + 4} ${y}`} />
      {load ? (
        <path d={`M${x} ${y - 23} L${x + 7} ${y - 19} M${x + 4} ${y - 23} h10 v6 h-10 Z`} fill={C.mass} />
      ) : (
        <path d={`M${x} ${y - 23} L${x - 5} ${y - 15} M${x} ${y - 23} L${x + 5} ${y - 15}`} />
      )}
    </g>
  );
}

function Bay({ x, w }: { x: number; w: number }) {
  return (
    <>
      <path
        d={`M${x} ${G} V${G - 58} Q${x} ${G - 72} ${x + 14} ${G - 72} H${x + w - 14} Q${x + w} ${G - 72} ${x + w} ${G - 58} V${G}`}
        fill={C.mass}
        {...ink}
      />
      <HLines x1={x + 6} x2={x + w - 6} y1={G - 54} y2={G - 4} gap={7} opacity={0.4} />
    </>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g fill={C.paper} {...ink}>
      <path d={`M${x} ${G} V${G - 84} Q${x} ${G - 92} ${x + 10} ${G - 92} H${x + 16}`} fill="none" />
      <path d={`M${x + 12} ${G - 92} h10 l-3 6 h-4 Z`} />
    </g>
  );
}

// A soft row of far pines behind the town, drawn as one path.
const TREELINE = (() => {
  let d = '';
  for (let x = 120, i = 0; x < 1900; x += 17, i++) {
    const h = 18 + ((i * 7) % 5) * 5;
    d += `M${x - 8} ${G} L${x} ${G - h} L${x + 8} ${G} Z `;
  }
  return d;
})();

// The hero panorama: a gold sky over a Canadian town, wide enough to run edge to
// edge. The five guardians are in the landscape (mountain, rainbow, shield sign,
// summit, cloud). The sun is the one accent; it rises once on load and the
// clouds drift (transform only, both stop under prefers-reduced-motion). The
// town holds every kind of site GS-SSP serves: a restaurant, a laundromat, the
// car wash with its vacuum, a vending kiosk, a firewood stand and an EV charger.
export function HeroPanorama({ className }: { className?: string }) {
  return (
    <div className={cn('paper-grain overflow-hidden bg-paper-deep', className)}>
      <svg
        viewBox="0 0 1920 500"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="Illustration: a large golden sun rising behind mountains over a small Canadian town with a restaurant, a laundromat, a self serve car wash and vacuum, a vending kiosk, a firewood stand and an electric car charger"
        className="block h-full w-full"
      >
        <defs>
          <clipPath id="hero-ourea-shade">
            <path d="M360 90 L470 220 L540 180 L700 420 L430 420 L392 250 Z" />
          </clipPath>
          <clipPath id="hero-east-shade">
            <path d="M1660 190 L1540 420 L1700 420 L1690 260 Z" />
          </clipPath>
          <clipPath id="hero-ridge">
            <path d="M720 420 L860 352 L980 372 L1100 330 L1250 362 L1380 336 L1520 360 L1920 340 L1920 420 Z" />
          </clipPath>
        </defs>

        <g className="par-sky">
          <HLines x1={40} x2={1880} y1={60} y2={410} gap={10} stagger={70} opacity={0.24} />
        </g>

        {/* the farthest range, a pencil line on the horizon */}
        <path
          d="M0 330 L90 300 L170 318 L260 286 L330 300 L420 270 L520 298 L640 276 L760 300 L880 280 L1000 302 L1140 284 L1300 306 L1440 282 L1560 300 L1700 278 L1820 296 L1920 288"
          fill="none"
          {...hatch}
          opacity={0.55}
        />

        {/* rainbow (Iris) */}
        <g {...guardian(2)}>
          <g fill="none" opacity={0.55}>
            <path d="M230 420 A330 330 0 0 1 890 420" {...hatch} />
            <path d="M250 420 A310 310 0 0 1 870 420" {...hatch} />
            <path d="M270 420 A290 290 0 0 1 850 420" {...hatch} />
          </g>
        </g>

        {/* the sun: the one accent */}
        <g className="animate-sun-rise">
          <g className="sun-scroll">
            <circle cx={1180} cy={340} r={150} fill={C.accent} />
          </g>
        </g>

        {/* clouds (Cael) */}
        <g {...guardian(5)}>
          <g className="par-cloud">
            <g className="animate-drift">
              <path d={CLOUD} transform="translate(80 40) scale(3.6)" fill={C.paper} {...ink} />
              <path d={CLOUD} transform="translate(1500 60) scale(3)" fill={C.paper} {...ink} />
            </g>
            <g className="animate-drift-slow">
              <path d={CLOUD} transform="translate(760 110) scale(1.9)" fill={C.paper} {...ink} opacity={0.75} />
              <path d={CLOUD} transform="translate(1790 160) scale(1.4)" fill={C.paper} {...ink} opacity={0.6} />
            </g>
          </g>
        </g>

        {/* birds */}
        <g className="par-birds" fill="none" {...ink} strokeWidth={1.2}>
          <path d="M920 150 q8 -8 16 0 q8 -8 16 0" />
          <path d="M962 178 q5 -5 10 0 q5 -5 10 0" />
          <path d="M892 190 q4 -4 8 0 q4 -4 8 0" />
          <path d="M1010 132 q4 -4 8 0 q4 -4 8 0" />
        </g>

        {/* ground fill: hides the sun below the horizon while it rises */}
        <rect x={0} y={G} width={1920} height={80} fill={C.paperDeep} />

        {/* the ridge the sun rises behind */}
        <path
          d="M720 420 L860 352 L980 372 L1100 330 L1250 362 L1380 336 L1520 360 L1920 340 L1920 420 Z"
          fill={C.mass}
          {...ink}
        />
        <g clipPath="url(#hero-ridge)">
          <HLines x1={720} x2={1920} y1={338} y2={416} gap={8} opacity={0.35} />
        </g>

        {/* the east mountain */}
        <path d="M1480 420 L1660 190 L1800 330 L1860 300 L1920 330 L1920 420 Z" fill={C.mass} {...ink} />
        <path d="M1638 218 L1660 190 L1684 222 L1670 216 L1660 228 L1650 216 Z" fill={C.paper} {...ink} />
        <g clipPath="url(#hero-east-shade)" opacity={0.55}>
          {Array.from({ length: 22 }, (_, i) => (
            <line key={i} x1={1540 + i * 8} y1={190} x2={1500 + i * 8} y2={430} {...hatch} />
          ))}
        </g>

        {/* main mountains (Ourea) and the summit (Apex) */}
        <g className="par-near">
          <g {...guardian(1)}>
            <path
              d="M0 420 L0 300 L120 210 L180 250 L360 90 L470 220 L540 180 L700 420 Z"
              fill={C.mass}
              {...ink}
            />
            <path d="M102 224 L120 210 L138 226 L128 222 L120 230 L112 222 Z" fill={C.paper} {...ink} />
            <path d="M524 192 L540 180 L556 196 L546 192 L540 200 L533 193 Z" fill={C.paper} {...ink} />
            <g clipPath="url(#hero-ourea-shade)" opacity={0.5}>
              {Array.from({ length: 42 }, (_, i) => (
                <line key={i} x1={330 + i * 9} y1={80} x2={290 + i * 9} y2={430} {...hatch} />
              ))}
            </g>
            <path d="M180 250 L230 300 M470 220 L452 290 M120 210 L96 268" fill="none" {...hatch} opacity={0.6} />
          </g>
          <g {...guardian(4)}>
            <path d="M332 128 L360 90 L392 132 L376 124 L360 140 L344 124 Z" fill={C.paper} {...ink} />
            <path d="M360 90 V62 M360 62 L380 70 L360 78" fill="none" {...ink} />
          </g>
        </g>

        {/* far pines behind the town */}
        <path d={TREELINE} fill={C.paperDeep} {...hatch} opacity={0.8} />

        {/* ---------- the town on the ground line ---------- */}
        <Pine x={40} top={330} />
        <Pine x={86} top={348} />
        <Pine x={124} top={322} />

        {/* restaurant, striped awning, a table outside */}
        <g fill={C.paper} {...ink}>
          <rect x={160} y={300} width={180} height={120} />
          <rect x={196} y={274} width={108} height={26} />
          <path d="M150 324 H350 L338 352 H162 Z" />
          <rect x={176} y={364} width={60} height={40} />
          <path d="M206 364 V404 M176 384 H236" />
          <rect x={262} y={360} width={36} height={60} />
          <circle cx={290} cy={392} r={1.6} fill={C.ink} />
        </g>
        <g opacity={0.7}>
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={170 + i * 17} y1={325} x2={167 + i * 17} y2={351} {...hatch} />
          ))}
        </g>
        <g fill={C.paper} {...ink}>
          <path d="M366 372 Q382 356 398 372 Z" />
          <path d="M382 372 V420 M372 404 H392" fill="none" />
        </g>
        <Person x={412} />

        {/* house with a chimney */}
        <g fill={C.paper} {...ink}>
          <rect x={436} y={336} width={100} height={84} />
          <path d="M428 336 L486 288 L544 336 Z" />
          <rect x={514} y={292} width={12} height={26} />
          <rect x={452} y={356} width={26} height={24} />
          <path d="M465 356 V380 M452 368 H478" />
          <rect x={496} y={370} width={24} height={50} />
        </g>
        <path d="M520 286 q-8 -10 2 -18 q10 -8 0 -18 q-8 -8 4 -16" fill="none" {...hatch} opacity={0.7} />

        <Lamp x={564} />

        {/* laundromat: a row of round washer doors in the window */}
        <g fill={C.paper} {...ink}>
          <rect x={590} y={326} width={130} height={94} />
          <rect x={582} y={316} width={146} height={12} />
          <rect x={602} y={344} width={106} height={44} />
          <circle cx={622} cy={366} r={12} />
          <circle cx={655} cy={366} r={12} />
          <circle cx={688} cy={366} r={12} />
          <rect x={604} y={392} width={20} height={28} />
        </g>
        <g opacity={0.6}>
          <path d="M616 360 a7 7 0 0 1 10 8 M649 360 a7 7 0 0 1 10 8 M682 360 a7 7 0 0 1 10 8" fill="none" {...hatch} />
        </g>

        {/* self serve car wash, three bays, a car in one */}
        <g fill={C.paper} {...ink}>
          <rect x={752} y={316} width={252} height={104} />
          <rect x={744} y={302} width={268} height={14} />
        </g>
        <Bay x={764} w={70} />
        <Bay x={843} w={70} />
        <Bay x={922} w={70} />
        <Car x={842} />

        {/* shield sign (Aegis) */}
        <g fill={C.paper} {...ink} {...guardian(3)}>
          <path d="M1036 420 V350" />
          <path d="M1036 302 L1056 309 V324 C1056 336 1047 344 1036 348 C1025 344 1016 336 1016 324 V309 Z" />
          <path d="M1027 324 L1033 331 L1046 317" fill="none" />
        </g>

        <Pine x={1080} top={338} />

        {/* vacuum station */}
        <g fill={C.paper} {...ink}>
          <rect x={1110} y={350} width={40} height={70} rx={4} />
          <rect x={1118} y={360} width={24} height={16} />
          <path d="M1150 372 Q1194 372 1186 418" fill="none" />
        </g>

        {/* vending kiosk under a little roof, someone paying */}
        <g fill={C.paper} {...ink}>
          <path d="M1210 320 H1294 L1286 308 H1218 Z" />
          <path d="M1216 320 V420 M1288 320 V420" fill="none" />
          <rect x={1226} y={330} width={50} height={90} rx={3} />
          <rect x={1234} y={340} width={34} height={30} />
          <path d="M1234 350 H1268 M1234 360 H1268" {...hatch} />
          <rect x={1238} y={392} width={26} height={6} />
        </g>
        <Person x={1306} />

        <Pine x={1340} top={330} />
        <Pine x={1376} top={352} />

        {/* firewood stand: peaked roof, log ends stacked inside */}
        <g fill={C.paper} {...ink}>
          <path d="M1400 346 L1452 312 L1504 346 Z" />
          <rect x={1408} y={346} width={88} height={74} />
          <rect x={1418} y={356} width={68} height={64} fill={C.mass} />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle key={`${row}-${col}`} cx={1426 + col * 13 + (row % 2) * 6} cy={412 - row * 13} r={6} />
            )),
          )}
        </g>
        <Person x={1524} load />

        <Lamp x={1552} />

        {/* EV charger and a car plugged in */}
        <g fill={C.paper} {...ink}>
          <rect x={1588} y={354} width={22} height={66} rx={3} />
          <rect x={1593} y={362} width={12} height={12} />
          <path d="M1610 384 Q1632 404 1640 398" fill="none" />
        </g>
        <Car x={1636} />

        {/* a cabin at the edge of town */}
        <g fill={C.paper} {...ink}>
          <rect x={1736} y={360} width={80} height={60} />
          <path d="M1728 360 L1776 326 L1824 360 Z" />
          <rect x={1764} y={384} width={22} height={36} />
        </g>
        <Pine x={1846} top={334} />
        <Pine x={1890} top={350} />

        {/* ground and the road in front */}
        <line x1={0} y1={G} x2={1920} y2={G} {...ink} />
        <HLines x1={20} x2={1900} y1={428} y2={438} gap={10} stagger={90} opacity={0.3} />
        <line x1={0} y1={446} x2={1920} y2={446} {...ink} />
        <line x1={0} y1={482} x2={1920} y2={482} {...ink} />
        <g opacity={0.6}>
          {Array.from({ length: 40 }, (_, i) => (
            <line key={i} x1={20 + i * 48} y1={464} x2={44 + i * 48} y2={464} {...hatch} />
          ))}
        </g>
        <path d="M800 446 L820 420 M960 446 L940 420" fill="none" {...hatch} opacity={0.5} />
        <Car x={300} y={478} />
        <Car x={1460} y={478} flip />
        <HLines x1={30} x2={1890} y1={490} y2={498} gap={8} stagger={80} opacity={0.3} />
      </svg>
    </div>
  );
}
