'use client';

import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from './ui/Button';

// Short enquiry form right on the home page, so "Talk to our team" is one
// step instead of a trip to another page. The site is a static export with no
// server, so it opens the visitor's email app with everything filled in
// (same approach as ContactForm). Nothing is sent until they press send.
const CONTACT_EMAIL = 'info@goldsky.ca';

export const SITE_TYPES = [
  'Quick service counter',
  'Dine in restaurant',
  'Self serve car wash',
  'Vending or partner machines',
  'Several sites',
  'Developer or integration partner',
  'Something else',
];

const field =
  'mt-2 w-full rounded-lg border border-[#34302A] bg-[#1C1A14] px-3 py-3 text-sm text-cream placeholder:text-[#6F695F] transition-colors duration-300 ease-gs focus:border-brand focus:outline-none';
const label = 'caption-1 text-[#D9D1C2]';

export function QuickContact({
  defaultSite = SITE_TYPES[0],
  messageHint = 'How many bays or counters, and how customers pay today',
  submitLabel = 'Talk to our team',
}: {
  defaultSite?: (typeof SITE_TYPES)[number];
  messageHint?: string;
  submitLabel?: string;
} = {}) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? '').trim();
    const subject = `Website enquiry: ${v('site')} · ${v('business')}`;
    const body = [
      `Name: ${v('name')}`,
      `Business: ${v('business')}`,
      `Kind of site: ${v('site')}`,
      `Email: ${v('email')}`,
      v('phone') ? `Phone: ${v('phone')}` : null,
      '',
      v('message'),
    ]
      .filter((x) => x !== null)
      .join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="qc-name" className={label}>
          Your name
        </label>
        <input id="qc-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="qc-business" className={label}>
          Business name
        </label>
        <input id="qc-business" name="business" required autoComplete="organization" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="qc-site" className={label}>
          Kind of site
        </label>
        <select id="qc-site" name="site" defaultValue={defaultSite} className={field}>
          {SITE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qc-email" className={label}>
          Email
        </label>
        <input id="qc-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="qc-phone" className={label}>
          Phone <span className="text-[#9C9384]">(optional)</span>
        </label>
        <input id="qc-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="qc-message" className={label}>
          Anything we should know <span className="text-[#9C9384]">(optional)</span>
        </label>
        <textarea
          id="qc-message"
          name="message"
          rows={3}
          placeholder={messageHint}
          className={field}
        />
      </div>
      <div className="flex flex-col items-start gap-3 sm:col-span-2">
        <Button type="submit">
          {submitLabel} <ArrowRight size={18} weight="bold" />
        </Button>
        <p className="caption-5 text-[#9C9384]">
          This opens your email app with everything filled in. Nothing is sent until you press send.
        </p>
      </div>
    </form>
  );
}
