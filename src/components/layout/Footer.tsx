"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const links = {
    products: [
      { name: "3.3kW On-Board Charger", href: "/products/ebc-33-sic" },
      { name: "Portable Fleet Charger", href: "/products/ebc-portable" },
      { name: "Custom PSU Solution", href: "/products/custom-psu" },
      { name: "DC Fast Charging", href: "/products/dc-fast-charger" },
    ],
    company: [
      { name: "About Engineering", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Case Study Portal", href: "/case-studies" },
      { name: "Engineering Blog", href: "/blog" },
      { name: "Design Calculator", href: "https://edrift-calculator.vercel.app/" },
    ],
    social: [
      { icon: Linkedin, href: "https://www.linkedin.com/in/sankar-edriftelectric" },
      { icon: Twitter, href: "#" },
      { icon: Facebook, href: "#" },
    ]
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
             <Link href="/" className="inline-block mb-8">
                <div className="relative w-48 h-12">
                   <Image 
                     src="/images/edrift logo.png" 
                     alt="eDrift Electric" 
                     fill 
                     className="object-contain object-left"
                   />
                </div>
             </Link>
             <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                Developing automotive-grade power electronics for the global EV ecosystem. 
                Efficiency, reliability, and precision engineering.
             </p>
             <div className="flex gap-4">
               {links.social.map((s, i) => (
                 <a key={i} href={s.href} target="_blank" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 transition-all border border-slate-100">
                    <s.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-widest mb-8">Product Line</h4>
            <ul className="space-y-4">
              {links.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-brand-primary text-sm transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-widest mb-8">Resources</h4>
            <ul className="space-y-4">
              {links.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-brand-primary text-sm transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-widest mb-8">Global HQ</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                 <Mail className="w-5 h-5 text-brand-primary shrink-0 transition-transform" />
                 <span className="text-slate-500 text-sm font-medium leading-relaxed">info@edriftelectric.com</span>
              </li>
              <li className="flex items-start gap-4 group">
                 <Phone className="w-5 h-5 text-brand-primary shrink-0 transition-transform" />
                 <span className="text-slate-500 text-sm font-medium leading-relaxed">+91 97902 74709</span>
              </li>
              <li className="flex items-start gap-4 group">
                 <MapPin className="w-5 h-5 text-brand-primary shrink-0 transition-transform" />
                 <span className="text-slate-500 text-sm font-medium leading-relaxed">
                    Dr A.P.J Abdul Kalam Block,<br/>IIT Palakkad, 678623
                 </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] text-center md:text-left">
              © 2026 eDrift Electric Private Limited. <br className="md:hidden" /> Engineering Excellence.
           </p>
           <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <Link href="#" className="hover:text-slate-900 transition-colors">Compliance</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Partnerships</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
