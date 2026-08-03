import Image from 'next/image';

/**
 * Generic, no-brand stock photography standing in for real on-site photos
 * until the operator's own photos are supplied. `note` renders a small
 * disclosure strip -- required wherever the caption could otherwise read as
 * a photo of a specific verified deployment (see Case Studies).
 */
export function ScenePhoto({
  src,
  alt,
  label,
  note,
  className = '',
}: {
  src: string;
  alt: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-border-warm overflow-hidden aspect-[4/3] ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-6 pb-2">
        <span className="text-[11px] text-white/90 leading-snug">{label}</span>
        {note && <span className="block text-[10px] text-white/60 mt-0.5">{note}</span>}
      </div>
    </div>
  );
}
