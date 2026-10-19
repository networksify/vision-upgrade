import { HomeComponent } from '@/components/layout/HomeComponent';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div key={1}>
      <Navbar />
      <HomeComponent />
    </div>
  );
}
