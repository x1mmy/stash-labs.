const ITEMS = [
  'TimeTally: payroll in an hour',
  'Websites, built properly',
  'Next product in build',
  'Sydney, for Australian SMBs',
];

function Run({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <span className="flex gap-11 pr-11" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex gap-11">
          <span>{item}</span>
          <span className="text-accent">✳</span>
        </span>
      ))}
    </span>
  );
}

export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-line bg-surface">
      <div className="flex w-max py-[13px] font-mono text-xs uppercase tracking-[.14em] text-ink-2 [animation:ticker_32s_linear_infinite]">
        <Run />
        <Run ariaHidden />
      </div>
    </div>
  );
}
