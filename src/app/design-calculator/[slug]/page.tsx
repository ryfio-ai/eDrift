import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { calculatorConfig } from "@/lib/calculator/config";
import { slugify } from "@/lib/calculator/utils";
import { CalculatorModule } from "@/components/calculator/CalculatorModule";

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
    description: `Professional ${activeVariable.label} calculator for power electronics engineers. ${activeVariable.helptext}`,
    keywords: [activeVariable.label, "eDrift", "power electronics calculator", "engineering tool", activeVariable.name],
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
      <CalculatorModule variable={activeVariable} />
    </div>
  );
}
