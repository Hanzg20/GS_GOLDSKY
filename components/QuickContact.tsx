'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { Button } from './ui/Button';

// The "Talk to our team" form, used on every page. It posts to
// /api/contact (functions/api/contact.ts), which stores the enquiry and emails
// the team. If that endpoint is missing or not configured yet (404/405/503, or
// the network fails) it falls back to the visitor's email app with everything
// filled in, so an enquiry is never lost. Setup: docs/CONTACT_FORM_SETUP.md.
const CONTACT_EMAIL = 'info@goldsky.ca';
// Public Turnstile site key, set as a build variable in Cloudflare Pages. When
// it is empty no challenge is shown (and the function must not require one).
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

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

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let turnstileScript: Promise<void> | null = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  turnstileScript ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      turnstileScript = null;
      reject(new Error('turnstile'));
    };
    document.head.appendChild(s);
  });
  return turnstileScript;
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mail';

export function QuickContact({
  defaultSite = SITE_TYPES[0],
  messageHint = 'How many bays or counters, and how customers pay today',
  submitLabel = 'Talk to our team',
}: {
  defaultSite?: (typeof SITE_TYPES)[number];
  messageHint?: string;
  submitLabel?: string;
} = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef('');
  const sent = status === 'sent';

  // Turnstile widget (only when a site key is configured); re-rendered when
  // the form comes back after "Send another message".
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || sent) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !widgetEl.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(widgetEl.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          appearance: 'interaction-only',
          callback: (t: string) => {
            token.current = t;
          },
          'expired-callback': () => {
            token.current = '';
          },
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      token.current = '';
    };
  }, [sent]);

  function openMail(v: (k: string) => string) {
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
    setStatus('mail');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? '').trim();
    setStatus('sending');
    setError('');

    let res: Response;
    try {
      res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: v('name'),
          business: v('business'),
          site: v('site'),
          email: v('email'),
          phone: v('phone'),
          message: v('message'),
          website: v('website'),
          page: window.location.pathname,
          turnstile: token.current,
        }),
      });
    } catch {
      openMail(v);
      return;
    }

    if (res.ok) {
      form.reset();
      setStatus('sent');
      return;
    }
    // Not deployed (static dev server) or not configured yet: use email.
    if ([404, 405, 503].includes(res.status)) {
      openMail(v);
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(
      data.error === 'challenge'
        ? 'We could not confirm the check. Please try again.'
        : 'Please check your name, business and email, then try again.',
    );
    setStatus('error');
    token.current = '';
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle size={40} weight="fill" className="text-brand" />
        <p className="heading-5 text-cream">Thank you, it is on its way to our team.</p>
        <p className="body-5 text-[#B9AF9E]">We reply within one business day, from {CONTACT_EMAIL}.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="body-6 text-[#D9D1C2] underline underline-offset-4 hover:text-cream"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="qc-name" className={label}>
          Your name
        </label>
        <input id="qc-name" name="name" required maxLength={120} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="qc-business" className={label}>
          Business name
        </label>
        <input id="qc-business" name="business" required maxLength={160} autoComplete="organization" className={field} />
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
        <input id="qc-email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="qc-phone" className={label}>
          Phone <span className="text-[#9C9384]">(optional)</span>
        </label>
        <input id="qc-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="qc-message" className={label}>
          Anything we should know <span className="text-[#9C9384]">(optional)</span>
        </label>
        <textarea id="qc-message" name="message" rows={3} maxLength={4000} placeholder={messageHint} className={field} />
      </div>
      {/* Honeypot: hidden from people; bots that fill it are ignored. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="qc-website">Website</label>
        <input id="qc-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {TURNSTILE_SITE_KEY && <div ref={widgetEl} className="empty:hidden sm:col-span-2" />}
      <div className="flex flex-col items-start gap-3 sm:col-span-2">
        <Button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : submitLabel} <ArrowRight size={18} weight="bold" />
        </Button>
        <p aria-live="polite" className="caption-5 text-[#9C9384]">
          {status === 'error' ? (
            <span className="text-[#F2A66B]">{error}</span>
          ) : status === 'mail' ? (
            'Opening your email app with everything filled in; press send there.'
          ) : (
            <>
              Goes straight to our team. Or write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-cream">
                {CONTACT_EMAIL}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
