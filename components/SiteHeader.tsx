import Image from 'next/image';

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#studio', label: 'Studio' },
  { href: '#process', label: 'Process' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="shell flex items-center justify-between gap-4 py-[18px]">
        <a
          href="#top"
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
            {/* The brand full stop is the one accent mark in the wordmark, so
                it is what reacts - same beat as the blinking status dot. */}
            <span className="inline-block origin-bottom text-accent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.6]">
              .
            </span>
          </span>
        </a>

        <nav className="flex items-center gap-[clamp(14px,3vw,26px)] font-mono text-[11.5px] uppercase tracking-[.09em]">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-ink-2 transition-colors duration-300 hover:text-ink focus-visible:text-ink max-[680px]:hidden"
            >
              {item.label}
              {/* An accent rule wiping in from the left - the same origin-left
                  scaleX move as the fillRow bars and the thank-you page rule. */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          ))}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-[9px] tracking-[.08em] text-accent-ink transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5"
          >
            Get in touch
            <span className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
