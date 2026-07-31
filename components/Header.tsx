'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Payments & Ecosystem', href: '/payments' },
  { label: 'Developers & ISVs', href: '/developers' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 xl:h-[72px] backdrop-blur-md transition-colors duration-300 ease-in-out',
        scrolled ? 'bg-warm-white/[.98] border-b border-border-warm' : 'bg-warm-white/[.92]',
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-10">
        <Logo />

        <nav className="hidden xl:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  active ? 'font-semibold text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Button href="/contact" size="md">
            Talk to Us
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="xl:hidden text-ink"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden fixed inset-x-0 top-16 bottom-0 bg-warm-white flex flex-col items-center justify-center gap-6 z-40">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-xl',
                isActive(pathname, item.href) ? 'font-semibold text-ink' : 'text-muted',
              )}
            >
              {item.label}
            </a>
          ))}
          <Button href="/contact" size="lg" className="mt-4">
            Talk to Us
          </Button>
        </div>
      )}
    </header>
  );
}
