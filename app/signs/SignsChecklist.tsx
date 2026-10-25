'use client';

import { useState } from 'react';
import styles from './signs.module.css';

const SIGNS: [string, string][] = [
  [
    'Only one person knows how it gets done.',
    'If they are away for a week, it waits.',
  ],
  [
    'The same details get typed in more than once.',
    'Name, address and number, into invoices, the calendar, a spreadsheet and an email.',
  ],
  [
    'Every new client or job starts with the same steps, by hand.',
    'The welcome email, the form, the folders, the project.',
  ],
  [
    'Someone copies answers from a form or an email into something else.',
    'The client already typed them once.',
  ],
  [
    'Enquiries wait until someone gets to them.',
    'A Friday afternoon enquiry that gets a reply on Monday.',
  ],
  [
    'Month end or pay day takes half a day or more.',
    'And waits on one person being in.',
  ],
  [
    'You have fixed the same typo or wrong number more than once.',
    'A misspelt name, a wrong email address, a figure that did not match.',
  ],
  [
    'Your best person spends time on admin they were not hired for.',
    'Copying, chasing and filing instead of the work that needs them.',
  ],
  [
    'Nobody wants to change the spreadsheet in case it breaks.',
    'So it stays as it is, and so does the workaround.',
  ],
  [
    'You have thought there must be a better way, but nobody has time to look.',
    'That is the usual starting point.',
  ],
];

const BANDS: [number, string, string][] = [
  [
    2,
    'Probably fine for now.',
    'Two ticks or fewer. Keep this page, and tick again in a few months or when you take on more work.',
  ],
  [
    5,
    'Worth a look.',
    'Pick the sign that eats the most hours and put a number on it below. That one is where to start.',
  ],
  [
    10,
    'Your admin is taking real hours.',
    'Six or more ticks usually means the same few jobs keep costing time. An Hours Check finds them and puts a number on each.',
  ],
];

const nf = new Intl.NumberFormat('en-AU');
const fmt = (n: number) => nf.format(Math.round(n * 100) / 100);

export function SignsChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    SIGNS.map(() => false)
  );
  const [hours, setHours] = useState('4');
  const [rate, setRate] = useState('45');

  const count = checked.filter(Boolean).length;
  const band = BANDS.find(([max]) => count <= max)!;

  const h = Math.max(0, parseFloat(hours) || 0);
  const r = Math.max(0, parseFloat(rate) || 0);
  const yearHours = h * 48;
  const cost = Math.round(yearHours * r);

  return (
    <main className={styles.gut}>
      <div className={styles.col}>
        <a href="/" className={styles.brand}>
          Stash Labs<i>.</i>
        </a>

        <h1 className={styles.title}>
          Is admin eating your week<i>?</i>
        </h1>
        <p className={styles.lead}>
          Ten signs. Tick the ones that are true. It takes two minutes, and
          nothing you tick leaves this page.
        </p>

        <ul className={styles.list}>
          {SIGNS.map(([name, hint], i) => (
            <li key={name}>
              <label className={styles.sign}>
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={(e) =>
                    setChecked((prev) =>
                      prev.map((v, j) => (j === i ? e.target.checked : v))
                    )
                  }
                />
                <div>
                  <b className={styles.signName}>{name}</b>
                  <span className={styles.signHint}>{hint}</span>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <section className={styles.score} aria-live="polite">
          <div className={styles.num}>
            <span>{count}</span>
            <small> / 10</small>
          </div>
          <div className={styles.bar} aria-hidden="true">
            {SIGNS.map((_, i) => (
              <i
                key={i}
                className={i < count ? `${styles.tick} ${styles.tickOn}` : styles.tick}
              />
            ))}
          </div>
          <h2 className={styles.bandHeading}>{band[1]}</h2>
          <p className={styles.bandCopy}>{band[2]}</p>
        </section>

        <section className={styles.block}>
          <div className={styles.tag}>Your rough number</div>
          <h2 className={styles.blockTitle}>
            What the biggest one costs a year<i>.</i>
          </h2>
          <p className={styles.lead}>
            Pick the sign that eats the most hours. Put its hours a week and the
            hourly cost of whoever does it below. The figures start as an
            example, so change them to yours.
          </p>
          <div className={styles.sum}>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="hrs">Hours a week</label>
                <input
                  id="hrs"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.5}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="rate">Hourly cost ($)</label>
                <input
                  id="rate"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.eq}>
              <div>
                {fmt(h)} h a week x 48 weeks = {fmt(yearHours)} h
              </div>
              <div>
                {fmt(yearHours)} h x ${fmt(r)} an hour
              </div>
              <b className={styles.eqTotal}>= ${nf.format(cost)} a year</b>
            </div>
          </div>
          <p className={styles.fine}>
            A rough number from your own guess. An Hours Check watches the job
            and measures it properly.
          </p>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            Want the real number<i>.</i>
          </h2>
          <p>
            Book a free Hours Check. 90 minutes on site, or 60 on a video call.
            We watch the job, then send you a written Hours Report with your
            number. We only pitch if you ask.
          </p>
          <a className={styles.btn} href="/#book">
            Book your free Hours Check
          </a>
          <div className={`${styles.tag} ${styles.ctaTag}`}>
            Or send us a message with the word HOURS
          </div>
        </section>

        <p className={styles.foot}>
          Stash Labs, Sydney. Send this to someone still doing it by hand.
        </p>
      </div>
    </main>
  );
}
