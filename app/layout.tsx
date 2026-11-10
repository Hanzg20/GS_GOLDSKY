import type { Metadata } from 'next';
import { Barlow, Manrope, Newsreader, Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeRoute } from '@/components/ThemeToggle';
import { THEME_INIT_SCRIPT } from '@/lib/theme';

// One sans for running text, one serif for headings (the humanistic voice),
// a serif CJK face for the product line seals. No italics are loaded.
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false, // Next 14 has no fallback metrics for Newsreader
});

// Dark theme only: a DIN style grotesque, after starlink.com (which uses NeoDIN).
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: false,
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'GoldSky · Payment and store tools for Canadian businesses',
  description:
    'GS-SSP brings counter, handheld and self serve payments together on one platform. Built in Ottawa, running in Kanata.',
  metadataBase: new URL('https://www.goldsky.ca'),
  openGraph: {
    title: 'GoldSky · Payment and store tools for Canadian businesses',
    description:
      'GS-SSP brings counter, handheld and self serve payments together on one platform. Built in Ottawa, running in Kanata.',
    url: 'https://www.goldsky.ca',
    siteName: 'GoldSky Technologies',
    images: [
      {
        url: '/images/art/share-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Illustration: a self serve car wash under a snow capped mountain and a large orange sun',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/art/share-og.jpg'],
  },
  icons: {
    icon: '/goldsky-logo.png',
    apple: '/goldsky-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${manrope.variable} ${newsreader.variable} ${barlow.variable} ${notoSansSC.variable} ${notoSerifSC.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* marks JS as present (scroll scenes start from their "before" state
            without a flash) and applies the saved theme before paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <ThemeRoute />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
