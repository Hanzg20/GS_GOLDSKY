'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Developers', href: '/developers' },
  { label: 'Contact', href: '/contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

/** Two lines that turn into a cross; animated, not swapped. */
function MenuIcon({ open }: { open: boolean }) {
  const bar = 'absolute left-0 h-[1.5px] w-6 rounded-full bg-ink transition-transform duration-500 ease-gs';
  return (
    <span aria-hidden className="relative block h-6 w-6">
      <span className={cn(bar, 'top-[8px]', open && 'translate-y-[4px] rotate-45')} />
      <span className={cn(bar, 'top-[16px]', open && '-translate-y-[4px] -rotate-45')} />
    </span>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  // dark theme (Starlink): no bar over the hero photo, a glass bar once scrolled
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-4 pt-3">
      <div
        className={cn(
          'pointer-events-auto relative z-50 mx-auto flex w-full items-center justify-between gap-6 rounded-2xl border border-line',
          'bg-paper/80 px-3 py-2 backdrop-blur-md transition-[background-color,border-color] duration-500 ease-gs xl:w-fit',
          'dark:xl:w-full dark:xl:max-w-[1280px]',
          scrolled
            ? 'dark:border-white/10 dark:bg-[#1c1c1c]/75 dark:backdrop-blur-xl'
            : 'dark:border-transparent dark:bg-transparent dark:backdrop-blur-0',
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'title-4 rounded-lg px-3 py-2 transition-colors duration-300 ease-gs',
                  active
                    ? 'bg-paper-deep text-ink dark:bg-white/15 dark:font-bold'
                    : 'text-ink-mute hover:bg-paper-deep hover:text-ink dark:font-bold dark:text-ink dark:hover:bg-white/10',
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 xl:flex">
          <ThemeToggle />
          <Button href="/contact" size="md">
            Talk to our team
          </Button>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 transition-colors duration-300 ease-gs hover:bg-paper-deep active:scale-[0.98] xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* full height panel */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl transition-opacity duration-500 ease-gs xl:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-center gap-2 px-6">
          {[...NAV_ITEMS, { label: 'Talk to our team', href: '/contact', cta: true }].map((item, i) => {
            const active = !('cta' in item) && isActive(pathname, item.href);
            return (
              <a
                key={item.label}
                href={item.href}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={active ? 'page' : undefined}
                style={{
                  transitionDelay: mobileOpen ? `${Math.min(i * 60, 400)}ms` : '0ms',
                }}
                className={cn(
                  'transition-[opacity,transform] duration-500 ease-gs',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                  'cta' in item
                    ? 'button-md mt-6 w-fit rounded-lg bg-brand px-6 py-3 text-cream dark:rounded dark:bg-[#FAFAFA] dark:text-black'
                    : cn('heading-4 py-2', active ? 'text-ink' : 'text-ink-mute'),
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
