import { MetadataRoute } from "next";
import { calculatorConfig } from "@/lib/calculator/config";
import { slugify } from "@/lib/calculator/utils";

/**
 * Dynamic Sitemap Generator
 * This file automatically indexes all static pages and all 40+ dynamic calculator tools
 * for search engines like Google and Bing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.edriftelectric.com";

  // 1. Core Static Pages
  const routes = [
    "",
    "/products",
    "/design-calculator",
    "/resources",
    "/about",
    "/team",
    "/case-studies",
    "/contact",
    "/technology",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Calculator Tools
  // Flatten all categories and map over variables to generate deep-links
  const calculators = calculatorConfig.categories.flatMap((category) =>
    category.variables.map((variable) => ({
      url: `${baseUrl}/design-calculator/${slugify(variable.label)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as "monthly",
      priority: 0.7,
    }))
  );

  return [...routes, ...calculators];
}
