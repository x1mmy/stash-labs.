import { ScrollFx } from '@/components/ScrollFx';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { Problem } from '@/components/Problem';
import { Products } from '@/components/Products';
import { Websites } from '@/components/Websites';
import { Principles } from '@/components/Principles';
import { Studio } from '@/components/Studio';
import { Process } from '@/components/Process';
import { Contact } from '@/components/Contact';
import { SiteFooter } from '@/components/SiteFooter';

export default function Home() {
  return (
    <>
      <ScrollFx />
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Products />
        <Websites />
        <Principles />
        <Studio />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
