export type ContactPayload = {
  name: string;
  email: string;
  business: string;
  message: string;
  topic: string;
};

const LIMITS = {
  name: 120,
  email: 200,
  business: 160,
  message: 4000,
  topic: 60,
} as const;

/**
 * Trust boundary: this runs on whatever the internet posted.
 * Returns the cleaned payload, or `{ error }` - where `error: 'spam'` means
 * the honeypot fired and the caller should look successful but drop it.
 */
export function parseContact(
  body: unknown
): ContactPayload | { error: string } {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { error: 'Invalid request.' };
  }
  const b = body as Record<string, unknown>;

  // Real people never see the "company" field, so a filled one means a bot.
  if (typeof b.company === 'string' && b.company.trim() !== '') {
    return { error: 'spam' };
  }

  const str = (v: unknown, max: number) =>
    typeof v === 'string' ? v.trim().slice(0, max) : '';

  const name = str(b.name, LIMITS.name);
  const email = str(b.email, LIMITS.email);
  const message = str(b.message, LIMITS.message);

  if (!name) return { error: 'Please add your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'That email address does not look right.' };
  }
  if (!message) return { error: 'Please tell us what is costing you time.' };

  return {
    name,
    email,
    message,
    business: str(b.business, LIMITS.business),
    topic: str(b.topic, LIMITS.topic) || 'Not sure yet',
  };
}
