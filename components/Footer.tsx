import { Linkedin } from 'lucide-react';
import { Logo } from './Logo';

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Products', href: '/products' },
      { label: 'Payments & Ecosystem', href: '/payments' },
      { label: 'Developers & ISVs', href: '/developers' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'GS-SSP Platform (Software)', href: '/products/software' },
      { label: 'Edge Controller', href: '/products/hardware' },
      { label: 'Payment Terminals', href: '/products/hardware' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'API & SDK Docs', href: '/developers' },
      { label: 'Unattended Solutions', href: '/solutions/unattended' },
      { label: 'Attended Solutions', href: '/solutions/attended' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-warm-dark text-hero-fg">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-16 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10">
        <div className="col-span-2 xl:col-span-1">
          <Logo dark />
          <p className="mt-4 text-sm text-hero-muted leading-relaxed max-w-xs">
            Payment infrastructure for <span className="text-brand">unattended</span> and{' '}
            <span className="text-brand">attended</span> commercial venues — one platform, every payment
            method.
          </p>
          <p className="mt-4 text-xs text-hero-muted">Founded 2011</p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="hidden md:block">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-hero-muted mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-hero-fg/80 hover:text-brand transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-hero-muted">© {new Date().getFullYear()} GoldSky Technologies. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-hero-muted hover:text-brand hover:border-brand transition-colors"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="#"
              aria-label="Xiaohongshu"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-bold text-hero-muted hover:text-brand hover:border-brand transition-colors"
            >
              小红
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-bold text-hero-muted hover:text-brand hover:border-brand transition-colors"
            >
              TT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
