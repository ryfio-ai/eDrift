import React from "react";

/**
 * OrganizationSchema
 * Structured data for Google to identify eDrift as a professional organization.
 * Helps with appearing in the Google Knowledge Panel and Rich Snippets.
 */
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "eDrift Electric",
    "alternateName": "eDrift",
    "url": "https://www.edriftelectric.com",
    "logo": "https://www.edriftelectric.com/images/edrift logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.linkedin.com/company/edrift-electric/",
      "https://twitter.com/edriftelectric"
    ],
    "description": "Premium automotive-grade power electronics and engineering solutions for the EV ecosystem."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
