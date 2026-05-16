"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Linkedin, Twitter, Youtube, Mail, Phone, MapPin, 
  ChevronDown, ChevronRight, Settings, ExternalLink,
  Download, ArrowRight, ShieldCheck
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const isCalculator = pathname?.startsWith("/engineering-tools");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (isCalculator) return null;

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const footerLinks = {
    products: [
      { name: "Portable EV Chargers", href: "/products?category=Portable+EV+Charger" },
      { 
        name: "On-Board Chargers", 
        href: "/products?category=On+Board+Charger",
        subItems: [
          { name: "Single Phase", href: "/products?phase=Single" },
          { name: "Three Phase", href: "/products?phase=Three" }
        ]
      },
      { 
        name: "DC-DC & Combo", 
        href: "/products?category=On+Board+DC-DC",
        subItems: [
          { name: "DC-DC", href: "/products?category=On+Board+DC-DC" },
          { name: "Combo", href: "/products?category=2-in-1+Integrated+OBC" },
          { name: "Bi-Directional", href: "/products?category=Bi-Directional+Charger+(V2L)" }
        ]
      }
    ],
    resources: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Newsletter", href: "/newsletter" },
      { name: "Design Calculator", href: "/engineering-tools", special: true }
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    social: [
      { icon: Linkedin, href: "#", name: "LinkedIn" },
      { icon: Twitter, href: "#", name: "Twitter/X" },
      { icon: Youtube, href: "#", name: "YouTube" }
    ]
  };

  return (
    <footer className="w-full bg-[#0B1120] text-[#D1D5DB] border-t border-[#1E3A6B]">
      
      {/* STRIP 1: NEWSLETTER BAND */}
      <div className="bg-[#0F1A2E] border-b border-[#1E3A6B] py-9">
        <div className="max-w-7xl mx-auto px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-lg text-center lg:text-left">
            <h4 className="text-lg font-semibold text-white mb-2">Monthly Power Electronics Intelligence</h4>
            <p className="text-sm text-[#9CA3AF]">Technical updates, engineering resources, and product news — direct to your inbox.</p>
          </div>
          <div className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input 
                suppressHydrationWarning
                type="email" 
                placeholder="Enter your work email" 
                className="w-full sm:w-[340px] bg-[#1A2940] border border-[#2E4A6B] rounded-lg h-12 px-4 text-white text-sm focus:outline-none focus:border-[#0A4FCC] transition-colors"
              />
              <button suppressHydrationWarning className="w-full sm:w-auto bg-[#0A4FCC] hover:bg-[#002B8A] text-white px-6 h-12 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12px] text-[#4B5563] mt-2 text-center lg:text-right">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* STRIP 2: MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1.5 lg:pr-8">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-32 h-8 brightness-0 invert opacity-100">
                <Image src="/images/edrift logo.png" alt="eDrift Electric" fill className="object-contain object-left" sizes="128px" />
              </div>
            </Link>
            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
              Advanced Power Electronics for the EV Ecosystem. Efficiency, reliability, and production-scale engineering support.
            </p>
            <div className="space-y-2.5 mb-7">
              <div className="flex items-center gap-3 text-[13px] text-[#9CA3AF]">
                <MapPin className="w-3.5 h-3.5 text-[#0A4FCC]" />
                <span>Hosur, Tamil Nadu / IIT Palakkad Ecosystem</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#9CA3AF]">
                <Mail className="w-3.5 h-3.5 text-[#0A4FCC]" />
                <span>technical@edriftelectric.com</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#9CA3AF]">
                <Phone className="w-3.5 h-3.5 text-[#0A4FCC]" />
                <span>+91 97902 74709</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((s, i) => (
                <a key={i} href={s.href} className="text-[#6B7280] hover:text-[#0A4FCC] hover:scale-110 transition-all duration-200">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="hidden lg:block">
            <h4 className="text-[12px] font-semibold text-white tracking-[0.08em] uppercase mb-5">Products</h4>
            <ul className="space-y-4">
              {footerLinks.products.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-[14px] font-medium text-[#D1D5DB] hover:text-white hover:translate-x-1 transition-all duration-150 block mb-1">
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <ul className="space-y-2 ml-3 mt-2 mb-4">
                      {item.subItems.map((sub, j) => (
                        <li key={j}>
                          <Link href={sub.href} className="text-[13px] text-[#6B7280] hover:text-[#9CA3AF] transition-colors block">
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link href="/products" className="text-[13px] text-[#0A4FCC] font-semibold flex items-center gap-1.5 hover:underline">
                  View All Products <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="hidden lg:block">
            <h4 className="text-[12px] font-semibold text-white tracking-[0.08em] uppercase mb-5">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((item, i) => (
                <li key={i}>
                  <Link 
                    href={item.href} 
                    className={cn(
                      "text-[14px] font-medium hover:text-white hover:translate-x-1 transition-all duration-150 flex items-center gap-2",
                      item.special ? "text-[#60A5FA] hover:text-[#93C5FD]" : "text-[#D1D5DB]"
                    )}
                  >
                    {item.special && <Settings className="w-3.5 h-3.5" />}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="hidden lg:block">
            <h4 className="text-[12px] font-semibold text-white tracking-[0.08em] uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-[14px] font-medium text-[#D1D5DB] hover:text-white hover:translate-x-1 transition-all duration-150 block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect & Domain */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[12px] font-semibold text-white tracking-[0.08em] uppercase mb-5 hidden lg:block">Get Started</h4>
            <div className="space-y-3">
              <Link href="/contact" className="w-full bg-[#0A4FCC] hover:bg-[#002B8A] text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
              <button suppressHydrationWarning className="w-full bg-transparent border border-[#2E4A6B] text-[#D1D5DB] hover:text-white hover:border-[#4A6A8B] px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all">
                Download Company Deck <Download className="w-4 h-4" />
              </button>
            </div>
            
            <div className="pt-6 border-t border-[#1E3A6B] mt-2">
              <p className="text-[12px] text-[#6B7280] mb-1.5">India market:</p>
              <a href="https://edriftelectric.in" target="_blank" className="text-[13px] text-[#60A5FA] font-medium hover:text-[#93C5FD] hover:underline flex items-center gap-1.5">
                Visit edriftelectric.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile Accordions (Only visible on mobile) */}
          <div className="lg:hidden col-span-full space-y-4">
            {['Products', 'Resources', 'Company'].map((section) => (
              <div key={section} className="border-b border-[#1E3A6B] pb-4">
                <button 
                  onClick={() => toggleAccordion(section)}
                  className="w-full flex items-center justify-between text-white font-semibold py-2"
                >
                  <span>{section}</span>
                  {openAccordion === section ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {openAccordion === section && (
                  <ul className="mt-4 space-y-3 pl-2">
                    {(footerLinks as any)[section.toLowerCase()].map((item: any, i: number) => (
                      <li key={i}>
                        <Link href={item.href} className="text-sm text-[#9CA3AF] hover:text-white block py-1">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* STRIP 4: LEGAL BOTTOM BAR */}
      <div className="bg-[#070D18] py-6">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[12px] text-[#4B5563] text-center md:text-left">
            © 2026 Edrift Electric Private Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6">
            {['Privacy Policy', 'Terms of Use', 'Sitemap', 'Cookie Policy'].map((legal) => (
              <Link key={legal} href="#" className="text-[12px] text-[#4B5563] hover:text-[#9CA3AF] transition-colors">
                {legal}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
