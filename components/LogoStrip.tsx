export function LogoStrip({ names, label }: { names: string[]; label: string }) {
  const track = [...names, ...names];
  return (
    <section className="bg-warm-off border-y border-border-warm py-10 overflow-hidden">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-6">
        {label}
      </p>
      <div className="relative">
        <div className="logo-track gap-16">
          {track.map((name, i) => (
            <span
              key={i}
              className="shrink-0 text-lg font-bold tracking-tight text-muted/50 grayscale hover:text-ink hover:grayscale-0 transition-all duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
