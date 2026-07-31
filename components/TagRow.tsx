export function TagRow({ tags, className = '' }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-mono text-body bg-warm-off border border-border-warm-strong rounded-md px-2.5 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
