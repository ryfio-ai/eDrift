import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { MissionVision } from "@/components/sections/MissionVision";
import { Clients } from "@/components/sections/Clients";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MissionVision />
      <AboutUs />
      <Clients />
      <ContactSection />
    </div>
  );
}
