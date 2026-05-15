import { ProductCatalog } from "@/components/sections/ProductCatalog";

export const metadata = {
  title: "EV Power Electronics Catalog | On-Board Chargers 3.3kW-20kW | eDrift",
  description: "Browse eDrift's automotive-grade SiC on-board chargers and DC-DC converters. High-efficiency power solutions for electric 2W, 3W, and 4W platforms.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.edriftelectric.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://www.edriftelectric.com/products"
    }
  ]
};

export default function ProductsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductCatalog />
    </main>
  );
}
