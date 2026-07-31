'use client';

import { Button } from './ui/Button';

// Static export has no server, so this opens the visitor's own email
// client via mailto: instead of POSTing to a backend.
// NOTE: unconfirmed -- user provided "dev@goldsk.ca" (likely a typo missing
// the "y"); using the goldsky.ca domain until confirmed otherwise.
const DEVELOPER_EMAIL = 'dev@goldsky.ca';

export function DeveloperForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      companyName: (form.elements.namedItem('companyName') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLInputElement).value,
      useCase: (form.elements.namedItem('useCase') as HTMLSelectElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    const subject = `Developer Access Request — ${data.companyName}`;
    const body = `Company: ${data.companyName}\nRole: ${data.role}\nUse Case: ${data.useCase}\nEmail: ${data.email}\n\n${data.message}`;
    window.location.href = `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

      <p className="text-xs text-muted">Opens your email client with this pre-filled — nothing is sent until you hit send there.</p>

      <Button type="submit" variant="steelGhost" className="!bg-steel !text-white hover:!bg-steel-dark">
        Submit Application
      </Button>
    </form>
  );
}
