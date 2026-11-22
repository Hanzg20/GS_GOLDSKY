// Slow ribbon of the companies GS-SSP works with. Pauses on hover; stops
// under prefers-reduced-motion.
//
// Logos live in public/images/partners and are drawn as a mask filled with
// the text colour, so every mark is one colour and follows the light and dark
// themes. A logo that is or contains the name stands alone; `mark` is a
// symbol-only logo (no name in it), so the English name is set beside it.
// `ratio` is the logo's width / height. No logo: the name alone.
// Sources: each company's own site; WeChat, Alipay, Elavon, Uber Eats, Visa,
// Mastercard and American Express from Simple Icons (simple-icons@13.21.0,
// Visa's viewBox cropped to the wordmark); UnionPay from Wikimedia Commons
// (File:UnionPay_logo.svg), rebuilt as a mask so its lettering stays cut out.
// Apple Pay and Google Pay from Simple Icons, viewBox cropped to the drawing;
// Interac from Wikimedia Commons (File:InteracLogo.svg), rebuilt as a mask:
// square solid, lettering and hand cut out.

export type Partner = { name: string; logo?: string; ratio?: number; mark?: boolean };

function Logo({ p }: { p: Partner }) {
  const name = <span className="font-serif text-3xl text-ink md:text-4xl">{p.name}</span>;
  if (!p.logo) return name;
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
      {name}
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
    <section aria-labelledby="partners-label" className="overflow-hidden border-y border-line py-6">
      <p id="partners-label" className="caption-4 mb-5 text-center uppercase tracking-widest text-ink-mute">
        {label}
      </p>
      <div className="logo-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
