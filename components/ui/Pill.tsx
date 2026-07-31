import { cn } from '@/lib/utils';

type PillVariant = 'brand' | 'steel' | 'comingSoon';

const variantClasses: Record<PillVariant, string> = {
  brand: 'bg-brand-light text-[#6E3A0C] border-brand/25',
  steel: 'bg-steel-light text-steel-dark border-steel/25',
  comingSoon: 'bg-[#F4F0FC] text-[#6D28D9] border-[#6D28D9]/25',
};

export function Pill({
  children,
  variant = 'brand',
  className,
}: {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
