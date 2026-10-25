import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { SignsChecklist } from './SignsChecklist';
import styles from './signs.module.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Signs Checklist | Stash Labs',
  description:
    'Ten signs admin is eating your week. Tick the ones that are true, put a rough yearly cost on the biggest, then book a free Hours Check.',
  alternates: { canonical: '/signs' },
};

export default function SignsPage() {
  return (
    <div className={`${styles.root} ${instrumentSans.variable}`}>
      <SignsChecklist />
    </div>
  );
}
