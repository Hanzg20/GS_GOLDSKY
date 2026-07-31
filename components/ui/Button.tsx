import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'steelGhost' | 'heroSecondary' | 'textLink';
type Size = 'lg' | 'md' | 'sm';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand text-white border border-transparent shadow-[0_2px_8px_rgba(232,137,10,0.3)] hover:bg-brand-dark hover:shadow-[0_4px_14px_rgba(232,137,10,0.4)]',
  secondary: 'bg-transparent text-ink border border-ink hover:bg-warm-off',
  steelGhost: 'bg-transparent text-steel border border-steel hover:bg-steel-light',
  heroSecondary: 'bg-transparent text-hero-fg border border-hero-fg/30 hover:bg-white/10',
  textLink: 'bg-transparent text-steel border-0 underline-offset-4 hover:underline p-0',
};

const sizeClasses: Record<Size, string> = {
  lg: 'text-[15px] px-8 py-3.5',
  md: 'text-sm px-[22px] py-[11px]',
  sm: 'text-[13px] px-4 py-2',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export function Button({
  variant = 'primary',
  size = 'lg',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 ease-out whitespace-nowrap',
    variant !== 'textLink' && sizeClasses[size],
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
