// Slow ribbon of the places GS-SSP actually runs in (only what the product
// lines really cover). Pauses on hover; stops under prefers-reduced-motion.
export function PlacesRibbon({ places }: { places: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {places.map((p) => (
        <li key={p} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-3xl text-ink md:text-4xl">{p}</span>
          <span aria-hidden className="h-2 w-2 rotate-45 bg-brand" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-label="Where GS-SSP runs">
      <div className="logo-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
