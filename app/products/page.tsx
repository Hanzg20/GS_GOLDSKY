import type { Metadata } from 'next';
import { ArrowRight, Cpu, Cloud } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { TagRow } from '@/components/TagRow';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Products — Hardware to Cloud — GoldSky Technologies',
  description: 'GS-SSP spans three layers: Edge Controller, Interactive Terminal, and Cloud SaaS platform.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products — Hardware to Cloud"
        subtitle="GS-SSP is built as two clear layers — the hardware that runs at the venue, and the software that runs everything remotely."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal>
            <a href="/products/hardware">
              <Card className="h-full">
                <div className="w-11 h-11 rounded-lg bg-steel-light flex items-center justify-center">
                  <Cpu size={22} className="text-steel" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">Hardware Layer</h2>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  Edge Controller for industrial bus and physical device control, plus terminal-agnostic support for
                  PAX, Castles, and FEITIAN Android payment terminals.
                </p>
                <TagRow className="mt-4" tags={['Edge Controller', 'PAX IM30', 'Castles S1U2', 'FEITIAN']} />
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-steel">
                  Explore Hardware <ArrowRight size={14} />
                </span>
              </Card>
            </a>
          </ScrollReveal>

          <ScrollReveal>
            <a href="/products/software">
              <Card className="h-full">
                <div className="w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center">
                  <Cloud size={22} className="text-brand" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">Software Layer</h2>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  GS-SSP Platform — the cloud SaaS connecting your fleet to Payment Engine, Operations Center, and
                  Business Intelligence.
                </p>
                <TagRow className="mt-4" tags={['Payment Engine', 'Operations Center', 'Business Intelligence']} />
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Explore Software <ArrowRight size={14} />
                </span>
              </Card>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
