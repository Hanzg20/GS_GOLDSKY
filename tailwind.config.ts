import type { Config } from 'tailwindcss';

// GoldSky Design Tokens — retuned to match the goldsky-logo.png mark's three
// colors: the gold arc, sky-blue wing, and amber/copper eye. "steel" keeps
// its name (used across every page) but now carries the logo's sky blue
// instead of the earlier muted navy-steel.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#C8661A', dark: '#9C4F14', light: '#FBEAD6' },
        steel: { DEFAULT: '#2E9FD6', light: '#E6F4FB', dark: '#1D7CAE' },
        gold: { DEFAULT: '#F5C518', dark: '#D1A20F', light: '#FDF6DC' },
        warm: { white: '#FAF8F4', off: '#F3F1EC', dark: '#1A1A18' },
        ink: '#1A1A2E',
        body: '#3D3D3A',
        muted: '#6B7280',
        'hero-fg': '#F5F0E8',
        'hero-muted': '#A8A09A',
        'border-warm': { DEFAULT: '#E5E1D8', strong: '#C8C3B8' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sc)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
      spacing: {
        18: '4.5rem',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scroll-x': 'scroll-x 25s linear infinite',
        'fade-up': 'fade-up 400ms ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
