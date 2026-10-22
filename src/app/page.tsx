import { Footer } from "@/components/layout/Footer";
import { HomeComponent } from "@/components/layout/HomeComponent";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/data/mock/footer";
import { NavbarSection } from "@/data/mock/navbar";

export default function Home() {
  return (
    <>
      <Navbar {...NavbarSection} />
      <HomeComponent />
      <Footer {...FooterSection} />
    </>
  );
}
