import type { Metadata } from 'next';
import { Zap, ParkingSquare } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { TagRow } from '@/components/TagRow';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Next-Gen Infrastructure — GoldSky Technologies',
  description: 'EV charging and smart mobility infrastructure, coming Q4 2026.',
};

export default function NextGenPage() {
  return (
    <>
      <PageHero
        title="Next-Gen Infrastructure"
        subtitle="Extending the GS-SSP platform into EV charging and smart mobility."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Next-Gen Infrastructure' }]}
      />

      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <div className="flex justify-center mb-10">
            <Pill variant="comingSoon">Coming Q4 2026</Pill>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <Card className="h-full opacity-90">
                <Zap size={28} className="text-muted" />
                <h2 className="mt-4 text-lg font-semibold text-ink">EV Charging & Energy</h2>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  Networked charge-point management with dynamic billing and integrated advertising displays.
                </p>
                <TagRow className="mt-4" tags={['OCPP 1.6', 'OCPP 2.0', 'Dynamic Pricing', 'OCPI Roaming']} />
              </Card>
            </ScrollReveal>
            <ScrollReveal>
              <Card className="h-full opacity-90">
                <ParkingSquare size={28} className="text-muted" />
                <h2 className="mt-4 text-lg font-semibold text-ink">Smart Mobility & Parking</h2>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  ALPR license-plate recognition integrated with automated gate and barrier control.
                </p>
                <TagRow className="mt-4" tags={['ALPR']} />
              </Card>
            </ScrollReveal>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted mb-4">Interested in EV or Parking? Talk to us early.</p>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
