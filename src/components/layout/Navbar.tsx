"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Solutions", href: "/#products" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6",
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" : "bg-white/50 backdrop-blur-sm py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
           <div className="relative w-48 h-12">
              <Image 
                src="/images/edrift logo.png" 
                alt="eDrift Electric" 
                fill 
                className="object-contain object-left"
                priority
              />
           </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
           {navLinks.map((link) => (
             <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors"
             >
                {link.name}
             </Link>
           ))}
           <Link href="/contact" className="btn-primary py-2.5 px-6 text-sm">
             Request Consultation
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 py-8 px-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href}
                   onClick={() => setMobileMenuOpen(false)}
                   className="text-lg font-bold text-slate-800 flex items-center justify-between group"
                 >
                    {link.name}
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                 </Link>
               ))}
               <Link 
                 href="/contact" 
                 onClick={() => setMobileMenuOpen(false)}
                 className="btn-primary w-full py-4 mt-4"
               >
                 Request Quote
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
