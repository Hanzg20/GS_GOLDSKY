import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <section className="hero-noise bg-warm-dark flex flex-col justify-center min-h-[280px] md:min-h-[320px] py-12">
      <div className="mx-auto max-w-content w-full px-5 md:px-10">
        <nav className="flex items-center gap-1.5 text-xs text-hero-muted mb-5">
          {breadcrumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} />}
              {c.href ? (
                <Link href={c.href} className="hover:text-hero-fg transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-hero-fg">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl md:text-[36px] font-extrabold text-hero-fg max-w-2xl">{title}</h1>
        {subtitle && <p className="mt-3 text-base text-hero-muted max-w-xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
