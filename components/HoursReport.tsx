function SheetMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="24,32 76,52 76,70 24,50" fill="#E5522A" />
      <polygon points="88,8 24,32 24,50 88,26" fill="#16130F" />
      <polygon points="76,52 12,76 12,94 76,70" fill="#16130F" />
    </svg>
  );
}

const ink = '#16130F';
const muted = '#5A544C';
const rule = 'rgba(22,19,15,.3)';
const hair = 'rgba(22,19,15,.14)';

function Footer({ page }: { page: string }) {
  return (
    <div
      className="mt-2 flex items-baseline justify-between pt-3.5"
      style={{ borderTop: `1px solid ${rule}` }}
    >
      <span className="text-sm font-extrabold tracking-[-.02em]">Stash Labs.</span>
      <span className="font-sheet text-xs" style={{ color: muted }}>
        {page}
      </span>
    </div>
  );
}

function Page1() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SheetMark />
          <span className="text-[22px] font-extrabold tracking-[-.04em]">
            stash
            <span className="ml-[.24em] font-normal tracking-[-.02em]">labs</span>
          </span>
        </div>
        <span className="text-[15px]" style={{ color: muted }}>
          Hours Report
        </span>
      </div>
      <div className="mt-24 text-[17px]" style={{ color: muted }}>
        Prepared for Example Lawn Co.
      </div>
      <h1 className="m-0 mt-3.5 text-[52px] font-semibold leading-[1.02] tracking-[-.035em]">
        Where your hours go
        <span className="font-serif font-normal italic text-[#E5522A]">.</span>
      </h1>
      <div className="mt-16 pt-[26px]" style={{ borderTop: `1px solid ${rule}` }}>
        <div className="text-[15px]" style={{ color: muted }}>
          What repeated admin costs you each year
        </div>
        <div className="my-2 font-serif text-[118px] leading-none tracking-[-.02em]">
          A$11,096
        </div>
        <div className="max-w-[580px] text-lg leading-[1.45]" style={{ color: muted }}>
          About 6.1 hours a week of copying paper job sheets and timesheets into
          Xero, at A$38 an hour, over 48 working weeks.
        </div>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-6">
        {[
          ['Hours lost a week', '6.1 hours'],
          ['Hours we can give back', '5 hours'],
          ['Live within', '3 weeks'],
        ].map(([label, value]) => (
          <div key={label} className="pt-3" style={{ borderTop: `1px solid ${rule}` }}>
            <div className="text-xs" style={{ color: muted }}>
              {label}
            </div>
            <div className="mt-1 text-[26px] font-semibold tracking-[-.02em]">{value}</div>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <div className="grid grid-cols-2 gap-x-8">
        {[
          ['Owner', 'Jordan Hale'],
          ['Hours Check', '14 October 2026, on site, 90 minutes'],
          ['Prepared by', 'Stash Labs'],
          ['Report date', '16 October 2026'],
        ].map(([label, value]) => (
          <div
            key={label}
            className="py-2.5"
            style={{ borderTop: `1px solid ${hair}` }}
          >
            <div className="font-sheet text-[10.5px] uppercase tracking-[.06em]" style={{ color: muted }}>
              {label}
            </div>
            <div className="mt-0.5 text-sm">{value}</div>
          </div>
        ))}
      </div>
      <Footer page="1 / 3" />
    </>
  );
}

const JOBS = [
  ['Copying paper timesheets into Xero', 'Typos and late pays', 'Office manager', 'Every Monday', '3 hours'],
  ['Typing job sheets into invoices', 'Invoices go out days late', 'Office manager', 'Daily', '2.1 hours'],
  ['Chasing unpaid invoices', 'Done at night, often forgotten', 'Owner', 'Twice a week', '1 hour'],
];

function Page2() {
  return (
    <>
      <div className="flex justify-between font-sheet text-[11px] uppercase tracking-[.06em]" style={{ color: muted }}>
        <span>Hours Report</span>
        <span>Example Lawn Co.</span>
      </div>
      <h2 className="m-0 mt-14 text-4xl font-semibold leading-[1.05] tracking-[-.035em]">
        What we saw
        <span className="font-serif font-normal italic text-[#E5522A]">.</span>
      </h2>
      <p className="m-0 mt-3.5 max-w-[520px] text-[17px] leading-[1.45]" style={{ color: muted }}>
        On the day we watched the three jobs below. Together they take 6.1 hours a week.
      </p>
      <div className="mt-9">
        <div className="grid grid-cols-[minmax(0,2.8fr)_minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,1fr)] gap-3 pb-2.5 font-sheet text-[10.5px] uppercase tracking-[.06em]" style={{ color: muted }}>
          <span>Job</span>
          <span>Who does it</span>
          <span>How often</span>
          <span className="text-right">Hours a week</span>
        </div>
        {JOBS.map(([job, note, who, often, hours], i) => (
          <div
            key={job}
            className="grid grid-cols-[minmax(0,2.8fr)_minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,1fr)] gap-3 py-4 text-sm"
            style={{ borderTop: `1px solid ${i === 0 ? rule : hair}` }}
          >
            <div>
              <div className="text-[15px] font-semibold">{job}</div>
              <div className="mt-0.5 text-[13px]" style={{ color: muted }}>
                {note}
              </div>
            </div>
            <span>{who}</span>
            <span>{often}</span>
            <span className="text-right tabular-nums">{hours}</span>
          </div>
        ))}
        <div
          className="grid grid-cols-[minmax(0,2.8fr)_minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,1fr)] gap-3 py-4 text-[15px] font-semibold"
          style={{ borderTop: `1px solid ${ink}` }}
        >
          <span>Total</span>
          <span />
          <span />
          <span className="text-right tabular-nums">6.1 hours</span>
        </div>
      </div>
      <div className="mt-10 text-[15px] font-semibold">What it costs you</div>
      <div
        className="mt-3.5 flex items-center gap-[18px] bg-[#FBF9F5] px-7 py-7"
        style={{ border: `1px solid ${rule}` }}
      >
        {[
          ['6.1', 'hours a week'],
          ['48', 'working weeks'],
          ['A$38', 'an hour'],
        ].map(([value, label], i) => (
          <div key={label} className="flex items-center gap-[18px]">
            {i > 0 ? (
              <span className="text-[22px]" style={{ color: muted }}>
                ×
              </span>
            ) : null}
            <div>
              <div className="text-[26px] font-semibold tabular-nums tracking-[-.02em]">{value}</div>
              <div className="text-xs" style={{ color: muted }}>
                {label}
              </div>
            </div>
          </div>
        ))}
        <div className="mx-1.5 self-stretch w-px" style={{ background: rule }} />
        <div>
          <div className="font-serif text-[58px] leading-none tracking-[-.02em]">= A$11,096</div>
          <div className="text-xs" style={{ color: muted }}>
            each year
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <Footer page="2 / 3" />
    </>
  );
}

function Page3() {
  return (
    <>
      <div className="flex justify-between font-sheet text-[11px] uppercase tracking-[.06em]" style={{ color: muted }}>
        <span>Hours Report</span>
        <span>Example Lawn Co.</span>
      </div>
      <h2 className="m-0 mt-14 text-4xl font-semibold leading-[1.05] tracking-[-.035em]">
        What we would fix
        <span className="font-serif font-normal italic text-[#E5522A]">.</span>
      </h2>
      <div className="mt-8 bg-[#FBF9F5] p-7" style={{ border: `1px solid ${rule}` }}>
        <div className="flex items-center gap-2 font-sheet text-[11px] uppercase tracking-[.06em]" style={{ color: muted }}>
          <span className="h-[7px] w-[7px] bg-[#E5522A]" />
          Recommended
        </div>
        <div className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-[-.03em]">
          Job sheets and timesheets straight into Xero
        </div>
        <div className="mt-2.5 max-w-[520px] text-[15px] leading-normal" style={{ color: muted }}>
          Crews fill in job sheets and timesheets on a phone, and the hours land in Xero with nobody retyping them.
        </div>
        <div className="mt-6 grid grid-cols-3 gap-5">
          {[
            ['Hours back a week', '5 hours'],
            ['Live within', '3 weeks'],
          ].map(([label, value]) => (
            <div key={label} className="pt-2.5" style={{ borderTop: `1px solid ${rule}` }}>
              <div className="text-xs" style={{ color: muted }}>{label}</div>
              <div className="mt-1 text-2xl font-semibold tracking-[-.02em]">{value}</div>
            </div>
          ))}
          <div className="pt-2.5" style={{ borderTop: `1px solid ${rule}` }}>
            <div className="text-xs" style={{ color: muted }}>Old way kept running</div>
            <div className="mt-2 text-[17px] font-semibold leading-tight tracking-[-.01em]">
              Until the new one works
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <div className="text-[15px] font-semibold">What stays the same</div>
          <div className="mt-1.5 text-sm leading-normal" style={{ color: muted }}>
            Your crew keeps working the way they do now. Xero stays your accounting system.
          </div>
        </div>
        <div>
          <div className="text-[15px] font-semibold">Your data</div>
          <div className="mt-1.5 text-sm leading-normal" style={{ color: muted }}>
            Everything lives in accounts you own. You can switch our access off anytime.
          </div>
        </div>
      </div>
      <div className="mt-9 grid grid-cols-4 gap-4">
        {[
          ['1', 'You say yes by 30 October'],
          ['2', 'Live within 3 weeks'],
          ['3', 'Two smooth weeks'],
          ['4', 'Care, monthly support'],
        ].map(([n, label]) => (
          <div key={n} className="pt-2.5" style={{ borderTop: `1px solid ${ink}` }}>
            <div className="font-sheet text-[11px]" style={{ color: muted }}>{n}</div>
            <div className="mt-1 text-sm font-semibold leading-tight">{label}</div>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <div
        className="flex items-baseline justify-between pt-3.5"
        style={{ borderTop: `1px solid ${rule}` }}
      >
        <span className="text-[13px]" style={{ color: muted }}>
          <span className="text-sm font-extrabold tracking-[-.02em]" style={{ color: ink }}>
            Stash Labs.
          </span>
          {' '}
          team@stashlabs.com.au · stashlabs.com.au
        </span>
        <span className="font-sheet text-xs" style={{ color: muted }}>
          3 / 3
        </span>
      </div>
    </>
  );
}

/** A scaled A4 page of the example Hours Report. Always paper, even in dark theme. */
export function HoursReport({ page }: { page: 1 | 2 | 3 }) {
  return (
    <div
      className="sheet-frame relative w-full overflow-hidden bg-[#F2EEE7]"
      style={{ aspectRatio: '794 / 1123' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ border: `1px solid ${rule}` }}
      />
      <div className="sheet-page absolute left-0 top-0 box-border flex h-[1123px] w-[794px] origin-top-left flex-col bg-[#F2EEE7] px-[72px] pb-[52px] pt-[60px] font-wordmark leading-[1.35] text-[#16130F]">
        {page === 1 ? <Page1 /> : page === 2 ? <Page2 /> : <Page3 />}
      </div>
    </div>
  );
}
