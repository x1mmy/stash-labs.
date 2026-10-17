import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { BookSection } from '@/components/BookForm';
import {
  Familiar,
  HomeFaq,
  HomeHero,
  HoursTeaser,
  HowWeWork,
  Products,
  StayOn,
  Who,
} from '@/components/landing/Home';

const NAV = [
  { href: '#how', label: 'How we work' },
  { href: '#products', label: 'Products' },
  { href: '#faq', label: 'FAQ' },
];

export default function Home() {
  return (
    <>
      <SiteHeader logoHref="#top" links={NAV} />
      <main>
        <HomeHero />
        <Familiar />
        <HowWeWork />
        <StayOn />
        <HoursTeaser />
        <Products />
        <Who />
        <HomeFaq />
        <BookSection />
      </main>
      <SiteFooter />
    </>
  );
}
