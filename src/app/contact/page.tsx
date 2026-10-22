import type { Metadata } from 'next';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ContactSection } from '@/data/mock/contact';
import { FooterSection } from '@/data/mock/footer';
import { NavbarSection } from '@/data/mock/navbar';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Vision Upgrade about VU Kids learning programs, software and technology solutions, or digital marketing and branding.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar {...NavbarSection} />
      <main>
        {/* The visible section heading is an h2 inside <Contact>; this keeps the
            page's outline anchored on a single h1 without changing the design. */}
        <h1 className="sr-only">Contact Vision Upgrade</h1>
        <Contact {...ContactSection} />
      </main>
      <Footer {...FooterSection} />
    </>
  );
}
