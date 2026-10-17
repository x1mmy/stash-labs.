import type { Metadata } from 'next';
import { Wordmark } from '@/components/Wordmark';

export const metadata: Metadata = {
  title: 'Thanks | Stash Labs',
  description:
    'One of us will be in touch within one business day to find a time for your free Hours Check.',
  robots: { index: false, follow: true },
};

const STEPS = [
  {
    title: 'We reply',
    body: 'A real email from one of the three of us, with a few times that suit.',
    strong: true,
  },
  {
    title: 'We talk',
    body: 'On site or on a call. You show us where the time goes.',
    strong: false,
  },
  {
    title: 'You decide',
    body: "If it's worth fixing, we'll suggest a fixed-fee systems audit. No obligation.",
    strong: false,
  },
];

function cleanName(raw: string | undefined) {
  if (!raw) return '';
  return raw
    .replace(/[^\p{L}\p{M}\s'-]/gu, '')
    .slice(0, 40)
    .trim();
}

export default function ThankYou({
  searchParams,
}: {
  searchParams: { name?: string | string[] };
}) {
  const raw = Array.isArray(searchParams.name)
    ? searchParams.name[0]
    : searchParams.name;
  const name = cleanName(raw);
  const heading = name ? `Thanks, ${name}` : 'Thanks, we got it';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line">
        <div className="shell flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
          <Wordmark href="/" />
          <a
            href="/"
            className="ml-auto whitespace-nowrap font-mono text-xs uppercase tracking-[.06em] text-ink-2 hover:text-ink"
          >
            ← Back to home
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="shell flex flex-col gap-[clamp(48px,6vw,88px)] py-[clamp(72px,10vw,144px)]">
          <div className="flex flex-col gap-6">
            <div className="font-mono text-xs uppercase tracking-[.08em] text-accent">
              Request received
            </div>
            <h1 className="m-0 max-w-[16ch] text-balance font-display text-[clamp(40px,6vw,84px)] font-medium leading-none tracking-[-.035em]">
              {heading}
              <span className="text-accent">.</span>
            </h1>
            <p className="m-0 max-w-[48ch] text-pretty text-[clamp(17px,1.5vw,20px)] text-ink-2">
              One of us will be in touch within one business day to find a time for your free Hours Check.
            </p>
          </div>

          <div>
            <div className="mb-5 font-mono text-xs uppercase tracking-[.08em] text-ink-2">
              What happens next
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(28px,4vw,56px)]">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className={`border-t py-6 ${step.strong ? 'border-ink' : 'border-line'}`}
                >
                  <div
                    className={`mb-3 font-mono text-[13px] ${i === 0 ? 'text-accent' : 'text-ink-3'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="m-0 mb-2 font-display text-[clamp(21px,2vw,26px)] font-medium leading-[1.2] tracking-[-.02em]">
                    {step.title}
                  </h2>
                  <p className="m-0 max-w-[36ch] text-ink-2">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="m-0 font-mono text-[13px] text-ink-2">
            Something to add? Email{' '}
            <a href="mailto:team@stashlabs.com.au">team@stashlabs.com.au</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="shell py-7 font-mono text-xs text-ink-3">
          © {new Date().getFullYear()} Stash Labs · Sydney, Australia
        </div>
      </footer>
    </div>
  );
}
