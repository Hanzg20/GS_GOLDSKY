// Slow ribbon of the companies GS-SSP works with. Pauses on hover; stops
// under prefers-reduced-motion.
//
// Logos live in public/images/partners and are drawn as a mask filled with
// the text colour, so every mark is one colour and follows the light and dark
// themes. `ratio` is the logo's width / height; `mark` is a symbol-only logo
// (no wordmark), so the name is set beside it. No logo: the name alone.
// Sources: each company's own site; WeChat, Alipay, Elavon, Uber Eats, Visa,
// Mastercard and American Express from Simple Icons (simple-icons@13.21.0,
// Visa's viewBox cropped to the wordmark); UnionPay from Wikimedia Commons
// (File:UnionPay_logo.svg), rebuilt as a mask so the lettering stays cut out.

export type Partner = { name: string; logo?: string; ratio?: number; mark?: boolean };

function Logo({ p }: { p: Partner }) {
  if (!p.logo) return <span className="font-serif text-3xl text-ink md:text-4xl">{p.name}</span>;
  const img = (
    <span
      role="img"
      aria-label={p.mark ? undefined : p.name}
      aria-hidden={p.mark || undefined}
      className="block h-8 shrink-0 bg-ink md:h-10"
      style={{
        aspectRatio: String(p.ratio ?? 1),
        maskImage: `url(${p.logo})`,
        WebkitMaskImage: `url(${p.logo})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
  if (!p.mark) return img;
  return (
    <span className="flex items-center gap-3">
      {img}
      <span className="font-serif text-3xl text-ink md:text-4xl">{p.name}</span>
    </span>
  );
}

export function PlacesRibbon({ partners, label }: { partners: Partner[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {partners.map((p) => (
        <li key={p.name} className="flex items-center">
          <span className="flex items-center whitespace-nowrap px-8">
            <Logo p={p} />
          </span>
          <span aria-hidden className="h-2 w-2 rotate-45 bg-brand" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-label={label}>
      <div className="logo-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
