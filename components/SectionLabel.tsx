export function SectionLabel({ num, children }: { num: string; children: string }) {
  return (
    <div className="flex gap-2.5 font-mono text-[11.5px] uppercase tracking-[.1em] text-ink-2">
      <span className="text-accent">{num}</span>
      <span>{children}</span>
    </div>
  );
}
