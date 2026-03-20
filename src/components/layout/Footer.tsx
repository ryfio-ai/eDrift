"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const links = {
    products: [
      { name: "Portable Battery Charger", href: "/products/portable-charger" },
      { name: "Din Rail Power Supplies", href: "/#products" },
      { name: "On-Board Charger", href: "/products/onboard-charger" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Technology", href: "/technology" },
      { name: "Meet the Team", href: "/team" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      { icon: Linkedin, href: "https://www.linkedin.com/in/sankar-edriftelectric" },
      { icon: Twitter, href: "#" },
      { icon: Facebook, href: "#" },
    ]
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
             <Link href="/" className="flex items-center gap-2 group mb-8">
                <div className="relative w-64 h-16">
                   <Image 
                     src="/images/edrift logo.png" 
                     alt="eDrift Electric" 
                     fill 
                     className="object-contain object-left"
                   />
                </div>
             </Link>
             <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                Pioneering innovation in power electronics from conception to completion.
             </p>
             <div className="flex gap-4">
               {links.social.map((s, i) => (
                 <a key={i} href={s.href} target="_blank" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-royal-blue hover:bg-royal-blue/10 transition-all border border-slate-100">
                    <s.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-black font-space text-lg mb-8">Solutions</h4>
            <ul className="space-y-4">
              {links.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-royal-blue text-sm transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black font-space text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {links.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-royal-blue text-sm transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black font-space text-lg mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                 <Mail className="w-5 h-5 text-royal-blue shrink-0 group-hover:scale-110 transition-transform" />
                 <span className="text-slate-500 text-sm font-medium">info@edriftelectric.com</span>
              </li>
              <li className="flex items-start gap-4 group">
                 <Phone className="w-5 h-5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                 <span className="text-slate-500 text-sm font-medium">+91 97902 74709</span>
              </li>
              <li className="flex items-start gap-4 group">
                 <MapPin className="w-5 h-5 text-vibrant-purple shrink-0 group-hover:scale-110 transition-transform" />
                 <span className="text-slate-500 text-sm font-medium leading-relaxed">
                    Hosur, Tamil Nadu, India
                 </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center md:text-left leading-relaxed">
              © 2026 eDrift Electric Private Limited. <br className="md:hidden" /> Empowering Industrial Automation.
           </p>
           <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
