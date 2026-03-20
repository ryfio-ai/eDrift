import { Products } from "@/components/sections/Products";

export const metadata = {
  title: "Products | eDrift Electric",
  description: "Explore our lineup of high-efficiency EV chargers and power solutions.",
};

export default function ProductsPage() {
  return (
    <main className="pt-20">
      <Products />
    </main>
  );
}
