import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { Familiar } from '@/components/Familiar';
import { Process } from '@/components/Process';
import { StayOn } from '@/components/StayOn';
import { Products } from '@/components/Products';
import { Studio } from '@/components/Studio';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { SiteFooter } from '@/components/SiteFooter';

export default function Home() {
  return (
    <div className="text-[17px] leading-[1.6]">
      <SiteHeader />
      <main>
        <Hero />
        <Familiar />
        <Process />
        <StayOn />
        <Products />
        <Studio />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
