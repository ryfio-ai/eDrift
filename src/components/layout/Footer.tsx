"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();
  const isCalculator = pathname?.startsWith("/design-calculator");

  if (isCalculator) return null;

  const links = {
    products: [
      { name: "Portable EV Charger", href: "/products?category=Portable+EV+Charger" },
      { name: "On Board Charger", href: "/products?category=On+Board+Charger" },
      { name: "On Board DC-DC", href: "/products?category=On+Board+DC-DC" },
      { name: "2-in-1 Integrated OBC", href: "/products?category=2-in-1+Integrated+OBC" },
      { name: "Bi-Directional Charger (V2L)", href: "/products?category=Bi-Directional+Charger+(V2L)" },
    ],
    resources: [
      { name: "Inductive Reactance", href: "/design-calculator/inductive-reactance" },
      { name: "Capacitive Reactance", href: "/design-calculator/capacitive-reactance" },
      { name: "Resonant Frequency", href: "/design-calculator/resonant-frequency" },
      { name: "Potential Divider", href: "/design-calculator/potential-divider" },
      { name: "Inductance", href: "/design-calculator/inductance" },
      { name: "Inductance Factor", href: "/design-calculator/inductance-factor" },
      { name: "Flux", href: "/design-calculator/flux" },
      { name: "Maximum Flux Density", href: "/design-calculator/maximum-flux-density" },
      { name: "Area Product", href: "/design-calculator/area-product" },
      { name: "RMS Capacitor Current", href: "/design-calculator/rms-capacitor-current" },
      { name: "Minimum Capacitance", href: "/design-calculator/minimum-capacitance" },
      { name: "Full Bridge", href: "/design-calculator/full-bridge" },
      { name: "Buck Converter", href: "/design-calculator/buck-converter" },
      { name: "Boost Converter", href: "/design-calculator/boost-converter" },
      { name: "Turns Ratio", href: "/design-calculator/turns-ratio" },
      { name: "Flux Density", href: "/design-calculator/flux-density" },
      { name: "Core Area Product", href: "/design-calculator/core-area-product" },
      { name: "Corner Frequency", href: "/design-calculator/corner-frequency" },
      { name: "Inductor Selection", href: "/design-calculator/inductor-selection" },
      { name: "Capacitor Selection", href: "/design-calculator/capacitor-selection" },
    ],
    company: [
      { name: "About Engineering", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      { icon: Linkedin, href: "https://www.linkedin.com/company/edrift-electric/", name: "LinkedIn" },
      { icon: Facebook, href: "https://facebook.com/edriftelectric", name: "Facebook" },
      { icon: Twitter, href: "https://twitter.com/edriftelectric", name: "Twitter" },
      { icon: Instagram, href: "https://instagram.com/edriftelectric", name: "Instagram" },
      { icon: Youtube, href: "https://youtube.com/@edriftelectric", name: "YouTube" },
    ]
  };

  return (
    <footer className="bg-bg-main border-t border-border-subtle pt-24 pb-12 px-6 reveal-fade">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16"
        >
          <motion.div variants={fadeIn}>
             <Link href="/" className="inline-block mb-8">
                <div className="relative w-40 h-10">
                   <Image 
                     src="/images/edrift logo.png" 
                     alt="eDrift Electric" 
                     fill 
                     className="object-contain object-left"
                   />
                </div>
             </Link>
             <p className="text-text-muted text-sm leading-relaxed mb-8 font-medium">
                Developing automotive-grade power electronics for the global EV ecosystem. 
                Efficiency, reliability, and production-scale engineering support.
             </p>
             <div className="flex flex-wrap gap-4 mt-8">
               {links.social.map((s, i) => (
                 <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-text-faint hover:text-brand-primary hover:border-brand-primary/30 transition-all border border-border-subtle shadow-sm group">
                    <s.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">{s.name}</span>
                 </a>
               ))}
             </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h4 className="text-text-main font-semibold text-[9px] uppercase tracking-[0.25em] mb-8">Product Line</h4>
            <ul className="space-y-4">
              {links.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="inline-block py-2 text-text-muted hover:text-brand-primary text-sm transition-colors font-semibold min-w-[120px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h4 className="text-text-main font-semibold text-[9px] uppercase tracking-[0.25em] mb-8">Company</h4>
            <ul className="space-y-4">
              {links.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="inline-block py-2 text-text-muted hover:text-brand-primary text-sm transition-colors font-semibold min-w-[120px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h4 className="text-text-main font-semibold text-[9px] uppercase tracking-[0.25em] mb-8">Global HQ</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                 <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                 <span className="text-text-muted text-sm font-semibold leading-relaxed">eng@edriftelectric.com</span>
              </li>
              <li className="flex items-start gap-4">
                 <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                 <span className="text-text-muted text-sm font-semibold leading-relaxed tech-value">+91 97902 74709</span>
              </li>
              <li className="flex items-start gap-4">
                 <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                 <span className="text-text-muted text-sm font-semibold leading-relaxed">
                    Hosur, Tamil Nadu / <br/>IIT Palakkad Ecosystem
                 </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Full-width Calculators Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-24 pt-12 border-t border-border-subtle/50"
        >
          <h4 className="text-text-main font-semibold text-[11px] uppercase tracking-[0.25em] mb-8">Design Calculators</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
            {links.resources.map(link => (
              <li key={link.name}>
                <Link href={link.href} className="inline-block py-1 text-text-muted hover:text-brand-primary text-[13px] transition-colors font-semibold">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-text-faint text-[9px] font-semibold uppercase tracking-[0.25em] text-center md:text-left">
              © 2026 eDrift Electric. <br className="md:hidden" /> Engineering, validation, and scale.
           </p>
           <div className="flex flex-wrap gap-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-text-faint mt-6 md:mt-0">
              <Link href="/about" className="py-2 hover:text-text-main transition-colors min-w-[80px]">Compliance</Link>
              <Link href="/contact" className="py-2 hover:text-text-main transition-colors min-w-[80px]">Partnerships</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
