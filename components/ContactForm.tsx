'use client';

import { useState } from 'react';
import { Button } from './ui/Button';

// Static export has no server, so this opens the visitor's own email
// client via mailto: instead of POSTing to a backend.
const CONTACT_EMAIL = 'info@goldsky.ca';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      inquiryType: (form.elements.namedItem('inquiryType') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    if (data.message.trim().length < 20) {
      setStatus('error');
      setErrorMsg('Message must be at least 20 characters.');
      return;
    }

    const subject = `[${data.inquiryType}] Inquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`;
    const body = `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nInquiry Type: ${data.inquiryType}\n\n${data.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-xs font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="company" className="text-xs font-semibold text-ink">
            Company
          </label>
          <input
            id="company"
            name="company"
            required
            className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-brand"
        />
      </div>

      <div>
        <label htmlFor="inquiryType" className="text-xs font-semibold text-ink">
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          defaultValue="General"
          className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-brand"
        >
          <option>General</option>
          <option>Request Demo</option>
          <option>Partnership</option>
          <option>Technical Support</option>
          <option>Careers</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold text-ink">
          Message <span className="text-muted font-normal">(min. 20 characters)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          minLength={20}
          required
          className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-brand"
        />
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{errorMsg}</p>}
      <p className="text-xs text-muted">Opens your email client with this pre-filled — nothing is sent until you hit send there.</p>

      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        Send Message →
      </Button>
    </form>
  );
}
