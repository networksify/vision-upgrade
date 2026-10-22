import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Hero } from '@/components/home/Hero';
import { ProgramsIntro } from '@/components/home/ProgramsIntro';
import { DigitalMarketing } from '@/components/home/programs/DigitalMarketing';
import { Software } from '@/components/home/programs/Software';
import { VuKids } from '@/components/home/programs/VuKids';
import { WhyUs } from '@/components/home/WhyUs';
import { AboutSection } from '@/data/mock/about';
import { ContactSection } from '@/data/mock/contact';
import { HeroSection } from '@/data/mock/hero';
import {
  DigitalMarketingSection,
  ProgramsIntroSection,
  SoftwareSection,
  VuKidsSection,
} from '@/data/mock/programs';
import { WhyUsSection } from '@/data/mock/whyus';

export const HomeComponent = () => {
  return (
    <main>
      <Hero {...HeroSection} />
      <ProgramsIntro {...ProgramsIntroSection} />
      <VuKids {...VuKidsSection} />
      <Software {...SoftwareSection} />
      <DigitalMarketing {...DigitalMarketingSection} />
      <About {...AboutSection} />
      <WhyUs {...WhyUsSection} />
      <Contact {...ContactSection} />
    </main>
  );
};
