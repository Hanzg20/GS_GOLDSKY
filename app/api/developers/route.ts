import { NextRequest, NextResponse } from 'next/server';

// Stubbed endpoint: validates and accepts the developer application payload.
// Wire this up to Resend (per the design spec's technical stack) once an
// API key and destination inbox are configured — this handler is the only
// place that needs to change.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.companyName || !body.email || !body.role) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  // TODO: send via Resend API once RESEND_API_KEY is configured.
  console.log('[developers/apply] submission received:', body);

  return NextResponse.json({ ok: true });
}
