'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CONTACT_EMAIL = 'team@stashlabs.com.au';

const fieldClass =
  'box-border min-h-12 w-full rounded-sm border border-line-strong bg-surface px-3.5 py-3 font-sans text-base text-ink outline-none transition-colors focus:border-accent';

const labelClass =
  'font-mono text-[11.5px] uppercase tracking-[.08em] text-ink-2';

export function Contact() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();

    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: String(data.get('email') || '').trim(),
          business: String(data.get('business') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          message: String(data.get('message') || '').trim(),
          company: String(data.get('company') || ''), // honeypot
          topic: 'Systems chat',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong on our end.');
      }

      const firstName = name.split(' ')[0];
      router.push(
        `/thank-you${firstName ? `?name=${encodeURIComponent(firstName)}` : ''}`
      );
    } catch (err) {
      setSending(false);
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong on our end.'
      );
    }
  }

  return (
    <section id="book" className="bg-surface">
      <div className="shell split items-start gap-[clamp(40px,6vw,96px)] py-[clamp(88px,11vw,160px)] grid-cols-2">
        <div className="flex flex-col gap-7">
          <h2 className="m-0 max-w-[14ch] text-balance font-display text-[clamp(38px,5.4vw,76px)] font-medium leading-none tracking-[-.035em]">
            Book a free 30-min systems chat
            <span className="text-accent">.</span>
          </h2>
          <p className="lede max-w-[40ch]">
            Thirty minutes. No pitch deck. Just where your hours are going.
          </p>
          <div className="flex max-w-[420px] flex-col border-b border-line text-[15px]">
            <div className="flex justify-between gap-4 border-t border-line py-3">
              <span className="text-ink-2">Reply</span>
              <span className="font-mono text-[12.5px]">
                Within one business day
              </span>
            </div>
            <div className="flex justify-between gap-4 border-t border-line py-3">
              <span className="text-ink-2">Or email</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="link-rule font-mono text-[12.5px]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-line-strong bg-bg p-[clamp(22px,3vw,36px)]">
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Business</span>
                <input
                  name="business"
                  type="text"
                  maxLength={160}
                  autoComplete="organization"
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>
                  Phone{' '}
                  <span className="normal-case tracking-normal text-ink-3">
                    (optional)
                  </span>
                </span>
                <input
                  name="phone"
                  type="tel"
                  maxLength={40}
                  autoComplete="tel"
                  className={fieldClass}
                />
              </label>
            </div>

            {/* Honeypot - real people never see or fill this. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <label className="flex flex-col gap-2">
              <span className={labelClass}>What&apos;s eating your time?</span>
              <textarea
                name="message"
                required
                rows={4}
                maxLength={4000}
                placeholder="Every Friday someone retypes the paper job sheets into Xero."
                className={`${fieldClass} resize-y leading-normal`}
              />
            </label>

            {error && (
              <p
                role="alert"
                className="m-0 font-mono text-[11.5px] leading-[1.6] text-accent"
              >
                {error} You can also email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-primary self-start"
            >
              {sending ? 'Sending' : 'Book my chat'}{' '}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
