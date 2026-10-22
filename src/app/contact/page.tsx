import type { Metadata } from 'next';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ContactSection } from '@/data/mock/contact';
import { FooterSection } from '@/data/mock/footer';

export const metadata: Metadata = {
  title: 'Contact | Vision Upgrade',
  description:
    'Talk to a Vision Upgrade solution engineer about detection, inspection and automation for your site.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <Contact {...ContactSection} />
      </main>
      <Footer {...FooterSection} />
    </>
  );
}
