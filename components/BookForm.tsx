'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FORMATS = [
  'On site, 90 minutes',
  'Video call, 60 minutes',
  'Not sure yet',
];

const fieldClass =
  'box-border min-h-12 w-full rounded-[2px] border border-line-strong bg-surface px-3.5 py-3 font-sans text-base text-ink outline-none focus:border-accent';

const labelClass =
  'font-mono text-[11.5px] uppercase tracking-[.08em] text-ink-2';

export function BookForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const data = new FormData(event.currentTarget);
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
          format: String(data.get('format') || ''),
          message: String(data.get('message') || '').trim(),
          company: String(data.get('company') || ''),
          topic: 'Hours Check',
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong on our end.');
      }
      const first = name.split(' ')[0];
      router.push(
        `/thank-you${first ? `?name=${encodeURIComponent(first)}` : ''}`
      );
    } catch (err) {
      setSending(false);
      setError(
        err instanceof Error ? err.message : 'Something went wrong on our end.'
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-5">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Name</span>
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Business</span>
          <input name="business" type="text" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>
            Phone <span className="normal-case tracking-normal text-ink-3">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className={labelClass}>How would you like to do it</span>
        <select name="format" defaultValue={FORMATS[0]} className={fieldClass}>
          {FORMATS.map((format) => (
            <option key={format}>{format}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelClass}>What&apos;s eating your time?</span>
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>
      <label className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {error ? (
        <p className="m-0 font-mono text-[12px] text-accent" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={sending}
        className="cta inline-flex w-fit cursor-pointer items-center gap-3 rounded-[2px] border-0 bg-accent px-6 py-4 text-base font-semibold text-accent-ink disabled:opacity-60"
      >
        {sending ? 'Sending' : 'Book my Hours Check'}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export function BookSection() {
  return (
    <section id="book" className="bg-surface">
      <div className="shell grid grid-cols-2 items-start gap-[clamp(40px,6vw,96px)] py-[clamp(88px,11vw,160px)] max-[760px]:grid-cols-1">
        <div className="flex flex-col gap-7">
          <h2 className="m-0 max-w-[14ch] text-balance font-display text-[clamp(38px,5.4vw,76px)] font-medium leading-none tracking-[-.035em]">
            Book a free Hours Check
            <span className="text-accent">.</span>
          </h2>
          <p className="m-0 max-w-[40ch] text-pretty text-[clamp(17px,1.5vw,20px)] text-ink-2">
            Tell us what&apos;s eating your time. We&apos;ll watch how it works and give you the number in writing.
          </p>
          <div className="flex max-w-[420px] flex-col border-b border-line text-[15px]">
            {(
              [
                { label: 'Reply', value: 'Within one business day' },
                { label: 'Format', value: 'On site (90 min) or video call (60 min)' },
                { label: 'Or email', value: 'team@stashlabs.com.au', href: 'mailto:team@stashlabs.com.au' },
              ] as const
            ).map((fact) => (
              <div
                key={fact.label}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line py-3"
              >
                <span className="text-ink-2">{fact.label}</span>
                {fact.href ? (
                  <a href={fact.href} className="font-mono text-[12.5px]">
                    {fact.value}
                  </a>
                ) : (
                  <span className="font-mono text-[12.5px]">{fact.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2px] border border-line-strong bg-bg p-[clamp(22px,3vw,36px)]">
          <BookForm />
        </div>
      </div>
    </section>
  );
}
