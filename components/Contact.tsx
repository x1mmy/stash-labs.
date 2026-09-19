'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SectionLabel } from '@/components/SectionLabel';

const TOPICS = [
  'A product like TimeTally',
  'A website',
  'Something custom',
  'Not sure yet',
];

const CONTACT_EMAIL = 'team@stashlabs.com.au';

const fieldClass =
  'w-full box-border rounded border border-line bg-bg px-3.5 py-[13px] font-sans text-[15px] text-ink outline-none transition-colors focus:border-accent';

const labelClass =
  'font-mono text-[11px] uppercase tracking-[.1em] text-ink-3';

export function Contact() {
  const router = useRouter();
  const [topic, setTopic] = useState('Not sure yet');
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
          message: String(data.get('message') || '').trim(),
          company: String(data.get('company') || ''), // honeypot
          topic,
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
    <section id="contact" className="border-t border-line">
      <div className="shell py-[clamp(80px,11vw,150px)]">
        <div className="grid items-start gap-[clamp(36px,6vw,88px)] [grid-template-columns:minmax(0,1fr)_minmax(0,1.15fr)] max-[680px]:[grid-template-columns:minmax(0,1fr)]">
          <div>
            <div data-reveal className="mb-[clamp(20px,3vw,32px)]">
              <SectionLabel num="08.">Get in touch</SectionLabel>
            </div>

            <h2
              data-reveal
              className="m-0 mb-[clamp(20px,3vw,32px)] max-w-[14ch] text-balance text-[clamp(38px,5.6vw,76px)] font-semibold leading-none tracking-[-.035em]"
            >
              Tell us what is{' '}
              <span className="font-serif font-normal italic">
                costing you Sundays
              </span>
              <span className="text-accent">.</span>
            </h2>

            <p
              data-reveal
              className="m-0 mb-[clamp(28px,3vw,40px)] max-w-[44ch] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-ink-2"
            >
              Payroll, a website, or a problem you have not found a tool for. A
              few lines is enough to start. No pitch deck, no discovery call.
            </p>

            <div
              data-reveal
              className="flex max-w-[44ch] flex-col border-t border-line-strong"
            >
              <div className="flex justify-between gap-4 border-b border-line py-3 text-[15px]">
                <span className="text-ink-2">Reply time</span>
                <span className="font-mono text-xs">Within one business day</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3 text-[15px]">
                <span className="text-ink-2">Who answers</span>
                <span className="font-mono text-xs">One of the three of us</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3 text-[15px]">
                <span className="text-ink-2">Or email us</span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-mono text-xs"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="rounded border border-line bg-surface p-[clamp(22px,3vw,38px)]"
          >
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))] max-[680px]:[grid-template-columns:minmax(0,1fr)]">
                <label className="flex flex-col gap-[9px]">
                  <span className={labelClass}>Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Jordan Ellis"
                    className={fieldClass}
                  />
                </label>
                <label className="flex flex-col gap-[9px]">
                  <span className={labelClass}>Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="jordan@business.com.au"
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-[9px]">
                <span className={labelClass}>
                  Business{' '}
                  <span className="normal-case tracking-normal">(optional)</span>
                </span>
                <input
                  name="business"
                  type="text"
                  maxLength={160}
                  autoComplete="organization"
                  placeholder="Ellis Plumbing, 9 staff"
                  className={fieldClass}
                />
              </label>

              {/* Honeypot - real people never see or fill this. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <fieldset className="m-0 flex flex-col gap-[11px] border-0 p-0">
                <legend className={labelClass}>What do you need</legend>
                <div className="flex flex-wrap gap-[9px]">
                  {TOPICS.map((t) => {
                    const active = topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTopic(t)}
                        className={`cursor-pointer rounded-full border px-4 py-2.5 font-mono text-[11.5px] uppercase tracking-[.08em] transition-colors ${
                          active
                            ? 'border-accent bg-accent text-accent-ink'
                            : 'border-line-strong bg-transparent text-ink-2 hover:border-ink-2 hover:text-ink'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="flex flex-col gap-[9px]">
                <span className={labelClass}>What is costing you time</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={4000}
                  placeholder="Every fortnight I spend a Sunday afternoon working out timesheets from paper notes."
                  className={`${fieldClass} resize-y leading-[1.55]`}
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

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-none bg-accent px-[30px] py-4 font-sans text-base font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {sending ? 'Sending' : 'Send it through'}{' '}
                  <span className="font-mono">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
