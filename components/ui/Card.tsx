import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
  hover?: 'lift' | 'accent-left' | 'none';
  bg?: 'white' | 'off';
}

export function Card({
  compact = false,
  hover = 'lift',
  bg = 'white',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'border border-border-warm p-4 md:p-6 transition-all duration-200 ease-out',
        compact ? 'rounded-lg' : 'rounded-xl',
        bg === 'white' ? 'bg-white' : 'bg-warm-off',
        '[box-shadow:0_2px_12px_rgba(0,0,0,0.06)]',
        hover === 'lift' && 'hover:border-brand hover:-translate-y-[3px]',
        hover === 'accent-left' &&
          'relative hover:border-brand before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-brand before:transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
