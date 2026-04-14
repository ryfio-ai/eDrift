import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { calculatorConfig } from "@/lib/calculator/config";
import { slugify } from "@/lib/calculator/utils";
import { CalculatorModule } from "@/components/calculator/CalculatorModule";
import { CalculatorSEO } from "@/components/calculator/CalculatorSEO";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Robust lookup: slugify the URL param to match our standard
  let activeVariable = null;
  for (const category of calculatorConfig.categories) {
    activeVariable = category.variables.find(v => slugify(v.label) === slugify(slug));
    if (activeVariable) break;
  }

  if (!activeVariable) return { title: "Calculator Not Found" };

  return {
    title: `${activeVariable.label} Calculator | eDrift Engineering Suite`,
    description: `Professional level ${activeVariable.label} engineering tool. ${activeVariable.helptext} Designed for automotive-grade power electronics validation.`,
    keywords: [activeVariable.label, "power electronics calculator", "converter design tool", "RMS current calculator", "engineering tool", activeVariable.name],
    openGraph: {
      title: `${activeVariable.label} | Power Electronics Designer`,
      description: `High-precision calculation for ${activeVariable.label}. Part of the eDrift Engineering Suite.`,
      url: `https://www.edriftelectric.com/design-calculator/${slugify(activeVariable.label)}`,
      siteName: "eDrift Electric",
      images: [
        {
          url: "/images/edrift logo.png",
          width: 800,
          height: 600,
          alt: `${activeVariable.label} Engineering Tool`,
        },
      ],
      type: "website",
    },
  };
}

export default async function DynamicCalculatorPage({ params }: PageProps) {
  const { slug } = await params;

  let activeVariable = null;
  // Use slugify on the URL param to ensure case-insensitivity and space-handling
  for (const category of calculatorConfig.categories) {
    activeVariable = category.variables.find(v => slugify(v.label) === slugify(slug));
    if (activeVariable) break;
  }

  if (!activeVariable) {
    return notFound();
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CalculatorSEO variable={activeVariable} />
      <CalculatorModule variable={activeVariable} />
    </div>
  );
}
