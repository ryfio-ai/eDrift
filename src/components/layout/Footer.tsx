"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();
  const isCalculator = pathname?.startsWith("/design-calculator");

  if (isCalculator) return null;

  const links = {
    products: [
      { name: "Elite Series OBC", href: "/products?category=On+Board+Charger" },
      { name: "Ultra High-Power OBC", href: "/products?powerRating=11kW&powerRating=20kW" },
      { name: "Delta DC-DC Converters", href: "/products?category=On+Board+DC-DC" },
      { name: "Bi-Directional (V2L)", href: "/products?category=Bi-Directional+Charger+(V2L)" },
    ],
    resources: [
      { name: "Knowledge Hub", href: "/resources" },
      { name: "TCO Calculator", href: "https://edrift-calculator.vercel.app/" },
      { name: "Case Study Portal", href: "/case-studies" },
      { name: "Engineering Blog", href: "/blog" },
    ],
    company: [
      { name: "About Engineering", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      { icon: Linkedin, href: "https://www.linkedin.com/company/edrift-electric/" },
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24"
        >
          <motion.div variants={fadeIn} className="lg:col-span-1">
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
             <div className="flex gap-4">
               {links.social.map((s, i) => (
                 <a key={i} href={s.href} target="_blank" className="w-10 h-10 rounded bg-white flex items-center justify-center text-text-faint hover:text-brand-primary hover:border-brand-primary/20 transition-all border border-border-subtle">
                    <s.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h4 className="text-text-main font-semibold text-[9px] uppercase tracking-[0.25em] mb-8">Product Line</h4>
            <ul className="space-y-4">
              {links.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-muted hover:text-brand-primary text-sm transition-colors font-semibold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h4 className="text-text-main font-semibold text-[9px] uppercase tracking-[0.25em] mb-8">Resources</h4>
            <ul className="space-y-4">
              {links.resources.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-muted hover:text-brand-primary text-sm transition-colors font-semibold">
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

        <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-text-faint text-[9px] font-semibold uppercase tracking-[0.25em] text-center md:text-left">
              © 2026 eDrift Electric. <br className="md:hidden" /> Engineering, validation, and scale.
           </p>
           <div className="flex gap-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-text-faint">
              <Link href="/about" className="hover:text-text-main transition-colors">Compliance</Link>
              <Link href="/contact" className="hover:text-text-main transition-colors">Partnerships</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
