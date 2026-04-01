import { Hero } from "@/components/sections/Hero";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { ProductOverview } from "@/components/sections/ProductOverview";
import { AboutUs } from "@/components/sections/AboutUs";
import { MissionVision } from "@/components/sections/MissionVision";
import { Clients } from "@/components/sections/Clients";
import { FAQ } from "@/components/sections/FAQ";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MetricsSection />
      <ProductOverview />
      <AboutUs />
      <MissionVision />
      <Clients />
      <FAQ />
      <ContactSection />
    </div>
  );
}
