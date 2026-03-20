import { TechHighlights } from "@/components/sections/TechHighlights";

export const metadata = {
  title: "Technology | eDrift Electric",
  description: "Advanced power electronics technology and technical benchmarks.",
};

export default function TechnologyPage() {
  return (
    <main className="pt-20">
      <TechHighlights />
    </main>
  );
}
