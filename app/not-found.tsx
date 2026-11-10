import type { Metadata } from 'next';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { DayMark } from '@/components/DayMark';
import { NightPhoto } from '@/components/NightPhoto';

export const metadata: Metadata = {
  title: 'Page not found · GoldSky',
  robots: { index: false },
};

// Static export writes this as 404.html, which Cloudflare Pages serves for any
// unknown path. Same day-in-town story: dusk, a quiet road, a blank signpost.
export default function NotFound() {
  return (
    <section className="px-4 pb-24 pt-10 md:pt-16">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div>
          <DayMark hour={18}>Dusk · 404</DayMark>
          <h1 className="heading-2 mt-5">This road doesn&apos;t go anywhere yet</h1>
          <p className="body-3 mt-4 max-w-prose text-ink-soft">
            The page you were looking for has moved or never existed. The way back into town is right here.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/">
              Back to the home page <ArrowRight size={18} weight="bold" />
            </Button>
            <a
              href="/#talk"
              className="body-5 group inline-flex items-center gap-1 text-brand-dark"
            >
              Or talk to our team
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 ease-gs group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
        <div className="paper-grain overflow-hidden rounded-2xl border border-line bg-paper-deep dark:hidden">
          {/* static export: plain img, no Image Optimization */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/art/not-found.webp"
            srcSet="/images/art/not-found-800.webp 800w, /images/art/not-found.webp 1600w"
            sizes="(min-width: 1024px) 700px, 100vw"
            width={1600}
            height={1000}
            alt="Illustration: a quiet road at dusk curving between pines toward a small town, a blank signpost by the roadside"
            className="block h-auto w-full"
          />
        </div>
        <NightPhoto id="notfound" className="hidden aspect-[16/10] rounded-2xl dark:block" sizes="(min-width: 1024px) 700px, 100vw" />
      </div>
    </section>
  );
}
