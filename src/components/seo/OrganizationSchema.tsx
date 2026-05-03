import React from 'react';

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "eDrift Electric",
    "url": "https://www.edriftelectric.com",
    "logo": "https://www.edriftelectric.com/images/edrift%20logo.png",
    "description": "High-efficiency On-Board Chargers, DC-DC Converters, and Power Conversion Systems for the global EV ecosystem.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hosur",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Engineering Sales",
      "email": "contact@edriftelectric.com",
      "url": "https://www.edriftelectric.com/contact"
    },
    "sameAs": [
      "https://www.linkedin.com/company/edrift-electric/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
