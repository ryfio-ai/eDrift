import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "eDrift Electric | SiC On-Board Chargers & DC-DC Converters for EV OEMs",
  description: "eDrift Electric designs automotive-grade SiC on-board chargers (3.3kW-20kW) and DC-DC converters for EV OEMs. ISO 9001 & ASIL-D certified. Engineering support from prototyping to production.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "eDrift Electric Private Limited",
  "alternateName": "eDrift Electric",
  "url": "https://www.edriftelectric.com",
  "logo": "https://www.edriftelectric.com/logo.png",
  "description": "Automotive-grade SiC on-board charger and DC-DC converter manufacturer for EV OEMs",
  "foundingDate": "2018",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hosur Industrial Complex",
    "addressLocality": "Hosur",
    "addressRegion": "Tamil Nadu",
    "postalCode": "635109",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-97902-74709",
    "contactType": "sales",
    "availableLanguage": ["English", "Hindi", "Tamil"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/edriftelectric",
    "https://twitter.com/edriftelectric"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "EV Power Electronics",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Elite Series OBC",
          "description": "3.3kW - 7.2kW SiC On-Board Chargers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Ultra Series OBC",
          "description": "11kW - 20kW Three-Phase Chargers"
        }
      }
    ]
  }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
