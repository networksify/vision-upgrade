import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Home } from '@/components/home/Home';
import { ServicesSection } from '@/components/home/Services';
import { AboutSection } from '@/data/mock/about';
import { ContactSection } from '@/data/mock/contact';
import { HeroSection } from '@/data/mock/hero';
import { ServicesSection as ServicesSectionData } from '@/data/mock/services';

export const HomeComponent = () => {
  return (
    <main>
      <Home {...HeroSection} />
      <About {...AboutSection} />
      <ServicesSection {...ServicesSectionData} />
      <Contact {...ContactSection} />
    </main>
  );
};
