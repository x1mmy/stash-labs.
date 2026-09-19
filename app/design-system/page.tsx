import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionLabel } from '@/components/SectionLabel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { readTokens, type TokenRow } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'Design system | Stash Labs',
  description:
    'The Stash Labs brand guidelines: colour tokens, type, layout, motion and voice, kept in one place.',
  // House reference, not a marketing page.
  robots: { index: false, follow: false },
};

const TOKEN_NOTES: Record<string, string> = {
  bg: 'Page background. Nothing else sits behind it.',
  surface: 'Raised panels: footer, cards, hover fills.',
  'surface-2': 'The second step up: insets, wells, chart ground.',
  ink: 'Body and headline text. Never pure black or white.',
  'ink-2': 'Supporting copy and inactive nav.',
  'ink-3': 'Meta, captions, legal: the quietest readable step.',
  line: 'Default hairline. Every section divider.',
  'line-strong': 'Emphasised rule: outline buttons, first/last rows.',
  accent: 'The studio orange. One saturated mark per view.',
  'accent-ink': 'Text on an accent fill. Contrast pair, never decorative.',
  tt: 'TimeTally blue. Only inside TimeTally context.',
  lc: 'Live / positive state. Status dots and credits.',
};

const TYPE_SCALE = [
  { role: 'Display', spec: 'clamp(40px, 7.4vw, 104px) · 600 · -.035em · 0.95', use: 'One per page. The hero and page H1.' },
  { role: 'Section head', spec: 'clamp(28px, 4vw, 56px) · 600 · -.03em', use: 'Opens a section. Sentence case.' },
  { role: 'Sub head', spec: 'clamp(19px, 2.1vw, 26px) · 600 · -.02em', use: 'Row and card titles.' },
  { role: 'Pull quote', spec: 'clamp(22px, 2.6vw, 34px) · serif italic · -.01em', use: 'A single held thought. Never a paragraph.' },
  { role: 'Lead', spec: 'clamp(17px, 1.6vw, 21px) · 400 · 1.55', use: 'The paragraph under a display line.' },
  { role: 'Body', spec: '15-16px · 400 · 1.6', use: 'Everything else.' },
  { role: 'Label', spec: '11-11.5px · mono · uppercase · .09-.1em', use: 'Section numbers, meta, eyebrow rows.' },
];

const MOTION = [
  { name: 'riseIn', spec: '0.8-0.9s · staggered 0.1s', use: 'Above-fold entrance, on load.' },
  { name: 'data-reveal', spec: '1s · 28px rise', use: 'Scroll entry, armed by ScrollFx.' },
  { name: 'drawRule', spec: '1.1s · origin-left scaleX', use: 'Hairlines drawing themselves in.' },
  { name: 'fillRow', spec: '5.4s · infinite', use: 'Product demo bars filling.' },
  { name: 'blink', spec: '2.4s · infinite', use: 'The live status dot. Nothing else blinks.' },
  { name: 'ticker', spec: 'linear · infinite', use: 'The marquee strip only.' },
];

const VOICE = [
  {
    rule: 'Plain over clever',
    yes: 'Payroll eats your Sundays.',
    no: 'Unlock next-generation workforce synergy.',
  },
  {
    rule: 'Name the limit',
    yes: 'If an off-the-shelf tool solves it cheaper, we name the tool.',
    no: 'We can build anything you need.',
  },
  {
    rule: 'Numbers, not adjectives',
    yes: 'A reply within one business day.',
    no: 'Lightning-fast response times.',
  },
  {
    rule: 'Three people, said out loud',
    yes: 'It landed with all three of us.',
    no: 'Our team of experts is standing by.',
  },
];

function Swatch({ token }: { token: TokenRow }) {
  return (
    <div className="grid items-center gap-[clamp(12px,2vw,24px)] border-t border-line py-[clamp(14px,1.8vw,20px)] [grid-template-columns:minmax(0,44px)_minmax(0,1.1fr)_minmax(0,1.4fr)] max-[680px]:gap-x-3.5 max-[680px]:gap-y-1.5 max-[680px]:[grid-template-columns:minmax(0,36px)_minmax(0,1fr)]">
      <span
        aria-hidden="true"
        className="block h-9 w-9 rounded-lg border border-line-strong"
        style={{ background: `var(--${token.name})` }}
      />
      <div className="min-w-0">
        <div className="font-mono text-[13px] text-ink">--{token.name}</div>
        <div className="mt-1 font-mono text-[11px] leading-[1.5] text-ink-3">
          <span className="text-ink-2">paper</span> {token.paper}
          <br />
          <span className="text-ink-2">ink</span> {token.ink}
        </div>
      </div>
      <p className="m-0 text-[15px] leading-[1.6] text-ink-2 max-[680px]:col-start-2">
        {TOKEN_NOTES[token.name] ?? 'Palette token.'}
      </p>
    </div>
  );
}

