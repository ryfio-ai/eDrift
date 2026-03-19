import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { Products } from "@/components/sections/Products";
import { MissionVision } from "@/components/sections/MissionVision";
import { TechHighlights } from "@/components/sections/TechHighlights";
import { Clients } from "@/components/sections/Clients";
import { Team } from "@/components/sections/Team";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutUs />
      <Products />
      <MissionVision />
      <TechHighlights />
      <Clients />
      <Team />
      <ContactSection />
    </div>
  );
}
