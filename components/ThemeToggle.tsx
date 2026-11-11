'use client';

import { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { THEME_KEY, isThemed } from '@/lib/theme';

// Dark (the default, after starlink.com) / light (warm paper, illustrations).
// The choice is remembered per browser; the inline script in app/layout.tsx
// applies it before first paint so there is no flash. The switch opens the
// new theme as a circle from this button where View Transitions exist.

type Theme = 'light' | 'dark';

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {}
}

function saved(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

/** Keeps the page theme right on client side navigation: the saved theme on
 *  themed pages, always light on pages not yet redesigned (lib/theme.ts). */
export function ThemeRoute() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.dataset.theme = isThemed(pathname) ? saved() : 'light';
  }, [pathname]);
  return null;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  const mask = `moon-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!doc.startViewTransition || still) {
      apply(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--vt-x', `${r.left + r.width / 2}px`);
    root.style.setProperty('--vt-y', `${r.top + r.height / 2}px`);
    doc.startViewTransition(() => apply(next));
  }

  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft transition-colors duration-300 ease-gs hover:bg-paper-deep hover:text-ink active:scale-[0.98]',
        className,
      )}
    >
      {/* one drawing: a sun whose rays fold in and a shadow disc that slides
          over it to make a crescent. Transforms and opacity only. */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        <mask id={mask}>
          <rect width="24" height="24" fill="white" />
          <circle
            cx="24"
            cy="4"
            r="8"
            fill="black"
            className="transition-transform duration-500 ease-gs"
            style={{ transform: dark ? 'translate(-7px, 3px)' : 'translate(0, 0)' }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r={5}
          mask={`url(#${mask})`}
          fill={dark ? 'currentColor' : 'none'}
          className="origin-center transition-transform duration-500 ease-gs"
          style={{ transform: dark ? 'scale(1.5)' : 'scale(1)', transformBox: 'fill-box' }}
        />
        <g
          className="origin-center transition-[transform,opacity] duration-500 ease-gs"
          style={{
            transform: dark ? 'rotate(-90deg) scale(0.4)' : 'rotate(0) scale(1)',
            opacity: dark ? 0 : 1,
            transformBox: 'fill-box',
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M12 2.5 V4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
