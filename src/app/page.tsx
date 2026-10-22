import { Footer } from '@/components/layout/Footer';
import { HomeComponent } from '@/components/layout/HomeComponent';
import { Navbar } from '@/components/layout/Navbar';
import { FooterSection } from '@/data/mock/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeComponent />
      <Footer {...FooterSection} />
    </>
  );
}
