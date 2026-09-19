import { NextResponse } from 'next/server';
import { parseContact, type ContactPayload } from '@/lib/contact';
import { receivedEmail } from '@/lib/receivedEmail';

export const runtime = 'nodejs';

const CONTACT_EMAIL = 'team@stashlabs.com.au';
const FROM = process.env.CONTACT_FROM_EMAIL || `Stash Labs <${CONTACT_EMAIL}>`;

/** Discord renders `*` and `_` as markdown, so neutralise them in user text. */
const noMarkdown = (s: string) => s.replace(/([*_`~|\\>])/g, '\\$1');

/** Discord hard-caps an embed field value at 1024 characters. */
const field = (name: string, value: string, inline = false) => ({
  name,
  value: value.length > 1024 ? `${value.slice(0, 1021)}...` : value,
  inline,
});

async function notifyDiscord(p: ContactPayload) {
  const url = process.env.FORM_SUBMISSION_WEBHOOK_URL;
  if (!url) {
    console.warn(
      '[contact] FORM_SUBMISSION_WEBHOOK_URL unset - skipping notification'
    );
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // No username/avatar_url here on purpose - those would override the name
      // and avatar configured on the webhook in Discord's own settings.
      content: `**New enquiry from ${noMarkdown(p.name)}** · ${noMarkdown(p.topic)}`,
      embeds: [
        {
          color: 0xe5522a,
          fields: [
            field('Name', noMarkdown(p.name), true),
            field('Email', p.email, true),
            field('Looking for', noMarkdown(p.topic), true),
            field('Business', p.business ? noMarkdown(p.business) : '-'),
            field('What is costing them time', noMarkdown(p.message)),
            field('Reply to', `<mailto:${p.email}>`),
          ],
          footer: { text: 'stashlabs.com.au · reply within one business day' },
          timestamp: new Date().toISOString(),
        },
      ],
      // Never let a submitted name ping the whole server.
      allowed_mentions: { parse: [] },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Discord webhook failed: ${res.status} ${await res.text().catch(() => '')}`
    );
  }
}

async function sendConfirmation(p: ContactPayload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[contact] RESEND_API_KEY unset - skipping confirmation email');
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [p.email],
      reply_to: CONTACT_EMAIL,
      subject: 'We got your message',
      html: receivedEmail(p.name),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = parseContact(body);
  if ('error' in parsed) {
    // Bots get a 200 so they stop retrying; humans get the real reason.
    if (parsed.error === 'spam') return NextResponse.json({ ok: true });
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  // The Discord ping IS the lead - if it fails the submission is lost, so the
  // visitor has to hear about it. The confirmation email is a nicety: log it and move on.
  try {
    await notifyDiscord(parsed);
  } catch (err) {
    console.error('[contact] notification failed', err);
    return NextResponse.json(
      { error: 'We could not deliver that just now.' },
      { status: 502 }
    );
  }

  try {
    await sendConfirmation(parsed);
  } catch (err) {
    console.error('[contact] confirmation email failed', err);
  }

  return NextResponse.json({ ok: true });
}
