import type { Metadata } from 'next';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Message received | Stash Labs',
  description:
    'Your message landed with all three of us. A real reply is coming within one business day.',
  robots: { index: false, follow: true },
};

const STEPS = [
  {
    title: 'We read it properly',
    body: 'Within one business day you get a real reply, from a person, about your actual problem.',
  },
  {
    title: 'We say if we are the wrong fit',
    body: 'If an off-the-shelf tool solves it cheaper, we will name the tool and you can go use it.',
  },
  {
    title: 'Scope in writing before work starts',
    body: 'A fixed scope, a fixed number and a date. Nothing gets built off a verbal maybe.',
  },
];

function cleanName(raw: string | undefined) {
  if (!raw) return '';
  return raw
    .replace(/[^\p{L}\p{M}\s'-]/gu, '')
    .slice(0, 24)
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

  const stamp = new Date()
    .toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line">
        <div className="shell flex items-center justify-between gap-4 py-[18px]">
          <a
            href="/"
            className="group flex items-center gap-2.5 text-[19px] font-semibold tracking-[-.02em] text-ink"
          >
            <Image
              src="/android-chrome-512x512.png"
              alt=""
              width={30}
              height={30}
              className="block h-[30px] w-[30px] rounded-lg transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-[6deg]"
              priority
            />
            <span className="flex items-baseline gap-0.5">
              Stash Labs
              <span className="inline-block origin-bottom text-accent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.6]">
                .
              </span>
            </span>
          </a>
          <span className="font-mono text-[11.5px] uppercase tracking-[.09em] text-ink-2">
            Sydney, AU
          </span>
        </div>
      </header>

      <main className="shell flex-1 pb-[clamp(48px,7vw,110px)] pt-[clamp(56px,10vw,140px)]">
        <div className="mb-[clamp(28px,4vw,48px)] flex items-center gap-3.5 font-mono text-[11.5px] uppercase tracking-[.1em] text-ink-2 [animation:riseIn_.8s_cubic-bezier(.16,1,.3,1)_both]">
          <span className="h-[7px] w-[7px] rounded-full bg-accent [animation:blink_2.4s_ease-in-out_infinite]" />
          <span>Message received</span>
          <span className="h-px flex-1 origin-left bg-[var(--line)] [animation:drawRule_1.1s_cubic-bezier(.16,1,.3,1)_.2s_both]" />
          <span>{stamp}</span>
        </div>

        <h1 className="m-0 mb-[clamp(24px,3vw,40px)] max-w-[16ch] text-balance text-[clamp(40px,7.4vw,104px)] font-semibold leading-[.95] tracking-[-.035em] [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.1s_both]">
          Thanks{name ? `, ${name}` : ''}. It landed with{' '}
          <span className="font-serif font-normal italic">all three of us</span>
          <span className="text-accent">.</span>
        </h1>

        <p className="m-0 mb-[clamp(44px,6vw,88px)] max-w-[52ch] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-ink-2 [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.22s_both]">
          No auto-responder, no sequence. One of us reads it, thinks about it,
          and writes back within one business day, usually with a question or
          two before anything else.
        </p>

        <div className="grid gap-[clamp(28px,5vw,80px)] [grid-template-columns:minmax(0,1fr)_minmax(0,2.1fr)] max-[680px]:[grid-template-columns:minmax(0,1fr)] [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.34s_both]">
          <div>
            <div className="mb-4 flex gap-2.5 font-mono text-[11.5px] uppercase tracking-[.1em] text-ink-2">
              <span className="text-accent">→</span>
              <span>What happens next</span>
            </div>
            <p className="m-0 max-w-[30ch] text-[15px] leading-[1.6] text-ink-3">
              Three steps, and you can stop at any of them.
            </p>
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`grid items-baseline gap-[clamp(12px,3vw,48px)] py-[clamp(18px,2.4vw,30px)] [grid-template-columns:minmax(0,56px)_minmax(0,1.1fr)_minmax(0,1.2fr)] max-[680px]:gap-x-3.5 max-[680px]:gap-y-1.5 max-[680px]:[grid-template-columns:minmax(0,40px)_minmax(0,1fr)] ${
                  i === 0 ? 'border-t border-line-strong' : 'border-t border-line'
                } ${i === STEPS.length - 1 ? 'border-b border-b-line-strong' : ''}`}
              >
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="m-0 text-[clamp(19px,2.1vw,26px)] font-semibold leading-[1.2] tracking-[-.02em]">
                  {step.title}
                </h2>
                <p className="m-0 text-base leading-[1.6] text-ink-2 max-[680px]:col-start-2">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(48px,7vw,110px)] border-t border-line pt-[clamp(28px,4vw,48px)] [animation:riseIn_.9s_cubic-bezier(.16,1,.3,1)_.46s_both]">
          <p className="m-0 mb-[clamp(26px,3.5vw,40px)] max-w-[28ch] font-serif text-[clamp(22px,2.6vw,34px)] leading-[1.25] tracking-[-.01em]">
            While you wait, the thing we are building right now.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="https://www.timetally.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[30px] py-4 text-base font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 max-[680px]:flex-[1_1_100%] max-[680px]:justify-center"
            >
              See TimeTally <span className="font-mono">↗</span>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-[30px] py-4 text-base font-semibold text-ink transition-colors hover:bg-surface max-[680px]:flex-[1_1_100%] max-[680px]:justify-center"
            >
              Back to the studio
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-[clamp(28px,4vw,44px)] font-mono text-[11.5px] text-ink-3">
          <span>© {new Date().getFullYear()} Stash Labs · Sydney, Australia</span>
          <div className="flex flex-wrap items-center gap-[22px]">
            <span>
              Something urgent?{' '}
              <a href="mailto:team@stashlabs.com.au">team@stashlabs.com.au</a>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
