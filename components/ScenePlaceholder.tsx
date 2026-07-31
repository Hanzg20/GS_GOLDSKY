import { LucideIcon } from 'lucide-react';

/**
 * Stand-in for real product/scene photography per v2.0 spec section 8
 * (device shots, on-site photos) until real assets are supplied. Deliberately
 * abstract/illustrative rather than a fake stock photo.
 */
export function ScenePlaceholder({
  icon: Icon,
  label,
  className = '',
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border-warm bg-warm-off flex flex-col items-center justify-center gap-3 aspect-[4/3] ${className}`}
    >
      <Icon size={44} className="text-steel/40" strokeWidth={1.5} />
      <span className="text-xs text-muted text-center px-6">{label}</span>
    </div>
  );
}
