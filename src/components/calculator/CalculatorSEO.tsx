import React from "react";
import { CalculatorVariable } from "@/lib/calculator/types";
import { slugify } from "@/lib/calculator/utils";

interface CalculatorSEOProps {
  variable: CalculatorVariable;
}

/**
 * CalculatorSEO component
 * Dynamically injects BreadcrumbList and SoftwareApplication JSON-LD schemas
 * to help individual tools rank at the top of Google search results for technical terms.
 */
export const CalculatorSEO: React.FC<CalculatorSEOProps> = ({ variable }) => {
  const SITE_URL = "https://www.edriftelectric.com";
  const toolUrl = `${SITE_URL}/design-calculator/${slugify(variable.label)}`;

  // 1. Breadcrumb Schema (Home > Design Calculator > Tool)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Design Calculator",
        "item": `${SITE_URL}/design-calculator`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": variable.label,
        "item": toolUrl
      }
    ]
  };

  // 2. SoftwareApplication Schema (Categorizes the tool as interactive software)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${variable.label} Calculator`,
    "operatingSystem": "All",
    "applicationCategory": "EngineeringApplication",
    "description": variable.helptext,
    "url": toolUrl,
    "author": {
      "@type": "Organization",
      "name": "eDrift Electric"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
};
