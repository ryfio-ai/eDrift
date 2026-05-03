import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "eDrift Electric | SiC On-Board Chargers for EV OEMs — India",
  description: "eDrift Electric designs SiC-based on-board chargers (3.3kW–20kW) and DC-DC converters for EV OEMs. ASIL-D ready. Manufactured in Hosur, India. Talk to engineering.",
};
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
