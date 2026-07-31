import { NextRequest, NextResponse } from 'next/server';

// Stubbed endpoint: validates and accepts the contact form payload.
// Wire this up to Resend (per the design spec's technical stack) once an
// API key and destination inbox are configured — this handler is the only
// place that needs to change.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.name || !body.company || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }
  if (body.message.length < 20) {
    return NextResponse.json({ ok: false, error: 'Message must be at least 20 characters.' }, { status: 400 });
  }

  // TODO: send via Resend API once RESEND_API_KEY is configured.
  console.log('[contact] submission received:', body);

  return NextResponse.json({ ok: true });
}
