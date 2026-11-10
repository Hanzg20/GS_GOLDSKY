import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'steelGhost' | 'heroSecondary' | 'textLink';
type Size = 'lg' | 'md' | 'sm';

const variantClasses: Record<Variant, string> = {
  // dark: Starlink's button, white with black text, 4px corners, bold
  primary:
    'bg-brand text-cream border border-transparent hover:bg-brand-dark dark:rounded dark:bg-[#FAFAFA] dark:font-bold dark:text-black dark:hover:bg-white/80',
  secondary: 'bg-transparent text-ink border border-ink/80 hover:bg-paper-deep dark:rounded dark:font-bold',
  steelGhost: 'bg-transparent text-steel border border-steel hover:bg-steel-light',
  heroSecondary: 'bg-transparent text-hero-fg border border-hero-fg/30 hover:bg-white/10',
  textLink: 'bg-transparent text-brand-dark border-0 underline-offset-4 hover:underline p-0',
};

// Spacing from the B2 scale only. md is the skill's main button (8px / 12px).
const sizeClasses: Record<Size, string> = {
  lg: 'button-md px-6 py-3',
  md: 'button-sm px-3 py-2',
  sm: 'button-xsm px-3 py-2',
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
    'inline-flex items-center justify-center gap-2 rounded-lg whitespace-nowrap',
    'transition-[background-color,border-color,color,transform] duration-300 ease-gs active:scale-[0.98]',
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
