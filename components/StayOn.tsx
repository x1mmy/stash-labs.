import { Figure } from '@/components/Figure';
import { SectionLabel } from '@/components/SectionLabel';

export function StayOn() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="shell split section-pad items-center grid-cols-2">
        <Figure
          name="slow"
          plate="surface"
          label="Crates moving along a belt: the work keeps moving"
          caption="fig. 04 — Fixed price up front. Documented at the end. Never stuck with us."
        />
        <div className="flex flex-col gap-6">
          <SectionLabel num="03">After the build</SectionLabel>
          <h2 className="m-0 font-display text-[clamp(32px,4vw,54px)] font-medium leading-[1.05] tracking-[-.03em]">
            Then we stay on.
          </h2>
          <p className="lede max-w-[40ch]">
            Something breaks, or the business changes? We already know how it
            works. Your tech person, without the hire.
          </p>
        </div>
      </div>
    </section>
  );
}
