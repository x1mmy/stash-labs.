export function SectionLabel({ num, children }: { num: string; children: string }) {
  return (
    <div className="eyebrow flex gap-3">
      <span className="text-accent">{num}</span>
      <span>{children}</span>
    </div>
  );
}
