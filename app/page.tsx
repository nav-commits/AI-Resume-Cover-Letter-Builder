import HeroSection from "@/components/hero-section";
import { ThemeLayout } from "@/components/theme-layout";
import { Navbar } from "@/components/navbar";  // <-- import here

export default function Home() {
  return (
    <>
      <Navbar />
      <ThemeLayout>
        <HeroSection />
      </ThemeLayout>
    </>
  );
}
