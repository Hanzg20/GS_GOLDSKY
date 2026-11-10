import { cn } from '@/lib/utils';
import { ArtFrame, C, HLines, hatch, ink } from './shared';

// "No one there, still looked after": a wash bay at night, the shield standing
// over it. Night palette: the site's paper and ink swapped, warm not black.
// The orange tap mark on the terminal and the lit bay are the accent.
const NIGHT = {
  line: '#EDE6D6',
  fine: '#9C9384',
  fill: '#1C1A14',
  mass: '#2B2820',
  sky: '#161410',
};

export function AegisArt({ className }: { className?: string }) {
  const line = { ...ink, stroke: NIGHT.line };
  const fine = { ...hatch, stroke: NIGHT.fine };
  return (
    <ArtFrame className={cn('border-[#34302A] bg-[#161410]', className)}>
      <svg
        viewBox="0 0 520 400"
        role="img"
        aria-label="Illustration: a self serve car wash at night under a crescent moon, one bay lit with a car inside, a payment terminal on a post, and a large shield outline in the sky"
        className="block h-auto w-full"
      >
        {/* guardian shield in the sky */}
        <path
          d="M24 4 L40 10 V24 C40 34 33 41 24 44 C15 41 8 34 8 24 V10 Z"
          transform="translate(198 10) scale(2.6)"
          fill="none"
          {...fine}
          opacity={0.8}
        />
        <HLines x1={222} x2={298} y1={46} y2={110} gap={8} opacity={0.25} color={NIGHT.fine} />

        {/* moon and stars */}
        <circle cx={430} cy={62} r={18} fill={NIGHT.line} />
        <circle cx={439} cy={56} r={16} fill={NIGHT.sky} />
        <g {...line} strokeWidth={1}>
          {[
            [70, 50],
            [130, 90],
            [370, 40],
            [480, 120],
            [40, 130],
            [180, 30],
          ].map(([x, y], i) => (
            <path
              key={`${x}-${y}`}
              d={`M${x - 3} ${y} H${x + 3} M${x} ${y - 3} V${y + 3}`}
              className="twinkle"
              style={{ animationDelay: `${(i * 0.7) % 3.2}s` }}
            />
          ))}
        </g>

        {/* building */}
        <g fill={NIGHT.fill} {...line}>
          <rect x={80} y={150} width={350} height={170} />
          <rect x={72} y={138} width={366} height={12} />
          {/* bay one is lit: the warm light is the accent, kept soft */}
          <path
            d="M110 320 V192 Q110 178 124 178 H286 Q300 178 300 192 V320"
            fill={C.accent}
            fillOpacity={0.22}
            className="bay-glow"
          />
          <path d="M320 320 V192 Q320 178 334 178 H396 Q410 178 410 192 V320" fill={NIGHT.mass} />
        </g>
        <HLines x1={326} x2={404} y1={196} y2={316} gap={7} opacity={0.35} color={NIGHT.fine} />

        {/* wash boom and spray */}
        <g fill="none" {...line}>
          <path d="M205 178 V206" />
          <path d="M180 206 H230" />
        </g>
        <g fill="none" opacity={0.7}>
          {[184, 196, 208, 220].map((x, i) => (
            <path
              key={x}
              d={`M${x + 4} 210 l-4 14`}
              {...fine}
              className="spray"
              style={{ animationDelay: `${i * 0.27}s` }}
            />
          ))}
        </g>

        {/* car */}
        <g fill={NIGHT.fill} {...line}>
          <path d="M132 306 L136 286 Q146 266 172 262 L238 262 Q258 264 270 282 L284 286 Q290 288 290 298 L290 306 Z" />
          <path d="M160 282 L170 270 H204 V282 Z M212 270 H236 Q246 272 254 282 H212 Z" />
          <circle cx={164} cy={307} r={11} />
          <circle cx={256} cy={307} r={11} />
        </g>

        {/* terminal on its post */}
        <g fill={NIGHT.fill} {...line}>
          <path d="M466 320 V262" />
          <rect x={450} y={220} width={32} height={44} rx={4} />
          <rect x={455} y={226} width={22} height={18} rx={1} />
          <path d="M458 254 H474" />
        </g>
        <g fill="none" stroke={C.accent} strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path d="M463 235 a4 4 0 0 1 0 -6" className="tap-wave" />
          <path d="M467 238 a8 8 0 0 0 0 -12" className="tap-wave" style={{ animationDelay: '0.18s' }} />
          <path d="M471 241 a12 12 0 0 0 0 -18" className="tap-wave" style={{ animationDelay: '0.36s' }} />
        </g>

        {/* ground */}
        <line x1={0} y1={320} x2={520} y2={320} {...line} />
        <HLines x1={20} x2={500} y1={334} y2={392} gap={12} stagger={36} opacity={0.3} color={NIGHT.fine} />
      </svg>
    </ArtFrame>
  );
}
