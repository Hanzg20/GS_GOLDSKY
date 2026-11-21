// POST /api/contact: the "Talk to our team" form on every page.
//
// A Cloudflare Pages Function, deployed with the static site (the rest of the
// site stays a static export). Each enquiry is saved to D1 and emailed to the
// team through Resend, with Reply-To set to the visitor. Setup steps:
// docs/CONTACT_FORM_SETUP.md.
//
// Every binding is optional so the form degrades instead of breaking:
//   DB                 D1 database binding; enquiries are stored here
//   RESEND_API_KEY     secret; without it nothing is emailed
//                      (RESEND_CONTACT_API_KEY is read too, the name it was
//                      first saved under in Cloudflare)
//   CONTACT_TO         where enquiries go (default info@goldsky.ca)
//   CONTACT_FROM       sender on a domain verified in Resend
//                      (default "GoldSky website <website@goldsky.ca>")
//   TURNSTILE_SECRET   secret; when set, the Turnstile token is required
// If the enquiry was neither stored nor emailed the function answers 503 and
// the form falls back to opening the visitor's email app.

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<unknown>;
}
interface D1Database {
  prepare(sql: string): D1Statement;
}
interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  RESEND_CONTACT_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET?: string;
}
interface Ctx {
  request: Request;
  env: Env;
}

const LIMITS = { name: 120, business: 160, site: 80, email: 200, phone: 40, message: 4000, page: 200 } as const;
type Field = keyof typeof LIMITS;

const SCHEMA = `CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  business TEXT NOT NULL,
  site TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  page TEXT,
  country TEXT,
  emailed INTEGER NOT NULL DEFAULT 0
)`;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// Only our own pages may post: goldsky.ca, Pages previews and local dev.
function allowedOrigin(origin: string | null) {
  if (!origin) return true; // same-origin requests from some browsers omit it
  try {
    const h = new URL(origin).hostname;
    return (
      h === 'goldsky.ca' ||
      h.endsWith('.goldsky.ca') ||
      h.endsWith('.pages.dev') ||
      h === 'localhost' ||
      h === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const data = (await r.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(key: string, env: Env, v: Record<Field, string>) {
  const rows: [string, string][] = [
    ['Name', v.name],
    ['Business', v.business],
    ['Kind of site', v.site],
    ['Email', v.email],
    ['Phone', v.phone],
    ['Sent from', v.page],
  ].filter(([, x]) => x) as [string, string][];
  const text = rows.map(([k, x]) => `${k}: ${x}`).join('\n') + (v.message ? `\n\n${v.message}` : '');
  const html =
    `<table cellpadding="4" style="font:14px/1.5 sans-serif;border-collapse:collapse">` +
    rows.map(([k, x]) => `<tr><td style="color:#6f695f;padding-right:16px">${esc(k)}</td><td>${esc(x)}</td></tr>`).join('') +
    `</table>` +
    (v.message ? `<p style="font:14px/1.6 sans-serif;white-space:pre-wrap">${esc(v.message)}</p>` : '');

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'GoldSky website <website@goldsky.ca>',
      to: [env.CONTACT_TO || 'info@goldsky.ca'],
      reply_to: v.email,
      subject: `Website enquiry: ${v.site || 'General'} · ${v.business}`,
      text,
      html,
    }),
  });
  if (!r.ok) console.error('resend', r.status, await r.text().catch(() => ''));
  return r.ok;
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  if (!allowedOrigin(request.headers.get('origin'))) return json(403, { ok: false, error: 'origin' });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: 'invalid' });
  }

  // Honeypot: a hidden field people never fill. Pretend success to bots.
  if (typeof body.website === 'string' && body.website.trim()) return json(200, { ok: true });

  const v = {} as Record<Field, string>;
  for (const k of Object.keys(LIMITS) as Field[]) {
    const raw = typeof body[k] === 'string' ? (body[k] as string) : '';
    v[k] = raw.trim().slice(0, LIMITS[k]);
  }
  // Single-line fields must not smuggle header breaks into the email.
  for (const k of ['name', 'business', 'site', 'email', 'phone', 'page'] as const) v[k] = v[k].replace(/[\r\n]+/g, ' ');
  if (!v.name || !v.business || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    return json(400, { ok: false, error: 'invalid' });
  }

  const ip = request.headers.get('cf-connecting-ip');
  if (env.TURNSTILE_SECRET) {
    const token = typeof body.turnstile === 'string' ? body.turnstile : '';
    if (!(await verifyTurnstile(env.TURNSTILE_SECRET, token, ip))) return json(400, { ok: false, error: 'challenge' });
  }

  let emailed = false;
  const resendKey = env.RESEND_API_KEY || env.RESEND_CONTACT_API_KEY;
  if (resendKey) {
    try {
      emailed = await sendEmail(resendKey, env, v);
    } catch (e) {
      console.error('resend', e);
    }
  }

  let stored = false;
  if (env.DB) {
    try {
      await env.DB.prepare(SCHEMA).run();
      await env.DB.prepare(
        'INSERT INTO enquiries (name, business, site, email, phone, message, page, country, emailed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      )
        .bind(v.name, v.business, v.site, v.email, v.phone, v.message, v.page, request.headers.get('cf-ipcountry') ?? '', emailed ? 1 : 0)
        .run();
      stored = true;
    } catch (e) {
      console.error('d1', e);
    }
  }

  if (!emailed && !stored) return json(503, { ok: false, error: 'unavailable' });
  return json(200, { ok: true });
}
