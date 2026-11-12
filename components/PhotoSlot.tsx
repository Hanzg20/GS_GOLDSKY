import { Camera } from '@phosphor-icons/react/dist/ssr';
import { PHOTOS, type PhotoId } from '@/lib/photos';
import { cn } from '@/lib/utils';

// A spot that needs a real photo. Shows the photo once lib/photos.ts marks it
// ready; until then a placeholder carrying the shooting brief. The placeholder
// is deliberately loud so it can't ship unnoticed.
export function PhotoSlot({
  id,
  compact = false,
  fill = false,
  play = false,
  className,
}: {
  /** play the photo's on-site loop (lib/photos.ts `video`) instead of the still; off by default */
  play?: boolean;
  id: PhotoId;
  /** small slots show the title and spec only; the brief is in docs/PHOTO_SHOTLIST.md */
  compact?: boolean;
  /** fill the parent's height instead of keeping the photo's aspect ratio (bento cells) */
  fill?: boolean;
  className?: string;
}) {
  const photo = PHOTOS[id];
  const frame = cn('paper-grain rounded-2xl border', fill && 'h-full', className);
  const ratio = fill ? undefined : { aspectRatio: photo.ratio };

  if (photo.ready) {
    const video = play ? photo.video : undefined;
    return (
      <div className={cn(frame, 'overflow-hidden border-line')} style={ratio}>
        {video && (
          <video
            src={`/photos/${video.file}`}
            poster={`/photos/${video.poster}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={photo.alt}
            className="h-full w-full object-cover motion-reduce:hidden"
          />
        )}
        {/* static export: plain img, no Image Optimization */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/photos/${photo.file}`}
          alt={photo.alt}
          loading="lazy"
          className={cn('h-full w-full object-cover', video && 'hidden motion-reduce:block')}
        />
      </div>
    );
  }

  return (
    <figure
      className={cn(frame, 'flex flex-col border-dashed border-brand/60 bg-brand-light/40 p-4')}
      style={ratio}
      aria-label={`Photo placeholder: ${photo.title}`}
    >
      <div className="flex items-center gap-2 text-brand-dark">
        <Camera size={16} weight="bold" />
        <span className="caption-3 uppercase tracking-widest">需要实拍照片</span>
      </div>
      <p className="title-3 mt-2">{photo.title}</p>
      {!compact && (
        <ul className="body-6 mt-2 list-disc space-y-1 pl-4 text-ink-soft">
          {photo.brief.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      {/* no overflow-hidden here: with aspect-ratio, a long brief grows the box instead of being clipped */}
      <p className="caption-5 mt-auto break-all pt-2 font-mono text-ink-mute">
        {photo.ratio.replace(/ /g, '')} · {photo.size}
        <br />
        public/photos/{photo.file}
      </p>
    </figure>
  );
}
