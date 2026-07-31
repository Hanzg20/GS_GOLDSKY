'use client';

import { useState } from 'react';
import { Button } from './ui/Button';

export function DeveloperForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = {
      companyName: (form.elements.namedItem('companyName') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLInputElement).value,
      useCase: (form.elements.namedItem('useCase') as HTMLSelectElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/developers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-border-warm bg-warm-off p-8 text-center">
        <p className="text-base font-semibold text-ink">Thanks for reaching out.</p>
        <p className="mt-1 text-sm text-body">We&apos;ll reach out within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border-warm bg-white p-6 md:p-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="companyName" className="text-xs font-semibold text-ink">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            required
            className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-steel"
          />
        </div>
        <div>
          <label htmlFor="role" className="text-xs font-semibold text-ink">
            Your Role
          </label>
          <input
            id="role"
            name="role"
            required
            className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-steel"
          />
        </div>
      </div>

      <div>
        <label htmlFor="useCase" className="text-xs font-semibold text-ink">
          Use Case
        </label>
        <select
          id="useCase"
          name="useCase"
          defaultValue="Car Wash"
          className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-steel"
        >
          <option>Car Wash</option>
          <option>Parking</option>
          <option>EV Charging</option>
          <option>Other</option>
        </select>
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
          className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-steel"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold text-ink">
          Message <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1.5 w-full rounded-lg border border-border-warm px-3 py-2.5 text-sm focus:outline-none focus:border-steel"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong — please try again or email us directly.</p>
      )}

      <Button type="submit" variant="steelGhost" disabled={status === 'submitting'} className="!bg-steel !text-white hover:!bg-steel-dark">
        {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </Button>
    </form>
  );
}