function Section({
  num,
  label,
  title,
  lede,
  children,
}: {
  num: string;
  label: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line-strong py-[clamp(44px,6vw,96px)]">
      <div className="grid gap-[clamp(24px,5vw,80px)] [grid-template-columns:minmax(0,1fr)_minmax(0,2.1fr)] max-[680px]:[grid-template-columns:minmax(0,1fr)]">
        <div>
          <SectionLabel num={num}>{label}</SectionLabel>
          <h2 className="m-0 mt-4 max-w-[18ch] text-[clamp(28px,4vw,44px)] font-semibold leading-[1.05] tracking-[-.03em]">
            {title}
          </h2>
          {lede && (
            <p className="m-0 mt-4 max-w-[32ch] text-[15px] leading-[1.6] text-ink-3">
              {lede}
            </p>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** A two-column "do this / not this" pair, used by voice and logo rules. */
function Pair({ yes, no }: { yes: string; no: string }) {
  return (
    <div className="mt-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
      <p className="m-0 border-l-2 border-lc pl-3.5 text-[15px] leading-[1.6] text-ink-2">
        {yes}
      </p>
      <p className="m-0 border-l-2 border-accent pl-3.5 text-[15px] leading-[1.6] text-ink-3 line-through decoration-line-strong">
        {no}
      </p>
    </div>
  );
}

export default function DesignSystem() {
  const tokens = readTokens();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-line bg-bg">
        <div className="shell flex items-center justify-between gap-4 py-[18px]">
          <a
            href="/"
            className="flex items-baseline gap-0.5 text-[19px] font-semibold tracking-[-.02em] text-ink"
          >
            Stash Labs<span className="text-accent">.</span>
          </a>
          <span className="font-mono text-[11.5px] uppercase tracking-[.09em] text-ink-2">
            Design system
          </span>
        </div>
      </header>

      <main className="shell flex-1 pb-[clamp(48px,7vw,110px)]">
        <div className="pb-[clamp(40px,6vw,88px)] pt-[clamp(48px,8vw,112px)]">
          <div className="mb-[clamp(24px,4vw,44px)] flex items-center gap-3.5 font-mono text-[11.5px] uppercase tracking-[.1em] text-ink-2">
            <span className="h-[7px] w-[7px] rounded-full bg-accent [animation:blink_2.4s_ease-in-out_infinite]" />
            <span>House reference</span>
            <span className="h-px flex-1 bg-[var(--line)]" />
            <span>v1</span>
          </div>

          <h1 className="m-0 mb-[clamp(20px,3vw,36px)] max-w-[20ch] text-balance text-[clamp(40px,7.4vw,104px)] font-semibold leading-[.95] tracking-[-.035em]">
            How Stash Labs is{' '}
            <span className="font-serif font-normal italic">meant to look</span>
            <span className="text-accent">.</span>
          </h1>

          <p className="m-0 max-w-[54ch] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-ink-2">
            One page, so nobody has to guess. The colour values below are read
            straight out of <span className="font-mono text-[.9em]">globals.css</span>{' '}
            at build time. If the site changes, this page has already changed
            with it. Flip the theme in the footer to check any rule in both.
          </p>
        </div>

        <Section
          num="01"
          label="Logo"
          title="The mark and the full stop"
          lede="The wordmark is the logo. The tile is a companion, not a replacement."
        >
          <div className="flex flex-wrap items-center gap-[clamp(20px,4vw,48px)] border-t border-line py-[clamp(24px,3vw,40px)]">
            <div className="flex items-center gap-3.5 text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.03em]">
              <Image
                src="/android-chrome-512x512.png"
                alt="Stash Labs mark"
                width={46}
                height={46}
                className="block h-[clamp(34px,4.4vw,48px)] w-[clamp(34px,4.4vw,48px)] rounded-[11px]"
              />
              <span>
                Stash Labs<span className="text-accent">.</span>
              </span>
            </div>
          </div>

          <dl className="m-0">
            {[
              ['Full stop', 'Always accent, always present. It is the one piece of punctuation that carries brand. It scales on hover in the header, and it is never dropped to “Stash Labs”.'],
              ['Tile radius', '8px at nav scale (rounded-lg), 11px from 46px up. It tilts −6° on hover, 500ms, never on load.'],
              ['Clearspace', 'Half the mark’s height on every side. The nav lock-up is the tightest it is ever allowed to sit.'],
              ['Never', 'No drop shadow, no gradient, no outline version, no stretching, no accent-on-accent. On photography the wordmark goes on a solid surface panel, not straight onto the image.'],
            ].map(([term, def]) => (
              <div key={term} className="border-t border-line py-[clamp(16px,2vw,22px)]">
                <dt className="font-mono text-[11.5px] uppercase tracking-[.1em] text-accent">
                  {term}
                </dt>
                <dd className="m-0 mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-ink-2">
                  {def}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          num="02"
          label="Colour"
          title="Two themes, one token set"
          lede="Paper is the default. Ink is a real theme, not a filter. Every token has a counterpart, so nothing is ever hard-coded to a hex in a component."
        >
          {tokens.map((token) => (
            <Swatch key={token.name} token={token} />
          ))}
          <p className="m-0 border-t border-line-strong pt-[clamp(18px,2.4vw,26px)] text-[15px] leading-[1.6] text-ink-2">
            <strong className="font-semibold text-ink">The accent rule:</strong>{' '}
            one saturated mark per viewport. A section gets the orange for its
            number, or its button, or its rule, not all three. Product colours
            (<span className="font-mono text-[.9em] text-tt">--tt</span>,{' '}
            <span className="font-mono text-[.9em] text-lc">--lc</span>) only
            appear inside the thing they belong to.
          </p>
        </Section>

        <Section
          num="03"
          label="Type"
          title="Three faces, strict jobs"
          lede="Epilogue carries everything. Instrument Serif is a guest. JetBrains Mono is machinery."
        >
          <div className="border-t border-line py-[clamp(20px,2.6vw,30px)]">
            <div className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Epilogue · 300-700 · headlines and body
            </div>
            <p className="m-0 mt-3 text-[clamp(26px,4vw,44px)] font-semibold leading-[1.05] tracking-[-.03em]">
              Software for the businesses that keep the lights on
            </p>
          </div>
          <div className="border-t border-line py-[clamp(20px,2.6vw,30px)]">
            <div className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Instrument Serif · 400 italic · one phrase at a time
            </div>
            <p className="m-0 mt-3 font-serif text-[clamp(26px,4vw,44px)] italic leading-[1.2]">
              all three of us
            </p>
          </div>
          <div className="border-t border-line py-[clamp(20px,2.6vw,30px)]">
            <div className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              JetBrains Mono · 400-500 · labels, numbers, meta
            </div>
            <p className="m-0 mt-3 font-mono text-[13px] uppercase tracking-[.1em] text-ink-2">
              01 / Sydney, AU / 00:41:12
            </p>
          </div>

          <div className="mt-[clamp(20px,3vw,36px)]">
            {TYPE_SCALE.map((row, i) => (
              <div
                key={row.role}
                className={`grid items-baseline gap-[clamp(10px,2vw,28px)] py-[clamp(12px,1.6vw,18px)] [grid-template-columns:minmax(0,.7fr)_minmax(0,1.3fr)_minmax(0,1.2fr)] max-[680px]:gap-y-1 max-[680px]:[grid-template-columns:minmax(0,1fr)] ${
                  i === 0 ? 'border-t border-line-strong' : 'border-t border-line'
                }`}
              >
                <span className="text-[15px] font-semibold tracking-[-.01em]">
                  {row.role}
                </span>
                <span className="font-mono text-[11.5px] leading-[1.6] text-ink-3">
                  {row.spec}
                </span>
                <span className="text-[15px] leading-[1.6] text-ink-2">
                  {row.use}
                </span>
              </div>
            ))}
          </div>
          <p className="m-0 border-t border-line-strong pt-[clamp(18px,2.4vw,26px)] text-[15px] leading-[1.6] text-ink-2">
            Headlines tighten as they grow (−.02em to −.035em) and never go
            below 0.95 line-height. Mono labels do the opposite: they open up to
            .09-.1em and are always uppercase. Measure caps at roughly 54ch for
            a lead, 62ch for body.
          </p>
        </Section>

        <Section
          num="04"
          label="Layout"
          title="One column, one breakpoint"
          lede="The whole site is a 1240px column and a single hard break at 680px. There is no tablet layout to maintain."
        >
          <dl className="m-0">
            {[
              ['Shell', 'max-width 1240px, 20px gutter, 28px from 681px up. Applied with the .shell class, never re-derived inline.'],
              ['Breakpoint', '680px. Below it, multi-column grids collapse to one (max-[680px]) and buttons go full width. Above it, min-[681px].'],
              ['Section rhythm', 'Vertical padding is clamp(44px, 6vw, 96px); a section opens on a border-line-strong rule and lists rows on border-line.'],
              ['Two-column split', 'minmax(0,1fr) / minmax(0,2.1fr): label and lede left, content right. The same ratio on every section, so the eye never re-learns the page.'],
              ['Radii', 'Pills (999px) for anything clickable. 8-11px for the mark and swatches. Cards are square-edged with a hairline instead.'],
            ].map(([term, def]) => (
              <div key={term} className="border-t border-line py-[clamp(16px,2vw,22px)]">
                <dt className="font-mono text-[11.5px] uppercase tracking-[.1em] text-accent">
                  {term}
                </dt>
                <dd className="m-0 mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-ink-2">
                  {def}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          num="05"
          label="Motion"
          title="One curve, used everywhere"
          lede="cubic-bezier(.16,1,.3,1), a fast start that settles. If a transition uses a different curve it is a mistake, not a choice."
        >
          <div className="mb-[clamp(20px,3vw,32px)] border-t border-line pt-[clamp(18px,2.4vw,26px)]">
            <div className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Durations
            </div>
            <p className="m-0 mt-2.5 max-w-[62ch] text-[15px] leading-[1.6] text-ink-2">
              300ms for hover and colour. 500ms for brand moves (the tilt, the
              full stop, a rule wiping in). 800-1100ms for entrances. Nothing in
              between, and nothing longer unless it loops.
            </p>
          </div>

          {MOTION.map((row, i) => (
            <div
              key={row.name}
              className={`grid items-baseline gap-[clamp(10px,2vw,28px)] py-[clamp(12px,1.6vw,18px)] [grid-template-columns:minmax(0,.7fr)_minmax(0,.9fr)_minmax(0,1.4fr)] max-[680px]:gap-y-1 max-[680px]:[grid-template-columns:minmax(0,1fr)] ${
                i === 0 ? 'border-t border-line-strong' : 'border-t border-line'
              }`}
            >
              <span className="font-mono text-[13px] text-ink">{row.name}</span>
              <span className="font-mono text-[11.5px] leading-[1.6] text-ink-3">
                {row.spec}
              </span>
              <span className="text-[15px] leading-[1.6] text-ink-2">
                {row.use}
              </span>
            </div>
          ))}

          <p className="m-0 border-t border-line-strong pt-[clamp(18px,2.4vw,26px)] text-[15px] leading-[1.6] text-ink-2">
            <strong className="font-semibold text-ink">Non-negotiable:</strong>{' '}
            everything collapses under{' '}
            <span className="font-mono text-[.9em]">prefers-reduced-motion</span>,
            and content renders without JS. Reveals are armed by ScrollFx, so a
            failed script leaves the page visible rather than blank.
          </p>
        </Section>

        <Section
          num="06"
          label="Components"
          title="The parts that already exist"
          lede="Reach for these before inventing a variant. Each one is in the repo."
        >
          <div className="border-t border-line py-[clamp(22px,3vw,32px)]">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Buttons: primary, then outline. Never two primaries in a row.
            </div>
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-[30px] py-4 text-base font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
                Get in touch <span className="font-mono">→</span>
              </span>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-[30px] py-4 text-base font-semibold text-ink transition-colors hover:bg-surface">
                Secondary action
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-[9px] font-mono text-[11.5px] uppercase tracking-[.08em] text-accent-ink">
                Nav scale
              </span>
            </div>
          </div>

          <div className="border-t border-line py-[clamp(22px,3vw,32px)]">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Section label: the number is accent, the word is ink-2
            </div>
            <SectionLabel num="07">Process</SectionLabel>
          </div>

          <div className="border-t border-line py-[clamp(22px,3vw,32px)]">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Meta row: dot, label, drawn rule, stamp
            </div>
            <div className="flex items-center gap-3.5 font-mono text-[11.5px] uppercase tracking-[.1em] text-ink-2">
              <span className="h-[7px] w-[7px] rounded-full bg-lc [animation:blink_2.4s_ease-in-out_infinite]" />
              <span>In build</span>
              <span className="h-px flex-1 bg-[var(--line)]" />
              <span>Sydney, AU</span>
            </div>
          </div>

          <div className="border-t border-line py-[clamp(22px,3vw,32px)]">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
              Numbered row: the list pattern behind Process and What happens next
            </div>
            <div className="grid items-baseline gap-[clamp(12px,3vw,48px)] border-y border-line-strong py-[clamp(18px,2.4vw,30px)] [grid-template-columns:minmax(0,56px)_minmax(0,1.1fr)_minmax(0,1.2fr)] max-[680px]:gap-x-3.5 max-[680px]:gap-y-1.5 max-[680px]:[grid-template-columns:minmax(0,40px)_minmax(0,1fr)]">
              <span className="font-mono text-xs text-accent">01</span>
              <h3 className="m-0 text-[clamp(19px,2.1vw,26px)] font-semibold leading-[1.2] tracking-[-.02em]">
                Scope in writing
              </h3>
              <p className="m-0 text-base leading-[1.6] text-ink-2 max-[680px]:col-start-2">
                A fixed scope, a fixed number and a date.
              </p>
            </div>
          </div>
        </Section>

        <Section
          num="07"
          label="Voice"
          title="Write like the person doing the work"
          lede="Australian English. No exclamation marks. No em-dash pile-ups where a full stop works."
        >
          {VOICE.map((row, i) => (
            <div
              key={row.rule}
              className={`py-[clamp(16px,2.2vw,26px)] ${
                i === 0 ? 'border-t border-line-strong' : 'border-t border-line'
              }`}
            >
              <div className="font-mono text-[11.5px] uppercase tracking-[.1em] text-accent">
                {row.rule}
              </div>
              <Pair yes={row.yes} no={row.no} />
            </div>
          ))}
          <p className="m-0 border-t border-line-strong pt-[clamp(18px,2.4vw,26px)] text-[15px] leading-[1.6] text-ink-2">
            Headings are sentence case. Labels are uppercase mono. Buttons say
            what happens next in two or three words. If a sentence could appear
            on any other studio’s site, cut it.
          </p>
        </Section>

        <Section
          num="08"
          label="Accessibility"
          title="The floor, not the goal"
          lede="These are checked before anything ships, not after a complaint."
        >
          <ul className="m-0 list-none p-0">
            {[
              'Ink on bg clears 4.5:1 in both themes; ink-3 is only ever used at 11px+ mono or 15px meta where it still clears.',
              'Every interactive element keeps a visible focus state. The same accent rule that appears on hover also fires on focus-visible.',
              'Decorative marks (dots, rules, the logo tile beside the wordmark) carry aria-hidden or an empty alt. The wordmark text is the accessible name.',
              'Theme choice persists in localStorage and is applied before paint, so no one gets a flash of the wrong theme.',
              'Nothing depends on colour alone: status uses a dot plus a word, compliance uses a label plus a rule.',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3.5 border-t border-line py-[clamp(14px,1.8vw,20px)] text-[15px] leading-[1.6] text-ink-2"
              >
                <span aria-hidden="true" className="font-mono text-accent">
                  →
                </span>
                <span className="max-w-[62ch]">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="border-t border-line-strong pt-[clamp(28px,4vw,48px)]">
          <p className="m-0 mb-[clamp(24px,3.5vw,40px)] max-w-[30ch] font-serif text-[clamp(22px,2.6vw,34px)] leading-[1.25] tracking-[-.01em]">
            Anything not covered here, ask before you invent it.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="mailto:team@stashlabs.com.au"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[30px] py-4 text-base font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 max-[680px]:flex-[1_1_100%] max-[680px]:justify-center"
            >
              team@stashlabs.com.au
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
            <span>Check every rule in both themes</span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
