import type { Config } from 'tailwindcss';

// GoldSky design tokens, 2026-11 redesign ("old guardians, everyday business").
// Warm paper, ink, one orange accent; 70% humanistic, 20% tech. The same tokens
// drive the illustrations in components/art -- see docs/IMAGE_STYLE.md.
//
// Legacy tokens (steel, gold, warm, hero-*, border-warm) are kept so pages not
// yet redesigned keep rendering; new work uses paper / ink / brand / line / sky.
const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme tokens: values live in app/globals.css (:root = light,
        // [data-theme="dark"] = dark), so every utility switches with the theme.
        paper: { DEFAULT: 'rgb(var(--c-paper) / <alpha-value>)', deep: 'rgb(var(--c-paper-deep) / <alpha-value>)', edge: 'rgb(var(--c-paper-edge) / <alpha-value>)' },
        ink: { DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)', soft: 'rgb(var(--c-ink-soft) / <alpha-value>)', mute: 'rgb(var(--c-ink-mute) / <alpha-value>)' },
        line: { DEFAULT: 'rgb(var(--c-line) / <alpha-value>)', strong: 'rgb(var(--c-line-strong) / <alpha-value>)' },
        brand: { DEFAULT: 'rgb(var(--c-brand) / <alpha-value>)', dark: 'rgb(var(--c-brand-dark) / <alpha-value>)', light: 'rgb(var(--c-brand-light) / <alpha-value>)' },
        sky: { DEFAULT: 'rgb(var(--c-sky) / <alpha-value>)', light: 'rgb(var(--c-sky-light) / <alpha-value>)' },
        // night: the dark panels (Aegis, the form, bento title cell); a touch
        // lighter than the page in dark mode so they still read as panels
        night: 'rgb(var(--c-night) / <alpha-value>)',
        // panel: cards. Paper in light; Starlink's #141414 in dark
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        // cream: light text on night, orange and other always-dark surfaces
        cream: '#FAF8F4',

        // legacy
        steel: { DEFAULT: '#2E9FD6', light: '#E6F4FB', dark: '#1D7CAE' },
        gold: { DEFAULT: '#F5C518', dark: '#D1A20F', light: '#FDF6DC' },
        warm: { white: '#FAF8F4', off: '#F3F1EC', dark: '#1A1A18' },
        body: '#3D3D3A',
        muted: '#6B7280',
        'hero-fg': '#F5F0E8',
        'hero-muted': '#A8A09A',
        'border-warm': { DEFAULT: '#E5E1D8', strong: '#C8C3B8' },
      },
      fontFamily: {
        // --font-body / --font-head switch with the theme (app/globals.css):
        // light = Manrope + Newsreader, dark = Barlow for both (Starlink look)
        sans: ['var(--font-body)', 'var(--font-noto-sans-sc)', 'sans-serif'],
        serif: ['var(--font-head)', 'var(--font-noto-serif-sc)', 'serif'],
        seal: ['var(--font-noto-serif-sc)', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
        prose: '680px',
      },
      transitionTimingFunction: {
        // B7 base curve: weighted, decelerates into place
        gs: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'sun-rise': {
          '0%': { transform: 'translateY(90px)' },
          '100%': { transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(48px)' },
        },
      },
      animation: {
        // continuous marquee: constant speed is the point, so linear here
        'scroll-x': 'scroll-x 45s linear infinite',
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'sun-rise': 'sun-rise 2400ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both',
        drift: 'drift 16s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate',
        'drift-slow': 'drift 24s cubic-bezier(0.45, 0, 0.55, 1) -8s infinite alternate-reverse',
      },
    },
  },
  plugins: [],
};

export default config;
