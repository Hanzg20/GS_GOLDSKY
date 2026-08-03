import type { Metadata } from 'next';
import { Tablet, Refrigerator, ScanEye, Layers, PackageOpen } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { TagRow } from '@/components/TagRow';
import { SpecTable } from '@/components/SpecTable';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ScenePhoto } from '@/components/ScenePhoto';
import { WiringDiagram } from '@/components/WiringDiagram';

// Representative categories only -- deliberately excludes anything outside
// unattended commercial retail (arcade/toy/shared-mobility equipment from
// manufacturer catalogs isn't relevant to a payments-infrastructure story).
// No manufacturer is named; relationship is in discussion, not signed.
const EXPANDING_ECOSYSTEM = [
  {
    icon: Refrigerator,
    title: 'Refrigerated & Frozen Vending Cabinets',
    desc: 'Single- and double-door smart cabinets, 5 to 30+ compartments, gravity-sensing dispensing for food & beverage retail.',
  },
  {
    icon: ScanEye,
    title: 'AI Vision Vending Cabinets',
    desc: 'Camera-based product recognition for open-shelf and cooler formats — no gravity sensors required.',
  },
  {
    icon: Layers,
    title: 'Gravity + AI Hybrid Cabinets',
    desc: 'Combines gravity sensing and computer vision in one cabinet for faster, more accurate checkout.',
  },
  {
    icon: PackageOpen,
    title: 'Smart Pickup Lockers',
    desc: 'Refrigerated compartment lockers for order pickup and parcel delivery.',
  },
];

export const metadata: Metadata = {
  title: 'Hardware Layer — GoldSky Technologies',
  description: 'GS-SSP Edge Controller and Interactive Payment Terminals — the hardware layer of the platform.',
};

const TERMINAL_COMPARISON = [
  { label: 'Screen Size', values: ['6.0" HD Touch', '5.5" Touch', '5.0" Touch'] },
  { label: 'Operating System', values: ['Android 11+', 'Android 10+', 'Android 9+'] },
  { label: 'Protection Rating', values: ['IP65 Full Waterproof', 'IP54 Splash Resistant', 'IP52 Drip Resistant'] },
  { label: 'Operating Temp', values: ['−30°C to +60°C', '−20°C to +50°C', '−10°C to +45°C'] },
  { label: 'Payment Interfaces', values: ['EMV / NFC / QR / Mag', 'EMV / NFC / Mag', 'EMV / NFC / Mag'] },
  { label: 'Connectivity', values: ['4G LTE + WiFi + BT', 'WiFi + BT + LAN', 'WiFi + BT'] },
  { label: 'Certification', values: ['EMV L3 / PCI PTS 6.x', 'EMV L3 / PCI PTS', 'EMV L2 / PCI PTS'] },
  { label: 'Best Suited For', values: ['Outdoor Unattended (Primary)', 'Indoor / Outdoor', 'Primarily Indoor'] },
];

const CONTROLLER_SPECS = [
  { label: 'Power Supply', values: ['12–24VDC'] },
  { label: 'Operating Temperature', values: ['−30°C to +60°C'] },
  { label: 'Protection', values: ['IP65'] },
  { label: 'Interfaces', values: ['RS485 / CAN / GPIO'] },
  { label: 'Certification', values: ['CSA / UL'] },
];

export default function HardwarePage() {
  return (
    <>
      <PageHero
        title="Hardware Layer"
        subtitle="Edge Controller and Interactive Payment Terminals — terminal-agnostic, built for industrial reliability."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Hardware' }]}
      />

      {/* 3a-1 Edge Controller */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="Edge Controller" pillVariant="steel" title="GS-SSP Edge Controller" />
            <p className="mt-1 text-sm text-body max-w-2xl">
              The core control unit connecting payment terminals to on-site hardware — supporting industrial buses
              and direct physical device control.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ScrollReveal>
              <ScenePhoto
                src="/images/controller-enclosure-wiring.jpg"
                alt="Edge controller enclosure and wiring terminals"
                label="GS-SSP Edge Controller — enclosure and wiring terminals"
              />
            </ScrollReveal>
            <ScrollReveal>
              <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">Supported Buses</h3>
              <TagRow tags={['MDB (Vending)', 'DEX (Data Exchange)', 'RS485', 'CAN Bus', 'GPIO']} />

              <h3 className="mt-6 text-sm font-semibold text-ink uppercase tracking-wide mb-3">Physical Capabilities</h3>
              <ul className="space-y-1.5 text-sm text-body">
                <li>• High-voltage relay output</li>
                <li>• Sensor integration</li>
                <li>• Timing control</li>
                <li>• IP65-rated waterproof enclosure</li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-ink uppercase tracking-wide mb-3">Compatibility</h3>
              <p className="text-sm text-body">
                Terminal Agnostic — compatible with the full PAX, Castles, and FEITIAN terminal lineup.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-8">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-4">Wiring Overview</p>
              <WiringDiagram />
            </Card>
          </ScrollReveal>

          <ScrollReveal className="mt-6">
            <SpecTable columns={['Edge Controller']} rows={CONTROLLER_SPECS} />
          </ScrollReveal>
        </div>
      </section>

      {/* 3a-2 Interactive Payment Terminals */}
      <section className="bg-warm-off py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <SectionHeading pill="Terminals" pillVariant="steel" title="Interactive Payment Terminals" />
            <p className="mt-1 text-sm text-body max-w-2xl">
              5.0"–6.5" large-screen Android touch terminals hosting the GS-SSP application and payment processing.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'PAX IM30', scenario: 'Outdoor unattended (primary)', tags: ['IP65', '6.0"', 'EMV L3'] },
              { name: 'Castles S1U2', scenario: 'Indoor / outdoor general use', tags: ['IP54', '5.5"', 'EMV L3'] },
              { name: 'FEITIAN M20', scenario: 'Primarily indoor (alternate)', tags: ['IP52', '5.0"', 'EMV L2'] },
            ].map((t) => (
              <ScrollReveal key={t.name}>
                <Card bg="white" className="h-full">
                  <Tablet size={26} className="text-steel" />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{t.name}</h3>
                  <p className="mt-1 text-xs text-muted">{t.scenario}</p>
                  <TagRow className="mt-3" tags={t.tags} />
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8">
            <SpecTable columns={['PAX IM30', 'Castles S1U2', 'FEITIAN M20']} rows={TERMINAL_COMPARISON} />
          </ScrollReveal>
        </div>
      </section>

      {/* Expanding Hardware Ecosystem — in active discussions with
          international hardware manufacturers, nothing signed yet, so no
          specific company is named here. */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-10">
          <ScrollReveal>
            <Pill variant="comingSoon" className="mb-4">
              Expanding Ecosystem
            </Pill>
            <SectionHeading title="Extending GS-SSP to Next-Generation Unattended Retail Hardware" />
            <p className="mt-1 text-sm text-body max-w-2xl">
              Industrial-grade cabinets built for extreme climates, compatible with our GPIO / MDB / RS485
              control layer — representative categories we're extending GS-SSP to support.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EXPANDING_ECOSYSTEM.map((item) => (
              <ScrollReveal key={item.title}>
                <Card className="h-full opacity-90">
                  <item.icon size={26} className="text-muted" />
                  <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-body leading-relaxed">{item.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-6">
            <p className="text-xs text-muted max-w-2xl">
              Existing equipment can be retrofitted with GS-SSP control, and new-generation cabinets can ship
              pre-integrated. GoldSky is in active discussions with international industrial hardware
              manufacturers to bring these next-generation form factors to the GS-SSP platform.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
