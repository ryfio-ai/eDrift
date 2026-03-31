import { ProductCatalog } from "@/components/sections/ProductCatalog";

export const metadata = {
  title: "B2B Product Catalog | eDrift Electric",
  description: "Advanced EV power electronics, chargers, and custom PSU solutions for OEMs and industrial operators.",
};

export default function ProductsPage() {
  return (
    <main className="pt-20">
      <ProductCatalog />
    </main>
  );
}
