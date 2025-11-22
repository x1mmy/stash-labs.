import { HeroSection } from '@/components/HeroSection';
import { WhatWeDoSection } from '@/components/WhatWeDoSection';
import { ProductsSection } from '@/components/ProductsSection';
import { WhySection } from '@/components/WhySection';
import { WhoWeAreSection } from '@/components/WhoWeAreSection';
import { ApproachSection } from '@/components/ApproachSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhatWeDoSection />
      <ProductsSection />
      <WhySection />
      <WhoWeAreSection />
      <ApproachSection />
      <CTASection />
      <Footer />
    </main>
  );
}
