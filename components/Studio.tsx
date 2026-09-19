import Image from 'next/image';
import { SectionLabel } from '@/components/SectionLabel';

export function Studio() {
  return (
    <section id="studio" className="border-t border-line">
      <div className="shell py-[clamp(72px,10vw,150px)]">
        <div className="grid gap-[clamp(28px,5vw,80px)] [grid-template-columns:minmax(0,1fr)_minmax(0,2.1fr)] max-[680px]:[grid-template-columns:minmax(0,1fr)]">
          {/* The narrow column carries the figures, not the photograph: at
              ~356px a group shot reads as a thumbnail, and stacking a label
              over a block here would repeat §02 beat for beat. `contents`
              drops the wrapper on mobile so both land in the single column. */}
          <div className="flex flex-col justify-between gap-[clamp(32px,4vw,56px)] max-[680px]:contents">
            <div data-reveal>
              <SectionLabel num="06.">The studio</SectionLabel>
            </div>

            <dl
              data-reveal
              className="m-0 grid gap-px border border-line bg-[var(--line)] [grid-template-columns:minmax(0,1fr)] max-[680px]:order-last max-[680px]:mt-[clamp(32px,4vw,52px)] max-[680px]:[grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]"
            >
              {[
                { value: <span data-count="3">3</span>, label: 'Engineers' },
                { value: 'Sydney', label: 'Based' },
                { value: 'SMB', label: 'Focus' },
              ].map((stat) => (
                <div key={stat.label} className="bg-bg p-[clamp(20px,2.5vw,28px)]">
                  <dt className="order-2 mt-2.5 font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
                    {stat.label}
                  </dt>
                  <dd className="m-0 text-[clamp(30px,3.2vw,42px)] font-semibold leading-none tracking-[-.03em]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2
              data-reveal
              className="m-0 mb-[clamp(24px,3vw,40px)] max-w-[20ch] text-balance text-[clamp(30px,4.2vw,58px)] font-semibold leading-[1.08] tracking-[-.025em]"
            >
              Three engineers who kept building after graduation
              <span className="text-accent">.</span>
            </h2>

            <div className="mb-[clamp(36px,5vw,64px)] grid gap-[clamp(20px,3vw,44px)] text-[clamp(16px,1.35vw,18px)] leading-[1.62] text-ink-2 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
              <p data-reveal className="m-0">
                We met studying computer science in Sydney, shipped our first
                products while we were still there, and carried on once we had
                the degrees. We code together, talk to customers together, and
                hold the whole stack ourselves.
              </p>
              <p data-reveal className="m-0">
                There is no sales layer and no account manager. You talk to the
                people writing the software, which is the only reason we can
                move as fast as we do.
              </p>
            </div>

            {/* The photograph is the evidence for the headline's claim, so it
                closes the section at full column width rather than sitting in
                the margin. Same figure/caption vocabulary as fig. 1 to 4. */}
            <figure data-reveal className="m-0">
              <Image
                src="/studio-team.jpg"
                alt="The three Stash Labs engineers in caps and gowns at their Sydney graduation."
                width={1080}
                height={720}
                sizes="(max-width: 680px) 100vw, 64vw"
                className="h-auto w-full rounded border border-line"
              />
              <figcaption className="mx-0.5 mt-3 font-mono text-[11.5px] text-ink-3">
                <span className="text-accent">fig. 5</span> &nbsp;The week we
                graduated. We kept building.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
