import { Logo } from './Logo';

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product lines',
    links: [
      { label: 'Ourea · desktop POS', href: '/solutions/attended' },
      { label: 'Iris · handheld POS', href: '/solutions/attended' },
      { label: 'Aegis · self serve', href: '/solutions/unattended' },
      { label: 'Cael · cloud platform', href: '/products/software' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Products', href: '/products' },
      { label: 'Developers', href: '/developers' },
      { label: 'Case studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'Privacy policy', href: '/privacy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-10 px-4 py-16 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="body-6 mt-4 max-w-xs text-ink-soft">
            GS‑SSP: payment and store tools for Canadian restaurants, shops and self serve sites.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="caption-3 uppercase tracking-widest text-ink-mute">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="body-6 text-ink-soft transition-colors duration-300 ease-gs hover:text-brand-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="caption-5 mx-auto max-w-content space-y-1 px-4 py-6 text-ink-mute">
          <p>© {new Date().getFullYear()} GoldSky Technologies Inc. All rights reserved.</p>
          <p>Ontario Corporation #1001101532 · Ottawa, Ontario, Canada</p>
        </div>
      </div>
    </footer>
  );
}
