import { SectionLabel } from '@/components/SectionLabel';

const DISCIPLINES = ['Business systems', 'Web', 'Hardware'];

export function Studio() {
  return (
    <section id="team" className="border-b border-line bg-surface">
      <div className="shell split section-pad grid-cols-2">
        <div>
          <div className="mb-5">
            <SectionLabel num="05">Who we are</SectionLabel>
          </div>
          <h2 className="h2 max-w-[20ch]">
            Three Sydney engineers across business systems, web, and hardware.
          </h2>
        </div>

        <div className="flex flex-col justify-end gap-7">
          <p className="lede max-w-[40ch]">
            We started Stash Labs to build the tech we wished existed.
          </p>
          <p className="lede max-w-[40ch]">
            We&apos;re new, and we run Stash Labs alongside our day jobs. So we
            take on a few clients at a time, and each one gets us, not a junior.
          </p>
          <div className="flex flex-col border-b border-line font-mono text-[13px]">
            {DISCIPLINES.map((name, i) => (
              <div
                key={name}
                className="flex justify-between gap-4 border-t border-line py-3"
              >
                <span>{name}</span>
                <span className="text-ink-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
