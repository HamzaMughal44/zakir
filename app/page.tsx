import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerMarquee from "@/components/TickerMarquee";
import ProductsSection from "@/components/ProductsSection";
import StatsSection from "@/components/StatsSection";
import FounderSection from "@/components/FounderSection";
import Testimonials from "@/components/Testimonials";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TickerMarquee />
      <ProductsSection />
      <StatsSection />
      <FounderSection />
      <Testimonials />

      <Footer />
    </main>
  );
}
