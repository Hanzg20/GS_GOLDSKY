import { Pill } from './ui/Pill';

export function SectionHeading({
  pill,
  pillVariant = 'brand',
  title,
  subtitle,
  align = 'left',
}: {
  pill?: string;
  pillVariant?: 'brand' | 'steel' | 'comingSoon';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      {pill && (
        <Pill variant={pillVariant} className="mb-4">
          {pill}
        </Pill>
      )}
      <h2 className="text-[28px] md:text-[34px] font-bold text-ink leading-tight max-w-2xl mx-auto">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base text-body leading-relaxed max-w-xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
