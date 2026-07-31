import Link from 'next/link';
import Image from 'next/image';

export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image src="/goldsky-logo.png" alt="GoldSky Technologies" width={46} height={46} priority className="shrink-0" />
      <span className="flex items-baseline gap-1.5">
        <span className="font-extrabold text-xl tracking-tight leading-none">
          <span className={dark ? 'text-hero-fg' : 'text-ink'}>Gold</span>
          <span className="text-steel">Sky</span>
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.18em] leading-none ${
            dark ? 'text-hero-muted' : 'text-muted'
          }`}
        >
          Tech
        </span>
      </span>
    </Link>
  );
}
